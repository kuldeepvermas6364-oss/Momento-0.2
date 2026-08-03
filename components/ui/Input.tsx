type InputProps = {
  type?: string;
  placeholder?: string;
};

export default function Input({
  type = "text",
  placeholder,
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      style={{
        width: "100%",
        padding: "14px",
        borderRadius: "12px",
        border: "1px solid #E5E7EB",
        outline: "none",
        fontSize: "16px",
      }}
    />
  );
}
