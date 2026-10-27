"use client";

import { CircleAlert, CircleCheck, RotateCcw } from "lucide-react";
import { useEffect, useRef } from "react";

import { bindHoverHold, createMockupFx, type MockupFx } from "@/components/mockups/mockup-fx";
import { MockupShell, type MockupProps } from "@/components/mockups/mockup-shell";
import { gsap, useGSAP } from "@/components/motion/gsap";
import { verifiShowcase as data } from "@/data/showcases";
import { prefersReducedMotion } from "@/lib/motion";

const RING = 2 * Math.PI * 34;
const FINAL = data.checks[data.checks.length - 1];
const FLAGGED = data.checks.filter((check) => check.result === "flag").length;
const SUMMARY = `${data.checks.length - FLAGGED} passed · ${FLAGGED} flagged · score ${FINAL.score}`;

/**
 * Praszo Verifi: checks run one by one and the verification score fills in. The collaborator cursor
 * visits each check, the run ends with a summary toast and a confetti pop at the score. Hovering pauses
 * the demo; the score card is a button that re-runs the checks.
 */
export function VerifiValidator({ paused, className }: MockupProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const fxRef = useRef<MockupFx | null>(null);
  const pausedRef = useRef(Boolean(paused));
  const heldRef = useRef(false);
  const sync = () => tlRef.current?.paused(pausedRef.current || heldRef.current);

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
      const fx = createMockupFx(root);
      fxRef.current = fx;
      const scoreCard = root.querySelector<HTMLElement>("[data-score-card]");
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.6, paused: Boolean(paused) });
      tl.add(() => {
        rows.forEach((row) => setState(row, "pending"));
      }, 0);
      tl.to(counter, { value: 0, duration: 0.4, ease: "power2.out", onUpdate: render }, 0);
      data.checks.forEach((check, index) => {
        const at = 0.6 + index * 1.1;
        tl.add(() => fx.cursorTo(rows[index], { x: 0.82 }), Math.max(0, at - 0.45));
        tl.add(() => fx.click(), at - 0.05);
        tl.add(() => setState(rows[index], "running"), at);
        tl.add(() => setState(rows[index], check.result), at + 0.75);
        tl.to(counter, { value: check.score, duration: 0.5, ease: "power2.out", onUpdate: render }, at + 0.75);
      });
      const end = 0.6 + (data.checks.length - 1) * 1.1 + 1.3;
      tl.add(() => {
        fx.cursorTo(scoreCard, { x: 0.7, y: 0.75 });
        fx.toast(SUMMARY, FLAGGED ? "accent" : "success");
        fx.burst(scoreCard?.querySelector("[data-ring]")?.closest("div") ?? scoreCard);
      }, end);
      tl.add(() => undefined, end + 0.8);
      tlRef.current = tl;
      const unbind = bindHoverHold(root, fx, (held) => {
        heldRef.current = held;
        sync();
      });
      return () => {
        unbind();
        tl.kill();
        tlRef.current = null;
        fxRef.current = null;
      };
    },
    { scope: rootRef },
  );

  useEffect(() => {
    pausedRef.current = Boolean(paused);
    sync();
  }, [paused]);

  const rerun = () => {
    const tl = tlRef.current;
    if (!tl) return;
    // A click is an explicit request to watch: release the hover pause and play from the start.
    heldRef.current = false;
    tl.restart();
    fxRef.current?.toast(`Re-running ${data.checks.length} checks`, "product");
  };

  return (
    <div ref={rootRef} className={className}>
      <MockupShell title={data.title} meta={data.meta} toastAt="right">
        <div className="grid h-full min-h-0 grid-cols-[6.5rem_minmax(0,1fr)] grid-rows-[minmax(0,1fr)] gap-3 p-3 sm:grid-cols-[11rem_minmax(0,1fr)]">
          <button
            type="button"
            data-score-card
            onClick={rerun}
            aria-label="Re-run the verification checks"
            className="group/score flex flex-col items-center justify-center rounded-sm bg-bg p-3 text-center transition-[background-color,scale] duration-300 hover:bg-product-soft active:scale-[0.98]"
          >
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
              <span
                data-score
                className="absolute inset-0 flex items-center justify-center text-xl font-extrabold text-ink tabular-nums sm:text-2xl"
              >
                0
              </span>
            </div>
            <p className="label mt-3 hidden text-[9px] text-ink-3 sm:block">{data.scoreLabel}</p>
            <span className="mt-2 hidden items-center gap-1 rounded-full bg-elevated px-2 py-0.5 text-[9px] font-bold text-ink-2 transition-colors group-hover/score:bg-product group-hover/score:text-product-ink sm:inline-flex">
              <RotateCcw size={9} aria-hidden /> Re-run
            </span>
          </button>
          <ul className="flex min-h-0 min-w-0 flex-col gap-2 overflow-hidden">
            {data.checks.map((check) => (
              <li
                key={check.id}
                data-check={check.id}
                data-state="pending"
                className="group flex max-h-[5.25rem] flex-1 items-center justify-between gap-2 rounded-sm bg-bg px-3 py-2 transition-colors duration-300 data-[state=flag]:bg-[color-mix(in_srgb,var(--accent)_14%,var(--bg))] data-[state=running]:bg-product-soft"
              >
                <span className="min-w-0">
                  <span className="block truncate text-[11px] font-semibold text-ink">{check.label}</span>
                  <span className="block truncate text-[10px] text-ink-3">{check.detail}</span>
                </span>
                <span className="shrink-0">
                  <span className="hidden items-center gap-1 rounded-full bg-elevated px-1.5 py-0.5 text-[9px] font-bold text-ink-3 group-data-[state=pending]:inline-flex">
                    Queued
                  </span>
                  <span className="hidden items-center gap-1 rounded-full bg-bg px-1.5 py-0.5 text-[9px] font-bold text-product-deep dark:text-product group-data-[state=running]:inline-flex">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-product" /> Checking
                  </span>
                  <span className="hidden items-center gap-1 rounded-full bg-success/12 px-1.5 py-0.5 text-[9px] font-bold text-success group-data-[state=pass]:inline-flex">
                    <CircleCheck size={10} aria-hidden /> Pass
                  </span>
                  <span className="hidden items-center gap-1 rounded-full bg-bg px-1.5 py-0.5 text-[9px] font-bold text-accent group-data-[state=flag]:inline-flex">
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
