export type PlanType = "free" | "premium_monthly" | "premium_yearly";
export type SubscriptionStatus = "active" | "cancelled" | "expired" | "trialing";

export interface Subscription {
  id: string;
  userId: string;
  plan: PlanType;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  pricePaid: number;
  paymentMethod?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Plan {
  id: PlanType;
  name: string;
  description: string;
  price: number;
  currency: string;
  duration: "monthly" | "yearly";
  features: string[];
  popular?: boolean;
}

export interface PremiumFeatures {
  aiCaptions: boolean;
  verifiedBadge: boolean;
  noAds: boolean;
  exclusiveReels: boolean;
  prioritySupport: boolean;
  unlimitedStories: boolean;
  customThemes: boolean;
}