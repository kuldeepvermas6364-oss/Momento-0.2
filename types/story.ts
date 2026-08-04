import type { User } from "./user";

export interface Story {
  id: string;
  author: User;
  media: string;
  type: "image" | "video";
  caption?: string;
  createdAt: string;
  expiresAt: string;
  viewed: boolean;
  views: number;
}

export interface StoryGroup {
  author: User;
  stories: Story[];
  hasUnviewed: boolean;
}

export interface StoryInput {
  media: string;
  type: "image" | "video";
  caption?: string;
}