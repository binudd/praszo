"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useRef } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/components/motion/gsap";
import { cn } from "@/lib/cn";
import { prefersReducedMotion } from "@/lib/motion";

type Props = {
  text: string;
  /** Phrases rendered in the brand color once revealed. */
  highlights?: string[];
  className?: string;
  /** Element that drives the scrub (defaults to the reveal itself). */
  trackRef?: React.RefObject<HTMLElement | null>;
  start?: string;
  end?: string;
  as?: "p" | "h2" | "h1";
  /** Phrases set in bold (kept in the ink color). */
  strong?: string[];
  /**
   * false: no scroll trigger. The words stay dim until a parent lights them (adds .is-on), as the
   * hero entrance does; [data-entrance].is-ready / .is-static show them all lit.
   */
  scrub?: boolean;
  children?: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, "children" | "className">;

function markPhrases(words: string[], phrases: string[]) {
  const flags = new Array<boolean>(words.length).fill(false);
  for (const phrase of phrases) {
    const target = phrase.split(/\s+/).filter(Boolean);
    for (let i = 0; i + target.length <= words.length; i += 1) {
      const slice = words.slice(i, i + target.length).map((word) => word.replace(/[.,!?;:]+$/, "").toLowerCase());
      if (slice.every((word, j) => word === target[j].replace(/[.,!?;:]+$/, "").toLowerCase())) {
        for (let j = 0; j < target.length; j += 1) flags[i + j] = true;
      }
    }
  }
  return flags;
}

function splitWords(text: string, highlights: string[], strong: string[]) {
  const words = text.split(/\s+/).filter(Boolean);
  const highlighted = markPhrases(words, highlights);
  const bold = markPhrases(words, strong);
  return words.map((word, index) => ({ word, highlight: highlighted[index], strong: bold[index] }));
}

/** Statement whose words light up one by one as the visitor scrolls. */
export function WordReveal({
  text,
  highlights = [],
  strong = [],
  className,
  trackRef,
  start = "top 75%",
  end = "bottom 45%",
  as: Tag = "p",
  scrub = true,
  children,
  ...rest
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const words = splitWords(text, highlights, strong);

  useGSAP(
    () => {
      const node = ref.current;
      if (!node) return;
      if (prefersReducedMotion()) {
        node.classList.add("is-static");
        return () => node.classList.remove("is-static");
      }
      if (!scrub) return;
      const wordNodes = Array.from(node.querySelectorAll<HTMLElement>(".word"));
      const trigger = ScrollTrigger.create({
        trigger: trackRef?.current ?? node,
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
    { scope: ref, dependencies: [scrub] },
  );

  return (
    <Tag {...rest} ref={ref as React.RefObject<HTMLParagraphElement>} className={cn("word-reveal", className)}>
      {words.map((item, index) => (
        <span key={`${item.word}-${index}`} className="word" data-highlight={item.highlight || undefined} data-strong={item.strong || undefined}>
          {item.word}
        </span>
      ))}
      {children}
    </Tag>
  );
}
