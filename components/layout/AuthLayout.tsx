import type { ReactNode } from "react";
import { theme } from "@/lib/theme";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({
  children
}: AuthLayoutProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.background,
        padding: "24px"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px"
        }}
      >
        {children}
      </div>
    </div>
  );
}
