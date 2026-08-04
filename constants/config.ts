/**
 * /constants/config.ts
 * Static configuration values (non-environment).
 * For environment-specific config, see /config/index.ts.
 */

export const AppConfig = {
  // Pagination
  POSTS_PER_PAGE: 10,
  COMMENTS_PER_PAGE: 20,
  REELS_PER_PAGE: 5,
  STORIES_LIMIT: 50,

  // Upload limits
  MAX_IMAGE_SIZE: 10 * 1024 * 1024, // 10 MB
  MAX_VIDEO_SIZE: 50 * 1024 * 1024, // 50 MB
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  ALLOWED_VIDEO_TYPES: ["video/mp4", "video/webm", "video/quicktime"],

  // Story
  STORY_DURATION_HOURS: 24,

  // Reel
  MAX_REEL_DURATION_SECONDS: 60,

  // Chat
  MAX_MESSAGE_LENGTH: 1000,
  MESSAGES_PER_FETCH: 50,

  // Feed
  FEED_REFRESH_INTERVAL: 30000, // 30 seconds

  // Notifications
  NOTIFICATION_BATCH_SIZE: 20,

  // Premium
  PREMIUM_PRICE_MONTHLY: 499, // Rs.499/month
  PREMIUM_PRICE_YEARLY: 4999, // Rs.4999/year

  // Coins
  COINS_SIGNUP_BONUS: 100,
  COINS_DAILY_LOGIN: 10,
  COINS_PER_AD_WATCH: 5,

  // Cache
  CACHE_TTL: 300000, // 5 minutes
} as const;