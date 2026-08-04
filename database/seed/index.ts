/**
 * /database/seed/index.ts
 * Seed data for development environment.
 * Run via: npx tsx database/seed/index.ts
 */

export const seedProfiles = [
  {
    username: "demo_user",
    name: "Demo User",
    bio: "Just exploring Momento!",
    verified: false,
  },
  {
    username: "test_creator",
    name: "Test Creator",
    bio: "Content creator and photographer",
    verified: true,
  },
];

export const seedPosts = [
  {
    caption: "Beautiful sunset today!",
    image_url: "https://placehold.co/600x400",
  },
  {
    caption: "Just joined Momento. Loving it so far!",
  },
];

export const seedHashtags = [
  { tag: "photography", count: 0 },
  { tag: "travel", count: 0 },
  { tag: "food", count: 0 },
  { tag: "momento", count: 0 },
];

export { default as runSeed } from "./runSeed";