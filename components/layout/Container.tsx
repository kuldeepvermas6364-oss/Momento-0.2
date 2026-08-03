type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({
  children,
}: ContainerProps) {
  return (
    <main
      style={{
        maxWidth: "480px",
        margin: "0 auto",
        minHeight: "100vh",
        padding: "16px",
      }}
    >
      {children}
    </main>
  );
}
