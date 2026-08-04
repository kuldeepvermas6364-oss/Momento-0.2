"use client";

import { useState, useRef } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { createPost } from "@/lib/posts";

export default function CreatePostCard() {
  const { user } = useAuthContext();
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "posts");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Upload failed");
      }

      const data = await res.json();
      setImageUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function removeImage() {
    setImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handlePost() {
    if (!caption.trim() && !imageUrl) return;
    if (!user) return;

    setPosting(true);
    setError(null);

    try {
      await createPost(user.id, caption.trim(), imageUrl || undefined);
      setCaption("");
      setImageUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create post");
    } finally {
      setPosting(false);
    }
  }

  return (
    <div
      style={{
        padding: "16px",
        border: "1px solid #E5E7EB",
        borderRadius: "16px",
        marginBottom: "20px",
        background: "#FFFFFF",
      }}
    >
      <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
        {user?.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.avatar}
            alt={user.name}
            width={40}
            height={40}
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#6366F1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: "16px",
              flexShrink: 0,
            }}
          >
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
        )}

        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="What's on your mind?"
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            resize: "none",
            fontSize: "15px",
            minHeight: "40px",
            fontFamily: "inherit",
            background: "transparent",
            color: "#111827",
          }}
        />
      </div>

      {imageUrl && (
        <div style={{ marginTop: "12px", position: "relative" }}>
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt="Preview"
            style={{
              width: "100%",
              borderRadius: "12px",
              maxHeight: "300px",
              objectFit: "cover",
            }}
          />
          <button
            onClick={removeImage}
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              background: "rgba(0,0,0,0.6)",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "50%",
              width: 28,
              height: 28,
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            X
          </button>
        </div>
      )}

      {error && (
        <p
          style={{
            color: "#EF4444",
            fontSize: "13px",
            marginTop: "8px",
          }}
        >
          {error}
        </p>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "12px",
          paddingTop: "12px",
          borderTop: "1px solid #F3F4F6",
        }}
      >
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || posting}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 12px",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              background: "#F9FAFB",
              color: "#374151",
              fontSize: "13px",
              fontWeight: 500,
              cursor: uploading || posting ? "not-allowed" : "pointer",
              opacity: uploading || posting ? 0.6 : 1,
            }}
          >
            {uploading ? "Uploading..." : "Photo/Video"}
          </button>
        </div>

        <button
          onClick={handlePost}
          disabled={posting || uploading || (!caption.trim() && !imageUrl)}
          style={{
            padding: "8px 24px",
            border: "none",
            borderRadius: "8px",
            background:
              posting || uploading || (!caption.trim() && !imageUrl)
                ? "#C7D2FE"
                : "#6366F1",
            color: "#FFFFFF",
            fontSize: "14px",
            fontWeight: 600,
            cursor:
              posting || uploading || (!caption.trim() && !imageUrl)
                ? "not-allowed"
                : "pointer",
          }}
        >
          {posting ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}
