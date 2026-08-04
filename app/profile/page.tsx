"use client";

import { useState, useEffect } from "react";
import AuthGuard from "@/components/common/AuthGuard";
import MainLayout from "@/components/layout/MainLayout";
import { useAuthContext } from "@/context/AuthContext";
import { getUserPosts } from "@/lib/posts";
import type { Post } from "@/types/post";
import PostCard from "@/components/home/PostCard";

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfileContent />
    </AuthGuard>
  );
}

function ProfileContent() {
  const { user, profile } = useAuthContext();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getUserPosts(user.id, user.id)
      .then(setPosts)
      .catch((err) => console.error("Error loading posts:", err))
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) return null;

  return (
    <MainLayout>
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        {/* Profile Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          {user.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.avatar}
              alt={user.name}
              width={80}
              height={80}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "12px",
              }}
            />
          ) : (
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "#6366F1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: "32px",
                margin: "0 auto 12px",
              }}
            >
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}

          <h2
            style={{
              fontSize: "22px",
              fontWeight: 700,
              margin: "0 0 4px",
            }}
          >
            {user.name}
          </h2>
          <p
            style={{
              color: "#6B7280",
              fontSize: "14px",
              margin: "0 0 12px",
            }}
          >
            @{user.username}
          </p>

          {profile?.bio && (
            <p
              style={{
                fontSize: "14px",
                color: "#374151",
                maxWidth: "400px",
                margin: "0 auto 12px",
              }}
            >
              {profile.bio}
            </p>
          )}
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            padding: "16px 0",
            borderTop: "1px solid #E5E7EB",
            borderBottom: "1px solid #E5E7EB",
            marginBottom: "20px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontSize: "20px",
                fontWeight: 700,
                margin: 0,
                color: "#111827",
              }}
            >
              {posts.length}
            </p>
            <p
              style={{
                fontSize: "12px",
                color: "#6B7280",
                margin: "2px 0 0",
              }}
            >
              Posts
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontSize: "20px",
                fontWeight: 700,
                margin: 0,
                color: "#111827",
              }}
            >
              {profile?.followers_count || 0}
            </p>
            <p
              style={{
                fontSize: "12px",
                color: "#6B7280",
                margin: "2px 0 0",
              }}
            >
              Followers
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontSize: "20px",
                fontWeight: 700,
                margin: 0,
                color: "#111827",
              }}
            >
              {profile?.following_count || 0}
            </p>
            <p
              style={{
                fontSize: "12px",
                color: "#6B7280",
                margin: "2px 0 0",
              }}
            >
              Following
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "16px",
          }}
        >
          <button
            onClick={() => setActiveTab("posts")}
            style={{
              flex: 1,
              padding: "10px",
              border: "none",
              borderRadius: "8px",
              background: activeTab === "posts" ? "#6366F1" : "#F3F4F6",
              color: activeTab === "posts" ? "#FFFFFF" : "#374151",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            My Posts
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            style={{
              flex: 1,
              padding: "10px",
              border: "none",
              borderRadius: "8px",
              background: activeTab === "saved" ? "#6366F1" : "#F3F4F6",
              color: activeTab === "saved" ? "#FFFFFF" : "#374151",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Saved
          </button>
        </div>

        {/* Posts */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <p style={{ color: "#6B7280", fontSize: "14px" }}>Loading...</p>
          </div>
        ) : posts.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
            }}
          >
            <p
              style={{
                color: "#6B7280",
                fontSize: "14px",
              }}
            >
              No posts yet. Share your first moment!
            </p>
          </div>
        ) : (
          <div>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
