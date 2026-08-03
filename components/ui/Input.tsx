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
  error
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
          padding: "14px",
          borderRadius: "12px",
          border: `1px solid ${error ? Colors.error : Colors.border}`,
          outline: "none",
          fontSize: "16px"
        }}
      />
      {error && (
        <p
          style={{
            marginTop: "6px",
            color: Colors.error,
            fontSize: "13px"
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
