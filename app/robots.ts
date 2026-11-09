import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "Googlebot", allow: "/", disallow: "/api/" },
      { userAgent: "Googlebot-Image", allow: "/", disallow: "/api/" },
      { userAgent: "Bingbot", allow: "/", disallow: "/api/" },
      { userAgent: "OAI-SearchBot", allow: "/", disallow: "/api/" },
      {
        userAgent: ["GPTBot", "CCBot", "anthropic-ai", "Claude-Web", "Omgilibot", "Bytespider"],
        disallow: "/",
      },
      { userAgent: "*", allow: "/", disallow: "/api/" },
    ],
    sitemap: "https://kynected.co.uk/sitemap.xml",
  };
}
