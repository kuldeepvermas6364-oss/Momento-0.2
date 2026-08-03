import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://momento.vercel.app",
      priority: 1,
    },
  ];
}
