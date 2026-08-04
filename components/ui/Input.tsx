import { Colors } from "@/constants/colors";

type InputProps = {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}: InputProps) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          padding: "15px 16px",
          borderRadius: "14px",
          border: `1px solid ${error ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.12)"}`,
          background: "rgba(255,255,255,0.05)",
          color: "#fff",
          fontSize: "15px",
          fontWeight: 400,
          outline: "none",
          transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
        }}
        onFocus={(e) => {
          if (!error) {
            e.target.style.borderColor = "rgba(139,92,246,0.6)";
            e.target.style.boxShadow = "0 0 0 4px rgba(139,92,246,0.12)";
          }
          e.target.style.background = "rgba(255,255,255,0.08)";
        }}
        onBlur={(e) => {
          if (!error) {
            e.target.style.borderColor = "rgba(255,255,255,0.12)";
            e.target.style.boxShadow = "none";
          }
          e.target.style.background = "rgba(255,255,255,0.05)";
        }}
      />
      {error && (
        <p
          style={{
            marginTop: "7px",
            color: Colors.error,
            fontSize: "13px",
            fontWeight: 500,
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
