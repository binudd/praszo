"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

import { cn } from "@/lib/cn";
import { isFinePointer } from "@/lib/motion";

/** Subtle 3D tilt that follows a fine pointer; inert on touch and reduced motion. */
export function Tilt({ children, className, max = 5 }: { children: ReactNode; className?: string; max?: number }) {
  const reduced = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), { stiffness: 160, damping: 20, mass: 0.5 });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), { stiffness: 160, damping: 20, mass: 0.5 });

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || !isFinePointer()) return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div className={cn("[perspective:1200px]", className)} onPointerMove={onMove} onPointerLeave={onLeave}>
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
