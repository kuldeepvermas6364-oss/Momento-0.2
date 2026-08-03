import MainLayout from "@/components/layout/MainLayout";
import HomeHeader from "@/components/home/HomeHeader";
import HomeWelcome from "@/components/home/HomeWelcome";
import CreatePostCard from "@/components/home/CreatePostCard";
import EmptyFeed from "@/components/home/EmptyFeed";

export default function HomePage() {
  return (
    <MainLayout>
      <HomeHeader />

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "24px",
        }}
      >
        <HomeWelcome />
        <CreatePostCard />
        <EmptyFeed />
      </div>
    </MainLayout>
  );
}
