const annotations = [
  {
    title: "Hierarchy over decoration",
    body: "The week, the entries, and the action to log time have to read in that order. Accent is reserved for the action that changes the record, not for chrome.",
  },
  {
    title: "The panel is part of the workspace",
    body: "A form that covers the grid asks the user to remember what they were looking at. An in-layout panel keeps context visible while they fill the log.",
  },
  {
    title: "Empty and disabled states",
    body: "If a completed project cannot accept time, the add action stays visible and explains why. Hiding it looks cleaner and fails the user.",
  },
  {
    title: "Responsive fallback",
    body: "The split is a large-screen decision. Below that breakpoint the same form becomes an overlay so queries are not mounted twice.",
  },
];

export function DesignEng() {
  return (
    <section className="border-t border-line px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-medium tracking-[0.22em] text-ink-3 uppercase">
          Design thinking
        </p>
        <h2 className="mt-4 max-w-3xl font-serif text-4xl text-ink md:text-5xl">
          Design is part of how I engineer.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-2">
          UI/UX work shows up in implementation decisions: what is emphasized,
          what stays visible, how a layout behaves when a panel opens, and
          whether a state is honest. The Timesheet workspace is the clearest
          recent example.
        </p>
        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="border border-line bg-surface p-6">
            <p className="text-[11px] tracking-[0.16em] text-ink-3 uppercase">
              Annotated interface — Timesheet
            </p>
            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <span className="text-ink">Timesheet</span>
                <span className="bg-accent px-2 py-1 text-[10px] tracking-[0.12em] text-accent-ink uppercase">
                  Add time log
                </span>
              </div>
              <div className="grid grid-cols-[1fr_8rem] gap-3">
                <div className="space-y-2">
                  <div className="h-8 border border-line" />
                  <div className="h-8 border border-accent/50 bg-elevated" />
                  <div className="h-8 border border-line" />
                  <p className="pt-2 text-[12px] text-ink-3">
                    Selected row stays in view while the panel opens.
                  </p>
                </div>
                <div className="border border-accent/60 p-2">
                  <p className="text-[11px] text-accent">Panel</p>
                  <div className="mt-2 h-16 border border-line" />
                  <div className="mt-2 h-6 bg-accent" />
                </div>
              </div>
            </div>
          </div>
          <ol className="space-y-6">
            {annotations.map((item, index) => (
              <li key={item.title}>
                <p className="text-[11px] tracking-[0.16em] text-accent uppercase">
                  0{index + 1}
                </p>
                <h3 className="mt-2 text-lg text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-12 max-w-3xl text-sm leading-relaxed text-ink-3">
          The same judgment applies to accessibility and communication: visible
          focus, labels that describe the action, and the ability to explain a
          design decision to the person implementing the next module — or to
          implement it myself.
        </p>
      </div>
    </section>
  );
}
