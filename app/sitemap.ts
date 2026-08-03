import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://momento.vercel.app",
      priority: 1,
      changeFrequency: "daily"
    },
    {
      url: "https://momento.vercel.app/reels",
      priority: 0.8,
      changeFrequency: "daily"
    },
    {
      url: "https://momento.vercel.app/chat",
      priority: 0.6,
      changeFrequency: "weekly"
    },
    {
      url: "https://momento.vercel.app/profile",
      priority: 0.6,
      changeFrequency: "weekly"
    }
  ];
}
