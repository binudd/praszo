"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { ScrollTrigger } from "@/components/motion/gsap";
import { findVisible } from "@/components/motion/smooth-scroll";

/**
 * Sets data-theme on <html> to match the scene currently crossing the middle of
 * the viewport, so the fixed background, header and chrome crossfade between
 * light and dark as the visitor scrolls.
 *
 * One ScrollTrigger per scene (driven by the shared Lenis loop) fires only when
 * a scene enters or leaves the middle line, instead of measuring every scene on
 * every scroll event. refreshPriority -1 measures them after pinned sections
 * have added their spacing.
 */
export function ThemeObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const main = findVisible("main") ?? document.body;
    const scenes = Array.from(main.querySelectorAll<HTMLElement>("[data-theme]:not([data-theme-local])"));

    // Declared before the triggers exist: ScrollTrigger can fire onToggle synchronously inside create().
    let triggers: ScrollTrigger[] = [];
    const apply = () => {
      const dark = triggers.some((trigger) => trigger.isActive && (trigger.trigger as HTMLElement).dataset.theme === "dark");
      const theme = dark ? "dark" : "light";
      if (root.dataset.theme !== theme) root.dataset.theme = theme;
    };
    triggers = scenes.map((scene) =>
      ScrollTrigger.create({ trigger: scene, start: "top center", end: "bottom center", refreshPriority: -1, onToggle: apply }),
    );
    apply();

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      root.dataset.theme = "light";
    };
  }, [pathname]);

  return null;
}
