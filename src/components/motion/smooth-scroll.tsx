"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";

import { ANCHOR_OFFSET } from "@/lib/motion";

import "lenis/dist/lenis.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      anchors: { offset: ANCHOR_OFFSET },
      respectReducedMotion: true,
      prevent: (node) =>
        node instanceof Element &&
        Boolean(node.closest("[data-lenis-prevent], [role='dialog']")),
    });

    lenisInstance = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const onStop = () => lenis.stop();
    const onStart = () => lenis.start();
    window.addEventListener("lenis:stop", onStop);
    window.addEventListener("lenis:start", onStart);

    return () => {
      window.removeEventListener("lenis:stop", onStop);
      window.removeEventListener("lenis:start", onStart);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
}
