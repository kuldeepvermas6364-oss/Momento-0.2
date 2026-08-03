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
}
