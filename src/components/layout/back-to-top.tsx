"use client";

import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { ScrollTrigger } from "@/components/motion/gsap";
import { scrollToTarget } from "@/components/motion/smooth-scroll";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

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

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          aria-label="Back to top"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.25 }}
          onClick={() => scrollToTarget(0)}
          className="fixed right-5 bottom-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-bg text-ink shadow-float transition-colors hover:bg-elevated md:right-8 md:bottom-8"
        >
          <ArrowUp size={18} />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
