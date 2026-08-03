import Link from "next/link";

export default function BottomNavigation() {
  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "64px",
        background: "#FFFFFF",
        borderTop: "1px solid #E5E7EB",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <Link href="/">🏠 Home</Link>

      <Link href="/reels">🎬 Reels</Link>

      <Link href="/chat">💬 Chat</Link>

      <Link href="/profile">👤 Profile</Link>
    </nav>
  );
}
