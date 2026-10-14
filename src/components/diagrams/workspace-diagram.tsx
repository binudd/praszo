export function WorkspaceDiagram() {
  return (
    <figure>
      <svg
        viewBox="0 0 720 280"
        role="img"
        aria-label="Simplified workspace layout: main content beside an in-layout side panel"
        className="h-auto w-full border border-line bg-surface"
      >
        <rect x="16" y="16" width="688" height="36" fill="#191918" stroke="#292925" />
        <text x="32" y="39" fill="#A09F98" fontSize="12" fontFamily="Archivo, sans-serif">
          Dashboard shell — header stays put
        </text>
        <rect x="16" y="64" width="430" height="200" fill="#121211" stroke="#292925" />
        <text x="32" y="92" fill="#F2F0EA" fontSize="14" fontFamily="Archivo, sans-serif">
          Main content
        </text>
        <text x="32" y="116" fill="#6D6D66" fontSize="12" fontFamily="Archivo, sans-serif">
          TimesheetListContent scrolls here
        </text>
        <rect x="32" y="136" width="382" height="18" fill="none" stroke="#292925" />
        <rect x="32" y="164" width="300" height="18" fill="none" stroke="#292925" />
        <rect x="32" y="192" width="340" height="18" fill="none" stroke="#292925" />
        <rect x="458" y="64" width="246" height="200" fill="#191918" stroke="#C5F467" />
        <text x="474" y="92" fill="#C5F467" fontSize="14" fontFamily="Archivo, sans-serif">
          SidePanel
        </text>
        <text x="474" y="114" fill="#A09F98" fontSize="11" fontFamily="Archivo, sans-serif">
          Header
        </text>
        <rect x="474" y="128" width="214" height="88" fill="none" stroke="#292925" />
        <text x="486" y="178" fill="#6D6D66" fontSize="11" fontFamily="Archivo, sans-serif">
          Scrollable body
        </text>
        <rect x="474" y="228" width="214" height="24" fill="#C5F467" />
        <text x="486" y="245" fill="#14150D" fontSize="11" fontFamily="Archivo, sans-serif">
          Footer / save
        </text>
      </svg>
      <figcaption className="mt-3 text-[12px] text-ink-3">
        Illustrative workspace diagram — the panel takes real width so the main
        pane can keep working.
      </figcaption>
    </figure>
  );
}
