import { workflowProducts } from "@/data/products";

type Props = {
  /** When set, only that layer is fully visible (static snapshot for the stacked fallback). */
  activeLayer?: number;
  className?: string;
};

const ink = "#1a1d20";
const muted = "#94a3b8";
const line = "#e2e8f0";

/**
 * Six-layer SVG for the audit workflow tour. Layer 0 is the client's raw data;
 * layers 1–5 follow the Praszo workflow order (Modifi, Practice, Docs, Match, Verifi).
 * Elements marked data-stroke are drawn with stroke-dashoffset by the tour engine.
 */
export function WorkflowCanvas({ activeLayer, className }: Props) {
  const colors = workflowProducts.map((product) => product.color);
  const opacity = (index: number) =>
    activeLayer === undefined ? (index === 0 ? 1 : 0) : index === activeLayer ? 1 : 0;

  return (
    <svg
      viewBox="0 0 720 520"
      className={className}
      role="img"
      aria-hidden
      focusable="false"
      data-tour-canvas
    >
      <defs>
        <pattern id="tour-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke={line} strokeWidth="1" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="720" height="520" rx="28" fill="#ffffff" />
      <rect x="0" y="0" width="720" height="520" rx="28" fill="url(#tour-grid)" opacity="0.7" />

      {/* Pipeline spine drawn across the tour */}
      <path
        data-tour-path
        d="M60 460 C 160 460, 150 300, 250 300 S 400 120, 520 160 S 660 320, 660 80"
        fill="none"
        stroke="#0c8080"
        strokeWidth="2"
        strokeDasharray="6 8"
        opacity="0.35"
      />
      <circle data-tour-dot r="7" fill="#f55d48" stroke="#ffffff" strokeWidth="3" />

      {/* Layer 0: client raw data */}
      <g data-layer="0" style={{ opacity: opacity(0) }}>
        <g transform="translate(120 120) rotate(-6)">
          <rect width="220" height="150" rx="12" fill="#ffffff" stroke={line} />
          {[0, 1, 2, 3, 4].map((row) => (
            <g key={row} transform={`translate(16 ${22 + row * 24})`}>
              <rect width="60" height="10" rx="3" fill="#e2e8f0" />
              <rect x="72" width="40" height="10" rx="3" fill={row === 2 ? "#ffe4df" : "#e2e8f0"} />
              <rect x="124" width="64" height="10" rx="3" fill={row === 3 ? "#ffe4df" : "#f1f5f9"} />
            </g>
          ))}
          <text x="16" y="140" fontSize="11" fontWeight="700" fill={muted}>
            TB_v3_FINAL(2).xlsx
          </text>
        </g>
        <g transform="translate(380 190) rotate(5)">
          <rect width="200" height="130" rx="12" fill="#ffffff" stroke={line} />
          <rect x="16" y="20" width="120" height="10" rx="3" fill="#e2e8f0" />
          <rect x="16" y="40" width="160" height="8" rx="3" fill="#f1f5f9" />
          <rect x="16" y="56" width="140" height="8" rx="3" fill="#f1f5f9" />
          <rect x="16" y="72" width="100" height="8" rx="3" fill="#ffe4df" />
          <text x="16" y="112" fontSize="11" fontWeight="700" fill={muted}>
            ledger_scan_017.pdf
          </text>
        </g>
        <g transform="translate(300 330)">
          <rect width="170" height="56" rx="12" fill="#fff5f3" stroke="#f55d48" strokeDasharray="4 4" />
          <text x="18" y="33" fontSize="12" fontWeight="700" fill="#f55d48">
            Missing evidence · VLOOKUP #N/A
          </text>
        </g>
      </g>

      {/* Layer 1: Modifi — engagement letter signed */}
      <g data-layer="1" style={{ opacity: opacity(1) }}>
        <g transform="translate(200 90)">
          <rect width="320" height="340" rx="16" fill="#ffffff" stroke={line} />
          <rect x="28" y="28" width="150" height="12" rx="4" fill={colors[0]} opacity="0.9" />
          <rect x="28" y="56" width="264" height="8" rx="3" fill="#e2e8f0" />
          <rect x="28" y="72" width="240" height="8" rx="3" fill="#e2e8f0" />
          <rect x="28" y="88" width="256" height="8" rx="3" fill="#e2e8f0" />
          <rect x="28" y="116" width="120" height="22" rx="6" fill="#e6eeff" />
          <text x="38" y="131" fontSize="11" fontWeight="700" fill={colors[0]}>
            {"{{client.name}}"}
          </text>
          <rect x="160" y="116" width="100" height="22" rx="6" fill="#e6eeff" />
          <text x="170" y="131" fontSize="11" fontWeight="700" fill={colors[0]}>
            {"{{fee}}"}
          </text>
          <rect x="28" y="156" width="264" height="8" rx="3" fill="#e2e8f0" />
          <rect x="28" y="172" width="200" height="8" rx="3" fill="#e2e8f0" />
          <rect x="28" y="206" width="264" height="48" rx="8" fill="#f8fafc" stroke={line} />
          <text x="40" y="225" fontSize="10" fontWeight="700" fill={muted}>
            PROTECTED CLAUSE · LOCKED
          </text>
          <rect x="40" y="234" width="200" height="6" rx="3" fill="#e2e8f0" />
          <path data-stroke d="M40 300 C 70 270, 90 320, 120 290 S 160 300, 190 285" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" />
          <line x1="28" y1="312" x2="292" y2="312" stroke={line} />
          <text x="28" y="330" fontSize="10" fill={muted}>
            Partner signature
          </text>
        </g>
        <g transform="translate(470 70)">
          <rect width="110" height="34" rx="17" fill={colors[0]} />
          <text x="22" y="22" fontSize="12" fontWeight="800" fill="#ffffff">
            ✓ SIGNED
          </text>
        </g>
      </g>

      {/* Layer 2: Practice — board + time */}
      <g data-layer="2" style={{ opacity: opacity(2) }}>
        <g transform="translate(90 100)">
          <rect width="540" height="320" rx="16" fill="#ffffff" stroke={line} />
          <rect x="0" y="0" width="540" height="44" rx="16" fill="#f8fafc" />
          <rect x="20" y="16" width="110" height="12" rx="4" fill={colors[1]} />
          <rect x="400" y="12" width="120" height="20" rx="10" fill={colors[1]} opacity="0.15" />
          <text x="414" y="26" fontSize="10" fontWeight="700" fill={colors[1]}>
            Week 41 · 142/200 h
          </text>
          {[0, 1, 2].map((col) => (
            <g key={col} transform={`translate(${20 + col * 172} 64)`}>
              <text x="0" y="12" fontSize="10" fontWeight="700" fill={muted}>
                {["PLANNING", "FIELDWORK", "REVIEW"][col]}
              </text>
              {[0, 1, 2].map((card) => (
                <g key={card} transform={`translate(0 ${26 + card * 62})`}>
                  <rect width="156" height="52" rx="8" fill="#ffffff" stroke={line} />
                  <rect x="12" y="12" width={90 - card * 10} height="8" rx="3" fill="#e2e8f0" />
                  <rect x="12" y="28" width="40" height="12" rx="6" fill={colors[1]} opacity={0.15 + card * 0.1} />
                  <circle cx="136" cy="34" r="8" fill="#f1f5f9" stroke={line} />
                </g>
              ))}
            </g>
          ))}
          <path data-stroke d="M196 118 L 196 290" fill="none" stroke={colors[1]} strokeWidth="2" strokeDasharray="3 5" />
          <path data-stroke d="M368 118 L 368 290" fill="none" stroke={colors[1]} strokeWidth="2" strokeDasharray="3 5" />
        </g>
      </g>

      {/* Layer 3: Docs — governed repository */}
      <g data-layer="3" style={{ opacity: opacity(3) }}>
        <g transform="translate(110 90)">
          <rect width="500" height="340" rx="16" fill="#ffffff" stroke={line} />
          <rect x="0" y="0" width="150" height="340" rx="16" fill="#f8fafc" />
          {[0, 1, 2, 3, 4].map((row) => (
            <g key={row} transform={`translate(20 ${30 + row * 40})`}>
              <rect width="18" height="14" rx="3" fill={row === 1 ? colors[2] : "#cbd5e1"} />
              <rect x="26" y="3" width={70 + (row % 2) * 20} height="8" rx="3" fill={row === 1 ? colors[2] : "#e2e8f0"} />
            </g>
          ))}
          {[0, 1, 2, 3].map((row) => (
            <g key={row} transform={`translate(176 ${30 + row * 70})`}>
              <rect width="300" height="54" rx="10" fill="#ffffff" stroke={line} />
              <rect x="14" y="12" width="26" height="30" rx="4" fill="#fdeaea" stroke={colors[2]} />
              <rect x="52" y="14" width="130" height="9" rx="3" fill="#e2e8f0" />
              <rect x="52" y="32" width="50" height="12" rx="6" fill="#fdeaea" />
              <rect x="108" y="32" width="64" height="12" rx="6" fill="#f1f5f9" />
              <text x="232" y="34" fontSize="10" fontWeight="700" fill={muted}>
                v{row + 1}
              </text>
            </g>
          ))}
          <path data-stroke d="M150 50 L 176 50" fill="none" stroke={colors[2]} strokeWidth="2" />
          <path data-stroke d="M150 120 L 176 120" fill="none" stroke={colors[2]} strokeWidth="2" />
          <path data-stroke d="M150 190 L 176 190" fill="none" stroke={colors[2]} strokeWidth="2" />
          <path data-stroke d="M150 260 L 176 260" fill="none" stroke={colors[2]} strokeWidth="2" />
        </g>
        <g transform="translate(470 70)">
          <rect width="140" height="34" rx="17" fill={colors[2]} />
          <text x="18" y="22" fontSize="12" fontWeight="800" fill="#ffffff">
            ON-PREMISE
          </text>
        </g>
      </g>

      {/* Layer 4: Match — three-way match */}
      <g data-layer="4" style={{ opacity: opacity(4) }}>
        <g transform="translate(80 120)">
          <rect width="200" height="280" rx="14" fill="#ffffff" stroke={line} />
          <text x="18" y="28" fontSize="10" fontWeight="700" fill={muted}>
            PURCHASE REGISTER
          </text>
          {[0, 1, 2, 3, 4, 5].map((row) => (
            <g key={row} transform={`translate(18 ${48 + row * 36})`}>
              <rect width="164" height="26" rx="6" fill={row === 2 ? "#fff1e3" : "#f8fafc"} stroke={row === 2 ? colors[3] : line} />
              <rect x="10" y="9" width="60" height="8" rx="3" fill="#e2e8f0" />
              <rect x="100" y="9" width="48" height="8" rx="3" fill="#e2e8f0" />
            </g>
          ))}
        </g>
        {[0, 1, 2].map((doc) => (
          <g key={doc} transform={`translate(400 ${100 + doc * 112})`}>
            <rect width="220" height="92" rx="12" fill="#ffffff" stroke={line} />
            <text x="16" y="24" fontSize="10" fontWeight="700" fill={muted}>
              {["INVOICE", "PURCHASE ORDER", "GOODS RECEIPT"][doc]}
            </text>
            <rect x="16" y="36" width="120" height="8" rx="3" fill="#e2e8f0" />
            <rect x="16" y="52" width="90" height="8" rx="3" fill="#e2e8f0" />
            <rect x="150" y="56" width="54" height="20" rx="10" fill={doc === 1 ? "#fff1e3" : "#dcfce7"} />
            <text x="160" y="70" fontSize="10" fontWeight="800" fill={doc === 1 ? colors[3] : "#16a34a"}>
              {doc === 1 ? "85%" : "MATCH"}
            </text>
          </g>
        ))}
        <path data-stroke d="M262 253 C 320 253, 330 146, 400 146" fill="none" stroke={colors[3]} strokeWidth="2.5" />
        <path data-stroke d="M262 253 C 330 253, 330 258, 400 258" fill="none" stroke={colors[3]} strokeWidth="2.5" />
        <path data-stroke d="M262 253 C 320 253, 330 370, 400 370" fill="none" stroke={colors[3]} strokeWidth="2.5" />
      </g>

      {/* Layer 5: Verifi — validated statements */}
      <g data-layer="5" style={{ opacity: opacity(5) }}>
        <g transform="translate(90 100)">
          <rect width="250" height="320" rx="14" fill="#ffffff" stroke={line} />
          <text x="18" y="28" fontSize="10" fontWeight="700" fill={muted}>
            BALANCE SHEET
          </text>
          {[0, 1, 2, 3, 4, 5, 6].map((row) => (
            <g key={row} transform={`translate(18 ${46 + row * 36})`}>
              <rect width="130" height="8" rx="3" fill="#e2e8f0" />
              <rect x="160" width="54" height="8" rx="3" fill={row === 2 || row === 5 ? "#dcfce7" : "#e2e8f0"} />
            </g>
          ))}
        </g>
        <g transform="translate(380 100)">
          <rect width="250" height="320" rx="14" fill="#ffffff" stroke={line} />
          <text x="18" y="28" fontSize="10" fontWeight="700" fill={muted}>
            NOTES TO ACCOUNTS
          </text>
          {[0, 1, 2, 3, 4, 5, 6].map((row) => (
            <g key={row} transform={`translate(18 ${46 + row * 36})`}>
              <rect width="150" height="8" rx="3" fill="#e2e8f0" />
              <rect x="170" width="44" height="8" rx="3" fill={row === 1 || row === 4 ? "#dcfce7" : "#e2e8f0"} />
            </g>
          ))}
        </g>
        <path data-stroke d="M340 222 C 360 222, 360 186, 380 186" fill="none" stroke={colors[4]} strokeWidth="2.5" />
        <path data-stroke d="M340 330 C 360 330, 360 294, 380 294" fill="none" stroke={colors[4]} strokeWidth="2.5" />
        <g transform="translate(270 40)">
          <rect width="180" height="40" rx="20" fill={colors[4]} />
          <text x="22" y="26" fontSize="13" fontWeight="800" fill="#ffffff">
            ✓ VALIDATED · PASS
          </text>
        </g>
      </g>
    </svg>
  );
}
