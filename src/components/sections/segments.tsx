"use client";

import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

import { scrollToTarget } from "@/components/motion/smooth-scroll";
import { applySceneItems, useScene } from "@/components/motion/use-scene";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { SectionHeader } from "@/components/ui/section-header";
import { home } from "@/data/home";

type Segment = (typeof home.segments.items)[number];

const segments = home.segments.items;
const count = segments.length;
/** Share of the scroll used to crossfade between two steps. */
const SWITCH = 0.1;

function SegmentPanel({ segment }: { segment: Segment }) {
  return (
    <div className="grid gap-8 rounded-panel bg-surface p-6 sm:p-10 lg:h-full lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-14 lg:p-12">
      <div className="flex flex-col">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-sm bg-brand-soft text-brand">
          <Icon name={segment.icon} size={24} aria-hidden />
        </span>
        <h3 className="display-sm mt-6 text-ink">{segment.title}</h3>
        <p className="mt-3 text-[15px] font-semibold text-brand">{segment.subtitle}</p>
        <p className="mt-4 text-[16.5px] leading-relaxed text-ink-2">{segment.body}</p>
        <a
          href={segment.href}
          target="_blank"
          rel="noreferrer"
          className="group mt-7 inline-flex w-fit items-center gap-1 text-sm font-bold text-ink transition-colors hover:text-brand"
        >
          Read more on praszo.com
          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </a>
      </div>
      <ul className="divide-y divide-line">
        {segment.points.map((text) => (
          <li key={text} className="flex gap-3 py-3.5 text-[15px] leading-relaxed text-ink-2 first:pt-0 last:pb-0">
            <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * "Who it is for" as a sticky scroll scene, like the product spotlights: the
 * firm-size tabs and panels swap as the visitor scrolls. Tabs jump to their
 * step. Below lg,
 * under reduced motion and without JS the panels simply stack.
 */
export function Segments() {
  const rootRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  useScene(rootRef, {
    count,
    onUpdate: (progress) => {
      const stage = stageRef.current;
      if (!stage) return;
      // Hold each step for most of its slice and crossfade in a short window at each boundary.
      let t = 0;
      for (let k = 1; k < count; k += 1) t += Math.min(1, Math.max(0, (progress - k / count) / SWITCH + 0.5));
      const index = Math.round(t);
      applySceneItems(stage, t, index, 1, 24);
    },
  });

  const jumpTo = (index: number) => {
    const track = rootRef.current?.querySelector<HTMLElement>("[data-scene-track]");
    if (!track) return;
    const top = track.getBoundingClientRect().top + window.scrollY;
    const range = track.offsetHeight - window.innerHeight;
    // Land just inside the step's slice so its first point is highlighted.
    scrollToTarget(top + range * Math.min(1, (index + 0.02) / count));
  };

  return (
    <section ref={rootRef} aria-labelledby="segments-title" className="scene relative pt-24 md:pt-32">
      <Container wide>
        <SectionHeader eyebrow={home.segments.eyebrow} title={home.segments.title} titleId="segments-title" align="center" size="lg" />
      </Container>

      <div data-scene-track className="scene-track" style={{ height: `${count * 110 + 40}svh` }}>
        <div ref={stageRef} data-scene-stage className="scene-stage pt-[var(--header-h)]">
          <Container wide className="w-full">
            <div className="flex justify-center">
              <ol className="scene-tabs" aria-label="Firm size">
                {segments.map((segment, index) => (
                  <li key={segment.title} data-scene-tab className="scene-tab">
                    <button type="button" onClick={() => jumpTo(index)}>
                      {segment.title}
                    </button>
                  </li>
                ))}
              </ol>
            </div>
            <div className="relative mt-6 h-[min(36rem,calc(100svh-11rem))]">
              {segments.map((segment) => (
                <div key={segment.title} data-scene-item className="scene-item">
                  <SegmentPanel segment={segment} />
                </div>
              ))}
            </div>
          </Container>
        </div>
      </div>

      <div className="scene-stack pt-12 pb-24 md:pb-32">
        <Container wide>
          <div className="flex flex-col gap-4">
            {segments.map((segment) => (
              <SegmentPanel key={segment.title} segment={segment} />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
