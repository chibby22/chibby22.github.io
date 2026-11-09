import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://kynected.co.uk/", changeFrequency: "monthly", priority: 1 },
    {
      url: "https://kynected.co.uk/creator-partnerships",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://kynected.co.uk/home-lifestyle",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://kynected.co.uk/about",
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: "https://kynected.co.uk/contact",
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
