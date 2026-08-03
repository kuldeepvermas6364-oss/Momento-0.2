import Link from "next/link";

type NavItemProps = {
  href: string;
  icon: string;
  label: string;
};

export default function NavItem({
  href,
  icon,
  label,
}: NavItemProps) {
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        color: "#111827",
        fontWeight: 500,
      }}
    >
      {icon}
      <br />
      <small>{label}</small>
    </Link>
  );
}
