import type { User } from "./user";

export interface Comment {
  id: string;
  postId: string;
  author: User;
  text: string;
  likes: number;
  createdAt: string;
  updatedAt?: string;
}

export interface CommentInput {
  postId: string;
  text: string;
}

export type CommentUpdate = Partial<Pick<Comment, "text">>;