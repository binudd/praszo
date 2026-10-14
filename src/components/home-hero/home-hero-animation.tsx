"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { Hero } from "@/components/sections/hero";
import { prefersReducedMotion } from "@/lib/motion";

import "./home-hero-animation.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HERO_ZOOM_CONFIG = {
  desktop: {
    scaleTo: 22,
    endVh: 120,
    scrub: 0.55,
  },
  mobile: {
    scaleTo: 14,
    endVh: 110,
    scrub: 0.4,
  },
  contentFadeAt: 0.06,
  contentFadeDuration: 0.34,
  zoomAt: 0.04,
  zoomDuration: 0.66,
  stageFadeAt: 0.86,
  stageFadeDuration: 0.14,
} as const;

function createHeroZoom(
  root: HTMLElement,
  preset: (typeof HERO_ZOOM_CONFIG)["desktop"] | (typeof HERO_ZOOM_CONFIG)["mobile"],
) {
  const stage = root.querySelector<HTMLElement>(".home-hero-animation__stage");
  const zoomTarget = root.querySelector<HTMLElement>("[data-hero-zoom]");
  const fadeItems = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-hero-fade]"));

  if (!stage || !zoomTarget) return undefined;

  gsap.set(zoomTarget, {
    transformOrigin: "50% 50%",
    force3D: true,
    zIndex: 3,
  });
  gsap.set(stage, { opacity: 1, pointerEvents: "auto" });

  const timeline = gsap.timeline({ defaults: { ease: "none" } });

  timeline.fromTo(
    fadeItems,
    { opacity: 1 },
    { opacity: 0, duration: HERO_ZOOM_CONFIG.contentFadeDuration },
    HERO_ZOOM_CONFIG.contentFadeAt,
  );

  timeline.fromTo(
    zoomTarget,
    { scale: 1 },
    {
      scale: preset.scaleTo,
      duration: HERO_ZOOM_CONFIG.zoomDuration,
      zIndex: 8,
    },
    HERO_ZOOM_CONFIG.zoomAt,
  );

  timeline.fromTo(
    stage,
    { opacity: 1 },
    {
      opacity: 0,
      pointerEvents: "none",
      duration: HERO_ZOOM_CONFIG.stageFadeDuration,
    },
    HERO_ZOOM_CONFIG.stageFadeAt,
  );

  const trigger = ScrollTrigger.create({
    animation: timeline,
    trigger: root,
    start: "top top",
    end: () => `+=${Math.round(window.innerHeight * (preset.endVh / 100))}`,
    pin: true,
    pinSpacing: false,
    anticipatePin: 1,
    scrub: preset.scrub,
    invalidateOnRefresh: true,
  });

  return () => {
    trigger.kill();
    timeline.kill();
    gsap.set([zoomTarget, stage, fadeItems], {
      clearProps: "transform,opacity,zIndex,pointerEvents",
    });
  };
}

export function HomeHeroAnimation() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        root.classList.add("is-static");
        return () => root.classList.remove("is-static");
      });

      if (prefersReducedMotion()) {
        return () => mm.revert();
      }

      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () =>
        createHeroZoom(root, HERO_ZOOM_CONFIG.mobile),
      );

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () =>
        createHeroZoom(root, HERO_ZOOM_CONFIG.desktop),
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="home-hero-animation">
      <div className="home-hero-animation__stage">
        <Hero />
      </div>
    </div>
  );
}
