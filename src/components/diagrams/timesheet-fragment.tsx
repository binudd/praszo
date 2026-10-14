export function TimesheetFragment() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const rows = [
    ["Design review", "2.0", "1.5", "—", "3.0", "1.0"],
    ["Timesheet QA", "1.0", "2.5", "2.0", "—", "1.5"],
    ["Nav state work", "—", "3.0", "1.5", "2.0", "2.0"],
  ];

  return (
    <figure className="overflow-hidden bg-surface">
      <div className="flex items-center justify-between border-b border-line px-4 py-3 text-[11px] tracking-[0.16em] text-ink-3 uppercase">
        <span>Timesheet workspace</span>
        <span>Reconstructed fragment</span>
      </div>
      <div className="grid min-h-[280px] lg:grid-cols-[minmax(0,1fr)_17rem]">
        <div className="min-w-0 border-b border-line lg:border-r lg:border-b-0">
          <div className="flex items-center justify-between px-4 py-3">
            <p className="text-sm text-ink">Week of 6 Oct</p>
            <span className="border border-accent px-2 py-1 text-[10px] tracking-[0.14em] text-accent uppercase">
              List mode
            </span>
          </div>
          <table className="w-full text-left text-[12px]">
            <thead className="text-ink-3">
              <tr className="border-y border-line">
                <th className="px-4 py-2 font-medium">Entry</th>
                {days.map((day) => (
                  <th key={day} className="px-2 py-2 font-medium">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[0]} className="border-b border-line/80 text-ink-2">
                  {row.map((cell, index) => (
                    <td
                      key={`${row[0]}-${cell}-${index}`}
                      className={`px-2 py-2 ${index === 0 ? "px-4 text-ink" : ""}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <aside className="flex min-h-[220px] flex-col">
          <div className="border-b border-line px-4 py-3 text-sm text-ink">Log time</div>
          <div className="flex-1 space-y-3 px-4 py-4">
            <div className="h-8 border border-line bg-elevated" />
            <div className="h-8 border border-line bg-elevated" />
            <div className="h-16 border border-line bg-elevated" />
          </div>
          <div className="mt-auto border-t border-line px-4 py-3">
            <div className="h-8 bg-accent" />
          </div>
        </aside>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-[12px] leading-relaxed text-ink-3">
        Illustrative reconstruction of the implemented Timesheet structure — not a
        production screenshot. Main grid stays usable while the side panel occupies
        real layout space.
      </figcaption>
    </figure>
  );
}
