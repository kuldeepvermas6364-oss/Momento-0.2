import PostCard from "./PostCard";

export default function HomeFeed() {
  return (
    <section
      style={{
        padding: "24px",
      }}
    >
      <PostCard
        username="momento"
        caption="🎉 Welcome to Momento! Your social journey starts here."
      />

      <PostCard
        username="kuldeep"
        caption="🚀 Building Momento from scratch with Next.js."
      />

      <PostCard
        username="ai"
        caption="🤖 AI-powered social platform is coming soon."
      />
    </section>
  );
}
