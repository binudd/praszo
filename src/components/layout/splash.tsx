"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import mark from "@/assets/brand/praszo-mark.png";
import { gsap } from "@/components/motion/gsap";
import { getLenis } from "@/components/motion/smooth-scroll";
import { prefersReducedMotion } from "@/lib/motion";
import { SPLASH_EVENT, splashActive } from "@/lib/splash";

/** Shortest time the splash stays up, and the longest it waits for the page to finish loading. */
const MIN_MS = 1100;
const MAX_MS = 4000;
const MARK_HEIGHT = 72;

const pageLoaded = () =>
  new Promise<void>((resolve) => {
    if (document.readyState === "complete") resolve();
    else window.addEventListener("load", () => resolve(), { once: true });
  });

/** The visible header logo mark to land on, if there is one at this width. */
function headerMark() {
  const marks = Array.from(document.querySelectorAll<HTMLElement>("header [data-logo-mark]"));
  return marks.find((node) => {
    const rect = node.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  });
}

/**
 * First-load splash: a coral screen with the white Praszo mark. The mark
 * draws in and breathes while the page loads, then flies into the header
 * logo, turning coral, while the screen collapses into it. Plays on every
 * full page load; under reduced motion the mark simply fades in and the
 * screen fades out.
 */
export function Splash() {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const markRef = useRef<HTMLDivElement | null>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    const flyer = markRef.current;
    if (!overlay || !flyer) return;
    if (!splashActive()) {
      // No splash this load (attribute never set): drop the nodes.
      const frame = requestAnimationFrame(() => setGone(true));
      return () => cancelAnimationFrame(frame);
    }

    const root = document.documentElement;
    const lenis = getLenis();
    lenis?.stop();
    let cancelled = false;
    const accent = getComputedStyle(root).getPropertyValue("--accent").trim() || "#f55d48";

    const reduced = prefersReducedMotion();
    const intro = gsap.timeline();
    if (reduced) intro.fromTo(flyer, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    else
      intro
        .fromTo(flyer, { opacity: 0, scale: 0.55, rotate: -120 }, { opacity: 1, scale: 1, rotate: 0, duration: 0.8, ease: "back.out(1.6)" })
        .to(flyer, { scale: 1.08, duration: 0.7, ease: "sine.inOut", yoyo: true, repeat: -1 });

    const finish = () => {
      if (cancelled) return;
      root.dataset.splash = "done";
      lenis?.start();
      window.dispatchEvent(new Event(SPLASH_EVENT));
      setGone(true);
    };

    const outro = () => {
      if (cancelled) return;
      intro.kill();
      if (reduced) {
        root.dataset.splash = "landing";
        gsap.to([overlay, flyer], { opacity: 0, duration: 0.35, ease: "power1.out", onComplete: finish });
        return;
      }
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const target = headerMark();
      const rect = target?.getBoundingClientRect();
      const tx = rect ? rect.left + rect.width / 2 : vw / 2;
      const ty = rect ? rect.top + rect.height / 2 : vh / 2;
      const scale = rect ? rect.height / MARK_HEIGHT : 0.2;
      const radius = Math.hypot(vw, vh);

      const tl = gsap.timeline({ onComplete: finish });
      tl.to(flyer, { scale: 1, rotate: 0, duration: 0.25, ease: "power2.out" })
        .to(
          flyer,
          { x: tx - vw / 2, y: ty - vh / 2, scale, backgroundColor: accent, opacity: rect ? 1 : 0, duration: 1, ease: "expo.inOut" },
          "fly",
        )
        .fromTo(
          overlay,
          { clipPath: `circle(${radius}px at ${vw / 2}px ${vh / 2}px)` },
          { clipPath: `circle(0px at ${tx}px ${ty}px)`, duration: 1, ease: "expo.inOut" },
          "fly",
        )
        // Hand over to the real logo, then let the flying copy go.
        .add(() => {
          root.dataset.splash = "landing";
        })
        .to(flyer, { opacity: 0, duration: 0.15 });
    };

    const started = performance.now();
    const ready = Promise.race([Promise.all([pageLoaded(), document.fonts?.ready]), new Promise((r) => setTimeout(r, MAX_MS))]);
    void ready.then(() => {
      const wait = Math.max(0, MIN_MS - (performance.now() - started));
      gsap.delayedCall(wait / 1000, outro);
    });

    return () => {
      cancelled = true;
      intro.kill();
      gsap.killTweensOf([flyer, overlay]);
      if (root.dataset.splash === "on" || root.dataset.splash === "landing") {
        root.dataset.splash = "done";
        lenis?.start();
        window.dispatchEvent(new Event(SPLASH_EVENT));
      }
    };
  }, []);

  if (gone) return null;

  const width = (MARK_HEIGHT * mark.width) / mark.height;
  const maskStyle = {
    "--splash-w": `${width}px`,
    width,
    height: MARK_HEIGHT,
    WebkitMaskImage: `url(${mark.src})`,
    maskImage: `url(${mark.src})`,
  } as CSSProperties;

  return (
    <div aria-hidden className="splash">
      <div ref={overlayRef} className="splash-screen" />
      <div ref={markRef} className="splash-mark" style={maskStyle} />
    </div>
  );
}
