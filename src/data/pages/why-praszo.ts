import type { FeatureItem, PageHeroContent, PageMeta } from "@/data/pages/types";
import type { IconName } from "@/lib/icons";

/**
 * Why Praszo page, from praszo.com/why-praszo/. The page also reuses the shared homepage blocks in
 * data/home.ts (pillars, statement, segments, FAQ, closing CTA). Left out: the "100% Compliance" label.
 */
export const whyPraszo = {
  path: "/why-praszo",
  meta: {
    title: "Why Praszo | Audit Automation Tools Built for Audit Firms",
    description:
      "Looking for reliable audit automation tools? Learn why Praszo helps audit firms simplify processes, save time, and enhance productivity with smart automation.",
  } satisfies PageMeta,
  hero: {
    eyebrow: "Why Praszo",
    title: "Because audit firms deserve better practice management",
    description:
      "Audit work demands precision, accountability, and confidentiality. Praszo OS is a suite of audit automation tools built to replace your scattered systems.",
  } satisfies PageHeroContent,
  different: {
    eyebrow: "What makes Praszo different",
    title: "What makes Praszo different?",
    description:
      "Designed specifically for the unique needs of professional firms. We’ve replaced chaos with consistency.",
    highlights: ["replaced chaos with consistency"],
    items: [
      {
        title: "One system to run your practice",
        body: "Projects, people, performance, and profitability are managed in one unified operating system, giving your firm clear and real-time visibility.",
        icon: "LayoutDashboard" satisfies IconName,
      },
      {
        title: "Data security at the core",
        body: "On-premise deployment and role-based access control give you complete control over client data. Confidentiality and security are built into the system.",
        icon: "Lock" satisfies IconName,
      },
      {
        title: "Built around audit reality",
        body: "Praszo aligns with audit realities, bringing recurring engagements, review cycles, and compliance requirements together in a single, seamless workflow.",
        icon: "Repeat" satisfies IconName,
      },
      {
        title: "Compliance without headaches",
        body: "Audit trails, time logs, approvals, and review histories are built in by default. Your firm stays inspection-ready at all times, without manual tracking or last-minute scrambling.",
        icon: "ClipboardCheck" satisfies IconName,
      },
      {
        title: "Smarter audit work",
        body: "AI-powered verification and matching free auditors from repetitive checks, allowing them to focus on high-value analysis.",
        icon: "BrainCircuit" satisfies IconName,
      },
      {
        title: "Scalable growth",
        body: "Maintain absolute sovereignty over sensitive information across high-risk, high-volume engagements, and grow engagement capacity without multiplying headcount.",
        icon: "TrendingUp" satisfies IconName,
      },
    ] satisfies { title: string; body: string; icon: IconName }[],
  },
  impact: {
    eyebrow: "What stands out",
    title: "From chaos to clarity: the Praszo impact",
    description:
      "Praszo, being a collection of audit automation tools, transforms fragmented audit operations into a structured, intelligent system. It reduces auditor dependency, strengthens documentation consistency, and optimizes team utilization, thereby accelerating reporting cycles and empowering leadership with real-time insights for confident, data-driven decision-making.",
    items: [
      {
        title: "Faster closures",
        body: "Month-end and year-end closures completed with unprecedented speed.",
        icon: "CalendarClock",
      },
      { title: "Less dependency", body: "Self-reliance in your day-to-day audit operations.", icon: "UsersRound" },
      {
        title: "Better audit outcomes",
        body: "Ensure success backed by consistent, crystal-clear documentation.",
        icon: "BadgeCheck",
      },
      { title: "Staff utilization", body: "Maximize output while eliminating team burnout.", icon: "Gauge" },
    ] satisfies FeatureItem[],
  },
} as const;
