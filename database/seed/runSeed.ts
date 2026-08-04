/**
 * /database/seed/runSeed.ts
 * Execute seed script - populates database with dev data.
 * Run via: npx tsx database/seed/runSeed.ts
 */

import { seedProfiles, seedPosts, seedHashtags } from "./index";

/**
 * Placeholder seed runner.
 * Connects to Firebase RTDB and writes seed data.
 */
export default async function runSeed(): Promise<void> {
  console.log("Seeding database...");
  console.log(`  Profiles: ${seedProfiles.length}`);
  console.log(`  Posts: ${seedPosts.length}`);
  console.log(`  Hashtags: ${seedHashtags.length}`);

  // TODO: Connect to Firebase RTDB and write seed data
  // Import rtdb from @/lib/firebase/client and use set() to seed

  console.log("Seed complete!");
}

// Run if called directly
if (require.main === module) {
  runSeed().catch(console.error);
}