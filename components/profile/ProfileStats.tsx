export default function ProfileStats() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        marginTop: "20px",
        padding: "16px",
        background: "#FFFFFF",
        borderRadius: "16px",
        border: "1px solid #E5E7EB",
      }}
    >
      <div>
        <strong>0</strong>
        <p>Posts</p>
      </div>

      <div>
        <strong>0</strong>
        <p>Followers</p>
      </div>

      <div>
        <strong>0</strong>
        <p>Following</p>
      </div>
    </div>
  );
}
