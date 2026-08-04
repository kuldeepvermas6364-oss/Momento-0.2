"use client";

import { useAuthContext } from "@/context/AuthContext";

export default function HomeWelcome() {
  const { user } = useAuthContext();

  if (!user) return null;

  return (
    <div
      style={{
        padding: "16px 20px",
        borderRadius: "12px",
        background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
        color: "#FFFFFF",
        marginBottom: "20px",
      }}
    >
      <p style={{ fontSize: "16px", fontWeight: 600, margin: 0 }}>
        Welcome back, {user.name}! 🎉
      </p>
      <p
        style={{
          fontSize: "13px",
          opacity: 0.9,
          marginTop: "4px",
          marginBottom: 0,
        }}
      >
        Share something with your friends today.
      </p>
    </div>
  );
}
