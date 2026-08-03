import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/login", "/signup", "/forgot-password", "/chat"]
      }
    ],
    sitemap: "https://momento.vercel.app/sitemap.xml"
  };
}
