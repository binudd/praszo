"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useReducedMotion } from "motion/react";
import { useRef } from "react";

import { HeroDrawing } from "@/components/diagrams/hero-drawing";
import { Magnetic } from "@/components/motion/magnetic";
import { Button } from "@/components/ui/button";
import { FilmLink } from "@/components/ui/film-link";
import { site } from "@/content/site";
import { EASE, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(useGSAP);

const headline = ["From pixels", "to products."];

export function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const header = document.querySelector(".site-header");

      if (prefersReducedMotion() || reducedMotion) {
        root.classList.add("is-static");
        header?.classList.add("is-static");
        return;
      }

      const nav = header?.querySelectorAll("[data-nav]");
      const pulse = root.querySelector("[data-hero-pulse]");
      const shape = root.querySelector("[data-hero-shape]");
      const wire = root.querySelector("[data-hero-wire]");
      const link = root.querySelector("[data-hero-link]");

      const timeline = gsap.timeline({
        defaults: { ease: EASE },
        onComplete: () => {
          root.classList.add("is-ready");
          header?.classList.add("is-ready");
        },
      });

      if (nav?.length) {
        timeline.fromTo(
          nav,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.04 },
        );
      }

      timeline
        .fromTo(
          root.querySelector("[data-hero='copy']"),
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45 },
          "-=0.1",
        )
        .fromTo(
          root.querySelector("[data-hero='cta']"),
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35 },
          "-=0.2",
        )
        .fromTo(
          root.querySelector("[data-hero='visual']"),
          { opacity: 0 },
          { opacity: 1, duration: 1.1 },
          "-=0.7",
        )
        .fromTo(
          root.querySelectorAll("[data-hero='headline']"),
          { y: "112%" },
          { y: "0%", duration: 0.7, stagger: 0.08 },
          "-=0.85",
        );

      if (wire && link) {
        gsap.fromTo(
          [wire, link],
          { opacity: 0.2 },
          { opacity: 0.85, duration: 1.4, stagger: 0.15, ease: "sine.inOut" },
        );
      }

      if (pulse) {
        gsap.to(pulse, {
          opacity: 0.4,
          scale: 1.7,
          transformOrigin: "center",
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (shape) {
        gsap.to(shape, {
          y: -5,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    },
    { scope: rootRef },
  );

  return (
    <section
      id="top"
      ref={rootRef}
      aria-label="Introduction"
      className="hero section-grid relative flex min-h-[100svh] flex-col overflow-hidden px-5 pb-10 pt-28 md:px-10 md:pb-12"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start">
        <div className="pt-2">
          <p
            data-hero="copy"
            className="max-w-md text-[1.05rem] leading-snug text-ink-2 md:text-[19px] md:leading-[1.45]"
          >
            {site.supporting}{" "}
            <span className="text-ink">{site.descriptor}</span>
          </p>
          <div data-hero="cta" className="mt-8">
            <Magnetic>
              <FilmLink href="/#work">View selected work</FilmLink>
            </Magnetic>
          </div>
        </div>
        <figure
          data-hero="visual"
          className="overflow-hidden rounded-[1.75rem] border border-line bg-surface"
        >
          <HeroDrawing />
        </figure>
      </div>

      <div className="relative z-10 mx-auto mt-10 w-full max-w-6xl md:mt-14">
        <h1 className="max-w-[12ch] text-[clamp(2.8rem,8.6vw,6.6rem)] leading-[0.88] text-ink">
          {headline.map((line) => (
            <span key={line} className="mask-reveal block">
              <span data-hero="headline" className="block">
                {line}
              </span>
            </span>
          ))}
        </h1>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button href="/story">Explore my journey</Button>
        </div>
      </div>
    </section>
  );
}
