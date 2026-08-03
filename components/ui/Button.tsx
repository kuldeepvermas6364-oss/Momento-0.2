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
  type = "submit"
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%",
        padding: "14px",
        borderRadius: "12px",
        border: "none",
        background: Colors.primary,
        color: "#FFFFFF",
        fontSize: "16px",
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1
      }}
    >
      {disabled ? "Please wait..." : text}
    </button>
  );
}
