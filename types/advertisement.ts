export type AdType = "banner" | "card" | "interstitial" | "sponsored";
export type AdPlacement = "feed" | "reels" | "stories" | "sidebar" | "profile";

export interface Advertisement {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  targetUrl: string;
  type: AdType;
  placement: AdPlacement;
  advertiser: string;
  impressions: number;
  clicks: number;
  budget: number;
  spent: number;
  status: "active" | "paused" | "ended";
  createdAt: string;
  expiresAt: string;
}

export interface AdTarget {
  ageMin?: number;
  ageMax?: number;
  countries?: string[];
  interests?: string[];
  gender?: "all" | "male" | "female";
}

export interface AdStats {
  impressions: number;
  clicks: number;
  ctr: number;
  spent: number;
  remainingBudget: number;
}