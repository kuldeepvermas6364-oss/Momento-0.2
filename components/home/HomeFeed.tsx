"use client";

import { useState, useEffect, useCallback } from "react";
import type { Post } from "@/types/post";
import { getPosts } from "@/lib/posts";
import { useAuthContext } from "@/context/AuthContext";
import PostCard from "./PostCard";
import EmptyFeed from "./EmptyFeed";

export default function HomeFeed() {
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
        setError(
          err instanceof Error ? err.message : "Failed to load posts"
        );
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

  function handleLoadMore() {
    if (!hasMore || loadingMore || posts.length === 0) return;
    const lastPost = posts[posts.length - 1];
    const lastTime = new Date(lastPost.createdAt).getTime();
    fetchPosts(lastTime);
  }

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <p style={{ color: "#6B7280", fontSize: "15px" }}>Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <p style={{ color: "#EF4444", fontSize: "14px", marginBottom: "12px" }}>
          {error}
        </p>
        <button
          onClick={() => fetchPosts()}
          style={{
            padding: "8px 16px",
            border: "1px solid #6366F1",
            borderRadius: "8px",
            background: "none",
            color: "#6366F1",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (posts.length === 0) {
    return <EmptyFeed />;
  }

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {hasMore && (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            style={{
              padding: "10px 24px",
              border: "1px solid #6366F1",
              borderRadius: "8px",
              background: "none",
              color: "#6366F1",
              fontSize: "14px",
              fontWeight: 500,
              cursor: loadingMore ? "wait" : "pointer",
            }}
          >
            {loadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
