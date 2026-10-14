"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { gsap, ScrollTrigger } from "@/components/motion/gsap";
import { ANCHOR_OFFSET } from "@/lib/motion";
import { onSplashDone, splashActive } from "@/lib/splash";

import "lenis/dist/lenis.css";

let lenisInstance: Lenis | null = null;

/**
 * QA hook, compiled in only when the build sets NEXT_PUBLIC_QA_HOOKS=1 (the
 * condition is inlined at build time, so normal builds drop this code). Lets
 * headless browser checks count ScrollTriggers and Lenis instances.
 */
const qa =
  process.env.NEXT_PUBLIC_QA_HOOKS === "1" && typeof window !== "undefined"
    ? ((window as unknown as { __praszoQA?: Record<string, unknown> }).__praszoQA ??= {
        gsap,
        ScrollTrigger,
        getLenis: () => lenisInstance,
        lenisCreated: 0,
        lenisDestroyed: 0,
      })
    : null;

export function getLenis() {
  return lenisInstance;
}

/**
 * Reasons currently holding smooth scrolling (the splash, an open menu…).
 * Lenis is stopped while any hold is active, so one owner releasing its hold
 * can never restart scrolling another owner still needs stopped.
 */
const scrollHolds = new Set<string>();

function applyScrollHolds() {
  if (!lenisInstance) return;
  if (scrollHolds.size > 0) lenisInstance.stop();
  else lenisInstance.start();
}

/** Stop smooth scrolling until `releaseScroll(reason)` is called. */
export function holdScroll(reason: string) {
  scrollHolds.add(reason);
  applyScrollHolds();
}

/** Release a hold; a no-op if `reason` was not holding. */
export function releaseScroll(reason: string) {
  if (scrollHolds.delete(reason)) applyScrollHolds();
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
    if (qa) qa.lenisCreated = (qa.lenisCreated as number) + 1;
    lenis.on("scroll", ScrollTrigger.update);

    // The first-load splash covers the page: hold smooth scrolling until it releases the site,
    // otherwise wheel input during the splash would scroll the page underneath it.
    let stopWaiting = () => {};
    if (splashActive()) {
      scrollHolds.add("splash");
      stopWaiting = onSplashDone(() => releaseScroll("splash"));
    }
    applyScrollHolds();

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      stopWaiting();
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisInstance = null;
      if (qa) qa.lenisDestroyed = (qa.lenisDestroyed as number) + 1;
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
