import largerFirmsPhoto from "@/assets/segments/larger-firms.jpg";
import midSizedFirmsPhoto from "@/assets/segments/mid-sized-firms.jpg";
import type { ProductSlug } from "@/data/products";
import type { ClosingCta, FeatureItem, PageHeroContent, PageImage, PageMeta } from "@/data/pages/types";

/**
 * Solution pages by firm size, from praszo.com/large-firms/ and praszo.com/mid-sized-business/.
 * Each entry renders through SolutionPage; adding a segment is one entry here plus a three-line
 * route file. The "Join 500+ partners" claim is left out like the other numeric claims.
 */

export type Solution = {
  slug: "large-firms" | "mid-sized-firms";
  /** Footer and cross-link label. */
  label: string;
  path: string;
  meta: PageMeta;
  hero: PageHeroContent & { image: PageImage };
  intro?: string;
  features: { eyebrow: string; title: string; description?: string; items: FeatureItem[] };
  products: { title: string; slugs: ProductSlug[] };
  cta: ClosingCta;
};

const bullets = ["Seamless integration", "Data-driven insights"] as const;

export const solutions: Solution[] = [
  {
    slug: "large-firms",
    label: "Larger audit firms",
    path: "/large-firms",
    meta: {
      title: "Praszo OS for Larger Audit Firms | Enterprise Audit Control",
      description:
        "Enterprise control, absolute data security, and scalable governance. Praszo supports the complex audit processes of large firms with on-premise, enterprise-grade data security.",
    },
    hero: {
      eyebrow: "Praszo OS for larger audit firms",
      title: "Enterprise control. Absolute data security. Scalable governance.",
      description:
        "Praszo supports the complex audit processes of large firms, while offering enterprise-grade data security.",
      image: {
        src: largerFirmsPhoto,
        alt: "Glass facades of high-rise office towers reflecting one another in a business district",
      },
    },
    features: {
      eyebrow: "Built for scale",
      title: "Everything a large audit firm needs",
      items: [
        {
          title: "A fully integrated audit ecosystem",
          body: "Large firms rely on multiple systems to handle document control, reconciliation, and financial validation. Praszo replaces fragmentation with one connected operating cycle.",
          icon: "Network",
        },
        {
          title: "Operational discipline",
          body: "Complex audit operations require controlled execution. Praszo OS drives efficiency through structured workflows and real-time oversight.",
          icon: "Workflow",
        },
        {
          title: "Revenue assurance",
          body: "By linking time tracking directly to tasks and budgets, Praszo OS eliminates revenue leakage. Every billable effort is captured, monitored, and translated accurately into invoices.",
          icon: "Receipt",
        },
        {
          title: "Real-time leadership visibility",
          body: "Decision-makers gain immediate insight into project health, budget consumption, utilization, and client profitability. Risks are identified early, allowing corrective action before margins erode.",
          icon: "LayoutDashboard",
        },
        {
          title: "Built-in compliance and audit readiness",
          body: "Every action, approval, and document change is logged and traceable. Governance becomes embedded into daily operations, making regulatory reviews structured and defensible.",
          icon: "ClipboardCheck",
        },
        {
          title: "Absolute data control",
          body: "With on-premise deployment, sensitive audit data remains fully under your firm’s infrastructure. Operational efficiency is thus achieved without compromising data security.",
          icon: "Server",
        },
      ],
    },
    products: {
      title: "One connected operating cycle",
      slugs: ["practice", "verifi", "match", "docs"],
    },
    cta: {
      kicker: "Run your firm with clarity",
      title: "Scale your audits without scaling your risk",
      body: "Start a conversation or book a live demo.",
      bullets,
    },
  },
  {
    slug: "mid-sized-firms",
    label: "Mid-sized audit firms",
    path: "/mid-sized-firms",
    meta: {
      title: "Practice Management for Mid-Sized Audit Firms | Praszo",
      description:
        "Outgrow the chaos and scale your audit firm with control. Praszo Practice manages engagements, people, budgets, billing, and approvals for growing mid-sized audit firms.",
    },
    hero: {
      eyebrow: "Practice management for growing mid-sized audit firms",
      title: "Outgrow the chaos. Scale your audit firm with control.",
      description:
        "As mid-sized audit firms grow, complexity increases: more engagements, more staff, tighter deadlines, and greater compliance pressure. What once worked on spreadsheets, emails, and scattered tools begins to break down.",
      image: {
        src: midSizedFirmsPhoto,
        alt: "A small team working on laptops around a shared table in an office",
      },
    },
    intro:
      "Praszo Practice gives growing firms a structured operating layer managing engagements, people, budgets, billing, and approvals in one controlled system. It eliminates lost billable hours, stalled reviews, and budget overruns while keeping every audit inspection ready. It’s not task tracking. It’s practice control designed for firms ready to scale.",
    features: {
      eyebrow: "One platform, zero compromises",
      title: "Features mid-sized audit firms will love",
      items: [
        {
          title: "Executive dashboard control",
          body: "Real-time visibility into realization, utilization, overdue work, approvals, and revenue trends, all from a single command center.",
          icon: "LayoutDashboard",
        },
        {
          title: "Standardized project templates",
          body: "Reusable engagement templates ensure every audit follows a consistent, controlled workflow as your team expands.",
          icon: "FileStack",
        },
        {
          title: "Recurring engagement automation",
          body: "Automatically generate monthly, quarterly, and annual projects without manual setup or follow-ups.",
          icon: "Repeat",
        },
        {
          title: "Budget vs actual monitoring",
          body: "Track project hours against budget in real time and receive proactive alerts before margins are impacted.",
          icon: "Gauge",
        },
        {
          title: "Workload and capacity planning",
          body: "Visualize team availability, prevent over-allocation, and plan hiring based on actual workload forecasts.",
          icon: "UsersRound",
        },
        {
          title: "Structured timesheet enforcement",
          body: "Mandatory time logging, approval workflows, and lock dates ensure no billable hour goes unrecorded.",
          icon: "Clock",
        },
        {
          title: "Client profitability insights",
          body: "Identify which clients and services generate true margins, not just revenue.",
          icon: "ChartPie",
        },
        {
          title: "Realization and revenue tracking",
          body: "Measure billed vs. collected revenue and reduce write-offs with controlled billing workflows.",
          icon: "Banknote",
        },
        {
          title: "Role-based access and audit trails",
          body: "Granular permissions and automatic activity logs keep your firm inspection-ready at all times.",
          icon: "KeyRound",
        },
        {
          title: "Mobile audit management",
          body: "Capture time, update tasks, and approve work instantly even outside the office.",
          icon: "Smartphone",
        },
      ],
    },
    products: { title: "Built on Praszo Practice", slugs: ["practice"] },
    cta: {
      kicker: "Run your firm with clarity",
      title: "Precision is a choice. Run your firm on Praszo Practice.",
      body: "Ready to streamline workflows, approvals, and document control? Praszo brings structure, visibility, and precision to every engagement without disrupting how your team works.",
      bullets,
    },
  },
];

export function getSolution(slug: Solution["slug"]): Solution {
  const solution = solutions.find((item) => item.slug === slug);
  if (!solution) throw new Error(`Unknown solution: ${slug}`);
  return solution;
}
