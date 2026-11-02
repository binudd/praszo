"use client";

import type { RefObject } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/components/motion/gsap";
import { scrollToTarget } from "@/components/motion/smooth-scroll";
import { prefersReducedMotion } from "@/lib/motion";

type SceneValue = number | string;
/**
 * Writes only the properties whose value changed since the last write to that
 * element. Scroll scenes call it every frame for every item; without it, items
 * that are parked (hidden or fully shown) are rewritten each frame, which
 * re-invalidates style for their whole subtree.
 */
export type SceneSetter = (target: Element, vars: Record<string, SceneValue>) => void;

/** A setter with its own cache. Create one per scene activation so a torn-down scene starts clean. */
export function createSceneSetter(): SceneSetter {
  const cache = new WeakMap<Element, Record<string, SceneValue>>();
  return (target, vars) => {
    let last = cache.get(target);
    if (!last) {
      last = {};
      cache.set(target, last);
    }
    let changed: Record<string, SceneValue> | null = null;
    for (const key in vars) {
      const raw = vars[key];
      const value = typeof raw === "number" ? Math.round(raw * 1000) / 1000 : raw;
      if (last[key] !== value) {
        last[key] = value;
        (changed ??= {})[key] = value;
      }
    }
    if (changed) gsap.set(target, changed);
  };
}

type SceneOptions = {
  /** Number of steps the scrubbed track maps onto. */
  count: number;
  /**
   * Called with scroll progress (0–1), the fractional step position t (0..count-1), the
   * nearest step, and a change-only setter scoped to this activation of the scene.
   */
  onUpdate: (progress: number, t: number, index: number, set: SceneSetter) => void;
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

        const set = createSceneSetter();
        const apply = (progress: number) => {
          const t = progress * (count - 1);
          onUpdate(progress, t, Math.round(t), set);
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

/** Crossfades [data-scene-item] copies and toggles [data-scene-tab] states. Parked (hidden) items are not rewritten. */
export function applySceneItems(stage: HTMLElement, t: number, index: number, fade = 0.6, travel = 28, set: SceneSetter = gsap.set) {
  stage.querySelectorAll<HTMLElement>("[data-scene-item]").forEach((item, itemIndex) => {
    const opacity = stepOpacity(t, itemIndex, fade);
    const hidden = opacity < 0.04;
    set(item, {
      opacity: hidden ? 0 : opacity,
      y: hidden ? 0 : (itemIndex - t) * travel,
      visibility: hidden ? "hidden" : "visible",
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

/** Scrolls the page (through Lenis) to step `index` of a scene's [data-scene-track]. Used by scene tabs. */
export function scrollToSceneStep(root: HTMLElement | null, index: number, count: number) {
  const track = root?.querySelector<HTMLElement>("[data-scene-track]");
  if (!track) return;
  const top = track.getBoundingClientRect().top + window.scrollY;
  const range = track.offsetHeight - window.innerHeight;
  scrollToTarget(top + (range * index) / Math.max(1, count - 1));
}
