"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const nodes = [
  { id: "view", label: "TimesheetView", x: 260, y: 36 },
  { id: "hook", label: "useTimesheetView", x: 88, y: 132 },
  { id: "list", label: "TimesheetListContent", x: 260, y: 132 },
  { id: "split", label: "WorkspaceSplit", x: 432, y: 132 },
  { id: "panel", label: "SidePanel", x: 360, y: 228 },
  { id: "form", label: "LogTimeForm", x: 432, y: 324 },
];

export function ComponentGraph() {
  const ref = useRef<SVGSVGElement | null>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (prefersReducedMotion()) {
        ref.current.classList.add("is-static");
        return;
      }
      const lines = ref.current.querySelectorAll("[data-graph-line]");
      const boxes = ref.current.querySelectorAll("[data-graph-node]");

      lines.forEach((line) => {
        const length = (line as SVGGeometryElement).getTotalLength?.() ?? 120;
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 78%",
          once: true,
        },
      });

      timeline
        .to(lines, { strokeDashoffset: 0, duration: 0.7, stagger: 0.08, ease: "power2.out" })
        .fromTo(
          boxes,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power3.out" },
          "-=0.55",
        );
    },
    { scope: ref },
  );

  return (
    <figure>
      <svg
        ref={ref}
        viewBox="0 0 520 380"
        role="img"
        aria-label="Component relationship: TimesheetView composes state, list, split, panel, and form"
        className="h-auto w-full border border-line bg-surface"
      >
        <path data-graph-line d="M260 60 V108" fill="none" stroke="#C5F467" strokeWidth="1" />
        <path data-graph-line d="M260 60 C200 80 140 90 140 108" fill="none" stroke="#6D6D66" />
        <path data-graph-line d="M260 60 C320 80 380 90 380 108" fill="none" stroke="#6D6D66" />
        <path data-graph-line d="M432 156 V204" fill="none" stroke="#6D6D66" />
        <path data-graph-line d="M360 252 V300" fill="none" stroke="#6D6D66" />
        {nodes.map((node) => (
          <g key={node.id} data-graph-node>
            <rect
              x={node.x - 78}
              y={node.y - 16}
              width="156"
              height="32"
              fill="#191918"
              stroke={node.id === "view" ? "#C5F467" : "#292925"}
            />
            <text
              x={node.x}
              y={node.y + 4}
              textAnchor="middle"
              fill="#F2F0EA"
              fontSize="11"
              fontFamily="Archivo, sans-serif"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-3 text-[12px] text-ink-3">
        Illustrative relationship diagram of the Timesheet composition — not a
        generated architecture export.
      </figcaption>
    </figure>
  );
}
