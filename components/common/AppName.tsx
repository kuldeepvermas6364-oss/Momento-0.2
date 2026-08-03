import { APP_NAME } from "@/constants/app";

export default function AppName() {
  return (
    <h1
      style={{
        color: "#6366F1",
        fontSize: "34px",
        fontWeight: "bold"
      }}
    >
      {APP_NAME}
    </h1>
  );
}
