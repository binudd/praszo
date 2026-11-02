import type { ProductSlug } from "@/data/products";

/**
 * Single source for the site navigation (global header menus, mobile menu). Routes are the existing
 * ones; nothing here creates pages. Product names, glyphs and taglines come from data/products.ts.
 */

export type NavItem = { label: string; href: string; description?: string };

/** Products grouped by what they do (Products mega menu and mobile accordion). */
export const productGroups: { title: string; slugs: ProductSlug[] }[] = [
  { title: "Manage", slugs: ["practice"] },
  { title: "Prepare", slugs: ["docs"] },
  { title: "AI audit checks", slugs: ["match", "verifi"] },
];

/** Footer links of the Products menu (existing homepage anchors). */
export const productMenuLinks: NavItem[] = [
  { label: "Praszo OS overview", href: "/", description: "One platform for the whole audit cycle." },
  { label: "See the workflow", href: "/#workflow", description: "How the four products connect, step by step." },
  { label: "All products", href: "/#products", description: "Four specialized engines, side by side." },
];

export const solutionLinks: NavItem[] = [
  {
    label: "Larger audit firms",
    href: "/large-firms",
    description: "Enterprise control, absolute data security, scalable governance.",
  },
  {
    label: "Mid-sized audit firms",
    href: "/mid-sized-firms",
    description: "Outgrow the chaos and scale your audit firm with control.",
  },
];

export const resourceLinks: NavItem[] = [
  { label: "Insights", href: "/insights", description: "Workflow automation and practice management." },
  { label: "About Praszo", href: "/about", description: "Our mission, team and values." },
];

/** Global links shown beside the menus. */
export const globalLinks: NavItem[] = [
  { label: "Why Praszo", href: "/why-praszo" },
  { label: "Contact", href: "/contact" },
];

/** True when `pathname` is one of `items` (used for the menus' current state). */
export function isCurrent(pathname: string, items: ReadonlyArray<NavItem>) {
  return items.some((item) => !item.href.includes("#") && item.href !== "/" && pathname === item.href);
}
