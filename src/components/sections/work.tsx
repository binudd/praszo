"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { TimesheetFragment } from "@/components/diagrams/timesheet-fragment";
import { Button } from "@/components/ui/button";
import { projects } from "@/content/projects";
import { EASE, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const pms = projects[0];
const qa = projects[1];

export function Work() {
  const rootRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const visual = rootRef.current?.querySelector("[data-work-visual]");
      if (!visual) return;
      gsap.fromTo(
        visual,
        { clipPath: "inset(8% 6%)" },
        {
          clipPath: "inset(0% 0%)",
          duration: 1,
          ease: EASE,
          scrollTrigger: {
            trigger: visual,
            start: "top 82%",
            once: true,
          },
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <section
      id="work"
      ref={rootRef}
      className="border-t border-line px-5 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] tracking-[0.22em] text-ink-3 uppercase">
          Selected work
        </p>
        <h2 className="mt-4 max-w-3xl font-serif text-[clamp(2.4rem,6.4vw,5.4rem)] leading-[0.94] text-ink">
          Work that connects design and engineering.
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-2">
          Two projects with genuine implementation evidence. Quality over a
          longer list of unverifiable screens.
        </p>

        <article id="praszo-pms" className="mt-16 scroll-mt-24">
          <div
            data-work-visual
            className="clip-visual work-paper overflow-hidden rounded-[1.75rem] border border-line"
          >
            <TimesheetFragment />
          </div>
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div>
              <p className="font-mono text-[11px] tracking-[0.18em] text-ink-3 uppercase">
                {pms.index} · {pms.category}
              </p>
              <h3 className="mt-3 font-serif text-4xl text-ink md:text-5xl">{pms.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-ink-2">{pms.summary}</p>
            </div>
            <dl className="space-y-5 text-sm leading-relaxed text-ink-2">
              <div>
                <dt className="font-mono text-[10px] tracking-[0.16em] text-accent uppercase">
                  Role
                </dt>
                <dd className="mt-2">{pms.role}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] tracking-[0.16em] text-accent uppercase">
                  Challenge
                </dt>
                <dd className="mt-2">{pms.challenge}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] tracking-[0.16em] text-accent uppercase">
                  Approach
                </dt>
                <dd className="mt-2">{pms.approach}</dd>
              </div>
              <p className="font-mono text-[11px] text-ink-3">{pms.technologies.join(" · ")}</p>
            </dl>
          </div>
        </article>

        <article
          id="qa-review"
          className="mt-20 grid gap-8 border-t border-line pt-16 lg:grid-cols-[minmax(0,1.1fr)_auto] lg:items-end"
        >
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
              {qa.index} · In progress
            </p>
            <h3 className="mt-4 font-serif text-3xl text-ink md:text-4xl">{qa.title}</h3>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-2">{qa.summary}</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-2">{qa.role}</p>
            <p className="mt-4 font-mono text-[11px] text-ink-3">{qa.technologies.join(" · ")}</p>
            <p className="mt-3 text-sm text-ink-3">{qa.statusNote}</p>
          </div>
          <Button href="/story" variant="ghost">
            Read the journey
          </Button>
        </article>
      </div>
    </section>
  );
}
