import type { PageHeroContent, PageMeta } from "@/data/pages/types";

/**
 * Insights hub, from praszo.com/insights-resources/.
 * The posts listed there are blog-theme placeholders (generic "SaaS analytics" titles, July 2024–2025
 * dates, no audit content), the same template residue as the pricing tables, so none are carried
 * over. Add real articles to `articles`; the page lists them as soon as the array is non-empty.
 */

export type Article = {
  title: string;
  summary: string;
  /** ISO date, e.g. "2026-11-02". Rendered, never computed, so the page stays static. */
  date: string;
  category: string;
  /** Where the full article lives (an internal route or an external URL). */
  href: string;
};

export const insights = {
  path: "/insights",
  meta: {
    title: "Insights on Audit Workflow Automation & Practice Management | Praszo",
    description:
      "Praszo insights on project management, compliance workflows, and productivity tools for audit firms.",
  } satisfies PageMeta,
  hero: {
    eyebrow: "Insights and resources",
    title: "Insights on workflow automation and practice management.",
    description: "Praszo insights on project management, compliance workflows, and productivity tools.",
    size: "md",
  } satisfies PageHeroContent,
  articles: [] as Article[],
} as const;
