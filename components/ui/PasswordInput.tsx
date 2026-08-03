type PasswordInputProps = {
  placeholder?: string;
};

export default function PasswordInput({
  placeholder = "Password",
}: PasswordInputProps) {
  return (
    <input
      type="password"
      placeholder={placeholder}
      style={{
        width: "100%",
        padding: "14px",
        border: "1px solid #E5E7EB",
        borderRadius: "12px",
        fontSize: "16px",
        outline: "none",
      }}
    />
  );
}
