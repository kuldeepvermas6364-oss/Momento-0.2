import { APP_NAME } from "@/constants/app";

type HeaderProps = {
  title?: string;
};

export default function Header({ title = APP_NAME }: HeaderProps) {
  return (
    <header
      style={{
        width: "100%",
        padding: "16px 20px",
        borderBottom: "1px solid #E5E7EB",
        background: "#FFFFFF"
      }}
    >
      <h2
        style={{
          margin: 0,
          color: "#6366F1",
          fontWeight: 700
        }}
      >
        {title}
      </h2>
    </header>
  );
}
