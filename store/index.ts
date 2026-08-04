/**
 * /store/index.ts
 * Central export point for all Zustand global state stores.
 * Feature-specific stores live in /features/<feature>/store and
 * are re-exported here when shared across features.
 *
 * NOTE: Zustand handles global client state. Do NOT duplicate
 * the same concern in React Context.
 */

// Base store creator will be added as features are implemented.
// Example exports:
// export { useAuthStore } from "@/features/auth/store/authStore";
// export { useFeedStore } from "@/features/feed/store/feedStore";
// export { useChatStore } from "@/features/chat/store/chatStore";

export {};
