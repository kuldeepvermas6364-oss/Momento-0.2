type AuthCardProps = {
  children: React.ReactNode;
};

export default function AuthCard({
  children,
}: AuthCardProps) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "420px",
        padding: "24px",
        borderRadius: "20px",
        background: "#FFFFFF",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      }}
    >
      {children}
    </div>
  );
}
