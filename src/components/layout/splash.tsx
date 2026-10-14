"use client";

import { useEffect, useRef, useState } from "react";

import { gsap } from "@/components/motion/gsap";
import { getLenis } from "@/components/motion/smooth-scroll";
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
/** Shortest time the coral screen stays up, and the longest it waits for the page to finish loading. */
const MIN_MS = 900;
const MAX_MS = 4000;

const pageLoaded = () =>
  new Promise<void>((resolve) => {
    if (document.readyState === "complete") resolve();
    else window.addEventListener("load", () => resolve(), { once: true });
  });

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
 * and hands over to it. One vector shape, transformed by GSAP; Lenis is paused
 * until the site starts. Under reduced motion the coral screen simply fades.
 */
export function Splash() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const groupRef = useRef<SVGGElement | null>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const svg = svgRef.current;
    const group = groupRef.current;
    if (!svg || !group) return;
    if (!splashActive()) {
      const frame = requestAnimationFrame(() => setGone(true));
      return () => cancelAnimationFrame(frame);
    }

    const root = document.documentElement;
    const lenis = getLenis();
    lenis?.stop();
    let cancelled = false;
    let started = false;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    svg.setAttribute("viewBox", `0 0 ${vw} ${vh}`);

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

    const startSite = () => {
      if (started) return;
      started = true;
      // Pointer events pass through from here, and the hero entrance plays under the landing mark.
      root.dataset.splash = "landing";
      lenis?.start();
      window.dispatchEvent(new Event(SPLASH_EVENT));
    };
    const finish = () => {
      if (cancelled) return;
      startSite();
      root.dataset.splash = "done";
      setGone(true);
    };

    const outro = () => {
      if (cancelled) return;
      if (prefersReducedMotion()) {
        startSite();
        gsap.to(svg, { opacity: 0, duration: 0.4, ease: "power1.out", onComplete: finish });
        return;
      }
      const target = headerMark()?.getBoundingClientRect();
      const rest = REST_HEIGHT / MARK.height;
      const tl = gsap.timeline({ onUpdate: render, onComplete: finish });
      // 1. The coral screen contracts into the mark, centered.
      tl.to(state, { s: rest, fx: MARK.center.x, fy: MARK.center.y, duration: 1.25, ease: "expo.inOut" })
        .add(startSite, "-=0.35")
        // 2. The mark settles into the header logo (or bows out where there is none).
        .to(
          state,
          target
            ? {
                x: target.left + target.width / 2,
                y: target.top + target.height / 2,
                s: target.height / MARK.height,
                duration: 0.85,
                ease: "power3.inOut",
              }
            : { s: rest * 0.6, duration: 0.5, ease: "power2.in" },
          "+=0.12",
        );
      if (!target) tl.to(svg, { opacity: 0, duration: 0.3 }, "<0.2");
      // 3. The real logo takes over underneath, then the copy fades.
      else
        tl.add(() => {
          root.dataset.splash = "landed";
        }).to(svg, { opacity: 0, duration: 0.2 });
    };

    const begin = performance.now();
    const ready = Promise.race([Promise.all([pageLoaded(), document.fonts?.ready]), new Promise((resolve) => setTimeout(resolve, MAX_MS))]);
    void ready.then(() => {
      gsap.delayedCall(Math.max(0, MIN_MS - (performance.now() - begin)) / 1000, outro);
    });

    return () => {
      cancelled = true;
      gsap.killTweensOf([state, svg]);
      if (root.dataset.splash !== "done") {
        startSite();
        root.dataset.splash = "done";
      }
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
