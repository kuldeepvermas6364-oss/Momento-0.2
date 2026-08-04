import type { User } from "./user";

export interface Reel {
  id: string;
  author: User;
  videoUrl: string;
  thumbnailUrl?: string;
  caption: string;
  audioName?: string;
  audioArtist?: string;
  likes: number;
  comments: number;
  shares: number;
  createdAt: string;
  liked?: boolean;
  saved?: boolean;
}

export interface ReelInput {
  videoUrl: string;
  caption: string;
  thumbnailUrl?: string;
  audioName?: string;
  audioArtist?: string;
}