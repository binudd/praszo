"use client";

import type { RefObject } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/components/motion/gsap";
import { prefersReducedMotion } from "@/lib/motion";

type SceneOptions = {
  /** Number of steps the scrubbed track maps onto. */
  count: number;
  /** Called with scroll progress (0–1) and the fractional step position t (0..count-1). */
  onUpdate: (progress: number, t: number, index: number) => void;
  /** Media query that enables the sticky scene; below it the static stack renders. */
  media?: string;
  scrub?: number;
};

/**
 * Turns a `.scene` root (with [data-scene-track] and [data-scene-stage]) into a
 * scroll-scrubbed sticky scene. Adds `.is-ready` only when the scene is active,
 * so the stacked fallback stays in the DOM for mobile, reduced motion and no-JS.
 */
export function useScene(rootRef: RefObject<HTMLElement | null>, options: SceneOptions) {
  const { count, onUpdate, media = "(min-width: 1024px)", scrub = 0.6 } = options;

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || prefersReducedMotion()) return;
      const mm = gsap.matchMedia();

      mm.add(`${media} and (prefers-reduced-motion: no-preference)`, () => {
        root.classList.add("is-ready");
        const track = root.querySelector<HTMLElement>("[data-scene-track]");
        if (!track) return;

        const apply = (progress: number) => {
          const t = progress * (count - 1);
          onUpdate(progress, t, Math.round(t));
        };

        const trigger = ScrollTrigger.create({
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          scrub,
          invalidateOnRefresh: true,
          onUpdate: (self) => apply(self.progress),
        });
        apply(trigger.progress);
        ScrollTrigger.refresh();

        return () => root.classList.remove("is-ready");
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );
}

/** Opacity for a step given the fractional position t and a fade window. */
export function stepOpacity(t: number, index: number, fade = 0.6) {
  const distance = Math.abs(t - index);
  return distance >= fade ? 0 : 1 - distance / fade;
}

/** Crossfades [data-scene-item] copies and toggles [data-scene-tab] states. */
export function applySceneItems(stage: HTMLElement, t: number, index: number, fade = 0.6, travel = 28) {
  stage.querySelectorAll<HTMLElement>("[data-scene-item]").forEach((item, itemIndex) => {
    const opacity = stepOpacity(t, itemIndex, fade);
    gsap.set(item, {
      opacity,
      y: (itemIndex - t) * travel,
      visibility: opacity < 0.04 ? "hidden" : "visible",
      zIndex: itemIndex === index ? 2 : 1,
    });
  });
  stage.querySelectorAll<HTMLElement>("[data-scene-tab]").forEach((tab, tabIndex) => {
    tab.classList.toggle("is-current", tabIndex === index);
    tab.classList.toggle("is-done", tabIndex < index);
    if (tabIndex === index) tab.setAttribute("aria-current", "step");
    else tab.removeAttribute("aria-current");
  });
}
