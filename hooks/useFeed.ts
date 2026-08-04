"use client";

import { useState, useEffect, useCallback } from "react";
import type { Post } from "@/types/post";
import { getPosts } from "@/lib/rtdb";
import { useAuthContext } from "@/context/AuthContext";

/**
 * useFeed - fetches paginated feed posts with infinite scroll support.
 */
export default function useFeed() {
  const { user } = useAuthContext();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(
    async (lastCreatedAt?: number) => {
      if (lastCreatedAt) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      setError(null);

      try {
        const result = await getPosts(lastCreatedAt, user?.id);
        if (lastCreatedAt) {
          setPosts((prev) => [...prev, ...result.posts]);
        } else {
          setPosts(result.posts);
        }
        setHasMore(result.hasMore);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load posts");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [user?.id]
  );

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const loadMore = useCallback(() => {
    if (!hasMore || loadingMore || posts.length === 0) return;
    const lastPost = posts[posts.length - 1];
    const lastTime = new Date(lastPost.createdAt).getTime();
    fetchPosts(lastTime);
  }, [hasMore, loadingMore, posts, fetchPosts]);

  const refresh = useCallback(() => fetchPosts(), [fetchPosts]);

  return { posts, loading, loadingMore, hasMore, error, loadMore, refresh };
}