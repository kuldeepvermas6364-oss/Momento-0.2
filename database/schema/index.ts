/**
 * /database/schema/index.ts
 * Firebase Realtime Database schema definitions.
 * Documents the structure of each collection.
 */

export const schema = {
  profiles: {
    username: "string",
    name: "string",
    avatar_url: "string | null",
    bio: "string | null",
    verified: "boolean",
    website: "string | null",
    followers_count: "number",
    following_count: "number",
    posts_count: "number",
    created_at: "string (ISO)",
    updated_at: "string (ISO)",
  },
  posts: {
    author_id: "string",
    caption: "string",
    image_url: "string | null",
    video_url: "string | null",
    likes_count: "number",
    comments_count: "number",
    created_at: "string (ISO)",
    updated_at: "string (ISO)",
    likes: "Record<uid, { created_at: string }>",
    comments: "Record<commentId, Comment>",
  },
  userPosts: {
    "[uid]": "Record<postId, { created_at: string }>",
  },
  saved_posts: {
    post_id: "string",
    user_id: "string",
    created_at: "string (ISO)",
  },
  follows: {
    follower_id: "string",
    following_id: "string",
    created_at: "string (ISO)",
  },
  conversations: {
    messages: "Record<messageId, Message>",
  },
  userConversations: {
    "[uid]": "Record<convoId, ConversationMeta>",
  },
  stories: {
    author_id: "string",
    media: "string",
    type: "'image' | 'video'",
    created_at: "string (ISO)",
    views: "Record<uid, { created_at: string }>",
  },
  notifications: {
    "[uid]": "Record<notifId, Notification>",
  },
  reels: {
    author_id: "string",
    video_url: "string",
    thumbnail_url: "string | null",
    caption: "string",
    likes_count: "number",
    comments_count: "number",
    created_at: "string (ISO)",
  },
  hashtags: {
    "[tag]": { count: "number", created_at: "string (ISO)" },
  },
} as const;

export type Schema = typeof schema;