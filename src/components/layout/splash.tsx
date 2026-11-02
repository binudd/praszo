"use client";

import { useEffect, useRef, useState } from "react";

import { gsap } from "@/components/motion/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { SPLASH_EVENT, splashActive } from "@/lib/splash";

/** The Praszo mark traced from src/assets/brand/praszo-mark.png (256 × 240), in its exact coral. */
const MARK = {
  width: 256,
  height: 240,
  color: "#f46a4a",
  // Top wedge running into the diagonal stroke, and the bottom triangle.
  paths: ["M22 0H211L167 64L42 240H0L125 64Z", "M119 157L255 240H59Z"],
  // A point deep inside the top wedge and its distance to the nearest edge (mark units).
  // Scaled up around this point, the solid part of the "Z" covers the whole screen.
  focus: { x: 117, y: 26, clearance: 26 },
  center: { x: 128, y: 120 },
};

/** Height the mark settles at in the middle of the screen before it moves to the header. */
const REST_HEIGHT = 96;
/**
 * Shortest time the coral screen stays up, and the longest it waits for fonts. It no longer waits for the
 * full window load (every image): that held the hero back by ~3s on throttled mobile (LCP render delay).
 */
const MIN_MS = 350;
const MAX_MS = 1200;
/** Hard ceiling: whatever happens (stalled load, thrown error, lost tween), the site is handed over by then. */
const WATCHDOG_MS = 7000;
/** Phase durations (seconds). Contract into the mark, pause, then settle into the header. */
const CONTRACT = 0.8;
const SETTLE = 0.5;

/**
 * React Strict Mode (development) mounts, unmounts and remounts effects. The
 * unmount must not end the splash, so a real unmount finalises only if no
 * remount follows within a tick.
 */
let finalizeTimer: ReturnType<typeof setTimeout> | undefined;

/** Hands the page over: interactive, scroll unlocked (SmoothScroll listens), hero entrance released. */
function releaseSite(state: "landing" | "done") {
  const root = document.documentElement;
  const wasLocked = root.dataset.splash === "on";
  root.dataset.splash = state;
  if (wasLocked) window.dispatchEvent(new Event(SPLASH_EVENT));
}

/** The visible header logo mark to land on, if there is one at this width. */
function headerMark() {
  return Array.from(document.querySelectorAll<HTMLElement>("header [data-logo-mark]")).find((node) => {
    const rect = node.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  });
}

/**
 * First-load splash. The screen opens in the Praszo icon color: it is the mark
 * itself, scaled up around a point inside its solid wedge so it covers the
 * viewport. Once the page has loaded, the coral contracts into the mark
 * (revealing the site around it), then the mark settles into the header logo
 * and hands over to it. One vector shape, transformed by GSAP. SmoothScroll
 * keeps Lenis stopped until the splash releases the site (SPLASH_EVENT). Under
 * reduced motion the coral screen fades as soon as fonts are ready.
 */
export function Splash() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const groupRef = useRef<SVGGElement | null>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const svg = svgRef.current;
    const group = groupRef.current;
    if (!svg || !group) return;
    clearTimeout(finalizeTimer);
    if (!splashActive()) {
      const frame = requestAnimationFrame(() => setGone(true));
      return () => cancelAnimationFrame(frame);
    }

    const root = document.documentElement;
    const reduced = prefersReducedMotion();
    let cancelled = false;
    let timeline: gsap.core.Timeline | null = null;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    svg.setAttribute("viewBox", `0 0 ${vw} ${vh}`);
    gsap.set(svg, { opacity: 1 });

    // The mark is placed by: screen point (x, y) shows mark point (fx, fy) at scale s.
    const state = {
      x: vw / 2,
      y: vh / 2,
      fx: MARK.focus.x,
      fy: MARK.focus.y,
      s: (Math.hypot(vw, vh) / 2 / MARK.focus.clearance) * 1.15,
    };
    const render = () => {
      group.setAttribute("transform", `translate(${state.x} ${state.y}) scale(${state.s}) translate(${-state.fx} ${-state.fy})`);
    };
    render();

    const finish = () => {
      if (cancelled) return;
      releaseSite("done");
      setGone(true);
    };

    const outro = () => {
      if (cancelled) return;
      if (reduced) {
        releaseSite("landing");
        timeline = gsap.timeline({ onComplete: finish }).to(svg, { opacity: 0, duration: 0.25, ease: "power1.out" });
        return;
      }
      const target = headerMark()?.getBoundingClientRect();
      const rest = REST_HEIGHT / MARK.height;
      const tl = gsap.timeline({ onUpdate: render, onComplete: finish });
      timeline = tl;
      // 1. The coral screen contracts into the mark, centered.
      tl.to(state, { s: rest, fx: MARK.center.x, fy: MARK.center.y, duration: CONTRACT, ease: "expo.inOut" })
        // The site becomes interactive (and the hero entrance starts) while the mark is still shrinking.
        .add(() => releaseSite("landing"), "-=0.35")
        // 2. The mark settles into the header logo (or bows out where there is none).
        .to(
          state,
          target
            ? {
                x: target.left + target.width / 2,
                y: target.top + target.height / 2,
                s: target.height / MARK.height,
                duration: SETTLE,
                ease: "power3.inOut",
              }
            : { s: rest * 0.6, duration: 0.45, ease: "power2.in" },
          "+=0.06",
        );
      if (!target) tl.to(svg, { opacity: 0, duration: 0.3 }, "<0.15");
      // 3. The real logo takes over underneath, then the copy fades.
      else
        tl.add(() => {
          root.dataset.splash = "landed";
        }).to(svg, { opacity: 0, duration: 0.2 });
    };

    const begin = performance.now();
    // Wait for fonts only (the hero type), never for images: the hero must not wait on the full load.
    const loaded = Promise.resolve(document.fonts?.ready);
    const ready = Promise.race([loaded, new Promise((resolve) => setTimeout(resolve, MAX_MS))]);
    let outroTimer: ReturnType<typeof setTimeout> | undefined;
    void ready.then(() => {
      if (cancelled) return;
      const wait = reduced ? 0 : Math.max(0, MIN_MS - (performance.now() - begin));
      outroTimer = setTimeout(outro, wait);
    });
    const watchdog = setTimeout(finish, WATCHDOG_MS);

    return () => {
      cancelled = true;
      clearTimeout(watchdog);
      clearTimeout(outroTimer);
      timeline?.kill();
      gsap.killTweensOf([state, svg]);
      // Strict Mode remounts immediately and clears this; a real unmount releases the site.
      finalizeTimer = setTimeout(() => {
        if (root.dataset.splash !== "done") releaseSite("done");
      }, 50);
    };
  }, []);

  if (gone) return null;

  return (
    <div aria-hidden className="splash">
      <svg ref={svgRef} className="splash-art" preserveAspectRatio="none" focusable="false">
        <g ref={groupRef} fill={MARK.color}>
          {MARK.paths.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
      </svg>
    </div>
  );
}
