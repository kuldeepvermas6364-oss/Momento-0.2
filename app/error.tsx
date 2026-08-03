"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: send to error reporting service (e.g. Sentry)
    console.error(error);
  }, [error]);

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        flexDirection: "column",
        gap: "16px"
      }}
    >
      <h1>Something went wrong</h1>

      <p style={{ color: "#6B7280" }}>
        An unexpected error occurred. Please try again.
      </p>

      <button
        onClick={reset}
        style={{
          padding: "12px 24px",
          borderRadius: "12px",
          border: "none",
          background: "#6366F1",
          color: "#FFFFFF",
          fontSize: "16px",
          fontWeight: 600,
          cursor: "pointer"
        }}
      >
        Try Again
      </button>
    </main>
  );
}
