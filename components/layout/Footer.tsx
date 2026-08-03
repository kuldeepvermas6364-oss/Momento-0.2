import { APP_NAME } from "@/constants/app";

export default function Footer() {
  return (
    <footer
      style={{
        padding: "20px",
        textAlign: "center",
        borderTop: "1px solid #E5E7EB",
        color: "#6B7280",
        fontSize: "14px"
      }}
    >
      © 2026 {APP_NAME}. All rights reserved.
    </footer>
  );
}
