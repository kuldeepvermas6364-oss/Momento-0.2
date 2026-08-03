import Input from "../ui/Input";
import Button from "../ui/Button";

export default function LoginForm() {
  return (
    <>
      <Input
        type="email"
        placeholder="Email"
      />

      <br />
      <br />

      <Input
        type="password"
        placeholder="Password"
      />

      <br />
      <br />

      <Button text="Login" />
    </>
  );
}
