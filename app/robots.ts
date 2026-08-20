import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: ["Googlebot", "Googlebot-Image", "Google-InspectionTool", "Bingbot", "DuckDuckBot"], allow: "/" },
      { userAgent: ["GPTBot", "CCBot", "anthropic-ai", "Claude-Web", "Omgilibot", "Bytespider"], disallow: "/" },
      { userAgent: "*", allow: "/" }
    ],
    sitemap: "https://kynected.co.uk/sitemap.xml"
  };
}
