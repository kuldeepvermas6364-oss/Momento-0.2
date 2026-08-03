"use client";

import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { isValidEmail } from "@/utils/validators";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  function validate() {
    if (!email) {
      setError("Email is required");
      return false;
    }
    if (!isValidEmail(email)) {
      setError("Enter a valid email");
      return false;
    }
    setError(undefined);
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // TODO: connect to backend / Supabase auth
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1000);
  }

  if (sent) {
    return (
      <p style={{ textAlign: "center", color: "#22C55E", fontSize: "15px" }}>
        If an account exists for {email}, a reset link has been sent.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error}
      />

      <br />
      <br />

      <Button text="Send Reset Link" onClick={handleSubmit} disabled={loading} />
    </form>
  );
}
