"use client";

import { useState, useEffect, useRef } from "react";
import type { Conversation, Message } from "@/types/chat";
import {
  listenToConversations,
  listenToMessages,
  sendMessage,
  type RTMessage,
} from "@/lib/rtdb";

/**
 * useChat - manages conversations and real-time messages.
 */
export default function useChat(userId: string | null) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  // Listen to conversations
  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    const unsubscribe = listenToConversations(userId, (convos) => {
      setConversations(
        convos.map((c) => ({
          id: c.id,
          otherUserId: c.otherUserId,
          otherUserName: c.otherUserName,
          lastMessage: c.lastMessage,
          lastMessageAt: c.lastMessageAt,
          unreadCount: 0,
        }))
      );
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  // Listen to messages in active conversation
  useEffect(() => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
      unsubscribeRef.current = null;
    }

    if (!activeConversation) return;

    const unsubscribe = listenToMessages(activeConversation, (msgs: RTMessage[]) => {
      setMessages(
        msgs.map((m) => ({
          id: m.id,
          conversationId: activeConversation,
          senderId: m.senderId,
          receiverId: "",
          text: m.text,
          imageUrl: m.imageUrl || undefined,
          read: m.read,
          createdAt: m.createdAt,
        }))
      );
    });

    unsubscribeRef.current = unsubscribe;
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [activeConversation]);

  const send = async (text: string, imageUrl?: string) => {
    if (!activeConversation || !userId) return;
    await sendMessage(activeConversation, userId, text);
  };

  return {
    conversations,
    activeConversation,
    setActiveConversation,
    messages,
    loading,
    sendMessage: send,
  };
}