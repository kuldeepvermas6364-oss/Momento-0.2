import Input from "../ui/Input";
import Button from "../ui/Button";

export default function SignupForm() {
  return (
    <>
      <Input placeholder="Full Name" />

      <br />
      <br />

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

      <Button text="Create Account" />
    </>
  );
}
