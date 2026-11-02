"use client";

import { findVisible } from "@/components/motion/smooth-scroll";

/** Focuses the main region that is actually rendered (preserved routes may hide others). */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="fixed top-4 left-4 z-[80] -translate-y-20 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-ink focus:translate-y-0"
      onClick={(event) => {
        const main = findVisible("main");
        if (!main) return;
        event.preventDefault();
        main.setAttribute("tabindex", "-1");
        main.focus({ preventScroll: false });
      }}
    >
      Skip to content
    </a>
  );
}
