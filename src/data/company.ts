export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const company = {
  name: "Praszo",
  platform: "Praszo OS",
  legalNote: "Praszo is a product of Difinity Digital LLP.",
  tagline: "Precision for Audit",
  footerTagline: "Practice Management Platform for Tax & Audit Firms",
  description:
    "Praszo is a set of audit-focused practice management tools offering secure on-premise deployment, AI-powered workflows, and full control over your data.",
  siteUrl,
  phone: { display: "+971 56 163 5769", href: "tel:+971561635769" },
  emails: {
    demo: "pms@praszo.com",
    support: "support@praszo.com",
  },
  address: {
    name: "Praszo",
    lines: ["1353, 13th Floor, Bur Juman Business Tower", "Al Mankool, Dubai, UAE"],
    locality: "Dubai",
    country: "AE",
  },
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/107859065", icon: "linkedin" },
    {
      label: "Facebook",
      href: "https://www.facebook.com/people/Praszo-OS/pfbid02Sg7xSCLcuvs1voocuzMTojiFr4E8icYNKnRRLfQj9uXXLc3yTzWE894HUPScHM1ql/",
      icon: "facebook",
    },
    { label: "YouTube", href: "https://www.youtube.com/@PraszoOS", icon: "youtube" },
  ],
  external: {
    website: "https://praszo.com/",
    about: "https://praszo.com/about-us/",
    whyPraszo: "https://praszo.com/why-praszo/",
    largeFirms: "https://praszo.com/large-firms/",
    midSizedFirms: "https://praszo.com/mid-sized-business/",
    insights: "https://praszo.com/insights-resources/",
    privacy: "https://praszo.com/privacy-policy/",
  },
} as const;

export const demoCta = { label: "Book a demo", href: "/contact" } as const;

export const demoMailto = `mailto:${company.emails.demo}?subject=${encodeURIComponent(
  "Book a Praszo demo",
)}&body=${encodeURIComponent(
  "Hello Praszo team,\n\nI would like to book a demo.\n\nFirm:\nRole:\nProducts of interest:\nPreferred time:\n",
)}`;

export type NavLink = { label: string; href: string };

/** Primary header navigation (Products is rendered as a menu, not a link). */
export const primaryNav: NavLink[] = [
  { label: "Why Praszo", href: "/#why-praszo" },
  { label: "Workflow", href: "/#workflow" },
  { label: "Contact", href: "/contact" },
];

export const companyLinks: (NavLink & { external?: boolean })[] = [
  { label: "Why Praszo", href: "/#why-praszo" },
  { label: "Contact", href: "/contact" },
  { label: "About Praszo", href: company.external.about, external: true },
  { label: "Larger audit firms", href: company.external.largeFirms, external: true },
  { label: "Mid-sized audit firms", href: company.external.midSizedFirms, external: true },
  { label: "Insights", href: company.external.insights, external: true },
];

/** Every indexable route. Feeds the sitemap and internal link checks. */
export const routes = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/practice", priority: 0.9, changeFrequency: "monthly" },
  { path: "/verifi", priority: 0.9, changeFrequency: "monthly" },
  { path: "/match", priority: 0.9, changeFrequency: "monthly" },
  { path: "/modifi", priority: 0.9, changeFrequency: "monthly" },
  { path: "/docs", priority: 0.9, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
] as const;

/** Fixed so the sitemap stays statically prerenderable (no Date.now()). */
export const contentLastModified = "2026-10-14";
