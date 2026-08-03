import MainLayout from "@/components/layout/MainLayout";

export default function ChatPage() {
  return (
    <MainLayout>
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: "24px",
        }}
      >
        <h1>Chats</h1>

        <p>Your conversations will appear here.</p>
      </div>
    </MainLayout>
  );
}
