"use client";

import { useEffect, useState, type RefObject } from "react";

import { ScrollTrigger } from "@/components/motion/gsap";

/**
 * Scroll-spy: returns the id of the section covering a line 40% down the viewport (the last such
 * section in page order wins), or null. One ScrollTrigger per section on the shared Lenis loop fires
 * only when a section crosses that line; no per-frame measuring, and it works for pinned and
 * multi-screen sections. Sections are looked up inside the <main> that contains `scopeRef` (routes
 * stay mounted in React Activity, so ids are resolved within this route only).
 */
export function useSectionSpy(
  scopeRef: RefObject<HTMLElement | null>,
  ids: ReadonlyArray<string>,
  /** Keep the last section passed while scrolling through content that is not in the list. */
  { keepLast = false }: { keepLast?: boolean } = {},
) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    if (!key) return;
    const root = scopeRef.current?.closest("main") ?? document;
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
      setActive((previous) => (previous === current || (keepLast && current === null && previous !== null && window.scrollY > 0) ? previous : current));
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
  }, [key, scopeRef, keepLast]);

  return active;
}
