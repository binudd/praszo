"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { ComponentGraph } from "@/components/diagrams/component-graph";
import { TimesheetFragment } from "@/components/diagrams/timesheet-fragment";
import { EASE, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function PmsGate() {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (prefersReducedMotion()) {
        ref.current.classList.add("is-static");
        return;
      }

      const visual = ref.current.querySelector("[data-pms-visual]");
      const meta = ref.current.querySelectorAll("[data-pms-meta]");
      const heading = ref.current.querySelector("[data-pms-heading]");

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 74%",
          once: true,
        },
      });

      if (visual) {
        timeline.fromTo(
          visual,
          { clipPath: "inset(14% 10%)" },
          { clipPath: "inset(0% 0%)", duration: 0.85, ease: EASE },
        );
      }

      timeline.fromTo(
        meta,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: EASE },
        "-=0.35",
      );

      if (heading) {
        timeline.fromTo(
          heading,
          { y: "108%" },
          { y: "0%", duration: 0.7, ease: EASE },
          "-=0.2",
        );
      }
    },
    { scope: ref },
  );

  return (
    <div ref={ref}>
      <p data-pms-meta className="text-[11px] font-medium tracking-[0.22em] text-ink-3 uppercase">
        Case study 01 · Enterprise product engineering
      </p>
      <div className="mask-reveal mt-4 max-w-4xl">
        <h2
          data-pms-heading
          className="font-serif text-[clamp(2.2rem,5.6vw,5.4rem)] leading-[1.02] text-ink"
        >
          Praszo PMS — making a complex Timesheet maintainable.
        </h2>
      </div>
      <p data-pms-meta className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
        A project management application with multiple modules, workflows, and
        shared interface patterns. As the product evolves, consistency and
        clear component responsibilities become the work.
      </p>
      <p data-pms-meta className="mt-4 max-w-2xl text-sm text-ink-3">
        I contributed the Timesheet refactor and the shared workspace layout
        primitives inside an existing team codebase. I do not claim ownership
        of the whole product, the backend, or every module.
      </p>
      <p data-pms-meta className="mt-8 text-[11px] tracking-[0.16em] text-accent uppercase">
        From the surface of the interface into its structure
      </p>
      <div data-pms-visual className="clip-visual mt-4 overflow-hidden">
        <TimesheetFragment />
      </div>
      <div className="mt-12">
        <ComponentGraph />
      </div>
    </div>
  );
}
