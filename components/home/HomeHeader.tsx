import { APP_NAME } from "@/constants/app";

export default function HomeHeader() {
  return (
    <header
      style={{
        padding: "20px",
        background: "#FFFFFF",
        borderBottom: "1px solid #E5E7EB"
      }}
    >
      <h2>{APP_NAME}</h2>
    </header>
  );
}
