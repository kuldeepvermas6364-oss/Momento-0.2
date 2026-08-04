/**
 * /database/migrations/index.ts
 * Versioned migration scripts for database structure changes.
 */

export interface Migration {
  version: string;
  description: string;
  up: string;
  down: string;
}

export const migrations: Migration[] = [
  {
    version: "1.0.0",
    description: "Initial schema - profiles, posts, stories, chat, reels",
    up: "Create base collections per schema definition",
    down: "Remove all Momento collections",
  },
  {
    version: "1.1.0",
    description: "Add saved_posts collection and notification subcollections",
    up: "Add saved_posts, notifications collections",
    down: "Remove saved_posts, notifications",
  },
  {
    version: "1.2.0",
    description: "Add reels, hashtags, and userConversations index",
    up: "Add reels, hashtags, userConversations collections",
    down: "Remove reels, hashtags, userConversations",
  },
];

export function getLatestMigrationVersion(): string {
  return migrations[migrations.length - 1]?.version ?? "1.0.0";
}