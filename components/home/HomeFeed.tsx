import PostCard from "./PostCard";
import type { Post } from "@/types/post";

const samplePosts: Post[] = [
  {
    id: "1",
    author: {
      id: "u1",
      username: "momento",
      name: "Momento",
      avatar: "",
      verified: true
    },
    caption: "🎉 Welcome to Momento! Your social journey starts here.",
    likes: 0,
    comments: 0,
    createdAt: "2026-08-03T10:00:00Z"
  },
  {
    id: "2",
    author: {
      id: "u2",
      username: "kuldeep",
      name: "Kuldeep Verma",
      avatar: "",
      verified: false
    },
    caption: "🚀 Building Momento from scratch with Next.js.",
    likes: 0,
    comments: 0,
    createdAt: "2026-08-03T09:00:00Z"
  },
  {
    id: "3",
    author: {
      id: "u3",
      username: "ai",
      name: "AI Bot",
      avatar: "",
      verified: true
    },
    caption: "🤖 AI-powered social platform is coming soon.",
    likes: 0,
    comments: 0,
    createdAt: "2026-08-03T08:00:00Z"
  }
];

export default function HomeFeed() {
  return (
    <section style={{ padding: "24px" }}>
      {samplePosts.map((post) => (
        <PostCard
          key={post.id}
          username={post.author.username}
          caption={post.caption}
          createdAt={new Date(post.createdAt)}
        />
      ))}
    </section>
  );
}
