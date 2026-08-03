import { Colors } from "@/constants/colors";

type CardProps = {
  children: React.ReactNode;
};

export default function Card({ children }: CardProps) {
  return (
    <div
      style={{
        background: Colors.background,
        border: `1px solid ${Colors.border}`,
        borderRadius: "16px",
        padding: "16px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
      }}
    >
      {children}
    </div>
  );
}
