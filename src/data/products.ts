import type { StaticImageData } from "next/image";

import matchEngine from "@/assets/products/match-engine.png";
import matchGovernance from "@/assets/products/match-governance.png";
import matchWorkflow from "@/assets/products/match-workflow.png";
import practiceBoard from "@/assets/products/practice-board.png";
import practiceEditProject from "@/assets/products/practice-edit-project.png";
import practiceMyWork from "@/assets/products/practice-my-work.png";
import practiceProject from "@/assets/products/practice-project.png";
import practiceTimesheetWeek from "@/assets/products/practice-timesheet-week.png";
import verifiDashboard from "@/assets/products/verifi-dashboard.png";
import verifiIngestion from "@/assets/products/verifi-ingestion.png";
import verifiReporting from "@/assets/products/verifi-reporting.png";
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
    order: 2,
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
  colorDeep: "#0f8f5c",
  category: "AI financial statement validation",
  tagline: "AI validation across the Balance Sheet, P&L, Cash Flow, and Notes.",
  summary:
    "An intelligent financial statement analyzer that automates cross-statement checks, disclosures, ratios, and analytical reviews.",
  workflowStep: {
    order: 6,
    label: "Validate (AI)",
    body: "An intelligent financial statement analyzer that automates cross-statement checks and reviews.",
  },
  meta: {
    title: "Praszo Verifi | AI Financial Statement Validation for Audit Firms",
    description:
      "Verifi is an AI financial statement validation tool that extracts, validates, and cross-checks data across reports, helping auditors detect errors accurately.",
  },
  hero: {
    eyebrow: "AI-powered validation",
    headline: "AI financial statement validation",
    description:
      "AI cross-checks your Balance Sheet, P&L, Cash Flow, and Notes for inconsistencies.",
    visual: {
      kind: "image",
      src: verifiDashboard,
      alt: "Praszo Verifi dashboard with statement health score, open exceptions, weekly activity chart, and team workload",
      frame: "browser",
    },
  },
  problem: {
    title: "Manual line-item hunting does not scale",
    points: [
      "Data arrives fragmented across Excel sheets, nested PDFs, and legacy paper",
      "Manual cross-checks between statements and notes are slow and easy to miss",
      "Partners and inspectors expect a documented trail for every check",
    ],
  },
  spotlights: [
    {
      id: "ingestion",
      eyebrow: "Ingestion",
      title: "Multi-format ingestion",
      body: "Stop wrestling with fragmented data. Verifi standardizes complex Excel sheets and nested PDFs into a unified format for seamless processing.",
      bullets: [
        "OCR extraction for legacy paper invoices",
        "Excel mapping and column reconciliation",
        "Direct ERP integration support",
      ],
      visual: {
        kind: "image",
        src: verifiIngestion,
        alt: "Verifi data ingestion pipeline turning Excel sheets, PDF invoices, and paper scans into standardized data, with OCR extraction and an Excel mapping table",
        frame: "none",
      },
    },
    {
      id: "logic",
      eyebrow: "AI-powered logic",
      title: "Only look at what matters",
      body: "Automated discrepancy flagging and confidence scoring ensure you only look at what matters. No more manual line-item hunting.",
      visual: {
        kind: "mockup",
        id: "verifi-report",
        alt: "Sample AI validation report: Balance Sheet cross-checked against Notes with 42 line items matched and P&L totals recalculated with no discrepancies",
      },
    },
    {
      id: "reporting",
      eyebrow: "Reporting",
      title: "Audit-ready reporting",
      body: "Generate a comprehensive verification matrix in seconds. Designed for compliance, every match is recorded with a clear digital audit trail.",
      visual: {
        kind: "image",
        src: verifiReporting,
        alt: "Verifi approvals and activity log listing pending approvals, total activities, and average approval time",
        frame: "none",
      },
    },
  ],
  featureSections: [
    {
      id: "features",
      eyebrow: "Core features",
      title: "Automated verification. Financial accuracy.",
      description:
        "Automatically extract, cross-check, and validate financial statements to detect discrepancies and ensure reporting accuracy with confidence.",
      groups: [
        {
          title: "Verification engines",
          icon: "BadgeCheck",
          items: [
            {
              name: "Page Compare",
              description: "Detects table of contents, page number, and heading mismatches instantly.",
              icon: "BookOpen",
            },
            {
              name: "Notes Compare",
              description: "Flags discrepancies between financial statements and disclosure notes.",
              icon: "FileDiff",
            },
            {
              name: "Accuracy Verifier",
              description: "Detects incorrect totals, sub-totals, and calculation mismatches instantly.",
              icon: "CircleCheck",
            },
            {
              name: "Annual Compare",
              description: "Flags prior-year comparative and opening balance mismatches automatically.",
              icon: "CalendarClock",
            },
            {
              name: "Version Compare",
              description: "Tracks all numerical and textual changes across document versions.",
              icon: "GitCompare",
            },
          ],
        },
      ],
    },
  ],
  workflow: {
    title: "From ingestion to audit trail",
    description: "Verifi extracts, recalculates, compares, and cross-checks, then records every result.",
    steps: [
      { title: "Ingest", body: "Excel sheets, nested PDFs, and scanned paper are standardized into one unified format." },
      { title: "Extract and recalculate", body: "Figures are extracted and totals, sub-totals, and ratios are recalculated." },
      { title: "Cross-check", body: "Balance Sheet, P&L, Cash Flow, Notes, prior-year comparatives, and versions are compared." },
      { title: "Flag with confidence", body: "Discrepancies are flagged and scored so reviewers see only what matters." },
      { title: "Report", body: "A verification matrix is generated and every check is recorded in a digital audit trail." },
    ],
  },
  audience: {
    title: "Built for auditors and the partners who sign off",
    items: [
      {
        title: "Audit teams",
        body: "Automated extraction, cross-checking, and discrepancy flagging reduce manual effort and improve overall audit accuracy.",
        icon: "Users",
      },
      {
        title: "Partners and reviewers",
        body: "Every check and exception is digitally logged, creating a clear audit trail for partner reviews and inspections.",
        icon: "ClipboardCheck",
      },
    ],
  },
  faq: [
    {
      q: "What does Praszo Verifi do?",
      a: "Praszo Verifi is an AI financial statement validation tool that cross-checks figures across the Balance Sheet, P&L, Cash Flow, and Notes, instantly flagging inconsistencies.",
    },
    {
      q: "How does Praszo Verifi help auditors?",
      a: "It automates data extraction, cross-checks statements, and flags discrepancies, reducing manual effort and improving overall audit accuracy.",
    },
    {
      q: "Is Praszo Verifi an AI-powered auditing software solution?",
      a: "Yes. It is an AI auditing software solution that uses AI to validate and analyze financial data while helping auditors focus on review and judgment.",
    },
    {
      q: "Does Verifi maintain documentation for partner review and inspections?",
      a: "Yes. Every check and exception is digitally logged, creating a clear audit trail for reviews and inspections.",
    },
  ],
  cta: {
    title: "Run your firm with clarity",
    body: "Ready to streamline workflows, approvals, and document control? Praszo brings structure, visibility, and precision to every engagement without disrupting how your team works.",
    bullets: sharedCtaBullets,
  },
};

const match: Product = {
  slug: "match",
  name: "Match",
  fullName: "Praszo Match",
  color: "#fb9528",
  colorDeep: "#c4640a",
  category: "AI purchase vouching",
  tagline: "Three-way matching of registers, invoices, POs, and GRNs.",
  summary:
    "AI-powered reconciliation that matches registers with invoices and evidence end-to-end, so auditors can focus on judgment.",
  workflowStep: {
    order: 5,
    label: "Reconcile (AI)",
    body: "AI-powered reconciliation that matches registers with invoices and evidence flawlessly.",
  },
  meta: {
    title: "Praszo Match | AI Purchase Vouching Solution for Auditors",
    description:
      "AI purchase vouching solution that compares transactions with supporting documents, helping auditors detect gaps, reduce risk, and improve verification speed.",
  },
  hero: {
    eyebrow: "AI purchase vouching",
    headline: "AI purchase vouching for auditors",
    description:
      "Match registers, invoices, POs, and GRNs faster, with greater accuracy and control.",
    visual: {
      kind: "image",
      src: matchEngine,
      alt: "Praszo Match verification engine comparing an invoice and a purchase order side by side with an overall match score",
      frame: "browser",
    },
  },
  highlights: [
    {
      title: "Automated three-way matching",
      body: "Automatically matches purchase register data with invoices, POs, and GRNs to verify transactions instantly, without manual comparison.",
      icon: "GitCompare",
    },
    {
      title: "Faster audits",
      body: "Reduces manual verification effort, enabling auditors to complete transaction checks faster and meet deadlines with ease.",
      icon: "Gauge",
    },
    {
      title: "Zero oversight",
      body: "AI verifies 100% of transactions, instantly flagging discrepancies to eliminate missed errors and manual oversight.",
      icon: "ShieldCheck",
    },
  ],
  spotlights: [
    {
      id: "documents",
      eyebrow: "Smart document handling",
      title: "Upload one scanned PDF. Match splits the rest.",
      body: "The system auto-detects and splits a single scanned PDF into Invoice, PO, and GRN, so there is no need to sort files manually. High-speed OCR extraction and instant field highlighting put every value where reviewers expect it.",
      bullets: ["Auto-detects and splits Invoice, PO, and GRN", "High-speed OCR extraction", "Instant field highlighting"],
      visual: {
        kind: "mockup",
        id: "match-three-way",
        alt: "Three-way match of a purchase register row against its invoice, purchase order, and goods receipt note with line-level statuses",
      },
    },
    {
      id: "review",
      eyebrow: "Review and validation",
      title: "Line-by-line verification, side by side",
      body: "Every transaction is checked at line level, clearly showing matched, partial, and mismatched items. A side-by-side PDF viewer makes discrepancy checks instant, and reviewers add comments and remarks or handle small differences with defined thresholds.",
      visual: {
        kind: "image",
        src: matchWorkflow,
        alt: "Approval activity log showing pending requests, logged activities, and approval statuses",
        frame: "none",
      },
    },
    {
      id: "reports",
      eyebrow: "Reporting",
      title: "Audit-ready evidence, tracked in one dashboard",
      body: "Generate shareable discrepancy reports, open linked PDFs directly in the browser, and attach evidence to the audit file. The dashboard shows overall verification status and tracks matched, partial, and mismatched items as the audit progresses.",
      visual: {
        kind: "image",
        src: matchGovernance,
        alt: "Dashboard cards for revenue, budget versus actual, billing realization, work in progress by client, and timesheet approvals",
        frame: "none",
      },
    },
  ],
  featureSections: [
    {
      id: "features",
      eyebrow: "Core features",
      title: "Match your transactions with speed and precision",
      description:
        "Praszo Match eliminates risk by automatically standardizing and reconciling registers with invoices, flagging mismatches at the row and column level. The result is faster audits, higher accuracy, and audit-ready evidence, ensuring no transaction is overlooked.",
      groups: [
        {
          title: "Verification features",
          icon: "GitCompare",
          items: [
            { name: "AI 3-way matching", description: "Automatically verifies Invoice vs Register, Invoice vs PO, and Invoice vs GRN.", icon: "GitCompare" },
            { name: "Smart document handling", description: "Upload a single scanned PDF; the system auto-detects and splits it into Invoice, PO, and GRN with high-speed OCR extraction and instant field highlighting.", icon: "Split" },
            { name: "Line-by-line verification", description: "Checks every transaction at line level and clearly shows matched, partial, and mismatched items.", icon: "Rows3" },
            { name: "Side-by-side PDF viewer", description: "Instant side-by-side discrepancy checks.", icon: "Columns3" },
            { name: "Comments & remarks", description: "Add notes during verification and handle small differences with defined thresholds.", icon: "MessageSquareText" },
            { name: "Dynamic column mapping", description: "Align your purchase register headers with the tool's data fields.", icon: "Table" },
            { name: "Multi-currency support", description: "Verify transactions across different currencies.", icon: "Globe" },
            { name: "Audit-ready reports", description: "Generate shareable discrepancy reports, open linked PDFs directly in the browser, and attach them to the audit file.", icon: "FileOutput" },
            { name: "Partial match management", description: "Identify partial matches where certain fields align while minor discrepancies appear in tax amounts or dates.", icon: "ListChecks" },
            { name: "Dashboard & tracking", description: "See overall verification status, track matched, partial, and mismatched items, and monitor audit progress easily.", icon: "ChartBar" },
            { name: "Secure by design", description: "Data stays within your environment. Built for audit-level data security.", icon: "Lock" },
          ],
        },
      ],
    },
  ],
  workflow: {
    title: "From ingestion to audit-ready reporting",
    steps: [
      { title: "Data ingestion", body: "Import the purchase register and upload scanned invoices, POs, and GRNs in one go." },
      { title: "Intelligent matching", body: "AI standardizes headers and reconciles registers with documents at row and column level." },
      { title: "Review", body: "Matched, partial, and mismatched items are shown line by line with a side-by-side viewer." },
      { title: "Validation", body: "Reviewers add remarks, apply thresholds for minor differences, and approve." },
      { title: "Reporting", body: "Shareable discrepancy reports and linked PDFs become audit-ready evidence." },
    ],
  },
  audience: {
    title: "Designed for high-volume purchase verification",
    items: [
      {
        title: "Audit firms",
        body: "Praszo Match is designed specifically for audit firms handling high volumes of purchase verification, helping them improve accuracy, reduce manual effort, and complete audits more efficiently.",
        icon: "Building",
      },
      {
        title: "Audit teams in the field",
        body: "Verification runs on 100% of transactions with mismatches flagged in detail, reducing the risk of human error or missed entries.",
        icon: "Users",
      },
    ],
  },
  faq: [
    {
      q: "What is Praszo Match?",
      a: "Praszo Match is an AI purchase vouching solution that automates purchase verification by matching invoices with registers, POs, and GRNs to identify discrepancies instantly.",
    },
    {
      q: "Who is Praszo Match designed for?",
      a: "Praszo Match is designed specifically for audit firms handling high volumes of purchase verification, helping them improve accuracy, reduce manual effort, and complete audits more efficiently.",
    },
    {
      q: "How does AI purchase vouching improve audit accuracy?",
      a: "AI purchase vouching verifies 100% of transactions, flags mismatches at a detailed level, and reduces the risk of human error or missed entries.",
    },
    {
      q: "Can Praszo Match generate audit-ready reports?",
      a: "Yes. It provides detailed reports of matched, mismatched, and partially matched transactions for easy audit documentation.",
    },
  ],
  cta: {
    title: "Verify every transaction with confidence",
    body: "Eliminate manual errors, accelerate audit cycles, and generate audit-ready evidence with AI-powered purchase reconciliation.",
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
    order: 3,
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
