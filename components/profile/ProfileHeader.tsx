import ProfileStats from "./ProfileStats";

export default function ProfileHeader() {
  return (
    <>
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E5E7EB",
          borderRadius: "16px",
          padding: "24px",
        }}
      >
        <h2>Kuldeep Verma</h2>

        <p>@kuldeep</p>

        <ProfileStats />
      </div>
    </>
  );
}
