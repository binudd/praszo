"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { processStages } from "@/content/site";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Approach() {
  const rootRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.fromTo(
        "[data-process-line]",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 75%",
            end: "bottom 60%",
            scrub: true,
          },
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <section
      id="approach"
      ref={rootRef}
      className="border-t border-line px-5 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-base text-ink-3">The build</p>
        <h2 className="mt-4 max-w-3xl font-serif text-[clamp(2.4rem,6vw,5.4rem)] leading-[0.94] text-ink">
          Understand the problem.
          <br />
          Build the right solution.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-2">
          A practical sequence, not a proprietary method. Most product work fails
          when a step is skipped — usually the first one.
        </p>
        <div className="relative mt-14">
          <div className="absolute top-0 right-0 left-0 hidden h-px bg-line md:block" />
          <div
            data-process-line
            className="absolute top-0 left-0 hidden h-px origin-left bg-accent md:block"
          />
          <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {processStages.map((stage) => (
              <li
                key={stage.id}
                className="min-h-[16rem] rounded-[1.75rem] border border-line bg-surface p-6"
              >
                <p className="text-[12px] tracking-[0.18em] text-accent uppercase">
                  {stage.id}
                </p>
                <h3 className="mt-10 font-serif text-3xl text-ink">{stage.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-2">{stage.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
