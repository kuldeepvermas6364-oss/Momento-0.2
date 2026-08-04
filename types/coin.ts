export type CoinTransactionType = "earn" | "spend" | "transfer" | "reward";

export interface Coin {
  id: string;
  userId: string;
  balance: number;
  totalEarned: number;
  totalSpent: number;
  updatedAt: string;
}

export interface CoinTransaction {
  id: string;
  userId: string;
  type: CoinTransactionType;
  amount: number;
  description: string;
  referenceId?: string;
  referenceType?: "post" | "reel" | "ad" | "signup" | "daily_login" | "transfer";
  createdAt: string;
}

export interface CoinReward {
  action: string;
  coins: number;
  description: string;
  dailyLimit?: number;
}

export interface CoinWallet {
  balance: number;
  transactions: CoinTransaction[];
  totalEarned: number;
  totalSpent: number;
}