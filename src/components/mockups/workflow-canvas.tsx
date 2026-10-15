import { workflowProducts } from "@/data/products";

/*
 * The audit workflow, told as one engagement moving through Praszo. viewBox 720 × 520:
 *   header  (y 24–52)   the same engagement throughout: "Acme Holdings · FY2025 audit";
 *   panel   (y 70–392)  what the current step produces, one [data-layer] per step (0 = raw data,
 *                       1–5 = Modifi, Practice, Docs, Match, Verifi), crossfaded by the tour engine;
 *   track   (y 410–492) six stage nodes; a line fills and the "audit file" token slides from stage
 *                       to stage, its status changing Raw → Signed → Planned → Filed → Matched → Validated.
 * Elements marked data-stroke are drawn with stroke-dashoffset as their step becomes current.
 * Static SVG, no patterns or filters: the engine only writes opacity, scale, x and dashoffset.
 */

const ink = "#121317";
const muted = "#94a3b8";
const line = "#e2e8f0";
const soft = "#f1f5f9";
const surface = "#f8fafc";
const accent = "#f55d48";
const success = "#16a34a";

/** Stage nodes on the track: x positions, labels and the file's status once each is reached. */
export const TOUR_STAGES = [
  { x: 80, label: "Raw data", status: "Raw" },
  { x: 192, label: "Sign", status: "Signed" },
  { x: 304, label: "Plan", status: "Planned" },
  { x: 416, label: "Collect", status: "Filed" },
  { x: 528, label: "Reconcile", status: "Matched" },
  { x: 640, label: "Validate", status: "Validated" },
] as const;

export function WorkflowCanvas({ className }: { className?: string }) {
  const colors = workflowProducts.map((product) => product.color);
  const stageColor = (index: number) => (index === 0 ? accent : colors[index - 1]);
  const first = TOUR_STAGES[0].x;
  const last = TOUR_STAGES[TOUR_STAGES.length - 1].x;

  return (
    <svg viewBox="0 0 720 520" className={className} role="img" aria-hidden focusable="false" data-tour-canvas>
      <rect width="720" height="520" rx="28" fill="#ffffff" />

      {/* One engagement from start to finish */}
      <g transform="translate(32 26)">
        <rect width="232" height="28" rx="14" fill={surface} />
        <circle cx="16" cy="14" r="4" fill={accent} />
        <text x="28" y="18" fontSize="11" fontWeight="700" fill={ink}>
          Acme Holdings · FY2025 audit
        </text>
      </g>

      {/* Layer 0: the client's raw data — scattered, inconsistent, missing evidence */}
      <g data-layer="0" style={{ opacity: 1 }}>
        <g transform="translate(110 96) rotate(-5)">
          <rect width="220" height="150" rx="12" fill="#ffffff" stroke={line} />
          {[0, 1, 2, 3, 4].map((row) => (
            <g key={row} transform={`translate(16 ${20 + row * 22})`}>
              <rect width="60" height="9" rx="3" fill={line} />
              <rect x="72" width="40" height="9" rx="3" fill={row === 2 ? "#ffe4df" : line} />
              <rect x="124" width="64" height="9" rx="3" fill={row === 3 ? "#ffe4df" : soft} />
            </g>
          ))}
          <text x="16" y="138" fontSize="10.5" fontWeight="700" fill={muted}>
            TB_v3_FINAL(2).xlsx
          </text>
        </g>
        <g transform="translate(372 124) rotate(4)">
          <rect width="210" height="132" rx="12" fill="#ffffff" stroke={line} />
          <rect x="16" y="18" width="110" height="9" rx="3" fill={line} />
          <rect x="16" y="38" width="170" height="7" rx="3" fill={soft} />
          <rect x="16" y="53" width="150" height="7" rx="3" fill={soft} />
          <rect x="16" y="68" width="96" height="7" rx="3" fill="#ffe4df" />
          <text x="16" y="114" fontSize="10.5" fontWeight="700" fill={muted}>
            ledger_scan_017.pdf
          </text>
        </g>
        <g transform="translate(232 292)">
          <rect width="256" height="44" rx="12" fill="#fff5f3" stroke={accent} strokeDasharray="4 4" />
          <text x="18" y="27" fontSize="11.5" fontWeight="700" fill={accent}>
            3 issues · missing evidence · #N/A
          </text>
        </g>
      </g>

      {/* Layer 1: Modifi — the engagement letter, filled from client data and signed */}
      <g data-layer="1" style={{ opacity: 0 }}>
        <g transform="translate(200 74)">
          <rect width="320" height="316" rx="16" fill="#ffffff" stroke={line} />
          <rect x="26" y="26" width="140" height="11" rx="4" fill={colors[0]} />
          <rect x="26" y="52" width="268" height="7" rx="3" fill={line} />
          <rect x="26" y="67" width="236" height="7" rx="3" fill={line} />
          {[
            { x: 26, w: 126, text: "Acme Holdings Ltd" },
            { x: 160, w: 58, text: "FY2025" },
            { x: 226, w: 80, text: "AED 48,000" },
          ].map((field) => (
            <g key={field.text} transform={`translate(${field.x} 90)`}>
              <rect width={field.w} height="22" rx="6" fill="#e6eeff" />
              <text x="9" y="15" fontSize="10" fontWeight="700" fill={colors[0]}>
                {field.text}
              </text>
            </g>
          ))}
          <rect x="26" y="130" width="268" height="7" rx="3" fill={line} />
          <rect x="26" y="145" width="200" height="7" rx="3" fill={line} />
          <rect x="26" y="170" width="268" height="44" rx="8" fill={surface} />
          <text x="40" y="188" fontSize="9.5" fontWeight="700" fill={muted}>
            PROTECTED CLAUSE · LOCKED
          </text>
          <rect x="40" y="197" width="190" height="6" rx="3" fill={line} />
          <path
            data-stroke
            d="M34 262 C 60 236, 78 280, 104 256 S 140 246, 160 262 S 196 270, 218 252"
            fill="none"
            stroke={ink}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line x1="26" y1="276" x2="294" y2="276" stroke={line} />
          <text x="26" y="294" fontSize="10" fill={muted}>
            Partner signature · 2 of 2 approvals
          </text>
        </g>
        <g transform="translate(452 60) rotate(6)">
          <rect width="96" height="30" rx="15" fill={colors[0]} />
          <text x="20" y="20" fontSize="11" fontWeight="800" fill="#ffffff">
            ✓ SIGNED
          </text>
        </g>
      </g>

      {/* Layer 2: Practice — the engagement planned: tasks, owners and the hours budget */}
      <g data-layer="2" style={{ opacity: 0 }}>
        <g transform="translate(90 74)">
          <rect width="540" height="316" rx="16" fill="#ffffff" stroke={line} />
          {[0, 1, 2].map((col) => (
            <g key={col} transform={`translate(${20 + col * 172} 22)`}>
              <text x="0" y="10" fontSize="9.5" fontWeight="700" fill={muted}>
                {["PLANNING", "FIELDWORK", "REVIEW"][col]}
              </text>
              {[0, 1, 2].map((card) => (
                <g key={card} transform={`translate(0 ${22 + card * 56})`}>
                  <rect width="156" height="46" rx="8" fill={surface} />
                  <rect x="12" y="11" width={96 - card * 12} height="7" rx="3" fill={line} />
                  <rect x="12" y="26" width="38" height="11" rx="5.5" fill={colors[1]} opacity={0.18 + col * 0.08} />
                  <circle cx="138" cy="23" r="8" fill="#ffffff" stroke={line} />
                </g>
              ))}
            </g>
          ))}
          <text x="20" y="246" fontSize="10" fontWeight="700" fill={ink}>
            Hours budget
          </text>
          <text x="520" y="246" fontSize="10" fontWeight="700" fill={colors[1]} textAnchor="end">
            142 / 200 h
          </text>
          <line x1="20" y1="264" x2="520" y2="264" stroke={soft} strokeWidth="10" strokeLinecap="round" />
          <path data-stroke d="M20 264 H 375" fill="none" stroke={colors[1]} strokeWidth="10" strokeLinecap="round" />
          <text x="20" y="292" fontSize="10" fill={muted}>
            9 tasks · 3 owners · 71% of budget used
          </text>
        </g>
      </g>

      {/* Layer 3: Docs — the evidence collected, OCR-indexed and filed */}
      <g data-layer="3" style={{ opacity: 0 }}>
        <g transform="translate(110 74)">
          <rect width="500" height="316" rx="16" fill="#ffffff" stroke={line} />
          <rect width="150" height="316" rx="16" fill={surface} />
          {["Finance", "Legal", "Workpapers", "Correspondence"].map((folder, row) => (
            <g key={folder} transform={`translate(18 ${28 + row * 36})`}>
              <rect width="16" height="13" rx="3" fill={row === 0 ? colors[2] : "#cbd5e1"} />
              <text x="24" y="11" fontSize="10" fontWeight={row === 0 ? 700 : 500} fill={row === 0 ? colors[2] : muted}>
                {folder}
              </text>
            </g>
          ))}
          {[
            { name: "Invoice_TechPro_0442.pdf", tag: "Invoice" },
            { name: "Bank_Statement_Mar.pdf", tag: "Statement" },
            { name: "PO_7781_signed.pdf", tag: "Purchase order" },
            { name: "GRN_3310.pdf", tag: "Goods receipt" },
          ].map((file, row) => (
            <g key={file.name} transform={`translate(170 ${22 + row * 70})`}>
              <rect width="312" height="56" rx="10" fill="#ffffff" stroke={line} />
              <rect x="14" y="12" width="24" height="30" rx="4" fill="#fdeaea" />
              <text x="50" y="25" fontSize="10.5" fontWeight="700" fill={ink}>
                {file.name}
              </text>
              <rect x="50" y="32" width={file.tag.length * 5.6 + 14} height="14" rx="7" fill="#fdeaea" />
              <text x="57" y="42" fontSize="8.5" fontWeight="700" fill={colors[2]}>
                {file.tag}
              </text>
              <text x="298" y="34" fontSize="9" fontWeight="800" fill={success} textAnchor="end">
                OCR ✓
              </text>
            </g>
          ))}
          <path data-stroke d="M150 41 C 160 41, 160 50, 170 50" fill="none" stroke={colors[2]} strokeWidth="2" />
          <path data-stroke d="M150 41 C 162 41, 158 120, 170 120" fill="none" stroke={colors[2]} strokeWidth="2" />
          <path data-stroke d="M150 41 C 164 41, 156 190, 170 190" fill="none" stroke={colors[2]} strokeWidth="2" />
          <path data-stroke d="M150 41 C 166 41, 154 260, 170 260" fill="none" stroke={colors[2]} strokeWidth="2" />
        </g>
      </g>

      {/* Layer 4: Match — the purchase register reconciled against invoice, PO and goods receipt */}
      <g data-layer="4" style={{ opacity: 0 }}>
        <g transform="translate(80 90)">
          <rect width="210" height="288" rx="14" fill="#ffffff" stroke={line} />
          <text x="18" y="28" fontSize="9.5" fontWeight="700" fill={muted}>
            PURCHASE REGISTER
          </text>
          {[0, 1, 2, 3, 4, 5].map((row) => (
            <g key={row} transform={`translate(18 ${44 + row * 38})`}>
              <rect width="174" height="28" rx="6" fill={row === 2 ? "#fff1e3" : surface} stroke={row === 2 ? colors[3] : "none"} />
              <rect x="10" y="10" width="64" height="8" rx="3" fill={line} />
              <rect x="110" y="10" width="50" height="8" rx="3" fill={line} />
            </g>
          ))}
        </g>
        {["INVOICE", "PURCHASE ORDER", "GOODS RECEIPT"].map((doc, index) => (
          <g key={doc} transform={`translate(410 ${86 + index * 104})`}>
            <rect width="220" height="86" rx="12" fill="#ffffff" stroke={line} />
            <text x="16" y="24" fontSize="9.5" fontWeight="700" fill={muted}>
              {doc}
            </text>
            <rect x="16" y="36" width="118" height="8" rx="3" fill={line} />
            <rect x="16" y="52" width="88" height="8" rx="3" fill={line} />
            <rect x="148" y="50" width="56" height="20" rx="10" fill={index === 1 ? "#fff1e3" : "#dcfce7"} />
            <text x="176" y="64" fontSize="9.5" fontWeight="800" fill={index === 1 ? colors[3] : success} textAnchor="middle">
              {index === 1 ? "85%" : "MATCH"}
            </text>
          </g>
        ))}
        <path data-stroke d="M272 222 C 340 222, 340 129, 410 129" fill="none" stroke={colors[3]} strokeWidth="2.5" />
        <path data-stroke d="M272 222 C 340 222, 340 233, 410 233" fill="none" stroke={colors[3]} strokeWidth="2.5" />
        <path data-stroke d="M272 222 C 340 222, 340 337, 410 337" fill="none" stroke={colors[3]} strokeWidth="2.5" />
      </g>

      {/* Layer 5: Verifi — statements cross-checked and the file validated */}
      <g data-layer="5" style={{ opacity: 0 }}>
        <g transform="translate(90 90)">
          <rect width="220" height="288" rx="14" fill="#ffffff" stroke={line} />
          <text x="18" y="28" fontSize="9.5" fontWeight="700" fill={muted}>
            BALANCE SHEET ↔ NOTES
          </text>
          {[0, 1, 2, 3, 4, 5].map((row) => (
            <g key={row} transform={`translate(18 ${46 + row * 38})`}>
              <rect width="120" height="8" rx="3" fill={line} />
              <rect x="142" y="-3" width="42" height="14" rx="7" fill={row === 4 ? "#ffe4df" : "#dcfce7"} />
              <text x="163" y="8" fontSize="8.5" fontWeight="800" fill={row === 4 ? accent : success} textAnchor="middle">
                {row === 4 ? "FLAG" : "PASS"}
              </text>
            </g>
          ))}
        </g>
        <g transform="translate(350 90)">
          <rect width="280" height="288" rx="14" fill="#ffffff" stroke={line} />
          <circle cx="140" cy="122" r="62" fill="none" stroke={soft} strokeWidth="12" />
          <path
            data-stroke
            d="M140 60 A 62 62 0 1 1 132.2 60.5"
            fill="none"
            stroke={colors[4]}
            strokeWidth="12"
            strokeLinecap="round"
          />
          <text x="140" y="134" fontSize="34" fontWeight="800" fill={ink} textAnchor="middle">
            98
          </text>
          <text x="140" y="214" fontSize="10" fontWeight="700" fill={muted} textAnchor="middle">
            VERIFICATION SCORE
          </text>
          <rect x="70" y="232" width="140" height="30" rx="15" fill={colors[4]} />
          <text x="140" y="252" fontSize="11" fontWeight="800" fill="#ffffff" textAnchor="middle">
            ✓ FILE VALIDATED
          </text>
        </g>
      </g>

      {/* Track: the file moving through the six stages */}
      <g>
        <line x1={first} y1="452" x2={last} y2="452" stroke={line} strokeWidth="3" strokeLinecap="round" />
        <line
          data-tour-fill
          x1={first}
          y1="452"
          x2={last}
          y2="452"
          stroke={accent}
          strokeWidth="3"
          strokeLinecap="round"
        />
        {TOUR_STAGES.map((stage, index) => (
          <g key={stage.label} transform={`translate(${stage.x} 452)`}>
            <circle r="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
            <circle data-tour-node r="6" fill={stageColor(index)} />
            <text y="30" fontSize="10" fontWeight="700" fill={muted} textAnchor="middle">
              {stage.label}
            </text>
          </g>
        ))}
        {/* The audit file token, centred on its stage by the engine (x) */}
        <g data-tour-token transform={`translate(${first} 0)`}>
          <rect x="-50" y="406" width="100" height="26" rx="13" fill={ink} />
          <path d="M-5 432 L0 438 L5 432Z" fill={ink} />
          {TOUR_STAGES.map((stage, index) => (
            <g key={stage.status} data-tour-status style={{ opacity: index === 0 ? 1 : 0 }}>
              <circle cx="-34" cy="419" r="4" fill={stageColor(index)} />
              <text x="-24" y="423" fontSize="10.5" fontWeight="700" fill="#ffffff">
                {stage.status}
              </text>
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}
