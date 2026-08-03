import MainLayout from "@/components/layout/MainLayout";
import HomeHeader from "@/components/home/HomeHeader";
import HomeWelcome from "@/components/home/HomeWelcome";
import CreatePostCard from "@/components/home/CreatePostCard";
import HomeFeed from "@/components/home/HomeFeed";

export default function HomePage() {
  return (
    <MainLayout>
      <HomeHeader />

      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <HomeWelcome />
        <CreatePostCard />
        <HomeFeed />
      </div>
    </MainLayout>
  );
}
