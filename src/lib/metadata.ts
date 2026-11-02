import type { Metadata } from "next";

type RouteMeta = {
  title: string;
  description: string;
  path: string;
};

/**
 * Builds a complete per-route Metadata object.
 * Next.js merges metadata shallowly, so each route must define its own
 * openGraph/twitter blocks rather than relying on the root layout.
 * Open Graph images come from the `opengraph-image.tsx` file conventions.
 */
export function buildMetadata({ title, description, path }: RouteMeta): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "Praszo",
      url: path,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
