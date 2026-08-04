/**
 * /services/chatService.ts
 * Chat business logic — messaging, conversations, real-time.
 */

export {
  sendMessage,
  sendImageMessage,
  listenToMessages,
  markMessagesRead,
  getOrCreateConversation,
  listenToConversations,
} from "@/lib/rtdb";

export { default as useChat } from "@/hooks/useChat";