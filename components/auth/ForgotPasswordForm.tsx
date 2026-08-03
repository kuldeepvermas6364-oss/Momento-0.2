import Input from "../ui/Input";
import Button from "../ui/Button";

export default function ForgotPasswordForm() {
  return (
    <>
      <Input
        type="email"
        placeholder="Enter Email"
      />

      <br />
      <br />

      <Button text="Send Reset Link" />
    </>
  );
}
