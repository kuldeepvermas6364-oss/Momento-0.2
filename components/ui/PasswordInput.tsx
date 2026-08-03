import Input from "./Input";

type PasswordInputProps = {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

export default function PasswordInput({
  placeholder = "Password",
  value,
  onChange,
  error
}: PasswordInputProps) {
  return (
    <Input
      type="password"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      error={error}
    />
  );
}
