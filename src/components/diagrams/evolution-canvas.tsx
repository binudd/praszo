import type { ReactNode } from "react";

const COLS = 14;
const ROWS = 9;
const OX = 68;
const OY = 58;
const STEP = 24;
const SIZE = 7;

function pixelZone(column: number, row: number): "chrome" | "void" {
  if (row <= 1) return "chrome";
  if (column <= 2) return "chrome";
  if (row >= 3 && row <= 5 && column >= 4 && column <= 8) return "chrome";
  if (row >= 3 && row <= 5 && column >= 10 && column <= 13) return "chrome";
  if (row >= 7 && column >= 4) return "chrome";
  return "void";
}

const pixels = Array.from({ length: COLS * ROWS }, (_, index) => {
  const column = index % COLS;
  const row = Math.floor(index / COLS);
  return {
    column,
    row,
    x: OX + column * STEP,
    y: OY + row * STEP,
    zone: pixelZone(column, row),
  };
});

const gridXs = [40, 120, 200, 280, 360, 440, 520, 600, 680];
const gridYs = [36, 116, 196, 276, 356, 436, 500];

type EvolutionCanvasProps = {
  activeLayer?: number;
  variant?: "journey" | "snapshot";
};

function Layer({
  id,
  activeLayer,
  variant,
  children,
}: {
  id: number;
  activeLayer?: number;
  variant: "journey" | "snapshot";
  children: ReactNode;
}) {
  const visible = variant === "snapshot" ? activeLayer === id : undefined;
  return (
    <g
      data-evo-layer={id}
      className={variant === "snapshot" ? (visible ? "opacity-100" : "hidden") : undefined}
    >
      {children}
    </g>
  );
}

function Caption({ children, x = 360, y = 496 }: { children: string; x?: number; y?: number }) {
  return (
    <text x={x} y={y} textAnchor="middle" className="evo-svg-caption">
      {children}
    </text>
  );
}

export function EvolutionCanvas({
  activeLayer = 0,
  variant = "journey",
}: EvolutionCanvasProps) {
  return (
    <svg
      viewBox="0 0 720 520"
      role="presentation"
      aria-hidden="true"
      className="evo-canvas h-auto w-full overflow-visible"
    >
      <g className="evo-grid" opacity={0.55}>
        {gridXs.map((x) => (
          <line key={`vx-${x}`} x1={x} y1={28} x2={x} y2={480} />
        ))}
        {gridYs.map((y) => (
          <line key={`hy-${y}`} x1={40} y1={y} x2={680} y2={y} />
        ))}
      </g>

      <rect
        data-evo-frame
        x="48"
        y="40"
        width="624"
        height="432"
        fill="none"
        stroke="currentColor"
        className="text-white/10"
      />

      <Layer id={0} activeLayer={activeLayer} variant={variant}>
        {pixels.map((pixel) => (
          <rect
            key={`${pixel.column}-${pixel.row}`}
            data-pixel
            data-pixel-zone={pixel.zone}
            x={pixel.x}
            y={pixel.y}
            width={SIZE}
            height={SIZE}
            fill={pixel.zone === "chrome" ? "#217BFE" : "#ffffff"}
            opacity={pixel.zone === "chrome" ? 0.55 : 0.22}
          />
        ))}
        <Caption>Precise grid · raster composition</Caption>
      </Layer>

      <Layer id={1} activeLayer={activeLayer} variant={variant}>
        <circle cx="168" cy="168" r="46" fill="none" stroke="#217BFE" strokeWidth="1.5" data-stroke />
        <circle cx="168" cy="168" r="18" fill="none" stroke="#ffffff" strokeWidth="1.25" data-stroke />
        <rect
          x="268"
          y="122"
          width="88"
          height="88"
          rx="10"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.4"
          data-stroke
        />
        <path d="M412 206 L456 122 L500 206 Z" fill="none" stroke="#217BFE" strokeWidth="1.4" data-stroke />
        <path
          d="M548 128 l28 16 -28 16 -28 -16 z"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.3"
          data-stroke
        />
        <path d="M156 286 h56 m-28 -28 v56" fill="none" stroke="#217BFE" strokeWidth="1.6" data-stroke />
        <rect x="248" y="268" width="72" height="48" rx="24" fill="none" stroke="#ffffff" data-stroke />
        <path
          d="M360 292c28-36 72-36 100 0"
          fill="none"
          stroke="#217BFE"
          strokeWidth="1.4"
          data-stroke
        />
        <g fill="none" stroke="#8a8a82" strokeWidth="1" data-evo-detail>
          <path d="M168 214 V268 H248" data-stroke />
          <path d="M312 210 H412" data-stroke />
          <path d="M456 214 V268" data-stroke />
        </g>
        <Caption>Outlines · icons · a reusable visual system</Caption>
      </Layer>

      <Layer id={2} activeLayer={activeLayer} variant={variant}>
        <path
          data-motion-path
          data-stroke
          d="M88 340 C 180 120, 280 400, 370 210 S 560 120, 632 268"
          fill="none"
          stroke="#217BFE"
          strokeWidth="1.6"
        />
        <path
          data-stroke
          d="M108 368 C 200 160, 292 420, 382 240 S 548 160, 612 292"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1"
          opacity="0.28"
        />
        <path
          data-stroke
          d="M72 312 C 164 96, 268 372, 358 188 S 572 96, 648 244"
          fill="none"
          stroke="#217BFE"
          strokeWidth="0.8"
          opacity="0.35"
        />
        <circle data-motion-dot cx="88" cy="340" r="5" fill="#217BFE" />
        <g fill="#ffffff" opacity="0.7">
          <circle cx="180" cy="196" r="2.4" />
          <circle cx="370" cy="210" r="2.4" />
          <circle cx="520" cy="168" r="2.4" />
        </g>
        <Caption>Keyframe path · easing · sequenced trails</Caption>
      </Layer>

      <Layer id={3} activeLayer={activeLayer} variant={variant}>
        <rect x="88" y="88" width="544" height="48" fill="none" stroke="#ffffff" data-stroke />
        <text x="104" y="118" className="evo-svg-label">
          header
        </text>
        <rect x="88" y="148" width="160" height="272" fill="none" stroke="#8a8a82" data-stroke />
        <text x="104" y="178" className="evo-svg-label">
          aside
        </text>
        <rect x="264" y="148" width="368" height="160" fill="none" stroke="#217BFE" data-stroke />
        <text x="280" y="178" className="evo-svg-label evo-svg-label-accent">
          main
        </text>
        <rect x="264" y="324" width="176" height="96" fill="none" stroke="#ffffff" data-stroke />
        <rect x="456" y="324" width="176" height="96" fill="none" stroke="#ffffff" data-stroke />
        <text x="280" y="376" className="evo-svg-label">
          article
        </text>
        <text x="472" y="376" className="evo-svg-label">
          article
        </text>
        <Caption>Structure · layout · responsive composition</Caption>
      </Layer>

      <Layer id={4} activeLayer={activeLayer} variant={variant}>
        <g>
          <rect x="72" y="120" width="168" height="220" fill="none" stroke="#ffffff" data-stroke />
          <text x="88" y="148" className="evo-svg-label">
            List
          </text>
          <rect x="92" y="168" width="128" height="10" fill="#3a3a34" />
          <rect x="92" y="188" width="96" height="10" fill="#292925" />
          <rect x="92" y="208" width="112" height="10" fill="#292925" />
          <rect x="92" y="248" width="80" height="22" fill="none" stroke="#217BFE" />
        </g>
        <g>
          <rect x="276" y="88" width="200" height="284" fill="none" stroke="#217BFE" data-stroke />
          <text x="292" y="116" className="evo-svg-label evo-svg-label-accent">
            Detail
          </text>
          <rect x="296" y="136" width="160" height="14" fill="#3a3a34" />
          <rect x="296" y="164" width="160" height="88" fill="none" stroke="#3a3a34" />
          <rect x="296" y="268" width="100" height="22" fill="none" stroke="#ffffff" />
        </g>
        <g>
          <rect x="512" y="148" width="136" height="188" fill="none" stroke="#ffffff" data-stroke />
          <text x="528" y="176" className="evo-svg-label">
            Confirm
          </text>
          <rect x="532" y="196" width="96" height="8" fill="#3a3a34" />
          <rect x="532" y="280" width="96" height="22" fill="none" stroke="#217BFE" />
        </g>
        <path
          data-stroke
          d="M240 230 C 252 230, 264 230, 276 230"
          fill="none"
          stroke="#217BFE"
          strokeWidth="1.2"
        />
        <path
          data-stroke
          d="M476 230 C 490 230, 500 230, 512 230"
          fill="none"
          stroke="#8a8a82"
          strokeWidth="1.2"
        />
        <Caption>Connected states · hierarchy · navigation paths</Caption>
      </Layer>

      <Layer id={5} activeLayer={activeLayer} variant={variant}>
        <rect x="200" y="72" width="320" height="336" fill="none" stroke="#ffffff" data-stroke />
        <text x="216" y="100" className="evo-svg-label">
          Parent composition
        </text>
        <rect x="224" y="124" width="128" height="96" fill="none" stroke="#217BFE" data-stroke />
        <text x="240" y="156" className="evo-svg-label evo-svg-label-accent">
          Component
        </text>
        <rect x="368" y="124" width="128" height="96" fill="none" stroke="#217BFE" data-stroke />
        <text x="384" y="156" className="evo-svg-label evo-svg-label-accent">
          Component
        </text>
        <rect x="224" y="244" width="272" height="72" fill="none" stroke="#ffffff" data-stroke />
        <text x="240" y="276" className="evo-svg-label">
          Focused surface
        </text>
        <rect x="72" y="196" width="104" height="88" fill="none" stroke="#8a8a82" data-stroke />
        <text x="88" y="228" className="evo-svg-label">
          state
        </text>
        <text x="88" y="248" className="evo-svg-caption" textAnchor="start">
          hooks · query
        </text>
        <path data-stroke d="M176 240 H200" fill="none" stroke="#217BFE" />
        <path data-stroke d="M360 172 H368" fill="none" stroke="#3a3a34" />
        <path data-stroke d="M288 220 V244" fill="none" stroke="#3a3a34" />
        <Caption>Reusable units · parent, child, and state</Caption>
      </Layer>

      <Layer id={6} activeLayer={activeLayer} variant={variant}>
        <rect x="248" y="56" width="224" height="36" fill="none" stroke="#217BFE" data-stroke />
        <text x="360" y="79" textAnchor="middle" className="evo-svg-label evo-svg-label-accent">
          TimesheetView
        </text>
        <text x="128" y="124" textAnchor="middle" className="evo-svg-caption">
          State
        </text>
        <text x="360" y="124" textAnchor="middle" className="evo-svg-caption">
          Composition
        </text>
        <text x="584" y="124" textAnchor="middle" className="evo-svg-caption">
          Presentation
        </text>
        <rect x="48" y="140" width="160" height="40" fill="none" stroke="#ffffff" data-stroke />
        <text x="128" y="165" textAnchor="middle" className="evo-svg-label">
          useTimesheetView
        </text>
        <rect x="280" y="140" width="160" height="40" fill="none" stroke="#ffffff" data-stroke />
        <text x="360" y="165" textAnchor="middle" className="evo-svg-label">
          WorkspaceSplit
        </text>
        <rect x="504" y="140" width="168" height="40" fill="none" stroke="#ffffff" data-stroke />
        <text x="588" y="165" textAnchor="middle" className="evo-svg-label">
          TimesheetListContent
        </text>
        <rect x="520" y="220" width="136" height="36" fill="none" stroke="#8a8a82" data-stroke />
        <text x="588" y="243" textAnchor="middle" className="evo-svg-label">
          SidePanel
        </text>
        <rect x="520" y="280" width="136" height="36" fill="none" stroke="#8a8a82" data-stroke />
        <text x="588" y="303" textAnchor="middle" className="evo-svg-label">
          LogTimeForm
        </text>
        <path data-stroke d="M360 92 V140" fill="none" stroke="#217BFE" />
        <path data-stroke d="M360 92 C 240 110, 160 118, 128 140" fill="none" stroke="#8a8a82" />
        <path data-stroke d="M360 92 C 480 110, 560 118, 588 140" fill="none" stroke="#8a8a82" />
        <path data-stroke d="M588 180 V220" fill="none" stroke="#8a8a82" />
        <path data-stroke d="M588 256 V280" fill="none" stroke="#8a8a82" />
        <Caption>Illustrative Timesheet structure — not a source export</Caption>
      </Layer>

      <Layer id={7} activeLayer={activeLayer} variant={variant}>
        <circle cx="360" cy="236" r="46" fill="none" stroke="#217BFE" strokeWidth="1.5" data-stroke />
        <text x="360" y="240" textAnchor="middle" className="evo-svg-label evo-svg-label-accent">
          Product
        </text>
        {[
          { label: "User needs", x: 140, y: 96 },
          { label: "Experience", x: 580, y: 96 },
          { label: "Behavior", x: 140, y: 376 },
          { label: "Integrations", x: 580, y: 376 },
          { label: "Engineering", x: 360, y: 430 },
        ].map((node) => (
          <g key={node.label}>
            <rect
              x={node.x - 70}
              y={node.y - 16}
              width="140"
              height="32"
              fill="none"
              stroke="#ffffff"
              data-stroke
            />
            <text x={node.x} y={node.y + 5} textAnchor="middle" className="evo-svg-label">
              {node.label}
            </text>
          </g>
        ))}
        <path data-stroke d="M210 112 C 260 150, 300 190, 328 210" fill="none" stroke="#217BFE" />
        <path data-stroke d="M510 112 C 460 150, 420 190, 392 210" fill="none" stroke="#8a8a82" />
        <path data-stroke d="M210 360 C 260 320, 300 280, 328 262" fill="none" stroke="#8a8a82" />
        <path data-stroke d="M510 360 C 460 320, 420 280, 392 262" fill="none" stroke="#8a8a82" />
        <path data-stroke d="M360 282 V414" fill="none" stroke="#217BFE" />
        <Caption>One system · needs, experience, behavior, engineering</Caption>
      </Layer>
    </svg>
  );
}
