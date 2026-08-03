type AuthHeaderProps = {
  title: string;
  subtitle: string;
};

export default function AuthHeader({
  title,
  subtitle,
}: AuthHeaderProps) {
  return (
    <>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </>
  );
}
