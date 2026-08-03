type PageProps = {
  children: React.ReactNode;
};

export default function Page({ children }: PageProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8FAFC",
      }}
    >
      {children}
    </div>
  );
}
