/**
 * /constants/apiUrls.ts
 * Central registry of all REST API endpoint paths.
 * Used by services to construct fetch URLs.
 */

export const ApiUrls = {
  // Auth
  LOGIN: "/api/auth/login",
  SIGNUP: "/api/auth/signup",
  LOGOUT: "/api/auth/logout",
  REFRESH: "/api/auth/refresh",
  RESET_PASSWORD: "/api/auth/reset-password",

  // Users
  USERS: "/api/users",
  USER_PROFILE: (userId: string) => `/api/users/${userId}`,
  USER_POSTS: (userId: string) => `/api/users/${userId}/posts`,
  USER_FOLLOWERS: (userId: string) => `/api/users/${userId}/followers`,
  USER_FOLLOWING: (userId: string) => `/api/users/${userId}/following`,
  SEARCH_USERS: "/api/users/search",

  // Posts
  POSTS: "/api/posts",
  POST: (postId: string) => `/api/posts/${postId}`,
  POST_LIKE: (postId: string) => `/api/posts/${postId}/like`,
  POST_SAVE: (postId: string) => `/api/posts/${postId}/save`,

  // Stories
  STORIES: "/api/stories",
  STORY: (storyId: string) => `/api/stories/${storyId}`,

  // Comments
  COMMENTS: (postId: string) => `/api/posts/${postId}/comments`,
  COMMENT: (postId: string, commentId: string) =>
    `/api/posts/${postId}/comments/${commentId}`,

  // Likes
  LIKES: "/api/likes",

  // Chat
  CONVERSATIONS: "/api/chat/conversations",
  MESSAGES: (conversationId: string) => `/api/chat/conversations/${conversationId}/messages`,

  // Notifications
  NOTIFICATIONS: "/api/notifications",
  NOTIFICATION_READ: (notificationId: string) =>
    `/api/notifications/${notificationId}/read`,

  // Reels
  REELS: "/api/reels",
  REEL: (reelId: string) => `/api/reels/${reelId}`,

  // Premium
  PREMIUM_PLANS: "/api/premium/plans",
  PREMIUM_SUBSCRIBE: "/api/premium/subscribe",
  PREMIUM_CANCEL: "/api/premium/cancel",

  // Advertisements
  ADS: "/api/advertisements",

  // Coins
  COINS_BALANCE: "/api/coins/balance",
  COINS_TRANSACTIONS: "/api/coins/transactions",
  COINS_TRANSFER: "/api/coins/transfer",

  // AI
  AI_CAPTION: "/api/ai/caption",
  AI_MODERATE: "/api/ai/moderate",

  // Upload
  UPLOAD: "/api/upload",
} as const;