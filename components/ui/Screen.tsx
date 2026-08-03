import { theme } from "@/lib/theme";

type ScreenProps = {
  children: React.ReactNode;
};

export default function Screen({ children }: ScreenProps) {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: theme.colors.background
      }}
    >
      {children}
    </div>
  );
}
