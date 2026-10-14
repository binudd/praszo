"use client";

import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

import { gsap } from "@/components/motion/gsap";
import { scrollToTarget } from "@/components/motion/smooth-scroll";
import { useScene } from "@/components/motion/use-scene";
import { FirmCutout } from "@/components/illustrations/firm-cutout";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { home } from "@/data/home";
import { cn } from "@/lib/cn";

type Segment = (typeof home.segments.items)[number];

const segments = home.segments.items;
const count = segments.length;
/** Share of the scroll spent on the transition between two firm sizes. */
const SWITCH = 0.32;
/** Share of a half-switch each element spends moving, and the delay between consecutive elements. */
const TRAVEL = 0.55;
const STAGGER = 0.07;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

function SegmentPanel({ segment, scene = false }: { segment: Segment; scene?: boolean }) {
  // In the scene every element that moves on its own carries a data hook, and the card surface is shared.
  return (
    <div
      className={cn(
        "grid gap-8 p-6 sm:p-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-14 lg:p-12",
        scene ? "h-full" : "rounded-panel bg-surface",
      )}
    >
      <div className="flex flex-col">
        <div data-seg-icon className="w-48 origin-bottom-left sm:w-60 lg:w-[min(18rem,24svh*1.53)]">
          <FirmCutout size={segment.art} />
        </div>
        <h3 data-seg-part className="display-sm mt-5 text-ink">
          {segment.title}
        </h3>
        <p data-seg-part className="mt-3 text-[15px] font-semibold text-brand">
          {segment.subtitle}
        </p>
        <p data-seg-part className="mt-4 text-[16.5px] leading-relaxed text-ink-2">
          {segment.body}
        </p>
        <a
          data-seg-part
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
          <li key={text} data-seg-point className="flex gap-3 py-3.5 text-[15px] leading-relaxed text-ink-2 first:pt-0 last:pb-0">
            <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * How far (0 settled, 1 gone) element `order` of `total` is, given `s`, the
 * panel's distance from being current scaled to 0–1 over half a switch.
 * Leaving elements go in reading order; arriving elements also land in reading
 * order, so the content builds top to bottom in both scroll directions.
 */
function away(s: number, order: number, total: number, leaving: boolean) {
  const delay = (leaving ? order : total - 1 - order) * STAGGER;
  const span = TRAVEL + (total - 1) * STAGGER;
  return clamp01((s * span - delay) / TRAVEL);
}

/**
 * "Who it is for" as a sticky scroll scene. The card stays put and its content
 * is choreographed by scroll: the outgoing firm size lifts out (its cutout
 * illustration tilts and shrinks, copy rises, points slide left, each staggered), then the incoming
 * one builds in from below and the right. A progress rule along the card
 * tracks the scene. Everything is GSAP transforms scrubbed by ScrollTrigger on
 * the shared Lenis loop. Tabs jump to their step. Below lg, under reduced
 * motion and without JS the panels simply stack.
 */
export function Segments() {
  const rootRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  useScene(rootRef, {
    count,
    onUpdate: (progress) => {
      const stage = stageRef.current;
      if (!stage) return;
      // Hold each step for most of its slice; move through the switch window around each boundary.
      let t = 0;
      for (let k = 1; k < count; k += 1) t += clamp01((progress - k / count) / SWITCH + 0.5);
      const index = Math.round(t);

      stage.querySelectorAll<HTMLElement>("[data-scene-item]").forEach((item, i) => {
        const d = t - i;
        // Leaving uses the first half of the switch and arriving the second, so the two never overlap.
        const s = clamp01(Math.abs(d) * 2);
        const visible = s < 1;
        // d > 0: being left behind (moves up and left); d < 0: arriving (comes from below and the right).
        const leaving = d > 0;
        const dir = leaving ? -1 : 1;
        gsap.set(item, { visibility: visible ? "visible" : "hidden", zIndex: i === index ? 2 : 1, pointerEvents: i === index ? "auto" : "none" });
        if (!visible) return;

        const parts = item.querySelectorAll<HTMLElement>("[data-seg-part]");
        const points = item.querySelectorAll<HTMLElement>("[data-seg-point]");
        const icon = item.querySelector<HTMLElement>("[data-seg-icon]");
        if (icon) {
          const e = away(s, 0, parts.length + 1, leaving);
          // The cutout pops like a paper piece: drops, shrinks and tilts slightly from its base.
          gsap.set(icon, { opacity: 1 - e, scale: 1 - e * 0.25, y: dir * e * 36, rotate: dir * e * 6 });
        }
        parts.forEach((el, k) => {
          const e = away(s, k + 1, parts.length + 1, leaving);
          gsap.set(el, { opacity: 1 - e, y: dir * e * 42 });
        });
        points.forEach((el, k) => {
          const e = away(s, k, points.length, leaving);
          gsap.set(el, { opacity: 1 - e, x: dir * e * 64 });
        });
      });

      stage.querySelectorAll<HTMLElement>("[data-scene-tab]").forEach((tab, i) => {
        tab.classList.toggle("is-current", i === index);
        if (i === index) tab.setAttribute("aria-current", "step");
        else tab.removeAttribute("aria-current");
      });
      const bar = stage.querySelector<HTMLElement>("[data-seg-progress]");
      if (bar) gsap.set(bar, { scaleX: progress });
    },
  });

  const jumpTo = (index: number) => {
    const track = rootRef.current?.querySelector<HTMLElement>("[data-scene-track]");
    if (!track) return;
    const top = track.getBoundingClientRect().top + window.scrollY;
    const range = track.offsetHeight - window.innerHeight;
    // Land on the settled part of the step: the start for the first, the end for the last.
    scrollToTarget(top + range * (index === 0 ? 0 : index === count - 1 ? 1 : (index + 0.5) / count));
  };

  return (
    <section ref={rootRef} aria-labelledby="segments-title" className="scene relative pt-24 md:pt-32">
      <Container wide>
        <SectionHeader eyebrow={home.segments.eyebrow} title={home.segments.title} titleId="segments-title" align="center" size="lg" />
      </Container>

      <div data-scene-track className="scene-track" style={{ height: `${count * 130 + 40}svh` }}>
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
            <div className="relative mt-6 h-[min(36rem,calc(100svh-11rem))] overflow-hidden rounded-panel bg-surface">
              {segments.map((segment) => (
                <div key={segment.title} data-scene-item className="absolute inset-0">
                  <SegmentPanel segment={segment} scene />
                </div>
              ))}
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-line">
                <span data-seg-progress className="block h-full origin-left scale-x-0 bg-brand" />
              </span>
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
