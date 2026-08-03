type PostCardProps = {
  username: string;
  caption: string;
};

export default function PostCard({
  username,
  caption,
}: PostCardProps) {
  return (
    <article
      style={{
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: "16px",
        padding: "16px",
        marginBottom: "16px",
      }}
    >
      <h3
        style={{
          margin: 0,
          fontSize: "16px",
          color: "#111827",
        }}
      >
        @{username}
      </h3>

      <p
        style={{
          marginTop: "12px",
          color: "#374151",
          lineHeight: 1.6,
        }}
      >
        {caption}
      </p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "16px",
          color: "#6B7280",
          fontSize: "14px",
        }}
      >
        <span>❤️ Like</span>
        <span>💬 Comment</span>
        <span>📤 Share</span>
      </div>
    </article>
  );
}
