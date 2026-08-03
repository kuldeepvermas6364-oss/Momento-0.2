type PageTitleProps = {
  title: string;
};

export default function PageTitle({
  title,
}: PageTitleProps) {
  return (
    <h1
      style={{
        fontSize: "28px",
        fontWeight: "700",
        color: "#111827",
      }}
    >
      {title}
    </h1>
  );
}
