/**
 * /services/postService.ts
 * Post business logic — create, fetch, like, comment, save, delete.
 */

export {
  createPost,
  getPosts,
  getUserPosts,
  deletePost,
  toggleLike,
  toggleSave,
  hasUserLiked,
  hasUserSaved,
  getSavedPosts,
} from "@/lib/rtdb";

export { default as useFeed } from "@/hooks/useFeed";