import type { User } from "./user";

export interface Post {
  id: string;
  author: User;
  caption: string;
  image?: string;
  video?: string;
  likes: number;
  comments: number;
  createdAt: string;
  liked?: boolean;
  saved?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  author: User;
  text: string;
  createdAt: string;
}

export interface Story {
  id: string;
  author: User;
  media: string;
  type: "image" | "video";
  createdAt: string;
  expiresAt: string;
  viewed: boolean;
}

export interface Notification {
  id: string;
  type: "like" | "comment" | "follow" | "mention";
  actor: User;
  text: string;
  read: boolean;
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  text: string;
  imageUrl?: string;
  read: boolean;
  createdAt: string | number;
}

export interface Conversation {
  id: string;
  otherUserId: string;
  otherUserName: string;
  lastMessage: string;
  lastMessageAt: string | number;
}
