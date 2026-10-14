export type EvolutionChapter = {
  id: string;
  index: number;
  kicker: string;
  title: string;
  body: string;
  skills: readonly string[];
  visual: string;
  closing?: {
    headline: string;
    subhead: string;
  };
};

export const evolutionIntro = {
  title: "Every skill became a building block.",
  subtitle:
    "What began as a curiosity about websites gradually expanded into a deeper understanding of design, motion, user experience, and software.",
  lede: "The order is the evolution of craft and thinking — not a timeline of employers, titles, or dates.",
} as const;

export const evolutionChapters: readonly EvolutionChapter[] = [
  {
    id: "01",
    index: 0,
    kicker: "Pixels",
    title: "Visual foundations",
    body: "The work started with how a page looks and holds together — web design, Photoshop, HTML, and CSS. Hierarchy, spacing, and visual precision came before application architecture. Six years of HTML and CSS sit in this foundation: structure, responsiveness, and production styling that still has to survive a real browser.",
    skills: ["Web design", "Photoshop", "HTML", "CSS"],
    visual: "A field of pixels organizes into a simple page composition on a precise grid.",
  },
  {
    id: "02",
    index: 1,
    kicker: "Vectors",
    title: "Graphic construction",
    body: "Vector work turned isolated graphics into assets a product could reuse. Icons, shapes, and outlines had to share proportion, weight, and alignment — a visual language instead of a folder of disconnected images. Individual marks became a consistent system.",
    skills: ["Vector assets", "Icon systems", "Geometric construction"],
    visual: "Pixels resolve into clean paths, icon outlines, and balanced geometric shapes.",
  },
  {
    id: "03",
    index: 2,
    kicker: "Motion",
    title: "Motion design",
    body: "After Effects opened the door from static graphics to timed movement. Bodymovin is the practical bridge for the vector motion that can actually play on the web — not a claim that every After Effects effect survives export. The useful skill is knowing which motion belongs in an interface, and how to sequence it with intent.",
    skills: ["After Effects", "Bodymovin", "Motion sequencing"],
    visual: "Paths pick up easing, trails, and keyframe-like sequencing.",
  },
  {
    id: "04",
    index: 3,
    kicker: "Frontend",
    title: "Frontend development",
    body: "Design had to become a layout the browser could compute. Document structure, CSS layout, and responsive behavior turned compositions into pages that reflow. Six years of HTML and CSS, used in production rather than as a mockup layer — structure, layout, and the relationship between them when the viewport changes.",
    skills: ["HTML", "CSS", "Responsive layout", "Browser implementation"],
    visual: "Artwork becomes structured layout blocks that resize as a composition, not a picture of a browser.",
  },
  {
    id: "05",
    index: 4,
    kicker: "UX",
    title: "UX and product design",
    body: "Five years of UI/UX work shifted the question from how a screen looks to how a person moves through a product. Hierarchy, navigation, design systems, and interaction patterns exist so the next state is not a surprise. Screens become a workflow with connected decisions.",
    skills: ["UI/UX", "Figma", "Design systems", "Interaction design"],
    visual: "Layout reorganizes into connected screens, hierarchy, and navigation paths.",
  },
  {
    id: "06",
    index: 5,
    kicker: "React",
    title: "React engineering",
    body: "Four years of React work means thinking in components, hooks, state, and API integration. A screen is a composition of units with clear ownership — what renders, what holds state, and what talks to the server. Parent structure, focused components, and application state have to stay in relationship.",
    skills: ["React", "TypeScript", "Hooks", "Application state", "REST APIs"],
    visual: "The interface divides into reusable component units with structured connections.",
  },
  {
    id: "07",
    index: 6,
    kicker: "Architecture",
    title: "Product architecture",
    body: "In Praszo PMS, Timesheet was a 1,030-line view. The refactor separated composition, state, and presentation so the module could change without reconstructing the original context: TimesheetView composes, useTimesheetView owns state, TimesheetListContent only renders. WorkspaceSplit and SidePanel exist because the same two-pane layout kept appearing across modules. LogTimeForm is the form, not the chrome around it. 1,030 to 374 is a supporting measure of that split — not the point of it.",
    skills: [
      "TimesheetView",
      "useTimesheetView",
      "TimesheetListContent",
      "WorkspaceSplit",
      "SidePanel",
      "LogTimeForm",
    ],
    visual: "Illustrative Timesheet composition: state logic, composition, and presentation as distinct layers.",
  },
  {
    id: "08",
    index: 7,
    kicker: "Direction",
    title: "Product engineering",
    body: "The separate crafts now point in one direction. I'm building on design and frontend experience to solve broader product engineering problems — using AI-assisted workflows as a practical accelerator, and aiming toward Forward Deployed Engineering: close to the user's actual problem, not only the interface that represents it. That is a professional direction, not a prior FDE role.",
    skills: [
      "AI-assisted engineering",
      "Product systems",
      "Forward Deployed Engineering",
    ],
    visual: "A restrained network connecting user needs, experience, behavior, integrations, and engineering decisions.",
    closing: {
      headline: "From pixels to products. From interfaces to solutions.",
      subhead:
        "I'm building on my design and frontend experience to solve broader product engineering problems.",
    },
  },
];
