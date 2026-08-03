type PageSubtitleProps = {
  text: string;
};

export default function PageSubtitle({
  text,
}: PageSubtitleProps) {
  return (
    <p
      style={{
        marginTop: "8px",
        color: "#6B7280",
        fontSize: "15px",
      }}
    >
      {text}
    </p>
  );
}
