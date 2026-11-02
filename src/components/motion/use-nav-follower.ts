"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "@/components/motion/gsap";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * The sliding highlight behind the current nav item: one element GSAP moves and resizes to the item
 * with aria-current (re-measured on resize), fading out when nothing is current. Instant under
 * reduced motion and on its first placement.
 */
export function useNavFollower(
  navRef: RefObject<HTMLElement | null>,
  pillRef: RefObject<HTMLSpanElement | null>,
  key: string,
) {
  useLayoutEffect(() => {
    const nav = navRef.current;
    const pill = pillRef.current;
    if (!nav || !pill) return;
    const place = (animate: boolean) => {
      const item = nav.querySelector<HTMLElement>(":scope > [aria-current], :scope > * > [aria-current]");
      const instant = !animate || prefersReducedMotion() || Number(gsap.getProperty(pill, "opacity")) === 0;
      if (!item || item.offsetParent === null) {
        gsap.to(pill, { opacity: 0, duration: instant ? 0 : 0.2, overwrite: true });
        return;
      }
      const box = { x: item.offsetLeft, y: item.offsetTop, width: item.offsetWidth, height: item.offsetHeight };
      gsap.to(pill, { ...box, opacity: 1, duration: instant ? 0 : 0.45, ease: "power3.out", overwrite: true });
    };
    place(true);
    const resize = new ResizeObserver(() => place(false));
    resize.observe(nav);
    return () => resize.disconnect();
  }, [navRef, pillRef, key]);
}
