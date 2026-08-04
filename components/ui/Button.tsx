import { Colors } from "@/constants/colors";

type ButtonProps = {
  text: string;
  onClick?: (e: React.FormEvent) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

export default function Button({
  text,
  onClick,
  disabled = false,
  type = "submit",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%",
        padding: "15px",
        borderRadius: "14px",
        border: "none",
        background: disabled
          ? "rgba(139,92,246,0.35)"
          : "linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #a855f7 100%)",
        backgroundSize: "200% 200%",
        color: "#fff",
        fontSize: "16px",
        fontWeight: 700,
        letterSpacing: "0.2px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.7 : 1,
        transition: "transform 0.15s, box-shadow 0.25s, background-position 0.4s",
        boxShadow: disabled
          ? "none"
          : "0 8px 24px rgba(139,92,246,0.35), 0 2px 8px rgba(99,102,241,0.25)",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow =
            "0 12px 32px rgba(139,92,246,0.45), 0 4px 12px rgba(99,102,241,0.3)";
          e.currentTarget.style.backgroundPosition = "100% 50%";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow =
            "0 8px 24px rgba(139,92,246,0.35), 0 2px 8px rgba(99,102,241,0.25)";
          e.currentTarget.style.backgroundPosition = "0% 50%";
        }
      }}
    >
      {disabled ? "Please wait..." : text}
    </button>
  );
}
