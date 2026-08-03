import type { ReactNode } from "react";

type ScreenProps = {
  children: ReactNode;
};

export default function Screen({
  children,
}: ScreenProps) {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#F8FAFC",
      }}
    >
      {children}
    </div>
  );
}
