import MainLayout from "@/components/layout/MainLayout";
import ProfileHeader from "@/components/profile/ProfileHeader";

export default function ProfilePage() {
  return (
    <MainLayout>
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: "24px",
        }}
      >
        <ProfileHeader />

        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: "16px",
            padding: "20px",
          }}
        >
          <h3>Posts</h3>

          <p>No posts yet.</p>
        </div>
      </div>
    </MainLayout>
  );
}
