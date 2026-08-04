import { APP_NAME } from "@/constants/app";

export default function AppName() {
  return (
    <h1
      className="animate-fade-in-up"
      style={{
        fontSize: "32px",
        fontWeight: 800,
        letterSpacing: "-0.5px",
        background: "linear-gradient(135deg, #c4b5fd 0%, #818cf8 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        textAlign: "center",
      }}
    >
      {APP_NAME}
    </h1>
  );
}
