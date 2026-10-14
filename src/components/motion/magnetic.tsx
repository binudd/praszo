"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { ReactNode } from "react";
import { useRef } from "react";

import { isFinePointer } from "@/lib/motion";

export function Magnetic({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 280, damping: 22, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onPointerMove={(event) => {
        if (reduced || !isFinePointer() || !ref.current) return;
        const box = ref.current.getBoundingClientRect();
        const nextX = ((event.clientX - box.left) / box.width - 0.5) * 16;
        const nextY = ((event.clientY - box.top) / box.height - 0.5) * 16;
        x.set(Math.max(-8, Math.min(8, nextX)));
        y.set(Math.max(-8, Math.min(8, nextY)));
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
