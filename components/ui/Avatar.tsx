type AvatarProps = {
  src?: string;
  size?: number;
};

export default function Avatar({
  src,
  size = 48,
}: AvatarProps) {
  return (
    <img
      src={src || "https://placehold.co/100x100"}
      alt="Avatar"
      width={size}
      height={size}
      style={{
        borderRadius: "50%",
        objectFit: "cover",
      }}
    />
  );
}
