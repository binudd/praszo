export const site = {
  name: "Binu",
  legalName: "Binu E",
  title: "Design-minded Frontend Engineer",
  descriptor: "UI/UX Designer · Frontend Engineer · Product Thinker",
  company: "DifinityDigital",
  promise: "I connect visual design, interaction, and frontend engineering to build thoughtful digital experiences.",
  eyebrow: "BINU / DESIGN × ENGINEERING",
  headline: "From pixels to products.",
  supporting:
    "I connect visual design, interaction, and frontend engineering to build thoughtful digital experiences.",
  summary:
    "I'm Binu, a UI/UX designer and frontend developer with 9 years of overall professional experience. I bring product thinking, visual design, and hands-on implementation together to turn complex requirements into clear, usable digital experiences.",
  /**
   * Leave empty until a verified public address is confirmed.
   * LinkedIn is the primary contact action when email is unset.
   */
  email: "",
  linkedin: "https://www.linkedin.com/in/binu-e-83a323139",
  github: "https://github.com/binuboston",
  behance: "https://www.behance.net/binuboston",
  resumeHref: "/binu-resume.pdf",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export const experienceFacts = [
  {
    years: "9",
    label: "Overall professional experience",
    note: "Across design, frontend, and product work.",
  },
  {
    years: "5",
    label: "UI/UX design experience",
    note: "Research, interface structure, and visual systems.",
  },
  {
    years: "6",
    label: "HTML and CSS experience",
    note: "Layout, responsiveness, and production styling.",
  },
  {
    years: "4",
    label: "React and frontend development",
    note: "Application UI, state, and component architecture.",
  },
] as const;

export const capabilityChapters = [
  {
    id: "01",
    title: "Visual design and UX",
    body: "Hierarchy, interaction, and the decisions that make an interface feel clear before a line of application code is written.",
  },
  {
    id: "02",
    title: "Web foundations",
    body: "HTML and CSS as a long-term craft: structure, responsive behavior, and the details that hold up in real products.",
  },
  {
    id: "03",
    title: "React and application development",
    body: "Components, application state, and the work of turning a designed flow into something a team can ship and maintain.",
  },
  {
    id: "04",
    title: "Complex product workflows",
    body: "Multi-module products, shared layouts, navigation, and the cost of inconsistency as a system grows.",
  },
  {
    id: "05",
    title: "AI-assisted engineering",
    body: "Using AI to move faster through exploration and implementation, then reviewing, testing, and deciding what actually belongs.",
  },
] as const;

export const technicalPrinciples = [
  {
    title: "Reusable architecture",
    body: "Shared components should solve repeated problems without hiding important behavior behind unnecessary abstractions. WorkspaceSplit and SidePanel exist because the same layout problem kept appearing across PMS modules.",
  },
  {
    title: "Clear responsibilities",
    body: "Separate state, composition, and presentation where that split makes the next change safer. In Timesheet, the hook owns state, the view composes, and the list content only renders.",
  },
  {
    title: "Consistent interactions",
    body: "Navigation, panels, forms, loading, errors, and empty states should behave predictably. Weekly Log became a workspace mode instead of a dialog over the same screen for that reason.",
  },
  {
    title: "Maintainability",
    body: "The goal is not fewer lines for their own sake. It is a structure another developer can understand, change, and test without reconstructing the original author's context.",
  },
] as const;

export const processStages = [
  {
    id: "01",
    title: "Understand",
    body: "Clarify requirements, identify the user problem, map technical constraints, and decide what success actually means.",
  },
  {
    id: "02",
    title: "Design",
    body: "Map the experience, establish interaction patterns, explore interface structure, and find the elements that should be reused.",
  },
  {
    id: "03",
    title: "Engineer",
    body: "Turn the solution into working components, connect application data, keep responsibilities clear, and use the right tools for the job.",
  },
  {
    id: "04",
    title: "Validate",
    body: "Check behavior, responsive layouts, edge cases, accessibility, and whether the implementation will still make sense later.",
  },
] as const;

export const services = [
  {
    title: "Product interface design",
    body: "Clear, consistent web application experiences from requirements and workflows — not disconnected screens.",
  },
  {
    title: "Frontend development",
    body: "Responsive interfaces and reusable React components that hold up as the product grows.",
  },
  {
    title: "Existing product improvements",
    body: "Interface consistency, complex-view refactors, and maintainability work inside software that already exists.",
  },
  {
    title: "Design-to-development collaboration",
    body: "Help teams move from Figma to functional application interfaces without losing the intent of the design.",
  },
  {
    title: "Rapid prototyping",
    body: "Explore and validate product concepts through practical frontend implementation and AI-assisted development.",
  },
] as const;

export const skillGroups = [
  {
    title: "Design and product",
    note: "The longest-standing foundation.",
    items: [
      "UI/UX design",
      "Figma",
      "Wireframing and prototyping",
      "Design systems",
      "Interaction design",
      "Responsive design",
    ],
  },
  {
    title: "Frontend engineering",
    note: "Day-to-day implementation work.",
    items: [
      "HTML and CSS",
      "Tailwind CSS",
      "JavaScript",
      "React",
      "Next.js",
      "TypeScript",
      "Component architecture",
    ],
  },
  {
    title: "Application state and data",
    note: "Used where the product required them.",
    items: [
      "Redux Toolkit",
      "Zustand",
      "TanStack Query",
      "REST API integration",
      "Frontend data handling",
    ],
  },
  {
    title: "Backend and CMS familiarity",
    note: "Enough to collaborate and ship, not a specialist claim.",
    items: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "WordPress",
      "Strapi",
    ],
  },
  {
    title: "AI-assisted development",
    note: "About one year of practical use on real work.",
    items: [
      "AI coding workflows",
      "Rapid prototyping",
      "Iterative implementation",
      "Code review and validation",
    ],
  },
] as const;

export const navItems = [
  { href: "/#work", label: "Work", id: "work" },
  { href: "/story", label: "Story", id: "story" },
  { href: "/#contact", label: "Contact", id: "contact" },
  { href: "/binu-resume.pdf", label: "Resume", id: "resume" },
] as const;

export function primaryContactHref() {
  return site.email ? `mailto:${site.email}` : site.linkedin;
}
