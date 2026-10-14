"use client";

import { Check, Lock } from "lucide-react";
import { useEffect, useRef } from "react";

import { MockupShell, type MockupProps } from "@/components/mockups/mockup-shell";
import { gsap, useGSAP } from "@/components/motion/gsap";
import { modifiShowcase as data } from "@/data/showcases";
import { prefersReducedMotion } from "@/lib/motion";

/** Praszo Modifi: placeholders fill from CRM data, approvals advance, the letter gets signed. */
export function ModifiFlow({ paused, className }: MockupProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const fields = Array.from(root.querySelectorAll<HTMLElement>("[data-field]"));
      const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-step]"));
      const signature = root.querySelector<SVGPathElement>("[data-signature]");
      const badge = root.querySelector<HTMLElement>("[data-signed]");
      const length = signature?.getTotalLength() ?? 200;

      const reset = () => {
        fields.forEach((field) => (field.dataset.state = "empty"));
        steps.forEach((step) => (step.dataset.state = "idle"));
        if (signature) gsap.set(signature, { strokeDasharray: length, strokeDashoffset: length });
        if (badge) gsap.set(badge, { opacity: 0, scale: 0.9 });
      };

      if (prefersReducedMotion()) {
        fields.forEach((field) => (field.dataset.state = "filled"));
        steps.forEach((step) => (step.dataset.state = "done"));
        if (signature) gsap.set(signature, { strokeDasharray: "none", strokeDashoffset: 0 });
        return;
      }

      reset();
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.8, paused: Boolean(paused) });
      tl.add(reset, 0);
      tl.add(() => (steps[0].dataset.state = "active"), 0.2);
      fields.forEach((field, index) => tl.add(() => (field.dataset.state = "filled"), 0.6 + index * 0.55));
      tl.add(() => {
        steps[0].dataset.state = "done";
        steps[1].dataset.state = "active";
      }, 2.6);
      tl.add(() => {
        steps[1].dataset.state = "done";
        steps[2].dataset.state = "active";
      }, 3.6);
      tl.add(() => {
        steps[2].dataset.state = "done";
        steps[3].dataset.state = "active";
      }, 4.6);
      if (signature) tl.to(signature, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" }, 4.7);
      tl.add(() => (steps[3].dataset.state = "done"), 5.9);
      if (badge) tl.to(badge, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.6)" }, 5.9);
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
        <div className="grid h-full grid-cols-1 gap-3 p-3 sm:grid-cols-[1.3fr_1fr]">
          <div className="relative flex flex-col rounded-sm bg-bg p-3">
            <div className="h-2 w-24 rounded bg-product/70" />
            <div className="mt-3 space-y-1.5" aria-hidden>
              <div className="h-1.5 w-full rounded bg-elevated" />
              <div className="h-1.5 w-11/12 rounded bg-elevated" />
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {data.fields.map((field) => (
                <span
                  key={field.id}
                  data-field={field.id}
                  data-state="empty"
                  className="group relative inline-flex h-5 items-center rounded bg-product-soft px-1.5 font-mono text-[9px] font-semibold text-product-deep transition-colors duration-300 data-[state=filled]:bg-elevated data-[state=filled]:font-sans data-[state=filled]:text-ink"
                >
                  <span className="group-data-[state=filled]:hidden">{field.placeholder}</span>
                  <span className="hidden group-data-[state=filled]:inline">{field.value}</span>
                </span>
              ))}
            </div>
            <div className="mt-3 space-y-1.5" aria-hidden>
              <div className="h-1.5 w-full rounded bg-elevated" />
              <div className="h-1.5 w-4/5 rounded bg-elevated" />
            </div>
            <div className="mt-3 flex items-center gap-1.5 rounded bg-elevated px-2 py-1.5 text-[9px] font-semibold text-ink-3">
              <Lock size={10} aria-hidden /> {data.clause}
            </div>
            <div className="mt-auto flex items-end justify-between pt-3">
              <svg viewBox="0 0 120 32" className="h-8 w-28 overflow-visible" aria-hidden>
                <path
                  data-signature
                  d="M4 24 C 14 6, 22 30, 32 14 S 48 4, 54 20 S 70 26, 78 12 S 96 8, 104 20 S 112 22, 116 16"
                  fill="none"
                  stroke="var(--ink)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              <span data-signed className="rounded-full bg-success px-2 py-0.5 text-[9px] font-bold text-white opacity-0">
                Signed
              </span>
            </div>
          </div>
          <ol className="flex flex-col justify-center gap-2">
            {data.steps.map((step, index) => (
              <li
                key={step}
                data-step={step}
                data-state="idle"
                className="group flex items-center gap-2.5 rounded-sm bg-bg px-2.5 py-2 transition-colors duration-300 data-[state=active]:bg-product-soft"
              >
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-elevated text-[9px] font-bold text-ink-3 transition-colors duration-300 group-data-[state=active]:bg-product group-data-[state=active]:text-product-ink group-data-[state=done]:bg-success group-data-[state=done]:text-white">
                  <span className="group-data-[state=done]:hidden">{index + 1}</span>
                  <Check size={10} className="hidden group-data-[state=done]:block" aria-hidden />
                </span>
                <span className="text-[11px] font-semibold text-ink">{step}</span>
                <span className="ml-auto hidden h-1.5 w-1.5 animate-pulse rounded-full bg-product group-data-[state=active]:block" aria-hidden />
              </li>
            ))}
          </ol>
        </div>
      </MockupShell>
    </div>
  );
}
