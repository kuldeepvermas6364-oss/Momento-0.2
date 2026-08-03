type LoadingButtonProps = {
  text: string;
  loading?: boolean;
};

export default function LoadingButton({
  text,
  loading = false,
}: LoadingButtonProps) {
  return (
    <button
      disabled={loading}
      style={{
        width: "100%",
        padding: "14px",
        border: "none",
        borderRadius: "12px",
        background: "#6366F1",
        color: "#FFFFFF",
        fontSize: "16px",
        cursor: loading ? "not-allowed" : "pointer",
      }}
    >
      {loading ? "Please wait..." : text}
    </button>
  );
}
