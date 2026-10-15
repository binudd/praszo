"use client";

import { Check, Lock } from "lucide-react";
import { useEffect, useRef } from "react";

import { bindHoverHold, createMockupFx } from "@/components/mockups/mockup-fx";
import { MockupShell, type MockupProps } from "@/components/mockups/mockup-shell";
import { gsap, useGSAP } from "@/components/motion/gsap";
import { modifiShowcase as data } from "@/data/showcases";
import { prefersReducedMotion } from "@/lib/motion";

const SIGN_AT = 4.6;

/**
 * Praszo Modifi: placeholders fill from CRM data, approvals advance, the letter gets signed. The
 * collaborator cursor fills each field, clicks through the approvals and then traces the signature
 * itself; signing ends with a toast and a confetti pop. Hovering pauses the demo; the signature line
 * is a button that jumps straight to signing.
 */
export function ModifiFlow({ paused, className }: MockupProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const pausedRef = useRef(Boolean(paused));
  const heldRef = useRef(false);
  const sync = () => tlRef.current?.paused(pausedRef.current || heldRef.current);

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
      const fx = createMockupFx(root);
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.8, paused: Boolean(paused) });
      tl.add(reset, 0);
      tl.add(() => (steps[0].dataset.state = "active"), 0.2);
      fields.forEach((field, index) => {
        const at = 0.6 + index * 0.55;
        tl.add(() => fx.cursorTo(field, { duration: 0.45 }), at - 0.4);
        tl.add(() => {
          fx.click();
          field.dataset.state = "filled";
        }, at);
      });
      const advance = (from: number, at: number, message: string) => {
        tl.add(() => fx.cursorTo(steps[from + 1], { x: 0.2 }), at - 0.45);
        tl.add(() => {
          fx.click();
          steps[from].dataset.state = "done";
          steps[from + 1].dataset.state = "active";
          fx.toast(message, "product");
        }, at);
      };
      advance(0, 2.6, "Sent for partner review");
      advance(1, 3.6, "Review complete");
      advance(2, SIGN_AT, `Approved · ${data.meta[1]}`);
      if (signature) {
        // The cursor holds the pen: it follows the signature path as the stroke draws.
        const point = { progress: 0 };
        tl.to(
          point,
          {
            progress: 1,
            duration: 1.1,
            ease: "power2.inOut",
            onUpdate: () => {
              gsap.set(signature, { strokeDashoffset: length * (1 - point.progress) });
              const matrix = signature.getScreenCTM();
              if (!matrix) return;
              const at = signature.getPointAtLength(length * point.progress);
              const screen = new DOMPoint(at.x, at.y).matrixTransform(matrix);
              fx.cursorAt(screen.x, screen.y);
            },
          },
          SIGN_AT + 0.1,
        );
      }
      tl.add(() => {
        steps[3].dataset.state = "done";
        fx.toast(`Letter signed · ${data.fields[0].value}`, "success");
        fx.burst(badge);
      }, SIGN_AT + 1.3);
      if (badge) tl.to(badge, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.6)" }, SIGN_AT + 1.3);
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

  /** A click is an explicit request to watch: release the hover pause and sign now. */
  const signNow = () => {
    const tl = tlRef.current;
    if (!tl) return;
    heldRef.current = false;
    tl.play(SIGN_AT - 0.5);
  };

  return (
    <div ref={rootRef} className={className}>
      <MockupShell title={data.title} meta={data.meta} toastAt="right">
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
                  className="group relative inline-flex h-5 items-center rounded bg-product-soft px-1.5 font-mono text-[9px] font-semibold text-product-deep dark:text-product transition-colors duration-300 data-[state=filled]:bg-elevated data-[state=filled]:font-sans data-[state=filled]:text-ink"
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
              <button
                type="button"
                onClick={signNow}
                aria-label="Sign the engagement letter"
                className="group/sign relative -m-1 rounded p-1 transition-colors hover:bg-product-soft"
              >
                <span className="absolute -top-3.5 left-1 hidden text-[8px] font-bold tracking-[0.12em] text-product-deep uppercase group-hover/sign:block dark:text-product">
                  Click to sign
                </span>
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
              </button>
              <span
                data-signed
                className="rounded-full bg-success px-2 py-0.5 text-[9px] font-bold text-white opacity-0"
              >
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
                <span
                  className="ml-auto hidden h-1.5 w-1.5 animate-pulse rounded-full bg-product group-data-[state=active]:block"
                  aria-hidden
                />
              </li>
            ))}
          </ol>
        </div>
      </MockupShell>
    </div>
  );
}
