import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ["/", 1],
    ["/creator-partnerships", 0.95],
    ["/home-lifestyle", 0.85],
    ["/about", 0.6],
    ["/contact", 0.8],
  ] as const;

  return routes.map(([route, priority]) => ({
    url: `https://kynected.co.uk${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority,
  }));
}
