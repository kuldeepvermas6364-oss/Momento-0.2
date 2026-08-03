type ButtonProps = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
};

export default function Button({
  text,
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%",
        padding: "14px",
        borderRadius: "12px",
        border: "none",
        background: "#6366F1",
        color: "#FFFFFF",
        fontSize: "16px",
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {text}
    </button>
  );
}
