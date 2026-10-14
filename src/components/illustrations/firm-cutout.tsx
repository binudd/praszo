import type { CSSProperties } from "react";

import { cn } from "@/lib/cn";

/**
 * Paper-cutout illustrations for the two firm sizes. Flat layered shapes with a
 * hard offset shadow under each layer (the cut-paper look), drawn with the
 * theme tokens so they follow light and dark scenes.
 */

type Props = { size: "large" | "mid"; className?: string; style?: CSSProperties };

const SHADOW = "drop-shadow(3px 4px 0 rgb(15 23 42 / 0.14))";

function Windows({
  x,
  y,
  cols,
  rows,
  w,
  h,
  gapX,
  gapY,
  lit = [],
}: {
  x: number;
  y: number;
  cols: number;
  rows: number;
  w: number;
  h: number;
  gapX: number;
  gapY: number;
  lit?: number[];
}) {
  const cells = [];
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const i = r * cols + c;
      cells.push(
        <rect
          key={i}
          x={x + c * (w + gapX)}
          y={y + r * (h + gapY)}
          width={w}
          height={h}
          rx={1.5}
          fill={lit.includes(i) ? "var(--accent)" : "var(--bg)"}
          opacity={lit.includes(i) ? 0.9 : 0.55}
        />,
      );
    }
  }
  return <g>{cells}</g>;
}

function Cloud({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} style={{ filter: SHADOW }}>
      <path d="M0 14a9 9 0 0 1 9-9 12 12 0 0 1 22-2 9 9 0 0 1 9 11Z" fill="var(--bg)" />
    </g>
  );
}

function Tree({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} style={{ filter: SHADOW }}>
      <rect x={5} y={14} width={3} height={10} rx={1} fill="var(--brand-strong)" />
      <circle cx={6.5} cy={10} r={9} fill="var(--success)" opacity={0.85} />
    </g>
  );
}

export function FirmCutout({ size, className, style }: Props) {
  return (
    <svg
      viewBox="0 0 260 170"
      role="img"
      aria-label={
        size === "large" ? "Cutout illustration of a cluster of office towers" : "Cutout illustration of a mid-sized office building"
      }
      className={cn("h-auto w-full overflow-visible", className)}
      style={style}
    >
      {/* Backdrop disc and ground: the paper the pieces sit on */}
      <circle cx={130} cy={92} r={74} fill="var(--brand-soft)" />
      <path d="M18 146h224a6 6 0 0 1 0 12H18a6 6 0 0 1 0-12Z" fill="var(--brand)" opacity={0.18} />

      {size === "large" ? (
        <g>
          <Cloud x={34} y={38} s={0.9} />
          <Cloud x={190} y={26} s={0.7} />
          {/* Back tower */}
          <g style={{ filter: SHADOW }}>
            <rect x={150} y={46} width={44} height={104} rx={3} fill="var(--brand-strong)" />
            <Windows x={157} y={56} cols={3} rows={8} w={8} h={6} gapX={4} gapY={5} lit={[4, 13]} />
          </g>
          {/* Main tower with spire */}
          <g style={{ filter: SHADOW }}>
            <rect x={124} y={10} width={3} height={14} fill="var(--ink-3)" />
            <path d="M104 30 125.5 18 147 30v120H104Z" fill="var(--brand)" />
            <Windows x={111} y={38} cols={3} rows={10} w={7} h={6} gapX={5} gapY={4.6} lit={[1, 8, 22]} />
          </g>
          {/* Front low-rise */}
          <g style={{ filter: SHADOW }}>
            <rect x={62} y={84} width={50} height={66} rx={3} fill="var(--accent)" />
            <rect x={62} y={84} width={50} height={8} rx={3} fill="var(--ink)" opacity={0.12} />
            <Windows x={69} y={98} cols={3} rows={4} w={9} h={7} gapX={4} gapY={5} />
            <rect x={81} y={134} width={12} height={16} rx={2} fill="var(--bg)" opacity={0.7} />
          </g>
          <Tree x={42} y={124} s={1.05} />
          <Tree x={200} y={128} s={0.9} />
        </g>
      ) : (
        <g>
          <Cloud x={46} y={34} s={0.85} />
          <Cloud x={176} y={48} s={0.65} />
          {/* Side wing */}
          <g style={{ filter: SHADOW }}>
            <rect x={150} y={96} width={42} height={54} rx={3} fill="var(--brand-strong)" />
            <Windows x={157} y={106} cols={2} rows={3} w={11} h={7} gapX={6} gapY={6} lit={[3]} />
          </g>
          {/* Main office */}
          <g style={{ filter: SHADOW }}>
            <path d="M74 74h84v76H74Z" fill="var(--brand)" />
            <path d="M68 66h96v12H68Z" fill="var(--ink)" opacity={0.18} />
            <path d="M68 66h96v8H68Z" fill="var(--accent)" />
            <Windows x={82} y={86} cols={4} rows={3} w={12} h={9} gapX={6} gapY={7} lit={[2, 9]} />
            <rect x={108} y={128} width={16} height={22} rx={2} fill="var(--bg)" opacity={0.75} />
          </g>
          {/* Sign */}
          <g style={{ filter: SHADOW }}>
            <rect x={98} y={50} width={36} height={12} rx={6} fill="var(--bg)" />
            <circle cx={106} cy={56} r={3} fill="var(--accent)" />
            <rect x={112} y={54} width={16} height={4} rx={2} fill="var(--brand)" opacity={0.6} />
          </g>
          <Tree x={48} y={124} s={1} />
          <Tree x={200} y={126} s={0.85} />
        </g>
      )}
    </svg>
  );
}
