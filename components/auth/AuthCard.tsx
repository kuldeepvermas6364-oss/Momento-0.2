import type { ReactNode } from "react";

type AuthCardProps = {
  children: ReactNode;
};

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "440px",
        padding: "40px 36px",
        borderRadius: "24px",
        background: "rgba(255,255,255,0.07)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow:
          "0 24px 64px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow accent top */}
      <div
        style={{
          position: "absolute",
          top: "-1px",
          left: "20%",
          right: "20%",
          height: "2px",
          background:
            "linear-gradient(90deg, transparent, rgba(139,92,246,0.8), transparent)",
          borderRadius: "2px",
        }}
      />
      {children}
    </div>
  );
}
