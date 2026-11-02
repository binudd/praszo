"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { ScrollTrigger } from "@/components/motion/gsap";
import { findVisible } from "@/components/motion/smooth-scroll";

/** The line the header's colours are read against: its vertical middle (top offset 4px + 72px / 2). */
const HEADER_LINE = 40;

/**
 * Two theme lines, driven by one ScrollTrigger per scene and line on the shared Lenis loop (they fire
 * only when a scene crosses a line, no per-frame measuring):
 *   page    <html data-theme> follows the scene crossing the middle of the viewport (fixed
 *           background, grid and chrome crossfade);
 *   header  <header data-theme> follows what is actually behind the transparent header: dark when
 *           the scene under the header line is dark, or when the page background is dark (light
 *           scenes paint no background), so its logo, links and menus always contrast. The token sets re-declare per data-theme (tokens.css), so the
 *           header's attribute wins inside it.
 * Pinned scenes are measured from their pin trigger (start to end + own height), via function-based
 * start/end that re-evaluate on refresh; refreshPriority -1 measures after pins exist. Without this a
 * pinned dark scene (Why Praszo, feature rails) switched back to light while still on screen.
 */
export function ThemeObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const header = document.querySelector<HTMLElement>("header.site-header");
    const main = findVisible("main") ?? document.body;
    const scenes = Array.from(main.querySelectorAll<HTMLElement>("[data-theme]:not([data-theme-local])"));

    // The scroll range a scene really occupies, in page coordinates. A pinned scene holds the top of
    // the viewport from its pin start to its pin end, then scrolls out over its own height; its pin
    // trigger (refreshed before these, refreshPriority -1) gives that range directly.
    const box = (scene: HTMLElement) => {
      const pin = ScrollTrigger.getAll().find((trigger) => trigger.pin === scene);
      if (pin) return { top: pin.start, bottom: pin.end + scene.offsetHeight };
      const rect = scene.getBoundingClientRect();
      return { top: rect.top + window.scrollY, bottom: rect.bottom + window.scrollY };
    };

    // Declared before the triggers exist: ScrollTrigger can fire onToggle synchronously inside create().
    let pageTriggers: ScrollTrigger[] = [];
    let headerTriggers: ScrollTrigger[] = [];
    const darkIn = (triggers: ScrollTrigger[]) =>
      triggers.some((trigger, index) => trigger.isActive && scenes[index].dataset.theme === "dark");
    const set = (target: HTMLElement | null, dark: boolean) => {
      const theme = dark ? "dark" : "light";
      if (target && target.dataset.theme !== theme) target.dataset.theme = theme;
    };
    const apply = () => {
      const pageDark = darkIn(pageTriggers);
      set(root, pageDark);
      // Light scenes paint no background of their own, so behind the header the visitor sees either a
      // dark scene or the page background: the header is dark when either is dark.
      set(header, darkIn(headerTriggers) || pageDark);
    };
    const create = (offset: () => number) =>
      scenes.map((scene) =>
        ScrollTrigger.create({
          trigger: scene,
          start: () => box(scene).top - offset(),
          end: () => box(scene).bottom - offset(),
          invalidateOnRefresh: true,
          refreshPriority: -1,
          onToggle: apply,
        }),
      );
    pageTriggers = create(() => window.innerHeight / 2);
    headerTriggers = header ? create(() => HEADER_LINE) : [];
    apply();
    const all = [...pageTriggers, ...headerTriggers];

    return () => {
      all.forEach((trigger) => trigger.kill());
      root.dataset.theme = "light";
      if (header) header.dataset.theme = "light";
    };
  }, [pathname]);

  return null;
}
