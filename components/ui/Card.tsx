type CardProps = {
  children: React.ReactNode;
};

export default function Card({ children }: CardProps) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: "16px",
        padding: "16px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
      }}
    >
      {children}
    </div>
  );
}
