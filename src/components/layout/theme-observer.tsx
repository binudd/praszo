"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { findVisible } from "@/components/motion/smooth-scroll";

/**
 * Sets data-theme on <html> to match the scene currently crossing the middle of
 * the viewport, so the fixed background, header and chrome crossfade between
 * light and dark as the visitor scrolls.
 */
export function ThemeObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const main = findVisible("main") ?? document.body;
    const scenes = Array.from(main.querySelectorAll<HTMLElement>("[data-theme]:not([data-theme-local])"));
    const apply = () => {
      const middle = window.innerHeight / 2;
      const active = scenes.find((scene) => {
        const rect = scene.getBoundingClientRect();
        return rect.top <= middle && rect.bottom >= middle;
      });
      const theme = active?.dataset.theme === "dark" ? "dark" : "light";
      if (root.dataset.theme !== theme) root.dataset.theme = theme;
    };
    apply();
    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("resize", apply);
    return () => {
      window.removeEventListener("scroll", apply);
      window.removeEventListener("resize", apply);
      root.dataset.theme = "light";
    };
  }, [pathname]);

  return null;
}
