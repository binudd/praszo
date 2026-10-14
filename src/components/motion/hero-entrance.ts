"use client";

import { useReducedMotion } from "motion/react";
import type { RefObject } from "react";

import { gsap, useGSAP } from "@/components/motion/gsap";
import { EASE, prefersReducedMotion } from "@/lib/motion";
import { onSplashDone, splashActive } from "@/lib/splash";

/** Routes whose hero already played; a re-shown route (React Activity) skips the replay. */
const played = new Set<string>();

/**
 * Orchestrates the hero entrance for a root marked with data-entrance.
 * Targets: [data-hero="eyebrow|headline|copy|cta|visual"] and [data-hero-float].
 * CSS in globals.css hides those targets until the root gets .is-ready or .is-static.
 */
export function useHeroEntrance(rootRef: RefObject<HTMLElement | null>, key: string) {
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      if (reduced || prefersReducedMotion()) {
        root.classList.add("is-static");
        return () => root.classList.remove("is-static");
      }

      if (played.has(key)) {
        root.classList.add("is-ready");
        return () => root.classList.remove("is-ready");
      }

      const pick = (selector: string) => Array.from(root.querySelectorAll<HTMLElement>(selector));
      // On a first visit the timeline holds until the splash hands over to the page.
      const timeline = gsap.timeline({
        paused: splashActive(),
        defaults: { ease: EASE },
        onComplete: () => {
          root.classList.add("is-ready");
          played.add(key);
        },
      });

      const step = (
        selector: string,
        from: gsap.TweenVars,
        to: gsap.TweenVars,
        position?: string,
      ) => {
        const targets = pick(selector);
        if (targets.length) timeline.fromTo(targets, from, to, position);
      };

      step('[data-hero="eyebrow"]', { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 });
      step('[data-hero="headline"]', { y: "112%" }, { y: "0%", duration: 0.8, stagger: 0.09 }, "-=0.2");
      step('[data-hero="copy"]', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.5");
      step('[data-hero="cta"]', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, "-=0.3");
      step(
        '[data-hero="visual"]',
        { y: 28, opacity: 0, scale: 0.985 },
        { y: 0, opacity: 1, scale: 1, duration: 0.9, clearProps: "transform" },
        "-=0.45",
      );
      step(
        "[data-hero-float]",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
        "-=0.55",
      );

      pick("[data-hero-float]").forEach((node, index) => {
        gsap.to(node, {
          y: index % 2 ? -6 : 6,
          duration: 3.6 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.6,
        });
      });

      const stopWaiting = onSplashDone(() => timeline.play());

      return () => {
        stopWaiting();
        root.classList.remove("is-ready");
      };
    },
    { scope: rootRef, dependencies: [reduced, key] },
  );
}
