"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { isValidEmail, isValidPassword } from "@/utils/validators";
import { signUpWithEmail } from "@/lib/auth";

export default function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    agree?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Password strength: 0-4
  const strength = (() => {
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();

  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = [
    "transparent",
    "#ef4444",
    "#f59e0b",
    "#eab308",
    "#22c55e",
  ];

  function validate() {
    const next: typeof errors = {};
    if (!name) next.name = "Name is required";
    if (!email) next.email = "Email is required";
    else if (!isValidEmail(email)) next.email = "Enter a valid email";
    if (!password) next.password = "Password is required";
    else if (!isValidPassword(password))
      next.password = "Password must be at least 8 characters";
    if (!agree) next.agree = "Please accept the terms to continue";
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

    router.push("/");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      {/* Name */}
      <div className="animate-fade-in-up-delay-1">
        <label style={labelStyle}>Full Name</label>
        <Input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />
      </div>

      {/* Email */}
      <div className="animate-fade-in-up-delay-2">
        <label style={labelStyle}>Email Address</label>
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
      </div>

      {/* Password */}
      <div className="animate-fade-in-up-delay-3">
        <label style={labelStyle}>Password</label>
        <div style={{ position: "relative" }}>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            style={{
              position: "absolute",
              right: "14px",
              top: errors.password ? "31px" : "15px",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "18px",
              padding: "0",
              lineHeight: "1",
              opacity: 0.6,
            }}
            tabIndex={-1}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        {/* Strength bar */}
        {password.length > 0 && !errors.password && (
          <div style={{ marginTop: "8px", display: "flex", gap: "4px" }}>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: "3px",
                  borderRadius: "2px",
                  background:
                    i <= strength ? strengthColors[strength] : "rgba(255,255,255,0.1)",
                  transition: "background 0.3s",
                }}
              />
            ))}
          </div>
        )}
        {password.length > 0 && !errors.password && (
          <p
            style={{
              marginTop: "5px",
              fontSize: "12px",
              color: strengthColors[strength],
              fontWeight: 500,
            }}
          >
            {strengthLabels[strength]}
          </p>
        )}
      </div>

      {/* Terms checkbox */}
      <div className="animate-fade-in-up-delay-4">
        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
            cursor: "pointer",
            fontSize: "13px",
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.5,
          }}
        >
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            style={{
              marginTop: "2px",
              width: "16px",
              height: "16px",
              accentColor: "#8b5cf6",
              cursor: "pointer",
              flexShrink: 0,
            }}
          />
          <span>
            I agree to Momento's{" "}
            <span style={{ color: "#a78bfa", fontWeight: 500 }}>
              Terms of Service
            </span>{" "}
            and{" "}
            <span style={{ color: "#a78bfa", fontWeight: 500 }}>
              Privacy Policy
            </span>
          </span>
        </label>
        {errors.agree && (
          <p style={{ marginTop: "5px", color: "#ef4444", fontSize: "12px", fontWeight: 500 }}>
            {errors.agree}
          </p>
        )}
      </div>

      {/* Auth error */}
      {authError && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 14px",
            borderRadius: "12px",
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)",
          }}
        >
          <span style={{ fontSize: "16px" }}>⚠️</span>
          <p style={{ color: "#fca5a5", fontSize: "13px", fontWeight: 500, flex: 1 }}>
            {authError}
          </p>
        </div>
      )}

      {/* Submit */}
      <div className="animate-fade-in-up-delay-4">
        <Button text="Create Account" onClick={handleSubmit} disabled={loading} />
      </div>

      {/* Divider + login link */}
      <p
        style={{
          textAlign: "center",
          fontSize: "14px",
          color: "rgba(255,255,255,0.5)",
          marginTop: "4px",
        }}
      >
        Already have an account?{" "}
        <span
          style={{
            color: "#a78bfa",
            fontWeight: 600,
            cursor: "pointer",
          }}
          onClick={() => router.push("/login")}
        >
          Log in
        </span>
      </p>
    </form>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "7px",
  fontSize: "13px",
  fontWeight: 600,
  color: "rgba(255,255,255,0.8)",
  letterSpacing: "0.2px",
};
