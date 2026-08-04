/**
 * /database/queries/index.ts
 * Reusable database query functions.
 * These wrap Firebase RTDB queries for common operations.
 */

export { getPosts, getUserPosts, getSavedPosts } from "@/lib/rtdb";
export { getProfile, getUser, searchUsers } from "@/lib/rtdb";
export { getComments, getOrCreateConversation } from "@/lib/rtdb";
export { isFollowing, hasUserLiked, hasUserSaved } from "@/lib/rtdb";