import { timesheetRefactor } from "@/content/projects";

export function ArchitectureTree() {
  return (
    <ol className="divide-y divide-line border border-line">
      {timesheetRefactor.tree.map((node, index) => (
        <li key={node.name} className="grid gap-3 px-4 py-4 md:grid-cols-[11rem_1fr] md:px-5">
          <div>
            <p className="text-[11px] tracking-[0.16em] text-ink-3 uppercase">
              {index === 0 ? "Root" : `Child 0${index}`}
            </p>
            <p className="mt-1 font-mono text-[13px] text-accent">{node.name}</p>
          </div>
          <p className="text-sm leading-relaxed text-ink-2">{node.role}</p>
        </li>
      ))}
    </ol>
  );
}
