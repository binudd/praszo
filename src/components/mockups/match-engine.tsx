"use client";

import { FileText } from "lucide-react";
import { useEffect, useRef } from "react";

import { MockupShell, type MockupProps } from "@/components/mockups/mockup-shell";
import { gsap, useGSAP } from "@/components/motion/gsap";
import { matchShowcase as data } from "@/data/showcases";
import { prefersReducedMotion } from "@/lib/motion";

/** Praszo Match: each register row is linked to its invoice, PO and GRN and stamped with a result. */
export function MatchEngine({ paused, className }: MockupProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const body = root.querySelector<HTMLElement>("[data-body]");
      const rows = Array.from(root.querySelectorAll<HTMLElement>("[data-row]"));
      const docs = Array.from(root.querySelectorAll<HTMLElement>("[data-doc]"));
      const links = Array.from(root.querySelectorAll<SVGPathElement>("[data-link]"));
      if (!body) return;

      const draw = (row: HTMLElement) => {
        const base = body.getBoundingClientRect();
        const from = row.getBoundingClientRect();
        const x1 = from.right - base.left;
        const y1 = from.top + from.height / 2 - base.top;
        docs.forEach((doc, index) => {
          const to = doc.getBoundingClientRect();
          const x2 = to.left - base.left;
          const y2 = to.top + to.height / 2 - base.top;
          const mid = (x1 + x2) / 2;
          links[index]?.setAttribute("d", `M${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`);
        });
      };
      const setResults = (index: number | null) => {
        docs.forEach((doc, docIndex) => {
          doc.dataset.state = index === null ? "idle" : data.rows[index].results[docIndex];
        });
        rows.forEach((row, rowIndex) => {
          row.dataset.state = index === rowIndex ? "active" : index !== null && rowIndex < index ? "done" : "idle";
        });
      };

      if (prefersReducedMotion()) {
        draw(rows[0]);
        setResults(0);
        links.forEach((link) => gsap.set(link, { strokeDasharray: "none", strokeDashoffset: 0, opacity: 1 }));
        return;
      }

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8, paused: Boolean(paused) });
      data.rows.forEach((_, index) => {
        const at = index * 2.4;
        tl.add(() => {
          setResults(null);
          rows[index].dataset.state = "active";
          rows.forEach((row, rowIndex) => {
            if (rowIndex < index) row.dataset.state = "done";
          });
          draw(rows[index]);
          links.forEach((link) => {
            const length = link.getTotalLength() || 300;
            gsap.set(link, { strokeDasharray: length, strokeDashoffset: length, opacity: 1 });
          });
        }, at);
        tl.to(links, { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut", stagger: 0.12 }, at + 0.1);
        tl.add(() => setResults(index), at + 1.0);
        tl.to(links, { opacity: 0, duration: 0.3 }, at + 2.0);
      });
      tlRef.current = tl;
      return () => {
        tl.kill();
        tlRef.current = null;
      };
    },
    { scope: rootRef },
  );

  useEffect(() => {
    tlRef.current?.paused(Boolean(paused));
  }, [paused]);

  return (
    <div ref={rootRef} className={className}>
      <MockupShell title={data.title} meta={data.meta}>
        <div data-body className="relative grid h-full min-h-0 grid-cols-[1.25fr_1fr] grid-rows-[minmax(0,1fr)] gap-3 p-3 sm:gap-6">
          <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden>
            {data.documents.map((doc) => (
              <path key={doc} data-link fill="none" stroke="var(--product)" strokeWidth="1.5" opacity="0" />
            ))}
          </svg>
          <ul className="flex min-h-0 flex-col gap-2 overflow-hidden">
            {data.rows.map((row) => (
              <li
                key={row.id}
                data-row={row.id}
                data-state="idle"
                className="rounded-sm bg-bg px-2.5 py-2 transition-[background-color,opacity] duration-300 data-[state=active]:bg-product-soft data-[state=done]:opacity-55"
              >
                <p className="truncate text-[11px] font-semibold text-ink">{row.vendor}</p>
                <p className="flex justify-between gap-2 text-[10px] text-ink-3">
                  <span className="truncate font-mono">{row.ref}</span>
                  <span className="tabular-nums">{row.amount}</span>
                </p>
              </li>
            ))}
          </ul>
          <ul className="flex min-h-0 flex-col justify-between gap-2">
            {data.documents.map((doc) => (
              <li
                key={doc}
                data-doc={doc}
                data-state="idle"
                className="group flex items-center justify-between gap-2 rounded-sm bg-bg px-2.5 py-2 transition-colors duration-300 data-[state=partial]:bg-product-soft"
              >
                <span className="flex min-w-0 items-center gap-1.5 text-[11px] font-semibold text-ink">
                  <FileText size={12} className="shrink-0 text-product" aria-hidden />
                  <span className="truncate">{doc}</span>
                </span>
                <span className="shrink-0 text-[9px] font-bold">
                  <span className="hidden rounded-full bg-elevated px-1.5 py-0.5 text-ink-3 group-data-[state=idle]:inline">…</span>
                  <span className="hidden rounded-full bg-success/12 px-1.5 py-0.5 text-success group-data-[state=match]:inline">Match</span>
                  <span className="hidden rounded-full bg-bg px-1.5 py-0.5 text-product-deep group-data-[state=partial]:inline">85%</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </MockupShell>
    </div>
  );
}
