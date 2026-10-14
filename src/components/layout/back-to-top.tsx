"use client";

import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { getLenis } from "@/components/motion/smooth-scroll";

export function BackToTop() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 720);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.a
          href="#top"
          aria-label="Back to top"
          className="fixed right-4 bottom-4 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-[0_8px_24px_rgba(18,19,23,0.08)] md:right-6 md:bottom-6"
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: 8 }}
          onClick={(event) => {
            event.preventDefault();
            const lenis = getLenis();
            if (lenis) {
              lenis.scrollTo("#top", { offset: 0 });
            } else {
              document.getElementById("top")?.scrollIntoView();
            }
            history.pushState(null, "", "#top");
          }}
        >
          <ArrowUp size={16} />
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}
