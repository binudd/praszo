import { ArchitectureTree } from "@/components/diagrams/architecture-tree";
import { FileSplit } from "@/components/diagrams/file-split";
import { WorkspaceDiagram } from "@/components/diagrams/workspace-diagram";
import { PmsGate } from "@/components/sections/pms-gate";

const decisions = [
  {
    title: "What made the original view hard to maintain",
    body: "The Timesheet screen had become a single place where filters, week/day mode, list rendering, log-time chrome, confirmations, and host-mode branching all lived together. A change to the form or the empty state meant reading a file that also owned application state. That is a product problem as much as a code problem: the next module would copy the same tangle.",
  },
  {
    title: "Separating state, composition, and presentation",
    body: "useTimesheetView became the state hub. TimesheetListContent became the display surface. timesheet-view.tsx stayed as the composition layer — deciding which host mode is active, which log-time surface mounts, and what the dashboard header should show. Each file now has a reason to change that the others do not share.",
  },
  {
    title: "Shared layout primitives",
    body: "WorkspaceSplit gives the main pane and the side panel real layout space. The panel is not an overlay with a backdrop. SidePanel standardizes header, independently scrolling body, and pinned footer. Those primitives were extracted because the same workspace recipe kept appearing — not to invent a design system for its own sake.",
  },
  {
    title: "Weekly Log as a mode, not a dialog",
    body: "Logging a full week needs width. Treating it as a dialog over the existing grid hid the workspace the user was already in and fought the shell's scroll. WeeklyLogWorkspace replaces the list as the primary content. Cancel and save live in that mode's chrome. Returning to the list restores the daily actions automatically.",
  },
  {
    title: "Shell scrolling",
    body: "The workspace row has to sit inside a height-constrained flex column. If the row sizes from its content, neither pane receives a bound and the page grows instead of the list scrolling. The split uses flex: 1 1 0 and minHeight: 0 so each pane scrolls itself.",
  },
  {
    title: "What was validated",
    body: "The product's verification path is TypeScript, formatting, Playwright end-to-end coverage, and a manual pass through Timesheet, Weekly Log, and embedded host modes. I do not treat the line-count drop as a performance result. It is a maintainability result: the composition file can be read without reconstructing the entire feature.",
  },
];

export function PmsStudy() {
  return (
    <section id="praszo-pms" className="border-t border-line px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <PmsGate />

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <FileSplit />
          <div className="space-y-5 text-sm leading-relaxed text-ink-2">
            {decisions.slice(0, 2).map((item) => (
              <div key={item.title}>
                <h3 className="text-ink">{item.title}</h3>
                <p className="mt-2">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <ArchitectureTree />
          <WorkspaceDiagram />
        </div>

        <ol className="mt-16 grid gap-8 md:grid-cols-2">
          {decisions.slice(2).map((item, index) => (
            <li key={item.title} className="border-t border-line pt-5">
              <p className="text-[11px] tracking-[0.16em] text-accent uppercase">
                0{index + 3}
              </p>
              <h3 className="mt-3 text-lg text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">{item.body}</p>
            </li>
          ))}
        </ol>

        <aside className="mt-16 border border-line bg-surface p-6 md:p-8">
          <p className="text-[11px] tracking-[0.18em] text-ink-3 uppercase">
            Completed versus proposed
          </p>
          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-ink">Completed</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink-2">
                <li>Timesheet view split into state, composition, and display.</li>
                <li>WorkspaceSplit and SidePanel extracted as shared primitives.</li>
                <li>LogTime form separated from surrounding chrome.</li>
                <li>Weekly Log implemented as a workspace mode.</li>
                <li>Shell scrolling addressed so panes scroll independently.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-ink">Not claimed here</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink-2">
                <li>Business outcomes or performance gains from fewer lines.</li>
                <li>Ownership of the full PMS codebase or API design.</li>
                <li>Confidential client data, metrics, or unreleased features.</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
