"use client";

import type { ReactNode } from "react";
import { useRef } from "react";

import { gsap, useGSAP } from "@/components/motion/gsap";
import { EASE, prefersReducedMotion } from "@/lib/motion";

/** Clip-path reveal for screenshots as they scroll into view. */
export function ClipReveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const node = ref.current;
      if (!node || prefersReducedMotion()) return;
      gsap.fromTo(
        node,
        { clipPath: "inset(10% 6% round 20px)", scale: 0.985 },
        {
          clipPath: "inset(0% 0% round 20px)",
          scale: 1,
          duration: 1.1,
          ease: EASE,
          scrollTrigger: { trigger: node, start: "top 82%", once: true },
          clearProps: "transform",
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
