"use client";

export default function EmptyFeed() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "60px 20px",
      }}
    >
      <div style={{ fontSize: "48px", marginBottom: "16px" }}>
        {"\u{1F4DA}"}
      </div>
      <h3
        style={{
          fontSize: "18px",
          fontWeight: 700,
          color: "#111827",
          marginBottom: "8px",
        }}
      >
        No posts yet
      </h3>
      <p
        style={{
          fontSize: "14px",
          color: "#6B7280",
          maxWidth: "300px",
          margin: "0 auto",
        }}
      >
        Be the first to share something! Create a post using the box above.
      </p>
    </div>
  );
}
