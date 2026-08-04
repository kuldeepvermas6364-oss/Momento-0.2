"use client";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
  doc,
  serverTimestamp,
  increment,
  runTransaction,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { getProfile } from "@/lib/users";
import type { Comment } from "@/types/post";

/**
 * Add a comment to a post.
 */
export async function addComment(
  postId: string,
  authorId: string,
  text: string
): Promise<string> {
  const postRef = doc(db, "posts", postId);

  const docRef = await addDoc(collection(db, "comments"), {
    post_id: postId,
    author_id: authorId,
    text,
    created_at: serverTimestamp(),
  });

  // Increment comments count on post
  await runTransaction(db, async (transaction) => {
    const postSnap = await transaction.get(postRef);
    if (!postSnap.exists()) return;
    transaction.update(postRef, {
      comments_count: increment(1),
    });
  });

  return docRef.id;
}

/**
 * Get comments for a post.
 */
export async function getComments(postId: string): Promise<Comment[]> {
  const q = query(
    collection(db, "comments"),
    where("post_id", "==", postId),
    orderBy("created_at", "asc")
  );

  const snapshot = await getDocs(q);
  const comments: Comment[] = [];

  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();
    const author = await getProfile(data.author_id);

    comments.push({
      id: docSnap.id,
      postId: data.post_id,
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
      text: data.text || "",
      createdAt: data.created_at?.toDate?.()?.toISOString() || "",
    });
  }

  return comments;
}

/**
 * Delete a comment.
 */
export async function deleteComment(
  commentId: string,
  postId: string
): Promise<void> {
  const postRef = doc(db, "posts", postId);

  await deleteDoc(doc(db, "comments", commentId));

  await runTransaction(db, async (transaction) => {
    const postSnap = await transaction.get(postRef);
    if (!postSnap.exists()) return;
    transaction.update(postRef, {
      comments_count: increment(-1),
    });
  });
}
