"use client";

import { CircleAlert, CircleCheck } from "lucide-react";
import { useEffect, useRef } from "react";

import { MockupShell, type MockupProps } from "@/components/mockups/mockup-shell";
import { gsap, useGSAP } from "@/components/motion/gsap";
import { verifiShowcase as data } from "@/data/showcases";
import { prefersReducedMotion } from "@/lib/motion";

const RING = 2 * Math.PI * 34;

/** Praszo Verifi: checks run one by one and the verification score fills in. */
export function VerifiValidator({ paused, className }: MockupProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const rows = Array.from(root.querySelectorAll<HTMLElement>("[data-check]"));
      const score = root.querySelector<HTMLElement>("[data-score]");
      const ring = root.querySelector<SVGCircleElement>("[data-ring]");
      const counter = { value: 0 };
      const render = () => {
        if (score) score.textContent = String(Math.round(counter.value));
        if (ring) gsap.set(ring, { strokeDashoffset: RING * (1 - counter.value / 100) });
      };
      const setState = (row: HTMLElement, state: string) => {
        row.dataset.state = state;
      };

      if (prefersReducedMotion()) {
        rows.forEach((row, index) => setState(row, data.checks[index].result));
        counter.value = data.checks[data.checks.length - 1].score;
        render();
        return;
      }

      rows.forEach((row) => setState(row, "pending"));
      render();
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.6, paused: Boolean(paused) });
      tl.add(() => {
        rows.forEach((row) => setState(row, "pending"));
      }, 0);
      tl.to(counter, { value: 0, duration: 0.4, ease: "power2.out", onUpdate: render }, 0);
      data.checks.forEach((check, index) => {
        const at = 0.6 + index * 1.1;
        tl.add(() => setState(rows[index], "running"), at);
        tl.add(() => setState(rows[index], check.result), at + 0.75);
        tl.to(counter, { value: check.score, duration: 0.5, ease: "power2.out", onUpdate: render }, at + 0.75);
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
        <div className="grid h-full grid-cols-[6.5rem_1fr] gap-2.5 p-2.5 sm:grid-cols-[11rem_1fr]">
          <div className="flex flex-col items-center justify-center rounded-sm border border-line bg-surface p-3 text-center">
            <div className="relative h-16 w-16 sm:h-20 sm:w-20">
              <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90" aria-hidden>
                <circle cx="40" cy="40" r="34" fill="none" stroke="var(--elevated)" strokeWidth="6" />
                <circle
                  data-ring
                  cx="40"
                  cy="40"
                  r="34"
                  fill="none"
                  stroke="var(--product)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={RING}
                  strokeDashoffset={RING}
                />
              </svg>
              <span data-score className="absolute inset-0 flex items-center justify-center text-xl font-extrabold text-ink tabular-nums sm:text-2xl">
                0
              </span>
            </div>
            <p className="label mt-3 hidden text-[9px] text-ink-3 sm:block">{data.scoreLabel}</p>
          </div>
          <ul className="flex min-w-0 flex-col gap-1.5">
            {data.checks.map((check) => (
              <li
                key={check.id}
                data-check={check.id}
                data-state="pending"
                className="group flex items-center justify-between gap-2 rounded-sm border border-line bg-bg px-3 py-2 transition-colors duration-300 data-[state=flag]:border-accent/40 data-[state=pass]:border-success/40 data-[state=running]:border-product/60"
              >
                <span className="min-w-0">
                  <span className="block truncate text-[11px] font-semibold text-ink">{check.label}</span>
                  <span className="block truncate text-[10px] text-ink-3">{check.detail}</span>
                </span>
                <span className="shrink-0">
                  <span className="hidden items-center gap-1 rounded-full bg-elevated px-1.5 py-0.5 text-[9px] font-bold text-ink-3 group-data-[state=pending]:inline-flex">
                    Queued
                  </span>
                  <span className="hidden items-center gap-1 rounded-full bg-product-soft px-1.5 py-0.5 text-[9px] font-bold text-product-deep group-data-[state=running]:inline-flex">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-product" /> Checking
                  </span>
                  <span className="hidden items-center gap-1 rounded-full bg-success/12 px-1.5 py-0.5 text-[9px] font-bold text-success group-data-[state=pass]:inline-flex">
                    <CircleCheck size={10} aria-hidden /> Pass
                  </span>
                  <span className="hidden items-center gap-1 rounded-full bg-accent-soft px-1.5 py-0.5 text-[9px] font-bold text-accent group-data-[state=flag]:inline-flex">
                    <CircleAlert size={10} aria-hidden /> Flagged
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
