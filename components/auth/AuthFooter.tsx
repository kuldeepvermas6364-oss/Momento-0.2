type AuthFooterProps = {
  text: string;
  action: string;
};

export default function AuthFooter({
  text,
  action,
}: AuthFooterProps) {
  return (
    <p
      style={{
        marginTop: "24px",
        textAlign: "center",
        color: "#6B7280",
        fontSize: "14px",
      }}
    >
      {text}{" "}
      <span
        style={{
          color: "#6366F1",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        {action}
      </span>
    </p>
  );
}
