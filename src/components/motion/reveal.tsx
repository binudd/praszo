"use client";

import type { ReactNode } from "react";
import { useRef } from "react";

import { gsap, useGSAP } from "@/components/motion/gsap";
import { cn } from "@/lib/cn";
import { EASE, prefersReducedMotion } from "@/lib/motion";

/** Masked line reveal for headings. */
export function RevealHeading({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;
      gsap.fromTo(
        ref.current,
        { y: "110%" },
        {
          y: "0%",
          duration: 0.85,
          ease: EASE,
          scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <span className={cn("mask-reveal block pb-[0.08em]", className)}>
      <span ref={ref} className="block">
        {children}
      </span>
    </span>
  );
}

/** Fade-up for a single block. */
export function RevealBlock({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;
      gsap.fromTo(
        ref.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay,
          ease: EASE,
          scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
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

/** Staggers every descendant marked with data-reveal when the group scrolls into view. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  start = "top 85%",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  start?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || prefersReducedMotion()) return;
      const items = root.querySelectorAll("[data-reveal]");
      if (items.length === 0) return;
      gsap.fromTo(
        items,
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: EASE,
          stagger,
          scrollTrigger: { trigger: root, start, once: true },
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
