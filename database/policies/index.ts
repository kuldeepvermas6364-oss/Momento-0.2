/**
 * /database/policies/index.ts
 * Database access policies (RLS equivalent for Firebase RTDB).
 * Actual rules are in /rtdb.rules at project root.
 */

export const policies = {
  profiles: {
    read: "public",
    write: "owner only (auth.uid === $uid)",
  },
  posts: {
    read: "public",
    create: "authenticated users",
    update: "author only",
    delete: "author only",
  },
  stories: {
    read: "public",
    create: "authenticated users",
    delete: "author only",
  },
  reels: {
    read: "public",
    create: "authenticated users",
    delete: "author only",
  },
  notifications: {
    read: "owner only",
    write: "owner only",
  },
  conversations: {
    read: "participants only",
    write: "authenticated users",
  },
  saved_posts: {
    read: "owner only",
    write: "owner only",
  },
} as const;

export type PolicyConfig = typeof policies;