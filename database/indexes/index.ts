/**
 * /database/indexes/index.ts
 * Firebase RTDB index definitions.
 * These must be configured in Firebase Console -> Database -> Rules.
 */

export const indexes = {
  posts: {
    "created_at": "Order posts by creation time for feed",
  },
  stories: {
    "created_at": "Order stories by creation time",
  },
  reels: {
    "created_at": "Order reels by creation time",
  },
  "posts/{postId}/comments": {
    "created_at": "Order comments chronologically",
  },
  "conversations/{convoId}/messages": {
    "createdAt": "Order messages chronologically",
  },
} as const;

export type IndexConfig = typeof indexes;