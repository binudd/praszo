"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { gsap, ScrollTrigger } from "@/components/motion/gsap";
import { ANCHOR_OFFSET } from "@/lib/motion";

import "lenis/dist/lenis.css";

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

/**
 * Preserved routes stay in the DOM (hidden) under React Activity, so ids can
 * repeat. Resolve selectors to the element that is actually rendered.
 */
export function findVisible(selector: string): HTMLElement | null {
  if (typeof document === "undefined") return null;
  const nodes = document.querySelectorAll<HTMLElement>(selector);
  for (const node of nodes) {
    if (node.getClientRects().length > 0) return node;
  }
  return null;
}

export function scrollToTarget(target: string | HTMLElement | number, offset = ANCHOR_OFFSET) {
  const lenis = getLenis();
  if (typeof target === "number") {
    if (lenis) lenis.scrollTo(target, { offset: 0 });
    else window.scrollTo({ top: target, behavior: "smooth" });
    return;
  }
  const node = typeof target === "string" ? findVisible(target) : target;
  if (!node) return;
  if (lenis) {
    lenis.scrollTo(node, { offset });
  } else {
    node.scrollIntoView({ block: "start" });
  }
}

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      anchors: { offset: ANCHOR_OFFSET },
      respectReducedMotion: true,
      prevent: (node) =>
        node instanceof Element &&
        Boolean(node.closest("[data-lenis-prevent], [role='dialog']")),
    });

    lenisInstance = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const onStop = () => lenis.stop();
    const onStart = () => lenis.start();
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("lenis:stop", onStop);
    window.addEventListener("lenis:start", onStart);
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("lenis:stop", onStop);
      window.removeEventListener("lenis:start", onStart);
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  // Re-measure ScrollTriggers after each navigation (again once the route has
  // settled, since preserved routes swap in and out) and honor deep links.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      const hash = window.location.hash;
      if (hash && hash.length > 1) {
        window.setTimeout(() => scrollToTarget(hash), 120);
      }
    });
    const settled = window.setTimeout(() => ScrollTrigger.refresh(), 700);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settled);
    };
  }, [pathname]);

  return null;
}
