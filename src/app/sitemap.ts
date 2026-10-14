import type { MetadataRoute } from "next";

import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.siteUrl,
      lastModified: "2026-10-09",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.siteUrl}/story`,
      lastModified: "2026-10-09",
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
