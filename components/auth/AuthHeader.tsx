type AuthHeaderProps = {
  title: string;
  subtitle: string;
};

export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <>
      <h1
        style={{
          fontSize: "30px",
          fontWeight: 800,
          letterSpacing: "-0.5px",
          background: "linear-gradient(135deg, #c4b5fd 0%, #a78bfa 50%, #818cf8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          lineHeight: 1.2,
        }}
      >
        {title}
      </h1>
      <p
        style={{
          marginTop: "10px",
          fontSize: "15px",
          color: "rgba(255,255,255,0.55)",
          fontWeight: 400,
        }}
      >
        {subtitle}
      </p>
    </>
  );
}
