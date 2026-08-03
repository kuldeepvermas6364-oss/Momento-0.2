import { Colors } from "@/constants/colors";
import { formatDate } from "@/utils/date";

type PostCardProps = {
  username: string;
  caption: string;
  createdAt?: Date;
};

export default function PostCard({
  username,
  caption,
  createdAt
}: PostCardProps) {
  return (
    <article
      style={{
        background: Colors.background,
        border: `1px solid ${Colors.border}`,
        borderRadius: "16px",
        padding: "16px",
        marginBottom: "16px"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "16px",
            color: Colors.text
          }}
        >
          @{username}
        </h3>
        {createdAt && (
          <small style={{ color: Colors.textSecondary, fontSize: "13px" }}>
            {formatDate(createdAt)}
          </small>
        )}
      </div>

      <p
        style={{
          marginTop: "12px",
          color: "#374151",
          lineHeight: 1.6
        }}
      >
        {caption}
      </p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "16px",
          color: Colors.textSecondary,
          fontSize: "14px"
        }}
      >
        <span>❤️ Like</span>
        <span>💬 Comment</span>
        <span>📤 Share</span>
      </div>
    </article>
  );
}
