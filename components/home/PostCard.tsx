"use client";

import { useState } from "react";
import type { Post } from "@/types/post";
import { toggleLike, toggleSave } from "@/lib/posts";
import { useAuthContext } from "@/context/AuthContext";
import { formatRelativeTime } from "@/utils/date";

type PostCardProps = {
  post: Post;
  onComment?: (postId: string) => void;
};

export default function PostCard({ post, onComment }: PostCardProps) {
  const { user } = useAuthContext();
  const [liked, setLiked] = useState(post.liked || false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [saved, setSaved] = useState(post.saved || false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  async function handleLike() {
    if (!user || likeLoading) return;
    setLikeLoading(true);

    // Optimistic update
    const newLiked = !liked;
    setLiked(newLiked);
    setLikesCount((prev) => prev + (newLiked ? 1 : -1));

    try {
      await toggleLike(post.id, user.id);
    } catch {
      // Revert on error
      setLiked(!newLiked);
      setLikesCount((prev) => prev + (newLiked ? -1 : 1));
    } finally {
      setLikeLoading(false);
    }
  }

  async function handleSave() {
    if (!user || saveLoading) return;
    setSaveLoading(true);

    const newSaved = !saved;
    setSaved(newSaved);

    try {
      await toggleSave(post.id, user.id);
    } catch {
      setSaved(!newSaved);
    } finally {
      setSaveLoading(false);
    }
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: "Momento",
        text: post.caption,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  }

  return (
    <div
      style={{
        border: "1px solid #E5E7EB",
        borderRadius: "16px",
        marginBottom: "16px",
        background: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "12px 16px",
        }}
      >
        {post.author.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.author.avatar}
            alt={post.author.name}
            width={36}
            height={36}
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#6366F1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: "14px",
            }}
          >
            {post.author.name?.charAt(0).toUpperCase() || "U"}
          </div>
        )}

        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span style={{ fontWeight: 600, fontSize: "14px" }}>
              {post.author.name}
            </span>
            {post.author.verified && (
              <span style={{ color: "#6366F1", fontSize: "12px" }}>
                Verified
              </span>
            )}
          </div>
          <span style={{ color: "#6B7280", fontSize: "12px" }}>
            @{post.author.username} - {formatRelativeTime(post.createdAt)}
          </span>
        </div>
      </div>

      {/* Caption */}
      {post.caption && (
        <p
          style={{
            padding: "0 16px 12px",
            margin: 0,
            fontSize: "14px",
            color: "#111827",
            lineHeight: 1.5,
          }}
        >
          {post.caption}
        </p>
      )}

      {/* Media */}
      {post.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.image}
          alt={post.caption || "Post"}
          style={{
            width: "100%",
            maxHeight: "500px",
            objectFit: "cover",
          }}
        />
      )}

      {/* Actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "8px 16px",
          borderTop: "1px solid #F3F4F6",
        }}
      >
        <div style={{ display: "flex", gap: "20px" }}>
          <button
            onClick={handleLike}
            disabled={likeLoading}
            style={{
              border: "none",
              background: "none",
              cursor: likeLoading ? "wait" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              color: liked ? "#EF4444" : "#374151",
              fontWeight: liked ? 600 : 500,
            }}
          >
            <span>{liked ? "\u2764\uFE0F" : "\u2661"}</span>
            <span>{likesCount}</span>
          </button>

          <button
            onClick={() => onComment?.(post.id)}
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              color: "#374151",
              fontWeight: 500,
            }}
          >
            <span>{"\u{1F4AC}"}</span>
            <span>{post.comments}</span>
          </button>

          <button
            onClick={handleShare}
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              color: "#374151",
              fontWeight: 500,
            }}
          >
            <span>{"\u{1F4E4}"}</span>
            <span>Share</span>
          </button>
        </div>

        <button
          onClick={handleSave}
          disabled={saveLoading}
          style={{
            border: "none",
            background: "none",
            cursor: saveLoading ? "wait" : "pointer",
            fontSize: "16px",
          }}
        >
          {saved ? "\u{1F516}" : "\u2630"}
        </button>
      </div>
    </div>
  );
}
