import { Colors } from "@/constants/colors";

export default function ProfileStats() {
  const stats = [
    { label: "Posts", value: 0 },
    { label: "Followers", value: 0 },
    { label: "Following", value: 0 }
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        marginTop: "20px",
        padding: "16px",
        background: Colors.background,
        borderRadius: "16px",
        border: `1px solid ${Colors.border}`
      }}
    >
      {stats.map((stat) => (
        <div key={stat.label} style={{ textAlign: "center" }}>
          <strong>{stat.value}</strong>
          <p>{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
