"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const statements = [
  "Over the years, my work has brought me across visual design, frontend development, and increasingly complex digital products.",
  "Today, I bring those perspectives together. I think about how a product should work, how the experience should feel, and how the underlying interface should be structured to remain maintainable as the product evolves.",
] as const;

export function Challenge() {
  const rootRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || prefersReducedMotion()) {
        root?.classList.add("is-static");
        return;
      }

      const lines = root.querySelectorAll("[data-challenge]");
      gsap.set(lines[0], { opacity: 1 });
      gsap.set(lines[1], { opacity: 0 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
          },
        })
        .to(lines[0], { opacity: 0, duration: 0.45 }, 0.35)
        .to(lines[1], { opacity: 1, duration: 0.45 }, 0.35);
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      aria-label="Challenge"
      className="challenge relative h-[160svh] border-t border-line"
    >
      <div className="sticky top-0 flex min-h-[100svh] items-center px-5 py-24 md:px-10">
        <div className="relative mx-auto w-full max-w-5xl">
          <p className="mb-8 text-base text-white/50">The problem</p>
          <div className="challenge-stage relative min-h-[14rem] md:min-h-[22rem]">
            {statements.map((text) => (
              <p
                key={text}
                data-challenge
                className="challenge-line max-w-4xl font-serif text-[clamp(1.8rem,4.6vw,4.4rem)] leading-[1.08] text-ink"
              >
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
