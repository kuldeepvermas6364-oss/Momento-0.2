"use client";

import {
  ref,
  push,
  onValue,
  update,
  query,
  orderByChild,
  limitToLast,
  off,
  serverTimestamp,
} from "firebase/database";
import { rtdb } from "@/lib/firebase/client";

/**
 * Send a text message in a conversation.
 */
export async function sendMessage(
  conversationId: string,
  senderId: string,
  text: string
): Promise<string> {
  const messagesRef = ref(rtdb, `conversations/${conversationId}/messages`);
  const newMessage = push(messagesRef);
  await update(newMessage, {
    senderId,
    text,
    imageUrl: null,
    read: false,
    createdAt: serverTimestamp(),
  });
  return newMessage.key!;
}

/**
 * Send an image message in a conversation.
 */
export async function sendImageMessage(
  conversationId: string,
  senderId: string,
  imageUrl: string
): Promise<string> {
  const messagesRef = ref(rtdb, `conversations/${conversationId}/messages`);
  const newMessage = push(messagesRef);
  await update(newMessage, {
    senderId,
    text: "",
    imageUrl,
    read: false,
    createdAt: serverTimestamp(),
  });
  return newMessage.key!;
}

/**
 * Listen to messages in a conversation in real-time.
 * Returns an unsubscribe function.
 */
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

/**
 * Mark messages as read.
 */
export async function markMessagesRead(
  conversationId: string,
  receiverId: string
): Promise<void> {
  const messagesRef = ref(rtdb, `conversations/${conversationId}/messages`);
  const messagesQuery = query(
    messagesRef,
    orderByChild("read"),
    limitToLast(100)
  );

  // We need to update messages where senderId !== receiverId and read === false
  onValue(
    messagesRef,
    (snapshot) => {
      const updates: Record<string, boolean> = {};
      snapshot.forEach((child) => {
        const msg = child.val();
        if (msg.senderId !== receiverId && !msg.read) {
          updates[`conversations/${conversationId}/messages/${child.key}/read`] = true;
        }
      });
      if (Object.keys(updates).length > 0) {
        update(ref(rtdb), updates);
      }
    },
    { onlyOnce: true }
  );
}

/**
 * Listen to user's conversations list.
 */
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

/**
 * Create or get a conversation between two users.
 * Uses sorted user IDs as the conversation ID for consistency.
 */
export async function getOrCreateConversation(
  userIdA: string,
  userIdB: string,
  nameA: string,
  nameB: string
): Promise<string> {
  const conversationId = [userIdA, userIdB].sort().join("_");

  // Add to both users' conversation lists
  const updates: Record<string, unknown> = {};
  updates[`userConversations/${userIdA}/${conversationId}`] = {
    otherUserId: userIdB,
    otherUserName: nameB,
    lastMessage: "",
    lastMessageAt: serverTimestamp(),
  };
  updates[`userConversations/${userIdB}/${conversationId}`] = {
    otherUserId: userIdA,
    otherUserName: nameA,
    lastMessage: "",
    lastMessageAt: serverTimestamp(),
  };

  await update(ref(rtdb), updates);
  return conversationId;
}

export type RTMessage = {
  id: string;
  senderId: string;
  text: string;
  imageUrl: string | null;
  read: boolean;
  createdAt: number;
};

export type RTConversation = {
  id: string;
  otherUserId: string;
  otherUserName: string;
  lastMessage: string;
  lastMessageAt: number;
};
