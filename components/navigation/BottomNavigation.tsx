import NavItem from "./NavItem";
import { Routes } from "@/constants/routes";

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
        borderTop: "1px solid #E5E7EB"
      }}
    >
      <NavItem href={Routes.HOME} icon="🏠" label="Home" />
      <NavItem href={Routes.REELS} icon="🎬" label="Reels" />
      <NavItem href={Routes.CHAT} icon="💬" label="Chat" />
      <NavItem href={Routes.PROFILE} icon="👤" label="Profile" />
    </nav>
  );
}
