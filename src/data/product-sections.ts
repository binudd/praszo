import type { ProductSlug } from "@/data/products";

export type ProductSection = { id: string; label: string };

/** In-page navigation for each product landing page; ids match the rendered sections. */
export const productSections: Record<ProductSlug, ProductSection[]> = {
  practice: [
    { id: "practice-overview", label: "Overview" },
    { id: "practice-features", label: "Features" },
    { id: "practice-mobile", label: "Mobile" },
    { id: "practice-scale", label: "Scale" },
    { id: "practice-audience", label: "Who it's for" },
    { id: "practice-faq", label: "FAQ" },
  ],
  verifi: [
    { id: "verifi-overview", label: "Overview" },
    { id: "verifi-spotlights", label: "In detail" },
    { id: "verifi-features", label: "Features" },
    { id: "verifi-workflow", label: "How it works" },
    { id: "verifi-faq", label: "FAQ" },
  ],
  match: [
    { id: "match-overview", label: "Overview" },
    { id: "match-spotlights", label: "In detail" },
    { id: "match-features", label: "Features" },
    { id: "match-workflow", label: "How it works" },
    { id: "match-faq", label: "FAQ" },
  ],
  docs: [
    { id: "docs-overview", label: "Overview" },
    { id: "docs-features", label: "Features" },
    { id: "docs-workflow", label: "How it works" },
    { id: "docs-audience", label: "Who it's for" },
    { id: "docs-faq", label: "FAQ" },
  ],
};
