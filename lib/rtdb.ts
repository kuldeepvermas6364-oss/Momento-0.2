"use client";

import {
  ref,
  get,
  set,
  update,
  push,
  remove,
  onValue,
  query,
  orderByChild,
  limitToLast,
  off,
} from "firebase/database";
import { rtdb } from "@/lib/firebase/client";
import type { Profile } from "@/types/user";
import { profileToUser, type User } from "@/types/user";
import type { Post, Comment } from "@/types/post";

// ============================================================
// PROFILES
// ============================================================

export async function getProfile(userId: string): Promise<Profile | null> {
  const snap = await get(ref(rtdb, `profiles/${userId}`));
  if (snap.exists()) {
    return { id: userId, ...snap.val() } as Profile;
  }
  return null;
}

export async function getUser(userId: string): Promise<User | null> {
  const profile = await getProfile(userId);
  return profile ? profileToUser(profile) : null;
}

export async function updateProfile(
  userId: string,
  updates: Partial<Pick<Profile, "name" | "username" | "bio" | "avatar_url" | "website">>
): Promise<void> {
  const now = new Date().toISOString();
  await update(ref(rtdb, `profiles/${userId}`), {
    ...updates,
    updated_at: now,
  });
}

export async function createProfile(userId: string, data: Omit<Profile, "id">): Promise<void> {
  await set(ref(rtdb, `profiles/${userId}`), data);
}

export async function searchUsers(searchTerm: string): Promise<Profile[]> {
  const snap = await get(ref(rtdb, "profiles"));
  if (!snap.exists()) return [];
  const term = searchTerm.toLowerCase();
  const results: Profile[] = [];
  snap.forEach((child) => {
    const p = { id: child.key!, ...child.val() } as Profile;
    if (
      p.name.toLowerCase().includes(term) ||
      p.username.toLowerCase().includes(term)
    ) {
      results.push(p);
    }
  });
  return results;
}

// ============================================================
// FOLLOWS
// ============================================================

export async function toggleFollow(
  followerId: string,
  followingId: string
): Promise<{ following: boolean }> {
  const followId = `${followerId}_${followingId}`;
  const followRef = ref(rtdb, `follows/${followId}`);
  const snap = await get(followRef);

  if (snap.exists()) {
    await remove(followRef);
    const followerFollowing = (await get(ref(rtdb, `profiles/${followerId}/following_count`))).val() || 0;
    const followingFollowers = (await get(ref(rtdb, `profiles/${followingId}/followers_count`))).val() || 0;
    await update(ref(rtdb, `profiles/${followerId}`), { following_count: Math.max(0, followerFollowing - 1) });
    await update(ref(rtdb, `profiles/${followingId}`), { followers_count: Math.max(0, followingFollowers - 1) });
    return { following: false };
  } else {
    const now = new Date().toISOString();
    await set(followRef, {
      follower_id: followerId,
      following_id: followingId,
      created_at: now,
    });
    const followerFollowing = (await get(ref(rtdb, `profiles/${followerId}/following_count`))).val() || 0;
    const followingFollowers = (await get(ref(rtdb, `profiles/${followingId}/followers_count`))).val() || 0;
    await update(ref(rtdb, `profiles/${followerId}`), { following_count: followerFollowing + 1 });
    await update(ref(rtdb, `profiles/${followingId}`), { followers_count: followingFollowers + 1 });
    return { following: true };
  }
}

export async function isFollowing(followerId: string, followingId: string): Promise<boolean> {
  const snap = await get(ref(rtdb, `follows/${followerId}_${followingId}`));
  return snap.exists();
}

// ============================================================
// POSTS
// ============================================================

const POSTS_PER_PAGE = 10;

export async function createPost(
  authorId: string,
  caption: string,
  imageUrl?: string,
  videoUrl?: string
): Promise<string> {
  const postsRef = ref(rtdb, "posts");
  const newPostRef = push(postsRef);
  const postId = newPostRef.key!;
  const now = new Date().toISOString();

  await set(newPostRef, {
    author_id: authorId,
    caption,
    image_url: imageUrl || null,
    video_url: videoUrl || null,
    likes_count: 0,
    comments_count: 0,
    created_at: now,
    updated_at: now,
  });

  await set(ref(rtdb, `userPosts/${authorId}/${postId}`), {
    created_at: now,
  });

  const profileSnap = await get(ref(rtdb, `profiles/${authorId}/posts_count`));
  const currentCount = profileSnap.val() || 0;
  await update(ref(rtdb, `profiles/${authorId}`), { posts_count: currentCount + 1 });

  return postId;
}

export async function getPosts(
  lastCreatedAt?: number,
  currentUserId?: string
): Promise<{ posts: Post[]; hasMore: boolean }> {
  const postsQuery = query(
    ref(rtdb, "posts"),
    orderByChild("created_at"),
    limitToLast(POSTS_PER_PAGE)
  );

  const snap = await get(postsQuery);
  const allPosts: Array<{
    id: string;
    author_id: string;
    caption: string;
    image_url: string | null;
    video_url: string | null;
    likes_count: number;
    comments_count: number;
    created_at: string;
  }> = [];

  if (!snap.exists()) {
    return { posts: [], hasMore: false };
  }

  snap.forEach((child) => {
    const data = child.val();
    allPosts.push({
      id: child.key!,
      author_id: data.author_id,
      caption: data.caption || "",
      image_url: data.image_url,
      video_url: data.video_url,
      likes_count: data.likes_count || 0,
      comments_count: data.comments_count || 0,
      created_at: data.created_at || new Date().toISOString(),
    });
  });

  allPosts.sort((a, b) => {
    const aTime = typeof a.created_at === "string" ? new Date(a.created_at).getTime() : 0;
    const bTime = typeof b.created_at === "string" ? new Date(b.created_at).getTime() : 0;
    return bTime - aTime;
  });

  const filtered = lastCreatedAt
    ? allPosts.filter((p) => {
        const pTime = typeof p.created_at === "string" ? new Date(p.created_at).getTime() : 0;
        return pTime < lastCreatedAt;
      })
    : allPosts;
  const page = filtered.slice(0, POSTS_PER_PAGE);

  const posts: Post[] = [];
  for (const postData of page) {
    const author = await getProfile(postData.author_id);
    const liked = currentUserId ? await hasUserLiked(postData.id, currentUserId) : false;
    const saved = currentUserId ? await hasUserSaved(postData.id, currentUserId) : false;

    posts.push({
      id: postData.id,
      author: author
        ? profileToUser(author)
        : { id: postData.author_id, username: "unknown", name: "Unknown", avatar: "", verified: false },
      caption: postData.caption,
      image: postData.image_url || undefined,
      video: postData.video_url || undefined,
      likes: postData.likes_count,
      comments: postData.comments_count,
      createdAt: typeof postData.created_at === "string" ? postData.created_at : new Date().toISOString(),
      liked,
      saved,
    });
  }

  return {
    posts,
    hasMore: filtered.length > POSTS_PER_PAGE,
  };
}

export async function getUserPosts(
  userId: string,
  currentUserId?: string
): Promise<Post[]> {
  const snap = await get(ref(rtdb, `userPosts/${userId}`));
  if (!snap.exists()) return [];

  const postIds: string[] = [];
  snap.forEach((child) => {
    postIds.push(child.key!);
  });

  const posts: Post[] = [];
  for (const postId of postIds) {
    const postSnap = await get(ref(rtdb, `posts/${postId}`));
    if (!postSnap.exists()) continue;
    const data = postSnap.val();
    const author = await getProfile(data.author_id);
    const liked = currentUserId ? await hasUserLiked(postId, currentUserId) : false;

    posts.push({
      id: postId,
      author: author
        ? profileToUser(author)
        : { id: data.author_id, username: "unknown", name: "Unknown", avatar: "", verified: false },
      caption: data.caption || "",
      image: data.image_url || undefined,
      video: data.video_url || undefined,
      likes: data.likes_count || 0,
      comments: data.comments_count || 0,
      createdAt: typeof data.created_at === "string" ? data.created_at : new Date().toISOString(),
      liked,
      saved: false,
    });
  }

  posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return posts;
}

export async function deletePost(postId: string, authorId: string): Promise<void> {
  const likesSnap = await get(ref(rtdb, `posts/${postId}/likes`));
  if (likesSnap.exists()) await remove(ref(rtdb, `posts/${postId}/likes`));

  const commentsSnap = await get(ref(rtdb, `posts/${postId}/comments`));
  if (commentsSnap.exists()) await remove(ref(rtdb, `posts/${postId}/comments`));

  await remove(ref(rtdb, `posts/${postId}`));
  await remove(ref(rtdb, `userPosts/${authorId}/${postId}`));

  const countSnap = await get(ref(rtdb, `profiles/${authorId}/posts_count`));
  const count = countSnap.val() || 0;
  await update(ref(rtdb, `profiles/${authorId}`), { posts_count: Math.max(0, count - 1) });
}

// ============================================================
// LIKES
// ============================================================

export async function toggleLike(
  postId: string,
  userId: string
): Promise<{ liked: boolean }> {
  const likeRef = ref(rtdb, `posts/${postId}/likes/${userId}`);
  const snap = await get(likeRef);

  if (snap.exists()) {
    await remove(likeRef);
    const countSnap = await get(ref(rtdb, `posts/${postId}/likes_count`));
    await update(ref(rtdb, `posts/${postId}`), {
      likes_count: Math.max(0, (countSnap.val() || 0) - 1),
    });
    return { liked: false };
  } else {
    const now = new Date().toISOString();
    await set(likeRef, { created_at: now });
    const countSnap = await get(ref(rtdb, `posts/${postId}/likes_count`));
    await update(ref(rtdb, `posts/${postId}`), {
      likes_count: (countSnap.val() || 0) + 1,
    });
    return { liked: true };
  }
}

export async function hasUserLiked(postId: string, userId: string): Promise<boolean> {
  const snap = await get(ref(rtdb, `posts/${postId}/likes/${userId}`));
  return snap.exists();
}

// ============================================================
// SAVED POSTS
// ============================================================

export async function toggleSave(
  postId: string,
  userId: string
): Promise<{ saved: boolean }> {
  const saveId = `${userId}_${postId}`;
  const saveRef = ref(rtdb, `saved_posts/${saveId}`);
  const snap = await get(saveRef);

  if (snap.exists()) {
    await remove(saveRef);
    return { saved: false };
  } else {
    const now = new Date().toISOString();
    await set(saveRef, {
      post_id: postId,
      user_id: userId,
      created_at: now,
    });
    return { saved: true };
  }
}

export async function hasUserSaved(postId: string, userId: string): Promise<boolean> {
  const saveId = `${userId}_${postId}`;
  const snap = await get(ref(rtdb, `saved_posts/${saveId}`));
  return snap.exists();
}

export async function getSavedPosts(userId: string): Promise<Post[]> {
  const snap = await get(ref(rtdb, "saved_posts"));
  if (!snap.exists()) return [];

  const savedIds: string[] = [];
  snap.forEach((child) => {
    const data = child.val();
    if (data.user_id === userId) {
      savedIds.push(data.post_id);
    }
  });

  const posts: Post[] = [];
  for (const postId of savedIds) {
    const postSnap = await get(ref(rtdb, `posts/${postId}`));
    if (!postSnap.exists()) continue;
    const data = postSnap.val();
    const author = await getProfile(data.author_id);

    posts.push({
      id: postId,
      author: author
        ? profileToUser(author)
        : { id: data.author_id, username: "unknown", name: "Unknown", avatar: "", verified: false },
      caption: data.caption || "",
      image: data.image_url || undefined,
      video: data.video_url || undefined,
      likes: data.likes_count || 0,
      comments: data.comments_count || 0,
      createdAt: typeof data.created_at === "string" ? data.created_at : "",
      liked: false,
      saved: true,
    });
  }

  posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return posts;
}

// ============================================================
// COMMENTS
// ============================================================

export async function addComment(
  postId: string,
  authorId: string,
  text: string
): Promise<string> {
  const commentsRef = ref(rtdb, `posts/${postId}/comments`);
  const newCommentRef = push(commentsRef);
  const now = new Date().toISOString();
  await set(newCommentRef, {
    author_id: authorId,
    text,
    created_at: now,
  });

  const countSnap = await get(ref(rtdb, `posts/${postId}/comments_count`));
  await update(ref(rtdb, `posts/${postId}`), {
    comments_count: (countSnap.val() || 0) + 1,
  });

  return newCommentRef.key!;
}

export async function getComments(postId: string): Promise<Comment[]> {
  const snap = await get(ref(rtdb, `posts/${postId}/comments`));
  if (!snap.exists()) return [];

  const comments: Comment[] = [];

  snap.forEach((child) => {
    const data = child.val();
    comments.push({
      id: child.key!,
      postId,
      author: {
        id: data.author_id,
        username: "",
        name: "",
        avatar: "",
        verified: false,
      },
      text: data.text || "",
      createdAt: typeof data.created_at === "string" ? data.created_at : "",
    });
  });

  for (const comment of comments) {
    const author = await getProfile(comment.author.id);
    if (author) {
      comment.author = profileToUser(author);
    }
  }

  comments.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  return comments;
}

export async function deleteComment(postId: string, commentId: string): Promise<void> {
  await remove(ref(rtdb, `posts/${postId}/comments/${commentId}`));
  const countSnap = await get(ref(rtdb, `posts/${postId}/comments_count`));
  await update(ref(rtdb, `posts/${postId}`), {
    comments_count: Math.max(0, (countSnap.val() || 0) - 1),
  });
}

// ============================================================
// REALTIME MESSAGING
// ============================================================

export async function sendMessage(
  conversationId: string,
  senderId: string,
  text: string
): Promise<string> {
  const messagesRef = ref(rtdb, `conversations/${conversationId}/messages`);
  const newMessage = push(messagesRef);
  const now = new Date().toISOString();
  await set(newMessage, {
    senderId,
    text,
    imageUrl: null,
    read: false,
    createdAt: now,
  });
  return newMessage.key!;
}

export async function sendImageMessage(
  conversationId: string,
  senderId: string,
  imageUrl: string
): Promise<string> {
  const messagesRef = ref(rtdb, `conversations/${conversationId}/messages`);
  const newMessage = push(messagesRef);
  const now = new Date().toISOString();
  await set(newMessage, {
    senderId,
    text: "",
    imageUrl,
    read: false,
    createdAt: now,
  });
  return newMessage.key!;
}

export function listenToMessages(
  conversationId: string,
  callback: (messages: RTMessage[]) => void,
  maxMessages = 100
): () => void {
  const messagesRef = query(
    ref(rtdb, `conversations/${conversationId}/messages`),
    orderByChild("createdAt"),
    limitToLast(maxMessages)
  );

  onValue(messagesRef, (snapshot) => {
    const messages: RTMessage[] = [];
    snapshot.forEach((child) => {
      messages.push({ id: child.key!, ...child.val() });
    });
    callback(messages);
  });

  return () => off(messagesRef);
}

export async function markMessagesRead(
  conversationId: string,
  receiverId: string
): Promise<void> {
  const snap = await get(ref(rtdb, `conversations/${conversationId}/messages`));
  if (!snap.exists()) return;

  const updates: Record<string, boolean> = {};
  snap.forEach((child) => {
    const msg = child.val();
    if (msg.senderId !== receiverId && !msg.read) {
      updates[`conversations/${conversationId}/messages/${child.key}/read`] = true;
    }
  });

  if (Object.keys(updates).length > 0) {
    await update(ref(rtdb), updates);
  }
}

export async function getOrCreateConversation(
  userIdA: string,
  userIdB: string,
  nameA: string,
  nameB: string
): Promise<string> {
  const conversationId = [userIdA, userIdB].sort().join("_");
  const convoRef = ref(rtdb, `userConversations/${userIdA}/${conversationId}`);
  const snap = await get(convoRef);

  if (!snap.exists()) {
    const now = new Date().toISOString();
    const updates: Record<string, unknown> = {};
    updates[`userConversations/${userIdA}/${conversationId}`] = {
      otherUserId: userIdB,
      otherUserName: nameB,
      lastMessage: "",
      lastMessageAt: now,
    };
    updates[`userConversations/${userIdB}/${conversationId}`] = {
      otherUserId: userIdA,
      otherUserName: nameA,
      lastMessage: "",
      lastMessageAt: now,
    };
    await update(ref(rtdb), updates);
  }

  return conversationId;
}

export function listenToConversations(
  userId: string,
  callback: (conversations: RTConversation[]) => void
): () => void {
  const userConvosRef = ref(rtdb, `userConversations/${userId}`);

  onValue(userConvosRef, (snapshot) => {
    const conversations: RTConversation[] = [];
    snapshot.forEach((child) => {
      conversations.push({ id: child.key!, ...child.val() });
    });
    callback(conversations);
  });

  return () => off(userConvosRef);
}

// ============================================================
// TYPES
// ============================================================

export type RTMessage = {
  id: string;
  senderId: string;
  text: string;
  imageUrl: string | null;
  read: boolean;
  createdAt: string;
};

export type RTConversation = {
  id: string;
  otherUserId: string;
  otherUserName: string;
  lastMessage: string;
  lastMessageAt: string;
};
