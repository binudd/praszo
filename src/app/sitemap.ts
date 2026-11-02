import type { MetadataRoute } from "next";

import { contentLastModified, routes, siteUrl } from "@/data/company";

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route.path === "/" ? "" : route.path}`,
    lastModified: contentLastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
