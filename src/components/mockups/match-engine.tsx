"use client";

import { FileText } from "lucide-react";
import { useEffect, useRef } from "react";

import { bindHoverHold, createMockupFx } from "@/components/mockups/mockup-fx";
import { MockupShell, type MockupProps } from "@/components/mockups/mockup-shell";
import { gsap, useGSAP } from "@/components/motion/gsap";
import { matchShowcase as data } from "@/data/showcases";
import { prefersReducedMotion } from "@/lib/motion";

const STEP = 2.4;

/** What the toast says once a row's three documents are compared. */
function verdict(index: number) {
  const row = data.rows[index];
  const partial = row.results.findIndex((result) => result === "partial");
  return partial === -1
    ? { text: `Full 3-way match · ${row.vendor}`, tone: "success" as const, full: true }
    : { text: `${data.documents[partial]} at 85% · flagged for review`, tone: "accent" as const, full: false };
}

/**
 * Praszo Match: each register row is linked to its invoice, PO and GRN and stamped with a result. The
 * collaborator cursor picks each row, a toast reports the verdict and full matches pop. Hovering pauses
 * the demo; rows are buttons that jump the matching to that row.
 */
export function MatchEngine({ paused, className }: MockupProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const pausedRef = useRef(Boolean(paused));
  const heldRef = useRef(false);
  const sync = () => tlRef.current?.paused(pausedRef.current || heldRef.current);

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

      const fx = createMockupFx(root);
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8, paused: Boolean(paused) });
      data.rows.forEach((_, index) => {
        const at = index * STEP;
        tl.add(
          () => {
            fx.cursorTo(rows[index], { x: 0.35 });
          },
          Math.max(0, at - 0.5),
        );
        tl.add(() => fx.click(), Math.max(0, at - 0.05));
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
        tl.add(() => {
          setResults(index);
          const result = verdict(index);
          fx.toast(result.text, result.tone);
          if (result.full) fx.burst(rows[index]);
        }, at + 1.0);
        tl.to(links, { opacity: 0, duration: 0.3 }, at + 2.0);
      });
      tlRef.current = tl;
      const unbind = bindHoverHold(root, fx, (held) => {
        heldRef.current = held;
        sync();
      });
      return () => {
        unbind();
        tl.kill();
        tlRef.current = null;
      };
    },
    { scope: rootRef },
  );

  useEffect(() => {
    pausedRef.current = Boolean(paused);
    sync();
  }, [paused]);

  /** A click is an explicit request to watch: release the hover pause and match that row now. */
  const matchRow = (index: number) => {
    const tl = tlRef.current;
    if (!tl) return;
    heldRef.current = false;
    tl.play(index * STEP + 0.01);
  };

  return (
    <div ref={rootRef} className={className}>
      <MockupShell title={data.title} meta={data.meta}>
        <div
          data-body
          className="relative grid h-full min-h-0 grid-cols-[1.25fr_1fr] grid-rows-[minmax(0,1fr)] gap-3 p-3 sm:gap-6"
        >
          <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden>
            {data.documents.map((doc) => (
              <path key={doc} data-link fill="none" stroke="var(--product)" strokeWidth="1.5" opacity="0" />
            ))}
          </svg>
          <ul className="flex min-h-0 flex-col gap-2 overflow-hidden">
            {data.rows.map((row, index) => (
              <li key={row.id}>
                <button
                  type="button"
                  data-row={row.id}
                  data-state="idle"
                  onClick={() => matchRow(index)}
                  aria-label={`Match ${row.vendor} ${row.ref}`}
                  className="block w-full rounded-sm bg-bg px-2.5 py-2 text-left transition-[background-color,opacity,scale] duration-300 hover:bg-product-soft active:scale-[0.98] data-[state=active]:bg-product-soft data-[state=done]:opacity-55 data-[state=done]:hover:opacity-100"
                >
                  <span className="block truncate text-[11px] font-semibold text-ink">{row.vendor}</span>
                  <span className="flex justify-between gap-2 text-[10px] text-ink-3">
                    <span className="truncate font-mono">{row.ref}</span>
                    <span className="tabular-nums">{row.amount}</span>
                  </span>
                </button>
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
                  <span className="hidden rounded-full bg-elevated px-1.5 py-0.5 text-ink-3 group-data-[state=idle]:inline">
                    …
                  </span>
                  <span className="hidden rounded-full bg-success/12 px-1.5 py-0.5 text-success group-data-[state=match]:inline">
                    Match
                  </span>
                  <span className="hidden rounded-full bg-bg px-1.5 py-0.5 text-product-deep dark:text-product group-data-[state=partial]:inline">
                    85%
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </MockupShell>
    </div>
  );
}
