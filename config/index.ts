/**
 * /config/index.ts
 * App-wide configuration values.
 * Environment-specific settings, feature flags, and constants
 * that are NOT static (static values go in /constants).
 */

export const appConfig = {
  appName: "Momento",
  env: process.env.NODE_ENV ?? "development",
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api",
  cloudinaryCloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "",
  features: {
    auth: true,
    feed: false,
    stories: false,
    chat: false,
    reels: false,
    notifications: false,
    premium: false,
    coins: false,
    ai: false,
  },
} as const;

export type AppConfig = typeof appConfig;
