import { APP_NAME } from "@/constants/app";

export default function Logo() {
  return (
    <h1
      style={{
        fontSize: "32px",
        fontWeight: "bold",
        color: "#6366F1"
      }}
    >
      {APP_NAME}
    </h1>
  );
}
