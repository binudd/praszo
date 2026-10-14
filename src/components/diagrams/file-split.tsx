import { timesheetRefactor } from "@/content/projects";

export function FileSplit() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="border border-line bg-surface p-5">
        <p className="text-[11px] tracking-[0.18em] text-ink-3 uppercase">Before</p>
        <p className="mt-4 font-mono text-sm text-ink">timesheet-view.tsx</p>
        <p className="mt-2 font-serif text-4xl text-ink">{timesheetRefactor.beforeLines}</p>
        <p className="mt-2 text-sm text-ink-2">
          One file held state, layout, list rendering, panel chrome, and form
          behavior. Changes to any of those required reading all of them.
        </p>
      </div>
      <div className="border border-accent/40 bg-surface p-5">
        <p className="text-[11px] tracking-[0.18em] text-accent uppercase">After</p>
        <ul className="mt-4 space-y-2 font-mono text-sm text-ink">
          <li>{timesheetRefactor.compositionFile}</li>
          <li>{timesheetRefactor.stateFile}</li>
          <li>{timesheetRefactor.displayFile}</li>
          <li>WorkspaceSplit / SidePanel</li>
          <li>LogTimeForm · WeeklyLogWorkspace</li>
        </ul>
        <p className="mt-4 font-serif text-4xl text-ink">{timesheetRefactor.afterLines}</p>
        <p className="mt-2 text-sm text-ink-2">
          Lines remaining in the composition layer. Fewer lines is a side effect,
          not a performance claim.
        </p>
      </div>
    </div>
  );
}
