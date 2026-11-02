"use client";

import type { ReactNode } from "react";
import { Fragment, useRef } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/components/motion/gsap";
import { cn } from "@/lib/cn";
import { prefersReducedMotion } from "@/lib/motion";

type Props = {
  text: string;
  /** Phrases rendered in the brand color once revealed. */
  highlights?: ReadonlyArray<string>;
  className?: string;
  start?: string;
  end?: string;
  as?: "p" | "h2" | "h1";
  children?: ReactNode;
};

function splitWords(text: string, highlights: ReadonlyArray<string>) {
  const words = text.split(/\s+/).filter(Boolean);
  const flags = new Array<boolean>(words.length).fill(false);
  for (const phrase of highlights) {
    const target = phrase.split(/\s+/).filter(Boolean);
    for (let i = 0; i + target.length <= words.length; i += 1) {
      const slice = words.slice(i, i + target.length).map((word) => word.replace(/[.,!?;:]+$/, "").toLowerCase());
      if (slice.every((word, j) => word === target[j].replace(/[.,!?;:]+$/, "").toLowerCase())) {
        for (let j = 0; j < target.length; j += 1) flags[i + j] = true;
      }
    }
  }
  return words.map((word, index) => ({ word, highlight: flags[index] }));
}

/**
 * Statement whose words light up one by one as the visitor scrolls.
 * The scrub follows the nearest ancestor marked [data-reveal-track] (e.g. a sticky statement's tall
 * track), else the text itself. The track is looked up from the DOM because a parent's ref is not
 * attached yet when this child's layout effect runs.
 */
export function WordReveal({ text, highlights = [], className, start = "top 75%", end = "bottom 45%", as: Tag = "p", children }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const words = splitWords(text, highlights);

  useGSAP(
    () => {
      const node = ref.current;
      if (!node) return;
      if (prefersReducedMotion()) {
        node.classList.add("is-static");
        return () => node.classList.remove("is-static");
      }
      const wordNodes = Array.from(node.querySelectorAll<HTMLElement>(".word"));
      const trigger = ScrollTrigger.create({
        trigger: node.closest<HTMLElement>("[data-reveal-track]") ?? node,
        start,
        end,
        scrub: 0.4,
        onUpdate: (self) => {
          const on = Math.round(self.progress * wordNodes.length);
          wordNodes.forEach((wordNode, index) => wordNode.classList.toggle("is-on", index < on));
        },
      });
      return () => {
        trigger.kill();
        wordNodes.forEach((wordNode) => wordNode.classList.remove("is-on"));
        gsap.set(wordNodes, { clearProps: "all" });
      };
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref as React.RefObject<HTMLParagraphElement>} className={cn("word-reveal", className)}>
      {words.map((item, index) => (
        <Fragment key={`${item.word}-${index}`}>
          {index > 0 ? " " : null}
          <span className="word" data-highlight={item.highlight || undefined}>
            {item.word}
          </span>
        </Fragment>
      ))}
      {children}
    </Tag>
  );
}
