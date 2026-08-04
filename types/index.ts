/**
 * /types/index.ts
 * Single source of truth for shared TypeScript types.
 *
 * Feature-specific types live in /features/<feature>/types and
 * are re-exported here when shared across features.
 */

export * from "./api";
export * from "./post";
export * from "./user";

// The following types will be added as features are implemented:
// export * from "./comment";
// export * from "./story";
// export * from "./notification";
// export * from "./chat";
// export * from "./message";
// export * from "./reel";
// export * from "./advertisement";
// export * from "./subscription";
// export * from "./coin";
