"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

import { ScrollTrigger } from "@/components/motion/gsap";
import { scrollToTarget } from "@/components/motion/smooth-scroll";
import { cn } from "@/lib/cn";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  // Shown once the page is scrolled past 900px. A ScrollTrigger (on the shared Lenis loop) toggles
  // state only when that threshold is crossed, not on every scroll event.
  useEffect(() => {
    const trigger = ScrollTrigger.create({ start: 900, end: "max", onToggle: (self) => setVisible(self.isActive) });
    const frame = requestAnimationFrame(() => setVisible(trigger.isActive));
    return () => {
      cancelAnimationFrame(frame);
      trigger.kill();
    };
  }, []);

  // Always mounted so it can fade out with a CSS transition; inert (unfocusable, hidden from AT) while hidden.
  return (
    <button
      type="button"
      aria-label="Back to top"
      inert={!visible}
      onClick={() => scrollToTarget(0)}
      className={cn(
        "fixed right-5 bottom-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-bg text-ink shadow-float transition-[background-color,opacity,translate,visibility] duration-250 hover:bg-elevated motion-reduce:transition-none md:right-8 md:bottom-8",
        visible ? "visible translate-y-0 opacity-100" : "pointer-events-none invisible translate-y-3 opacity-0",
      )}
    >
      <ArrowUp size={18} />
    </button>
  );
}
