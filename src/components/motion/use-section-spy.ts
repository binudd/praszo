"use client";

import { useEffect, useState, type RefObject } from "react";

import { ScrollTrigger } from "@/components/motion/gsap";
import { findVisible, scrollToTarget } from "@/components/motion/smooth-scroll";

/** Space kept above a section when jumping to it: the global header (when it returns) plus a gap. */
const SECTION_OFFSET = 88;

/**
 * Scrolls to a section of the visible route (Lenis). The first section is the hero, so it goes to
 * the very top. Shared by the product section pill and the header's section menu.
 */
export function scrollToSection(id: string, index: number) {
  const node = findVisible("main")?.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
  if (!node) return;
  history.replaceState(null, "", `#${id}`);
  if (index === 0) scrollToTarget(0);
  else scrollToTarget(node, -SECTION_OFFSET);
}

/**
 * Scroll-spy: returns the id of the section covering a line 40% down the viewport (the last such
 * section in page order wins), or null. One ScrollTrigger per section on the shared Lenis loop fires
 * only when a section crosses that line; no per-frame measuring, and it works for pinned and
 * multi-screen sections. Sections are looked up inside the <main> that contains `scopeRef`, or the
 * visible <main> when the caller lives outside it (the header). Routes stay mounted in React Activity,
 * so ids are resolved within this route only. `resetKey` (e.g. the pathname) re-collects them.
 */
export function useSectionSpy(
  scopeRef: RefObject<HTMLElement | null>,
  ids: ReadonlyArray<string>,
  /** Keep the last section passed while scrolling through content that is not in the list. */
  { keepLast = false, resetKey }: { keepLast?: boolean; resetKey?: string } = {},
) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    if (!key) return;
    const root = scopeRef.current?.closest("main") ?? findVisible("main") ?? document;
    const entries = key
      .split("|")
      .map((id) => ({ id, node: root.querySelector<HTMLElement>(`#${CSS.escape(id)}`) }))
      .filter((entry): entry is { id: string; node: HTMLElement } => Boolean(entry.node));

    // Declared before the triggers exist: ScrollTrigger can fire onToggle synchronously inside create().
    let triggers: ScrollTrigger[] = [];
    const update = () => {
      let current: string | null = null;
      triggers.forEach((trigger, index) => {
        if (trigger.isActive) current = entries[index].id;
      });
      setActive((previous) =>
        previous === current || (keepLast && current === null && previous !== null && window.scrollY > 0)
          ? previous
          : current,
      );
    };
    triggers = entries.map(({ node }) =>
      ScrollTrigger.create({
        trigger: node,
        start: "top 40%",
        end: "bottom 20%",
        refreshPriority: -1,
        onToggle: update,
      }),
    );
    const frame = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(frame);
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [key, scopeRef, keepLast, resetKey]);

  return active;
}
