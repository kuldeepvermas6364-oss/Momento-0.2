"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <h1>Something went wrong</h1>

      <p>{error.message}</p>

      <button onClick={reset}>Try Again</button>
    </main>
  );
}
