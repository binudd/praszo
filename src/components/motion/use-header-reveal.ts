"use client";

import type { RefObject } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/components/motion/gsap";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Fired on window whenever the global header hides or shows ({ detail: { hidden } }), so dependent
 * bars (ProductSubNav) can follow it without a second scroll listener.
 */
export const HEADER_EVENT = "praszo:header";

export type HeaderRevealOptions = {
  /** Distance (px) scrolled in one direction before the header reacts. Filters trackpad jitter. */
  delta?: number;
  /** The header always shows within this distance (px) of the top of the page. */
  topOffset?: number;
  /** Slide duration in seconds. */
  duration?: number;
  /** Changing this (e.g. the pathname) resets the header to shown. */
  resetKey?: string;
};

/**
 * Hides a fixed header while the visitor scrolls down and brings it back on a
 * meaningful scroll up, or near the top of the page.
 *
 * - Reads scroll position from one ScrollTrigger, which the shared Lenis
 *   instance already updates (lenis.on("scroll", ScrollTrigger.update)), so
 *   there is no extra scroll listener or rAF loop, and it also works when Lenis
 *   is off (reduced motion uses native scrolling).
 * - Animates only the transform (yPercent) with overwrite, so rapid direction
 *   changes retarget the same tween instead of stacking tweens.
 * - Never hides while the visitor is engaged with the header: a menu or drawer
 *   is open (any trigger reports aria-expanded="true") or keyboard focus is in it.
 *   Keyboard focus entering a hidden header reveals it.
 * - No React state per scroll: the hidden flag lives in a closure and on
 *   data-header-hidden for styling and tests.
 */
export function useHeaderReveal(ref: RefObject<HTMLElement | null>, options: HeaderRevealOptions = {}) {
  const { delta = 8, topOffset = 96, duration = 0.38, resetKey } = options;

  useGSAP(
    () => {
      const header = ref.current;
      if (!header) return;

      let hidden = false;
      let last = Math.max(0, window.scrollY);
      let direction = 0;
      let runStart = last;
      // After mount or a route change, Next may restore or reset the scroll position in one jump.
      // Treat movement in this window as the new baseline, not as the visitor scrolling down.
      const settleUntil = performance.now() + 350;

      const setHidden = (next: boolean) => {
        if (next === hidden) return;
        hidden = next;
        header.dataset.headerHidden = String(next);
        gsap.to(header, {
          // -100% of its own height, plus a little more so the menu shadow clears the viewport too.
          yPercent: next ? -100 : 0,
          y: next ? -12 : 0,
          duration: prefersReducedMotion() ? 0 : duration,
          ease: next ? "power2.in" : "power3.out",
          overwrite: true,
        });
        // Announce after the tween exists, so listeners that read the header's transform see the new
        // state immediately when it applies instantly (reduced motion).
        window.dispatchEvent(new CustomEvent(HEADER_EVENT, { detail: { hidden: next } }));
      };

      const engaged = () => Boolean(header.querySelector('[aria-expanded="true"], :focus-visible'));

      const update = (raw: number) => {
        // Clamp rubber-band overscroll (negative or past the end) to the real range.
        const y = Math.min(Math.max(raw, 0), ScrollTrigger.maxScroll(window));
        const step = y - last;
        last = y;
        if (performance.now() < settleUntil) {
          runStart = y;
          return;
        }

        if (y <= topOffset) {
          setHidden(false);
          direction = 0;
          runStart = y;
          return;
        }
        if (step === 0) return;

        const next = step > 0 ? 1 : -1;
        if (next !== direction) {
          // Direction changed: measure the new run from where it began.
          direction = next;
          runStart = y - step;
        }
        if (Math.abs(y - runStart) < delta) return;

        if (direction > 0) {
          if (!engaged()) setHidden(true);
        } else {
          setHidden(false);
        }
      };

      const trigger = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => update(self.scroll()),
      });

      // Keyboard users tabbing into a hidden header get it back immediately.
      const onFocusIn = (event: FocusEvent) => {
        if (event.target instanceof Element && event.target.matches(":focus-visible")) setHidden(false);
      };
      header.addEventListener("focusin", onFocusIn);

      return () => {
        trigger.kill();
        header.removeEventListener("focusin", onFocusIn);
        gsap.killTweensOf(header);
        gsap.set(header, { clearProps: "transform" });
        delete header.dataset.headerHidden;
        if (hidden) window.dispatchEvent(new CustomEvent(HEADER_EVENT, { detail: { hidden: false } }));
      };
    },
    { scope: ref, dependencies: [delta, topOffset, duration, resetKey], revertOnUpdate: true },
  );
}
