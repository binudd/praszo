export type ProjectStatus = "completed" | "in-progress";

export type Project = {
  slug: string;
  index: string;
  title: string;
  category: string;
  technologies: string[];
  summary: string;
  href: string;
  role: string;
  challenge: string;
  approach: string;
  status: ProjectStatus;
  statusNote: string;
};

export const projects: Project[] = [
  {
    slug: "praszo-pms",
    index: "01",
    title: "Praszo PMS",
    category: "Enterprise Product Engineering",
    technologies: ["React", "TypeScript", "TanStack Query", "Zustand"],
    summary:
      "A multi-module project management product where interface consistency, shared layout, and maintainable frontend structure matter as much as visual polish. Flagship work: the Timesheet module refactor.",
    href: "/#praszo-pms",
    role: "Frontend engineering on a multi-module product — Timesheet architecture, shared workspace primitives, and interface consistency.",
    challenge:
      "Timesheet had become a 1,030-line view where filters, modes, list rendering, and log-time chrome lived together. The next change meant reading a file that also owned application state.",
    approach:
      "Separated composition, state, and presentation: TimesheetView composes, useTimesheetView owns state, TimesheetListContent only renders. WorkspaceSplit and SidePanel exist because the same two-pane layout kept appearing across modules.",
    status: "completed",
    statusNote: "Documented Timesheet refactor and shared workspace primitives.",
  },
  {
    slug: "qa-review-portal",
    index: "02",
    title: "QA Review Portal",
    category: "Application Engineering",
    technologies: ["Next.js", "TypeScript", "shadcn/ui", "Redux Toolkit"],
    summary:
      "A review-workflow application with role-based surfaces, structured information, and reusable interface components. Built to make QA review work clearer — not to look like a marketing site.",
    href: "/#qa-review",
    role: "Application engineering on a review-workflow product — structured information, role-based surfaces, and reusable interface components.",
    challenge:
      "QA review work needed clearer structure without turning the product into a marketing site.",
    approach:
      "Role-based surfaces, reusable components, and Next.js implementation. The work is in progress — implementation evidence exists; it is not claimed as fully production-ready.",
    status: "in-progress",
    statusNote: "Implementation evidence exists; not claimed as fully production-ready.",
  },
];

export const timesheetRefactor = {
  beforeLines: 1030,
  afterLines: 374,
  compositionFile: "view/timesheet-view.tsx",
  stateFile: "view/use-timesheet-view.ts",
  displayFile: "view/timesheet-list-content.tsx",
  tree: [
    {
      name: "TimesheetView",
      role: "Composition layer. Host-mode branching, header actions, confirms, and which surface is mounted.",
    },
    {
      name: "useTimesheetView",
      role: "State hub. Filters, view mode, date range, loading, and the handlers the surface should not own.",
    },
    {
      name: "TimesheetListContent",
      role: "Display surface. KPI cards, table, empty states — no orchestration.",
    },
    {
      name: "WorkspaceSplit",
      role: "Shared two-pane layout. Main content occupies real space beside a side panel, not an overlay.",
    },
    {
      name: "SidePanel",
      role: "Header, independently scrolling body, pinned footer. Same shell as a drawer, rendered inline.",
    },
    {
      name: "LogTimeForm",
      role: "The form itself, separated from the chrome that used to wrap it.",
    },
    {
      name: "WeeklyLogWorkspace",
      role: "A Timesheet mode, not a dialog over the existing workspace.",
    },
  ],
} as const;
