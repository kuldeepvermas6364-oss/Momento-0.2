"use client";

import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { isValidEmail, isValidPassword } from "@/utils/validators";
import { signUpWithEmail } from "@/lib/auth";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  function validate() {
    const next: typeof errors = {};
    if (!name) next.name = "Name is required";
    if (!email) next.email = "Email is required";
    else if (!isValidEmail(email)) next.email = "Enter a valid email";
    if (!password) next.password = "Password is required";
    else if (!isValidPassword(password))
      next.password = "Password must be at least 8 characters";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAuthError(null);
    if (!validate()) return;
    setLoading(true);

    const { error } = await signUpWithEmail(name, email, password);

    if (error) {
      setAuthError(error);
      setLoading(false);
      return;
    }

    setLoading(false);
    setEmailSent(true);
  }

  if (emailSent) {
    return (
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            color: "#22C55E",
            fontSize: "15px",
            marginBottom: "12px",
          }}
        >
          Account created successfully!
        </p>
        <p style={{ color: "#6B7280", fontSize: "14px" }}>
          Please check your email to verify your account, then{" "}
          <a
            href="/login"
            style={{ color: "#6366F1", textDecoration: "underline" }}
          >
            log in
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
      />

      <br />
      <br />

      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />

      <br />
      <br />

      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
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

      <Button text="Create Account" onClick={handleSubmit} disabled={loading} />
    </form>
  );
}
