"use client";

import type { RefObject } from "react";

import { gsap, useGSAP } from "@/components/motion/gsap";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Scroll-scrubbed depth for a viewport hero, smoothed by the shared Lenis loop
 * (Lenis drives ScrollTrigger). As the hero scrolls away the title drifts down
 * and recedes, the lede eases out, and the visual rises a little faster and
 * settles back, so the layers separate. Targets are wrappers marked
 * [data-hero-depth="title|lede|visual"], separate from the entrance targets,
 * so the two never fight over the same transforms.
 */
export function useHeroScroll(
  rootRef: RefObject<HTMLElement | null>,
  /**
   * Only move the visual where it sits beside the copy. In a stacked (single-column) layout a rising
   * visual would slide into the text above it, e.g. "(min-width: 1024px)" for the product hero.
   */
  { visualMedia }: { visualMedia?: string } = {},
) {
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || prefersReducedMotion()) return;
      const pick = (name: string) => root.querySelector<HTMLElement>(`[data-hero-depth="${name}"]`);
      const title = pick("title");
      const lede = pick("lede");
      const visual = pick("visual");

      const mm = gsap.matchMedia();
      // Re-runs when either condition changes (e.g. resizing across the visual breakpoint).
      mm.add({ motion: "(prefers-reduced-motion: no-preference)", wide: visualMedia ?? "all" }, (context) => {
        const { motion, wide } = context.conditions as { motion: boolean; wide: boolean };
        if (!motion) return;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
        });
        if (title) tl.to(title, { yPercent: 55, scale: 0.9, opacity: 0, transformOrigin: "0% 0%" }, 0);
        if (lede) tl.to(lede, { y: 90, opacity: 0 }, 0);
        if (visual && wide) {
          tl.to(visual, { y: -70, scale: 0.94, transformOrigin: "50% 0%" }, 0);
        }
      });
      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [visualMedia] },
  );
}
