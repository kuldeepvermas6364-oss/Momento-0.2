type TextProps = {
  children: React.ReactNode;
};

export default function Text({ children }: TextProps) {
  return (
    <p
      style={{
        color: "#111827",
        fontSize: "16px",
        lineHeight: 1.6
      }}
    >
      {children}
    </p>
  );
}
