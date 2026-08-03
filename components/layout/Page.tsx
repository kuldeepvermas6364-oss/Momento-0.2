import { theme } from "@/lib/theme";

type PageProps = {
  children: React.ReactNode;
};

export default function Page({ children }: PageProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.colors.background
      }}
    >
      {children}
    </div>
  );
}
