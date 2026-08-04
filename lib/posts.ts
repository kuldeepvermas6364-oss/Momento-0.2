"use client";

import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  doc,
  getDoc,
  deleteDoc,
  serverTimestamp,
  increment,
  runTransaction,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { getProfile } from "@/lib/users";
import type { Post } from "@/types/post";
import type { User } from "@/types/user";

const POSTS_PER_PAGE = 10;

/**
 * Create a new post in Firestore.
 */
export async function createPost(
  authorId: string,
  caption: string,
  imageUrl?: string,
  videoUrl?: string
): Promise<string> {
  const docRef = await addDoc(collection(db, "posts"), {
    author_id: authorId,
    caption,
    image_url: imageUrl || null,
    video_url: videoUrl || null,
    likes_count: 0,
    comments_count: 0,
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  });
  return docRef.id;
}

/**
 * Fetch a page of posts for the home feed (paginated).
 * Pass the last post's createdAt for infinite scroll.
 */
export async function getPosts(
  lastCreatedAt?: number,
  currentUserId?: string
): Promise<{ posts: Post[]; hasMore: boolean }> {
  let q;
  if (lastCreatedAt) {
    q = query(
      collection(db, "posts"),
      orderBy("created_at", "desc"),
      startAfter(lastCreatedAt),
      limit(POSTS_PER_PAGE)
    );
  } else {
    q = query(
      collection(db, "posts"),
      orderBy("created_at", "desc"),
      limit(POSTS_PER_PAGE)
    );
  }

  const snapshot = await getDocs(q);
  const posts: Post[] = [];

  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();
    const author = await getProfile(data.author_id);
    const liked = currentUserId
      ? await hasUserLiked(docSnap.id, currentUserId)
      : false;
    const saved = currentUserId
      ? await hasUserSaved(docSnap.id, currentUserId)
      : false;

    posts.push({
      id: docSnap.id,
      author: author
        ? {
            id: author.id,
            username: author.username,
            name: author.name,
            avatar: author.avatar_url || "",
            verified: author.verified,
          }
        : {
            id: data.author_id,
            username: "unknown",
            name: "Unknown User",
            avatar: "",
            verified: false,
          },
      caption: data.caption || "",
      image: data.image_url || undefined,
      video: data.video_url || undefined,
      likes: data.likes_count || 0,
      comments: data.comments_count || 0,
      createdAt: data.created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      liked,
      saved,
    });
  }

  return {
    posts,
    hasMore: snapshot.size === POSTS_PER_PAGE,
  };
}

/**
 * Fetch posts by a specific user.
 */
export async function getUserPosts(
  userId: string,
  currentUserId?: string
): Promise<Post[]> {
  const q = query(
    collection(db, "posts"),
    where("author_id", "==", userId),
    orderBy("created_at", "desc"),
    limit(20)
  );

  const snapshot = await getDocs(q);
  const posts: Post[] = [];

  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();
    const author = await getProfile(data.author_id);
    const liked = currentUserId
      ? await hasUserLiked(docSnap.id, currentUserId)
      : false;

    posts.push({
      id: docSnap.id,
      author: author
        ? {
            id: author.id,
            username: author.username,
            name: author.name,
            avatar: author.avatar_url || "",
            verified: author.verified,
          }
        : {
            id: data.author_id,
            username: "unknown",
            name: "Unknown User",
            avatar: "",
            verified: false,
          },
      caption: data.caption || "",
      image: data.image_url || undefined,
      video: data.video_url || undefined,
      likes: data.likes_count || 0,
      comments: data.comments_count || 0,
      createdAt: data.created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      liked,
      saved: false,
    });
  }

  return posts;
}

/**
 * Toggle like on a post (atomic transaction).
 */
export async function toggleLike(
  postId: string,
  userId: string
): Promise<{ liked: boolean }> {
  const likeId = `${postId}_${userId}`;
  const likeRef = doc(db, "likes", likeId);
  const postRef = doc(db, "posts", postId);

  const result = await runTransaction(db, async (transaction) => {
    const likeSnap = await transaction.get(likeRef);

    if (likeSnap.exists()) {
      // Unlike
      transaction.delete(likeRef);
      transaction.update(postRef, {
        likes_count: increment(-1),
      });
      return { liked: false };
    } else {
      // Like
      transaction.set(likeRef, {
        post_id: postId,
        user_id: userId,
        created_at: serverTimestamp(),
      });
      transaction.update(postRef, {
        likes_count: increment(1),
      });
      return { liked: true };
    }
  });

  return result;
}

/**
 * Toggle save on a post.
 */
export async function toggleSave(
  postId: string,
  userId: string
): Promise<{ saved: boolean }> {
  const saveId = `${postId}_${userId}`;
  const saveRef = doc(db, "saved_posts", saveId);
  const saveSnap = await getDoc(saveRef);

  if (saveSnap.exists()) {
    await deleteDoc(saveRef);
    return { saved: false };
  } else {
    await addDoc(collection(db, "saved_posts"), {
      post_id: postId,
      user_id: userId,
      post_ref: doc(db, "posts", postId),
      created_at: serverTimestamp(),
    });
    return { saved: true };
  }
}

/**
 * Check if user has liked a post.
 */
export async function hasUserLiked(
  postId: string,
  userId: string
): Promise<boolean> {
  const likeId = `${postId}_${userId}`;
  const likeRef = doc(db, "likes", likeId);
  const snap = await getDoc(likeRef);
  return snap.exists();
}

/**
 * Check if user has saved a post.
 */
export async function hasUserSaved(
  postId: string,
  userId: string
): Promise<boolean> {
  const saveId = `${postId}_${userId}`;
  const saveRef = doc(db, "saved_posts", saveId);
  const snap = await getDoc(saveRef);
  return snap.exists();
}

/**
 * Delete a post and its associated likes and comments.
 */
export async function deletePost(postId: string): Promise<void> {
  // Delete likes
  const likesQuery = query(
    collection(db, "likes"),
    where("post_id", "==", postId)
  );
  const likesSnap = await getDocs(likesQuery);
  likesSnap.forEach((d) => deleteDoc(d.ref));

  // Delete comments (top-level, not subcollection)
  const commentsQuery = query(
    collection(db, "comments"),
    where("post_id", "==", postId)
  );
  const commentsSnap = await getDocs(commentsQuery);
  commentsSnap.forEach((d) => deleteDoc(d.ref));

  // Delete the post
  await deleteDoc(doc(db, "posts", postId));
}

/**
 * Get saved posts for a user.
 */
export async function getSavedPosts(userId: string): Promise<Post[]> {
  const savesQuery = query(
    collection(db, "saved_posts"),
    where("user_id", "==", userId)
  );
  const savesSnap = await getDocs(savesQuery);
  const posts: Post[] = [];

  for (const saveDoc of savesSnap.docs) {
    const saveData = saveDoc.data();
    const postId = saveData.post_id;
    if (!postId) continue;
    const postSnap = await getDoc(doc(db, "posts", postId));
    if (postSnap.exists()) {
      const data = postSnap.data();
      const author = await getProfile(data.author_id);
      posts.push({
        id: postSnap.id,
        author: author
          ? {
              id: author.id,
              username: author.username,
              name: author.name,
              avatar: author.avatar_url || "",
              verified: author.verified,
            }
          : {
              id: data.author_id,
              username: "unknown",
              name: "Unknown",
              avatar: "",
              verified: false,
            },
        caption: data.caption || "",
        image: data.image_url || undefined,
        video: data.video_url || undefined,
        likes: data.likes_count || 0,
        comments: data.comments_count || 0,
        createdAt: data.created_at?.toDate?.()?.toISOString() || "",
        liked: false,
        saved: true,
      });
    }
  }

  return posts;
}
