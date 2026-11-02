"use client";

import { useEffect } from "react";

import { isFinePointer, prefersReducedMotion } from "@/lib/motion";

export function PointerField() {
  useEffect(() => {
    if (prefersReducedMotion() || !isFinePointer()) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--mx", `${event.clientX}px`);
        document.documentElement.style.setProperty("--my", `${event.clientY}px`);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <div aria-hidden className="pointer-field" />;
}
