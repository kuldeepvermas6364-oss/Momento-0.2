import MainLayout from "@/components/layout/MainLayout";
import HomeHeader from "@/components/home/HomeHeader";
import StoriesBar from "@/components/home/StoriesBar";
import CreatePostCard from "@/components/home/CreatePostCard";
import HomeFeed from "@/components/home/HomeFeed";

export default function HomePage() {
  return (
    <MainLayout>
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <HomeHeader />
        <StoriesBar />
        <CreatePostCard />
        <HomeFeed />
      </div>
    </MainLayout>
  );
}
