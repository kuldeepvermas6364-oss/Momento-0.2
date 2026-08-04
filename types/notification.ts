import type { User } from "./user";

export type NotificationType = "like" | "comment" | "follow" | "mention" | "system" | "reel_like" | "story_reply";

export interface Notification {
  id: string;
  type: NotificationType;
  actor: User;
  text: string;
  read: boolean;
  createdAt: string;
  entityId?: string;
  entityType?: "post" | "comment" | "story" | "reel" | "user";
}

export interface NotificationSettings {
  likes: boolean;
  comments: boolean;
  follows: boolean;
  mentions: boolean;
  messages: boolean;
  email: boolean;
  push: boolean;
}