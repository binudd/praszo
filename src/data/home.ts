import buchprufer from "@/assets/clients/buchprufer.png";
import carvy from "@/assets/clients/carvy-consultants.png";
import hlbHamt from "@/assets/clients/hlb-hamt.png";
import jumeira from "@/assets/clients/jumeira-consultants.png";
import nex from "@/assets/clients/nex-consultants.png";
import precisionAi from "@/assets/clients/precision-ai-solutions.png";
// "Who it is for" photos, free under the Unsplash License (https://unsplash.com/license):
// larger firms: Christel F., https://unsplash.com/photos/mXPcajHbD-M (La Défense, Paris)
// mid-sized firms: https://images.unsplash.com/photo-1522071820081-009f0129c71c (Unsplash free library; photographer not yet confirmed)
import largerFirmsPhoto from "@/assets/segments/larger-firms.jpg";
import midSizedFirmsPhoto from "@/assets/segments/mid-sized-firms.jpg";
import type { IconName } from "@/lib/icons";

export const home = {
  meta: {
    title: "Praszo | Secure Practice Management Tools for Audit Firms",
    description:
      "Praszo is a set of audit-focused practice management tools offering secure on-premise deployment, AI-powered workflows, and full control over your data.",
  },
  hero: {
    eyebrow: "Precision for Audit",
    headline: ["Simplify your practice management.", "Run it on Praszo."],
    description:
      "On-premise practice management tools built for audit firms. Designed for firms that cannot risk data exposure.",
    primaryCta: { label: "Book a demo", href: "/contact" },
    secondaryCta: { label: "Explore the products", href: "#products" },
  },
  /** Scroll-revealed statement after the logos ("Precision for Audit"). */
  statement: {
    eyebrow: "Precision for Audit",
    text: "On-premise practice management tools built for audit firms. Designed for firms that cannot risk data exposure.",
    highlights: ["cannot risk data exposure"],
    chips: ["Secure on-premise deployment", "AI-powered workflows", "Full control over your data"],
  },
  trustedBy: {
    title: "Trusted by audit firms worldwide",
    logos: [
      { name: "HLB HAMT", src: hlbHamt },
      { name: "NEX Consultants", src: nex },
      { name: "Buchprufer", src: buchprufer },
      { name: "Carvy Consultants", src: carvy },
      { name: "Jumeira Consultants", src: jumeira },
      { name: "Precision AI Solutions", src: precisionAi },
    ],
  },
  pillars: {
    eyebrow: "Audit infrastructure",
    title: "Praszo OS. One platform. Total audit process control.",
    description:
      "Standardize complex workflows into seamless, digital ecosystems. Eliminate manual friction and achieve total visibility across every audit stage.",
    items: [
      {
        title: "Unified audit platform",
        body: "Praszo unifies all core audit workflows into a single, tightly governed ecosystem.",
        icon: "Layers" satisfies IconName,
      },
      {
        title: "Simplified audit processes",
        body: "Praszo streamlines audit workflows by eliminating fragmented manual processes.",
        icon: "Workflow" satisfies IconName,
      },
      {
        title: "Secure, controlled, and compliant",
        body: "Praszo ensures data stays in-house with complete, traceable control.",
        icon: "ShieldCheck" satisfies IconName,
      },
    ],
  },
  ecosystem: {
    eyebrow: "Our products",
    title: "Four specialized engines",
    description:
      "Each Praszo product can be used on its own. Together, they form a complete operating cycle for audit firms.",
  },
  workflow: {
    eyebrow: "The complete audit firm workflow",
    title: "From client raw data to a validated audit file",
    description: "Unified compliance and operational intelligence for high-performance firms.",
    start: {
      label: "Client raw data",
      body: "TB spreadsheets, legacy ledgers, missing evidence, and messy VLOOKUPs.",
      badge: "Manual and high risk",
    },
  },
  segments: {
    eyebrow: "Who it is for",
    title: "Built for firms that cannot risk data exposure",
    items: [
      {
        title: "Larger audit firms",
        subtitle: "Enterprise control. Absolute data security. Scalable governance.",
        body: "Large firms rely on multiple systems to handle document control, reconciliation, and financial validation. Praszo replaces fragmentation with one connected operating cycle.",
        points: [
          "Operational discipline through structured workflows and real-time oversight",
          "Revenue assurance by linking time tracking directly to tasks and budgets",
          "Real-time leadership visibility into project health, budgets, utilization, and profitability",
          "Built-in compliance: every action, approval, and document change is logged and traceable",
          "Absolute data control with on-premise deployment",
        ],
        href: "/large-firms",
        icon: "Building" satisfies IconName,
        /** Photo shown in the "Who it is for" section. */
        image: {
          src: largerFirmsPhoto,
          alt: "Glass facades of high-rise office towers reflecting one another in a business district",
        },
      },
      {
        title: "Mid-sized audit firms",
        subtitle: "Outgrow the chaos. Scale your audit firm with control.",
        body: "As mid-sized audit firms grow, complexity increases: more engagements, more staff, tighter deadlines, and greater compliance pressure. What once worked on spreadsheets, emails, and scattered tools begins to break down.",
        points: [
          "Standardized project templates and recurring engagement automation",
          "Budget vs actual monitoring with proactive alerts",
          "Workload and capacity planning",
          "Structured timesheet enforcement and realization tracking",
          "Role-based access and audit trails that keep the firm inspection-ready",
        ],
        href: "/mid-sized-firms",
        icon: "TrendingUp" satisfies IconName,
        image: {
          src: midSizedFirmsPhoto,
          alt: "A small team working on laptops around a shared table in an office",
        },
      },
    ],
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: "Trusted by teams like yours",
    items: [
      {
        quote:
          "Our workflows are now structured, consistent, and fully traceable across teams, reducing review delays and improving audit readiness.",
        name: "John Varghese",
        role: "Managing Partner",
      },
      {
        quote:
          "Praszo centralizes tasks, documents, and billing, giving us better control over deadlines, productivity, and profitability.",
        name: "Sojen Manjila",
        role: "Managing Partner",
      },
      {
        quote:
          "With controlled approvals and complete audit trails, we approach regulatory reviews with confidence and clarity.",
        name: "Venugopal P.T",
        role: "CEO",
      },
      {
        quote:
          "As we grew, the platform standardized our processes without adding complexity, keeping our teams aligned and efficient.",
        name: "Jay Krishnan",
        role: "Managing Partner",
      },
    ],
  },
  faq: {
    eyebrow: "FAQs",
    title: "Frequently asked questions",
    description:
      "We know choosing the right software can raise a lot of questions. That's why we've put together answers to the most common ones.",
    items: [
      {
        q: "Who is Praszo built for?",
        a: "Praszo is a set of auditing practice management tools designed exclusively for audit firms that require strong compliance, data security, and operational control.",
      },
      {
        q: "What are the four products in Praszo OS?",
        a: "Praszo OS includes Praszo Practice, Praszo Verifi, Praszo Match, and Praszo Docs, each designed to support a critical stage of the audit lifecycle.",
      },
      {
        q: "Can Praszo be deployed on-premise?",
        a: "Yes. The audit workflow automation tools in the suite support on-premise deployment, ensuring complete data ownership, confidentiality, and compliance with internal IT policies.",
      },
      {
        q: "How are multiple audit functions unified in Praszo OS?",
        a: "Each product supports a specific audit workflow and can also be used independently. Praszo OS connects these workflows through a suite of auditing tools designed to streamline and support the entire audit process.",
      },
    ],
  },
  cta: {
    title: "Run your firm with clarity",
    subtitle: "Get started with Praszo in minutes",
    body: "Ready to streamline workflows, approvals, and document control? Praszo brings structure, visibility, and precision to every engagement without disrupting how your team works.",
    bullets: ["Seamless integration", "Data-driven insights"],
  },
} as const;
