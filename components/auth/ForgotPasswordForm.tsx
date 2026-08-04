"use client";

import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { isValidEmail } from "@/utils/validators";
import { resetPassword } from "@/lib/auth";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

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
    setAuthError(null);
    if (!validate()) return;
    setLoading(true);

    const { error } = await resetPassword(email);

    setLoading(false);

    if (error) {
      setAuthError(error);
      return;
    }

    setSent(true);
  }

  if (sent) {
    return (
      <p
        style={{
          textAlign: "center",
          color: "#22C55E",
          fontSize: "15px",
        }}
      >
        If an account exists for {email}, a reset link has been sent. Please
        check your email.
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

      {authError && (
        <>
          <br />
          <p
            style={{
              color: "#EF4444",
              fontSize: "14px",
              textAlign: "center",
              padding: "8px 12px",
              background: "#FEF2F2",
              borderRadius: "8px",
            }}
          >
            {authError}
          </p>
        </>
      )}

      <br />
      <br />

      <Button text="Send Reset Link" onClick={handleSubmit} disabled={loading} />
    </form>
  );
}
