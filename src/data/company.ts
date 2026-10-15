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
} as const;

export const demoCta = { label: "Book a demo", href: "/contact" } as const;

export const demoMailto = `mailto:${company.emails.demo}?subject=${encodeURIComponent(
  "Book a Praszo demo",
)}&body=${encodeURIComponent(
  "Hello Praszo team,\n\nI would like to book a demo.\n\nFirm:\nRole:\nProducts of interest:\nPreferred time:\n",
)}`;

export type NavLink = { label: string; href: string };

/** Footer company column. Every link is an internal page. */
export const companyLinks: NavLink[] = [
  { label: "About Praszo", href: "/about" },
  { label: "Why Praszo", href: "/why-praszo" },
  { label: "Larger audit firms", href: "/large-firms" },
  { label: "Mid-sized audit firms", href: "/mid-sized-firms" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const legalLinks: NavLink[] = [{ label: "Privacy Policy", href: "/privacy-policy" }];

/** Every indexable route. Feeds the sitemap and internal link checks. */
export const routes = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/practice", priority: 0.9, changeFrequency: "monthly" },
  { path: "/verifi", priority: 0.9, changeFrequency: "monthly" },
  { path: "/match", priority: 0.9, changeFrequency: "monthly" },
  { path: "/modifi", priority: 0.9, changeFrequency: "monthly" },
  { path: "/docs", priority: 0.9, changeFrequency: "monthly" },
  { path: "/why-praszo", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "yearly" },
  { path: "/large-firms", priority: 0.8, changeFrequency: "monthly" },
  { path: "/mid-sized-firms", priority: 0.8, changeFrequency: "monthly" },
  { path: "/insights", priority: 0.5, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
] as const;

/** Fixed so the sitemap stays statically prerenderable (no Date.now()). */
export const contentLastModified = "2026-10-14";
