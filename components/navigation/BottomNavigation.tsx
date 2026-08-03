import NavItem from "./NavItem";

export default function BottomNavigation() {
  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-around",
        padding: "12px",
        background: "#FFFFFF",
        borderTop: "1px solid #E5E7EB",
      }}
    >
      <NavItem href="/" icon="🏠" label="Home" />
      <NavItem href="/reels" icon="🎬" label="Reels" />
      <NavItem href="/chat" icon="💬" label="Chat" />
      <NavItem href="/profile" icon="👤" label="Profile" />
    </nav>
  );
}
