import type { StaticImageData } from "next/image";

import matchEngine from "@/assets/products/match-engine.png";
import practiceBoard from "@/assets/products/practice-board.png";
import practiceEditProject from "@/assets/products/practice-edit-project.png";
import practiceMyWork from "@/assets/products/practice-my-work.png";
import practiceProject from "@/assets/products/practice-project.png";
import practiceTimesheetWeek from "@/assets/products/practice-timesheet-week.png";
// Verifi desktop application captures (supplied by Praszo, 2026-10-28).
import verifiDashboard from "@/assets/products/verifi-app-dashboard.png";
import verifiEngagements from "@/assets/products/verifi-engagements.png";
import verifiInternalConsistency from "@/assets/products/verifi-internal-consistency.png";
import verifiMathAccuracy from "@/assets/products/verifi-math-accuracy.png";
import verifiPriorYear from "@/assets/products/verifi-prior-year.png";
import verifiSumCheck from "@/assets/products/verifi-sum-check.png";
import verifiSummary from "@/assets/products/verifi-summary.png";
import type { IconName } from "@/lib/icons";

export type ProductSlug = "practice" | "verifi" | "match" | "docs";

/** Hand-built mockups live in components/mockups/registry.tsx. */
export type MockupId = "docs-repository" | "verifi-report" | "match-three-way";

export type Visual =
  | {
      kind: "image";
      src: StaticImageData;
      alt: string;
      /** "browser" wraps the image in window chrome; "none" when the capture already has it. */
      frame?: "browser" | "none";
      /** Visible caption in the screenshot rail: what the screen does for the firm. Falls back to alt. */
      caption?: string;
      /** Card title in the screenshot rail when this is the hero capture (defaults to "Overview"). */
      screenTitle?: string;
    }
  | { kind: "mockup"; id: MockupId; alt: string; caption?: string; screenTitle?: string };

export type FeatureItem = { name: string; description?: string; icon: IconName };

export type FeatureGroup = {
  title: string;
  description?: string;
  icon: IconName;
  items: FeatureItem[];
};

export type FeatureSection = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  groups: FeatureGroup[];
};

/** One capture in the screenshot carousel after the hero. */
export type Screen = { title: string; visual: Visual };

export type Spotlight = {
  id: string;
  eyebrow?: string;
  title: string;
  body: string;
  bullets?: string[];
  visual: Visual;
};

export type Product = {
  slug: ProductSlug;
  name: string;
  fullName: string;
  color: string;
  colorDeep: string;
  category: string;
  tagline: string;
  summary: string;
  workflowStep: { order: number; label: string; body: string };
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    headline: string;
    description: string;
    visual: Visual;
  };
  highlights?: { title: string; body: string; icon: IconName }[];
  problem?: { title: string; body?: string; points: string[] };
  spotlights: Spotlight[];
  /** Extra captures for the screenshot carousel; the hero and spotlight visuals are included automatically. */
  screens?: Screen[];
  featureSections: FeatureSection[];
  comparison?: {
    title: string;
    subtitle: string;
    before: { label: string; items: string[] };
    after: { label: string; items: string[] };
  };
  workflow?: { title: string; description?: string; steps: { title: string; body: string }[] };
  audience?: { title: string; description?: string; items: { title: string; body: string; icon: IconName }[] };
  faq: { q: string; a: string }[];
  cta: { title: string; body: string; bullets?: string[] };
};

export const productOrder: ProductSlug[] = ["practice", "verifi", "match", "docs"];

const sharedCtaBullets = ["Seamless integration", "Data-driven insights"];

const practice: Product = {
  slug: "practice",
  name: "Practice",
  fullName: "Praszo Practice",
  color: "#5539d9",
  colorDeep: "#4a30c4",
  category: "Practice management",
  tagline: "Projects, people, time, budgets, and billing in one governed engine.",
  summary:
    "The core engine of the Praszo ecosystem, managing projects, people, time, budgets, and billing across your audit firm.",
  workflowStep: {
    order: 1,
    label: "Plan & Manage",
    body: "The core engine that manages projects, people, time, budgets, and billing seamlessly.",
  },
  meta: {
    title: "Praszo Practice | Practice Management Software for Audit Firms",
    description:
      "On-premise practice management software for auditing firms to organize workflows, monitor time and budgets, and manage approvals with clarity and control.",
  },
  hero: {
    eyebrow: "Govern every engagement. Capture every hour.",
    headline: "Practice management for audit firms",
    description:
      "Capture every hour, keep engagements on track, and stay inspection-ready.",
    visual: {
      kind: "image",
      src: practiceBoard,
      alt: "Praszo Practice project kanban board with Not Started, Completed, and In Progress columns, task estimates, logged hours, due dates, and dependencies",
      frame: "none",
      screenTitle: "Engagement board",
      caption: "Each engagement as a board: estimated vs logged hours, due dates, owners, and blockers on every card.",
    },
  },
  problem: {
    title: "The leaks Practice closes",
    body: "Spreadsheets, email approvals, and scattered tools break down as engagements multiply. Practice replaces them with one controlled system.",
    points: ["Lost billable hours", "Stalled approvals", "Budget overruns", "Compliance and inspection risk"],
  },
  spotlights: [],
  screens: [
    {
      title: "Project details",
      visual: { kind: "image", src: practiceProject, alt: "Praszo Practice project details with people and organization, category, schedule, and budget versus actual hours flagged over budget", frame: "none", caption: "Client, team, schedule, and budget vs actual on one page, flagged the moment it runs over budget." },
    },
    {
      title: "My work",
      visual: { kind: "image", src: practiceMyWork, alt: "Praszo Practice My Work view listing a team member's overdue tasks with status, due dates, and logged versus estimated hours", frame: "none", caption: "Each person's tasks split into today, upcoming, and overdue, with hours logged vs estimated." },
    },
    {
      title: "Weekly timesheet",
      visual: { kind: "image", src: practiceTimesheetWeek, alt: "Praszo Practice weekly timesheet grouped by member and project, with daily hours and a grand total", frame: "none", caption: "The week's hours by member, project, and task, with daily totals and timesheet approvals." },
    },
    {
      title: "Project setup",
      visual: { kind: "image", src: practiceEditProject, alt: "Praszo Practice edit project form with template, leader, owner, members, kanban task statuses, and priority", frame: "none", caption: "Start from a firm template, assign the team, and choose the board columns and priority." },
    },
  ],
  featureSections: [
    {
      id: "features",
      eyebrow: "Core features",
      title: "Built for complete practice control",
      description:
        "Powerful workflow automation, time governance, revenue tracking, and compliance controls, all designed specifically for modern audit firms.",
      groups: [
        {
          title: "Engagement & workflow",
          description: "Plan, structure, and execute audit engagements effortlessly.",
          icon: "Kanban",
          items: [
            { name: "Kanban boards", description: "Columns you choose per project, from Not Started to Review by Client.", icon: "Kanban" },
            { name: "Recurring tasks", description: "Monthly, quarterly, and annual work is created automatically.", icon: "Repeat" },
            { name: "Multi-level approvals", description: "Timesheets and requests are approved before they reach budgets and billing.", icon: "CheckCheck" },
            { name: "Workflow automation", description: "Rules take care of repeat steps, so work moves without manual follow-up.", icon: "Workflow" },
          ],
        },
        {
          title: "Time, budget & profit",
          description: "Maintain financial visibility and precise control across every active engagement.",
          icon: "Wallet",
          items: [
            { name: "Budget time tracking", description: "Hours are logged against each task and counted against the project budget.", icon: "Clock" },
            { name: "WIP & budget vs actual", description: "Real-time profitability: budget and actual side by side, with an over-budget flag.", icon: "Gauge" },
            { name: "Expense & rate cards", description: "Expenses and rates flow into estimates and invoices automatically.", icon: "Receipt" },
          ],
        },
        {
          title: "Client portal",
          description: "Keep teams and clients aligned in real time.",
          icon: "Users",
          items: [
            { name: "Custom branding", description: "Clients see a portal in your firm's brand.", icon: "PenTool" },
            { name: "Project chat", description: "Discussion, chat, and mail live with the project, not in inboxes.", icon: "MessageSquare" },
            { name: "Secure docs", description: "Files and notes are stored with the engagement, behind access control.", icon: "Lock" },
          ],
        },
        {
          title: "Governance",
          description: "Accountability and strict access control.",
          icon: "ShieldCheck",
          items: [
            { name: "Immutable audit trails", description: "Every change is logged with who made it and when.", icon: "FileCheck" },
            { name: "RBAC access matrix", description: "Granular role-based permissions decide who sees and changes what.", icon: "KeyRound" },
            { name: "Secure API integrations", description: "Connect Practice to your firm's other systems over secured APIs.", icon: "Link2" },
          ],
        },
        {
          title: "Team capacity",
          description:
            "Ensure balanced workloads and optimal staff utilisation across engagements. Monitor health, prevent burnout, and maximize efficiency.",
          icon: "UsersRound",
          items: [
            { name: "Role dashboards", description: "Utilization, overdue work, and approvals for each role at a glance.", icon: "ChartBar" },
            { name: "Allocation matrix", description: "Who is on which engagement, so over-allocation shows before it happens.", icon: "Table" },
            { name: "Utilization reports", description: "Utilization by person and team, to balance workloads.", icon: "TrendingUp" },
            { name: "Live roster health", description: "Overloaded staff are flagged live, before burnout sets in.", icon: "Activity" },
          ],
        },
      ],
    },
    {
      id: "scale",
      eyebrow: "Built to scale",
      title: "Features growing audit firms will love",
      description:
        "One platform, zero compromises. The firm-wide controls that keep standards, margins, and billing intact as you grow from a handful of engagements to hundreds.",
      groups: [
        {
          title: "Scale features",
          icon: "TrendingUp",
          items: [
            {
              name: "Executive dashboard control",
              description:
                "Real-time visibility into realization, utilization, overdue work, approvals, and revenue trends, all from a single command center.",
              icon: "Gauge",
            },
            {
              name: "Every project in one list",
              description: "Search the whole portfolio and see each engagement's progress at a glance, however many you run.",
              icon: "FolderKanban",
            },
            {
              name: "Standardized project templates",
              description:
                "Reusable engagement templates ensure every audit follows a consistent, controlled workflow as your team expands.",
              icon: "FileStack",
            },
            {
              name: "Structured timesheet enforcement",
              description: "Mandatory time logging, approval workflows, and lock dates ensure no billable hour goes unrecorded.",
              icon: "Clock",
            },
            {
              name: "Client profitability insights",
              description: "Identify which clients and services generate true margins, not just revenue.",
              icon: "Coins",
            },
            {
              name: "Realization & revenue tracking",
              description: "Measure billed vs. collected revenue and reduce write-offs with controlled billing workflows.",
              icon: "Receipt",
            },
          ],
        },
      ],
    },
  ],
  audience: {
    title: "Who runs on Practice",
    description: "Practice is the operational core of Praszo OS, built for firms that need structured workflows, accurate time tracking, financial oversight, and compliance-ready engagement management.",
    items: [
      {
        title: "Larger audit firms",
        body: "Large firms rely on multiple systems to handle document control, reconciliation, and financial validation. Praszo replaces fragmentation with one connected operating cycle, and on-premise deployment keeps sensitive audit data within your firm's own infrastructure.",
        icon: "Building",
      },
      {
        title: "Mid-sized audit firms",
        body: "As mid-sized firms grow, spreadsheets, emails, and scattered tools begin to break down. Practice gives growing firms a structured operating layer for engagements, people, budgets, billing, and approvals. It's not task tracking. It's practice control designed for firms ready to scale.",
        icon: "TrendingUp",
      },
    ],
  },
  faq: [
    {
      q: "Why Praszo Practice for practice management?",
      a: "Praszo Practice helps audit firms manage engagements, time, budgets, approvals, compliance, and profitability, far beyond task tracking.",
    },
    {
      q: "Can Praszo Practice improve audit team productivity?",
      a: "Yes. Practice, the flagship product among Praszo's auditing practice management tools, streamlines workflows, automates approvals, and gives clear visibility into team capacity and task progress.",
    },
    {
      q: "How does Praszo Practice prevent revenue leakage?",
      a: "Time logging is enforced at the task level and directly linked to budgets and billing. This ensures every billable hour is captured, approved, and invoiced with no gaps.",
    },
    {
      q: "Can Praszo Practice scale with growth?",
      a: "Absolutely. Practice is designed for high-volume, multi-engagement audit firms, providing firm-wide visibility, capacity control, and standardized workflows as you scale.",
    },
  ],
  cta: {
    title: "Own your audit operations.",
    body: "Stop managing complexity. Start governing it.",
    bullets: sharedCtaBullets,
  },
};

const verifi: Product = {
  slug: "verifi",
  name: "Verifi",
  fullName: "Praszo Verifi",
  color: "#17b978",
  colorDeep: "#0c7d50",
  category: "Financial statement verification",
  tagline: "Automated checks on final drafts: math, notes, prior year, and revisions.",
  summary:
    "Pre-issuance verification that re-foots every total and ties the statements to their notes, the prior year, and earlier drafts.",
  workflowStep: {
    order: 4,
    label: "Validate (AI)",
    body: "Automated checks on final statement drafts catch errors before sign-off.",
  },
  meta: {
    title: "Praszo Verifi | Automated Financial Statement Verification for Audit Firms",
    description:
      "Praszo Verifi checks final financial statement drafts before sign-off: casting and cross-casting, note reconciliation, prior-year tie-in, and draft revision compare, behind your firewall.",
  },
  hero: {
    eyebrow: "Pre-issuance diagnostic intelligence",
    headline: "Automated financial statement verification",
    description: "Catch last-minute financial statement errors in seconds. Keep complete audit control.",
    visual: {
      kind: "image",
      src: verifiDashboard,
      alt: "Praszo Verifi dashboard with total engagements, client companies, files needing attention, average quality score, verification coverage, and risk profile",
      frame: "browser",
      screenTitle: "Dashboard",
      caption: "Every engagement at a glance: files verified, those needing attention, quality scores, and risk profile.",
    },
  },
  problem: {
    title: "The last-mile risk in exported drafts",
    body: "Once statements leave the spreadsheet for PDF or Word, live links break and last-minute edits slip in unseen",
    points: [
      "Broken subtotals and rounding",
      "Statements that don't match the notes",
      "Unintended edits between drafts",
      "Senior hours lost to manual footing",
    ],
  },
  highlights: [
    {
      title: "Runs behind your firewall",
      body: "A standalone desktop application on one PC, or a central firm database shared across your network server. Confidential client files stay protected.",
      icon: "Server",
    },
    {
      title: "Reads any draft",
      body: "Text-based or scanned PDF and Word documents, with sideways tables rotated automatically and Western (1,234,567) or South Asian (12,34,567) number formats.",
      icon: "ScanText",
    },
    {
      title: "Fits every engagement",
      body: "Annual, half-yearly, and quarterly interim engagements for private, listed, or group entities, with deviation tolerances you set.",
      icon: "CalendarClock",
    },
    {
      title: "Your team decides",
      body: "Verifi flags potential errors. Your reviewers apply tick-marks, leave comments, and log formal approval overrides.",
      icon: "UserCog",
    },
  ],
  spotlights: [
    {
      id: "deliverables",
      eyebrow: "Deliverables",
      title: "Working papers, ready for the file",
      body: "When the review is complete, Verifi turns your team's work into clean, compliant audit deliverables.",
      bullets: [
        "Tick-marked PDF with a summary legend and comments as native Acrobat sticky notes",
        "Excel working papers with every check, reconciliation, and reviewer decision",
        "Custom PDF reports: executive summary, scope and disclaimers, findings ledger, activity timeline",
      ],
      visual: {
        kind: "mockup",
        id: "verifi-report",
        alt: "Sample verification report: Balance Sheet cross-checked against Notes with 42 line items matched and P&L totals recalculated with no discrepancies",
        caption: "A verification summary: statements agreed to the notes and every total recalculated.",
      },
    },
    {
      id: "oversight",
      eyebrow: "Oversight",
      title: "Where every review stands",
      body: "Statement health, open exceptions, material mismatches, and team workload on one dashboard, so partners see where each review stands.",
      bullets: [
        "Prepared By, Reviewed By, and Approved By roles",
        "A full team activity timeline and administrator security controls",
        "Accepted, Declined, or False Positive decisions, with partner override notes",
      ],
      visual: {
        kind: "image",
        src: verifiDashboard,
        alt: "Praszo Verifi dashboard with total engagements, client companies, files needing attention, average quality score, verification coverage, and risk profile",
        frame: "browser",
      },
    },
  ],
  screens: [
    {
      title: "Engagements",
      visual: {
        kind: "image",
        src: verifiEngagements,
        alt: "Praszo Verifi company view listing an FY2026 audit engagement with its document versions, each with a verification score, and the selected version's details",
        frame: "none",
        caption: "Every engagement and draft version under its client and financial year, each with its latest score.",
      },
    },
    {
      title: "Verification summary",
      visual: {
        kind: "image",
        src: verifiSummary,
        alt: "Praszo Verifi summary of a 24-page statement: mathematical accuracy, internal consistency, and prior year consistency, each with pass, mismatch, and missing counts",
        frame: "none",
        caption: "One summary per draft: figures verified, checks matched, and what still needs a look.",
      },
    },
    {
      title: "Mathematical accuracy",
      visual: {
        kind: "image",
        src: verifiMathAccuracy,
        alt: "Praszo Verifi mathematical accuracy view: a statement of financial position with tick-marked totals, a sum breakdown showing a 20,000,000 deviation, and an AI review naming the likely incorrect line",
        frame: "none",
        caption: "Every total re-footed and tick-marked, with an AI review pointing to the line that breaks it.",
      },
    },
    {
      title: "Snip checks",
      visual: {
        kind: "image",
        src: verifiSumCheck,
        alt: "Praszo Verifi snip check adding three selected figures and comparing them with the stated total, showing the difference",
        frame: "none",
        caption: "Select any figures on the page to add them up and compare them with the stated total.",
      },
    },
    {
      title: "Internal consistency",
      visual: {
        kind: "image",
        src: verifiInternalConsistency,
        alt: "Praszo Verifi internal consistency view: the face statement beside its notes, with a receivable figure traced to the note that disagrees and a results list of matches, mismatches, and missing items",
        frame: "none",
        caption: "Face statement and notes side by side, with every figure traced to its note and mismatches flagged.",
      },
    },
    {
      title: "Prior year",
      visual: {
        kind: "image",
        src: verifiPriorYear,
        alt: "Praszo Verifi prior year view: current and prior year statements side by side, with comparative figures paired and an inconsistent prior-year figure flagged",
        frame: "none",
        caption: "This year's comparatives paired with last year's statements, so changed prior-year figures surface.",
      },
    },
  ],
  featureSections: [
    {
      id: "features",
      eyebrow: "The 4 core diagnostic engines",
      title: "Precision checking across every line",
      description:
        "Verifi runs four verification checks across your whole draft to catch errors before they reach boards, clients, or regulators.",
      groups: [
        {
          title: "Math checks",
          description: "Casting and cross-casting. Every total is re-calculated, so broken subtotals and rounding never reach sign-off.",
          icon: "Calculator",
          items: [
            {
              name: "Total arithmetic verification",
              description: "Every column, cross-cast movement schedule, subtotal deduction, and multi-page block re-calculated.",
              icon: "Calculator",
            },
            {
              name: "Smart visual highlighting",
              description: "Hover any number to see its components in yellow and the total it feeds in green.",
              icon: "Highlighter",
            },
            {
              name: "Sum breakdown",
              description: "Click any Σ marker for additions, deductions, the exact deviation, and an AI-written explanation.",
              icon: "Sigma",
            },
          ],
        },
        {
          title: "Note reconciliation",
          description: "Internal consistency. The primary statements are tied to their disclosure notes.",
          icon: "FileSearch",
          items: [
            {
              name: "Face-to-note agreement",
              description: "Each line item is checked against its note table, such as PPE or retained earnings.",
              icon: "FileCheck",
            },
            {
              name: "Near-match and missing note alerts",
              description: "Single-digit transcription errors flagged as near-matches, and references to notes that don't exist caught.",
              icon: "ShieldAlert",
            },
          ],
        },
        {
          title: "Prior year tie-in",
          description: "Comparatives. This year's comparative columns are checked against last year's signed report.",
          icon: "History",
          items: [
            {
              name: "Historical continuity",
              description: "Comparative figures cross-checked against the finalized prior-year financial report.",
              icon: "History",
            },
            {
              name: "Side-by-side synchronized scroll",
              description: "Pages aligned side by side to spot unauthorized restatements or re-keying mistakes.",
              icon: "Columns3",
            },
          ],
        },
        {
          title: "Draft revision compare",
          description: "Delta tracking. See exactly what changed between two drafts.",
          icon: "GitCompare",
          items: [
            {
              name: "Draft-to-draft change tracking",
              description: "Every line item addition, removal, or numerical edit highlighted in green and red.",
              icon: "FileDiff",
            },
            {
              name: "Precision change ledger",
              description: "Variance amounts and percentages, with changes acknowledged or ticked in bulk in one step.",
              icon: "ListChecks",
            },
          ],
        },
      ],
    },
    {
      id: "review",
      eyebrow: "Reviewer workspace",
      title: "Built for faster sign-offs",
      description:
        "Interactive tools to inspect findings, mark up the draft, and document review work across the whole engagement.",
      groups: [
        {
          title: "Review tools",
          icon: "ClipboardCheck",
          items: [
            {
              name: "Figure Trace",
              description: "Click any number to find every occurrence across statements, notes, and narrative, then jump straight to it in context.",
              icon: "ScanSearch",
            },
            {
              name: "Anchored comments",
              description: "Comments pinned to any word, figure, or area, with author and timestamp. AI drafts each mismatch explanation for you to edit or approve.",
              icon: "MessageSquareText",
            },
            {
              name: "Custom tick marks",
              description: "Standard ✓ and ✗ or your firm's own stamps. Accept, decline, or mark false positives one at a time or across the whole document.",
              icon: "Stamp",
            },
            {
              name: "Snipping tool",
              description: "Draw a box around faint scans, rotated pages, or unusual tables to total them in the math engine.",
              icon: "Scissors",
            },
          ],
        },
      ],
    },
  ],
  workflow: {
    title: "From draft to sign-off",
    description: "Four engines, one review, and deliverables your engagement file can keep.",
    steps: [
      { title: "Set up the engagement", body: "Annual, half-yearly, or quarterly; private, listed, or group; with your deviation tolerances." },
      { title: "Load the draft", body: "Typed or scanned PDF and Word, read page by page, with sideways tables rotated." },
      { title: "Run the checks", body: "Math, note reconciliation, prior-year tie-in, and draft revision compare across the whole document." },
      { title: "Review and decide", body: "Trace figures, comment, tick, and accept, decline, or override each finding." },
      { title: "Export", body: "Tick-marked PDF, Excel working papers, and a customizable audit report." },
    ],
  },
  audience: {
    title: "Built for audit and review teams",
    items: [
      {
        title: "Audit teams",
        body: "No more calculator footings, page-flipping, or manual comparative tie-ins during busy season.",
        icon: "Users",
      },
      {
        title: "Partners and reviewers",
        body: "Catch calculation errors, mismatched note references, and restatement mistakes before final reports leave the firm.",
        icon: "ClipboardCheck",
      },
    ],
  },
  faq: [
    {
      q: "What does Praszo Verifi do?",
      a: "Verifi checks final financial statement drafts before sign-off. It reads every page, typed or scanned, and runs four automated checks: math, note reconciliation, prior-year tie-in, and draft revision compare.",
    },
    {
      q: "Which documents can Verifi read?",
      a: "Text-based or scanned PDF and Word documents. It rotates sideways tables automatically and supports both Western (1,234,567) and South Asian (12,34,567) number formats.",
    },
    {
      q: "Where does Verifi run, and is client data secure?",
      a: "Verifi runs as a standalone desktop application on a single PC, or on a central firm database shared across your network server, so confidential client files stay behind your firewall.",
    },
    {
      q: "Does the AI make the final call?",
      a: "No. Verifi flags potential errors and drafts explanations. Your team applies tick-marks, leaves comments, and logs formal approval overrides.",
    },
    {
      q: "What can we export for the engagement file?",
      a: "A tick-marked PDF with review comments as Acrobat sticky notes, Excel working papers with every check and reviewer decision, and a customizable PDF audit report.",
    },
  ],
  cta: {
    title: "Catch errors before reports leave the firm",
    body: "Bring mathematical precision and automated confidence to your audit workflow. See Praszo Verifi in a live demo.",
    bullets: sharedCtaBullets,
  },
};

const match: Product = {
  slug: "match",
  name: "Match",
  fullName: "Praszo Match",
  color: "#fb9528",
  colorDeep: "#ad5708",
  category: "AI purchase vouching",
  tagline: "AI 3-way matching of invoices against your purchase sample, POs, and GRNs.",
  summary:
    "AI purchase testing that matches every invoice to your purchase sample, POs, and GRNs, with auditor judgment kept at the center.",
  workflowStep: {
    order: 3,
    label: "Reconcile (AI)",
    body: "AI matches invoices to the purchase sample, POs, and GRNs in seconds.",
  },
  meta: {
    title: "Praszo Match | AI Purchase Vouching Solution for Auditors",
    description:
      "Praszo Match automates purchase testing for audit teams: AI 3-way matching of invoices against your purchase sample, POs, and GRNs, with a full decision audit trail.",
  },
  hero: {
    eyebrow: "AI purchase vouching",
    headline: "Smarter, faster purchase auditing",
    description: "Turn hours of manual purchase checking into minutes of AI insights.",
    visual: {
      kind: "image",
      src: matchEngine,
      alt: "Praszo Match verification engine comparing an invoice and a purchase order side by side with an overall match score",
      frame: "browser",
      screenTitle: "Verification engine",
      caption: "Invoice and purchase order side by side, with the overall match, status, and the auditor's note, flag, or approval.",
    },
  },
  problem: {
    title: "Purchase auditing is tedious, manual work",
    body: "Spreadsheet comparisons, missing paperwork, and human error, with days spent matching invoice line items by hand",
    points: ["Spreadsheet comparisons", "Missing paperwork", "Human error", "Days of line-item matching"],
  },
  highlights: [
    {
      title: "Automated 3-way reconciliation",
      body: "Purchase invoices are matched against your audit sample, purchase orders (POs), and goods receipt notes (GRNs) in seconds.",
      icon: "GitCompare",
    },
    {
      title: "100% decision audit trail",
      body: "Every review decision, auditor note, and override is logged with timestamped user details for senior sign-off.",
      icon: "FileCheck",
    },
    {
      title: "Flexible firm deployment",
      body: "Runs on a single auditor's laptop, or as a shared SQL database across the whole audit team.",
      icon: "Server",
    },
    {
      title: "Fast setup",
      body: "A simple 4-step setup wizard gets your audit firm up and running in minutes.",
      icon: "MousePointerClick",
    },
  ],
  spotlights: [
    {
      id: "review",
      eyebrow: "Review",
      title: "Every match inspected side by side",
      body: "A split-screen view puts the source documents next to the match results. Click any sample entry to highlight the exact matched values on the invoice, PO, or GRN.",
      bullets: [
        "Confirm suggested matches, add notes, or flag for review",
        "Accepting a discrepancy or re-linking a document requires a reason before saving",
        "Every decision logged with timestamped user details",
      ],
      visual: {
        kind: "image",
        src: matchEngine,
        alt: "Praszo Match verification engine comparing an invoice and a purchase order side by side with an overall match score",
        frame: "browser",
      },
    },
    {
      id: "reports",
      eyebrow: "Reporting",
      title: "Partner-ready audit folders",
      body: "When testing is complete, export professional audit reports in two formats.",
      bullets: [
        "Interactive HTML audit folder: match summaries, original PDFs, and Excel workpapers, with every transaction one click from its supporting PDF",
        "Simple audit summary: a single-file HTML executive report for email and the audit file",
      ],
      visual: {
        kind: "mockup",
        id: "match-three-way",
        alt: "Illustration of one transaction's match summary across its invoice, purchase order, and goods receipt note, with line-level statuses",
      },
    },
  ],
  featureSections: [
    {
      id: "features",
      eyebrow: "Key verification modules",
      title: "Catch what manual sampling misses",
      description:
        "Deep line-by-line verification across three documentation levels: your purchase sample, the purchase order, and the goods receipt note.",
      groups: [
        {
          title: "Invoice vs purchase sample",
          description: "Each invoice is paired with its row in your purchase sample.",
          icon: "Table",
          items: [
            { name: "Automatic pairing", description: "Each invoice is matched to its corresponding row in the purchase sample.", icon: "Link2" },
            { name: "Missing, duplicate, and variance checks", description: "Detects missing invoices, unrecorded sample entries, duplicate bookings, and amount variances.", icon: "ShieldAlert" },
            { name: "Multi-currency flags", description: "Flags multi-currency transactions and highlights exchange discrepancies.", icon: "Globe" },
          ],
        },
        {
          title: "Invoice vs purchase order",
          description: "Line items are verified against approved purchase orders.",
          icon: "Receipt",
          items: [
            { name: "Over-billing and price variances", description: "Line items checked against the approved PO to catch over-billing and price differences.", icon: "Scale" },
            { name: "Timing risks", description: "Flags risks such as purchase orders created after the invoice date.", icon: "CalendarClock" },
            { name: "Open and partial PO lines", description: "Identifies un-invoiced open PO lines and partial billing.", icon: "ListChecks" },
          ],
        },
        {
          title: "Invoice vs goods receipt note",
          description: "Physical receipt of goods is confirmed before payment is verified.",
          icon: "Boxes",
          items: [
            { name: "Proof of receipt", description: "Confirms that goods were physically received before payment verification.", icon: "Boxes" },
            { name: "Billed before delivery", description: "Flags items billed before delivery, or invoiced but never received.", icon: "Clock" },
            { name: "Services vs goods", description: "Distinguishes service charges from physical item deliveries automatically.", icon: "Split" },
          ],
        },
      ],
    },
    {
      id: "insights",
      eyebrow: "Review interface",
      title: "Clear insights, full control",
      description:
        "Match keeps auditor judgment at the center, and the dashboard shows where the risk is across every engagement.",
      groups: [
        {
          title: "Insights",
          icon: "ChartBar",
          items: [
            { name: "Smart supplier name memory", description: "Remembers alternative supplier spellings across engagements, such as \"Acme Corp\" and \"Acme Corporation\", so future audits get smarter.", icon: "BrainCircuit" },
            { name: "Company-level match rates", description: "Match rates for each client company, to highlight client risk.", icon: "Gauge" },
            { name: "Top mismatch fields", description: "The fields that mismatch most across all engagements, such as unit price, tax, and date.", icon: "ChartBar" },
            { name: "Team progress", description: "Monthly team progress and auditor review speeds, tracked in one place.", icon: "TrendingUp" },
          ],
        },
      ],
    },
  ],
  workflow: {
    title: "The core audit engine",
    description: "Upload the sample once and let AI do the matching, while auditors keep the final say.",
    steps: [
      { title: "Sample and invoice upload", body: "Drag and drop the purchase sample (Excel or CSV) with all supporting PDF vouchers. Multi-page bulk PDFs are read at once." },
      { title: "AI matching", body: "AI extracts key fields and pairs invoices with sample rows, POs, and GRNs, flagging line-item errors and missing records." },
      { title: "Review and verify", body: "Auditors inspect discrepancies, confirm suggested matches, and record audit reasons." },
      { title: "Report and export", body: "Interactive workpaper folders and clean Excel audit schedules, ready for partner review." },
    ],
  },
  audience: {
    title: "Built for firms with many client engagements",
    items: [
      {
        title: "Multi-client workspace",
        body: "Manage every audit client with trade license details, Tax Registration Numbers (TRN), and industry classifications.",
        icon: "Building",
      },
      {
        title: "Engagement tracking",
        body: "Organize sample work by audit year, reporting currency, and engagement type: Audit, Review, Tax, or Advisory.",
        icon: "CalendarClock",
      },
      {
        title: "Role-based security",
        body: "Admin, Auditor, Reviewer, and Viewer roles protect sensitive client data and restrict setting changes.",
        icon: "KeyRound",
      },
    ],
  },
  faq: [
    {
      q: "What is Praszo Match?",
      a: "Praszo Match is an intelligent audit tool for accounting and audit teams. It automates purchase testing by matching invoices against your purchase sample, purchase orders, and goods receipt notes.",
    },
    {
      q: "What do we need to upload?",
      a: "Your purchase sample file (Excel or CSV) and the supporting PDF vouchers. No spreadsheet reformatting is needed, and multi-page bulk PDFs are read at once.",
    },
    {
      q: "Where does Praszo Match run?",
      a: "As a standalone desktop installation for a single auditor, or on a shared SQL database for larger audit teams.",
    },
    {
      q: "Which AI does Praszo Match use?",
      a: "It works with leading enterprise AI providers (Claude, Gemini, and GPT) and switches to a backup automatically to prevent downtime.",
    },
    {
      q: "Do auditors keep the final say?",
      a: "Yes. Auditors confirm or reject every suggested match, and accepting a discrepancy or re-linking a document requires a recorded reason.",
    },
    {
      q: "What happens to our work if the license expires?",
      a: "Existing audit verifications stay fully accessible in read-only mode for review and workpaper inspection.",
    },
  ],
  cta: {
    title: "Verify every transaction with confidence",
    body: "Turn hours of manual checking into minutes of AI insights. See Praszo Match in a live demo.",
    bullets: sharedCtaBullets,
  },
};

const docs: Product = {
  slug: "docs",
  name: "Docs",
  fullName: "Praszo Docs",
  color: "#d72d2d",
  colorDeep: "#b52424",
  category: "Document management",
  tagline: "On-premise document management that makes every file searchable and audit-ready.",
  summary:
    "A powerful, on-premise document management system that turns scattered files into searchable, governed, audit-ready data.",
  workflowStep: {
    order: 2,
    label: "Collect & Govern",
    body: "A powerful system that turns scattered files into searchable, governed, audit-ready data.",
  },
  meta: {
    title: "Praszo Docs | Document Management Software Built for Audit",
    description:
      "Praszo Docs is document management software for audit firms, using OCR and automation to organize, secure, and make documents searchable instantly, hosted on your own infrastructure.",
  },
  hero: {
    eyebrow: "On-premise document management",
    headline: "Document management built for audit",
    description:
      "Capture, classify, and route every file with OCR, hosted on your own servers.",
    visual: {
      kind: "mockup",
      id: "docs-repository",
      alt: "Illustration of the Praszo Docs repository: documents arriving by upload and email, OCR-indexed, classified by type and correspondent, and routed to Finance or Legal",
    },
  },
  problem: {
    title: "Scattered files are not audit-ready",
    body: "Scans can't be searched, filing is manual, and sensitive files sit on someone else's computer",
    points: ["Unstructured files", "Scans you can't search", "Manual filing and routing", "Data outside your control"],
  },
  highlights: [
    {
      title: "Capture everything",
      body: "Documents arrive through drag and drop, bulk uploads, or automatic email integrations for seamless, centralized intake.",
      icon: "Inbox",
    },
    {
      title: "Searchable by default",
      body: "Full-text OCR indexing and automated metadata enrichment make every image and PDF searchable and classified.",
      icon: "ScanSearch",
    },
    {
      title: "Governed on your infrastructure",
      body: "Role-based permissions, versioning, and digital audit trails run on-premise, so data ownership stays with the firm.",
      icon: "Server",
    },
  ],
  spotlights: [],
  featureSections: [
    {
      id: "features",
      eyebrow: "Core solutions",
      title: "Intelligent ingestion. Complete control.",
      description:
        "Capture, classify, search, and govern every document with automated workflows and secure, role-based access controls.",
      groups: [
        {
          title: "Document management features",
          icon: "FolderTree",
          items: [
            { name: "Multi-channel intelligent ingestion", description: "Capture documents through drag and drop, bulk uploads, or automatic email integrations for seamless centralized intake.", icon: "Inbox" },
            { name: "Full-text OCR indexing", description: "Convert static images and PDFs into fully searchable digital text layers using high-performance OCR technology.", icon: "ScanText" },
            { name: "Automated metadata enrichment", description: "Automatically classify documents by identifying correspondents, document types, and custom tags during structured ingestion workflows.", icon: "Tags" },
            { name: "Smart workflow automation", description: "Trigger automated routing actions that instantly direct invoices to Finance or contracts to Legal upon classification.", icon: "Workflow" },
            { name: "Granular governance & permissions", description: "Control document access with role-based permissions defining who can view, edit, or delete files.", icon: "KeyRound" },
            { name: "Centralized visibility dashboard", description: "Access consolidated repository metrics including total documents, storage locations, and correspondent distribution insights.", icon: "Gauge" },
            { name: "Versioning & digital audit trails", description: "Track every document modification and view with complete digital history, ensuring lifecycle transparency.", icon: "FileDiff" },
            { name: "Interactive document annotation", description: "Add internal notes and layered comments without altering original files, preserving evidence integrity.", icon: "MessageSquareText" },
            { name: "Advanced search & custom views", description: "Combine metadata filters with full-text search and save custom views for recurring tasks.", icon: "Search" },
            { name: "Trash & recovery management", description: "Move deleted documents to temporary retention where they can be restored or permanently purged.", icon: "RotateCcw" },
          ],
        },
      ],
    },
  ],
  workflow: {
    title: "From intake to audit-ready evidence",
    steps: [
      { title: "Ingest", body: "Drag and drop, bulk upload, or let email integrations deliver documents automatically." },
      { title: "OCR", body: "Images and PDFs become fully searchable text layers." },
      { title: "Classify", body: "Correspondent, document type, and custom tags are identified automatically." },
      { title: "Route", body: "Invoices go to Finance, contracts to Legal, triggered by classification." },
      { title: "Govern", body: "Role-based permissions, versioning, annotations, and audit trails protect evidence integrity." },
      { title: "Retain", body: "Deleted documents sit in temporary retention until restored or permanently purged." },
    ],
  },
  audience: {
    title: "Who Docs is built for",
    items: [
      { title: "Audit teams", body: "Scattered client files become searchable, governed, audit-ready evidence with a complete digital history.", icon: "Briefcase" },
      { title: "Finance and legal", body: "Classification routes invoices to Finance and contracts to Legal the moment they arrive.", icon: "Scale" },
      { title: "IT and compliance", body: "On-premise storage and role-based access keep complete data security and ownership inside the firm.", icon: "Server" },
    ],
  },
  faq: [
    {
      q: "What is Praszo Docs?",
      a: "Praszo Docs is document management software for audit firms, designed to capture, organize, and manage documents using OCR and automation.",
    },
    {
      q: "How does Praszo Docs help audit firms manage documents?",
      a: "Praszo Docs converts files into searchable data, automatically classifies them, and routes them for faster and more structured audit processes.",
    },
    {
      q: "Is Praszo Docs secure for storing sensitive audit documents?",
      a: "Yes. It uses role-based access controls and on-premise storage to ensure complete data security and ownership.",
    },
    {
      q: "Does Praszo Docs support document search and version tracking?",
      a: "Yes. Docs offers full-text search, metadata filters, version history, and audit trails for complete document visibility and control.",
    },
  ],
  cta: {
    title: "Run your firm with clarity",
    body: "Praszo Docs converts files into searchable data, classifies them automatically, and routes them for faster, more structured audit processes, all hosted on your own infrastructure.",
    bullets: sharedCtaBullets,
  },
};

export const products: Record<ProductSlug, Product> = { practice, verifi, match, docs };

export const productList: Product[] = productOrder.map((slug) => products[slug]);

export function getProduct(slug: ProductSlug): Product {
  return products[slug];
}

export function otherProducts(slug: ProductSlug): Product[] {
  return productList.filter((product) => product.slug !== slug);
}

/** Products in the order they appear in the audit workflow. */
export const workflowProducts: Product[] = [...productList].sort(
  (a, b) => a.workflowStep.order - b.workflowStep.order,
);
