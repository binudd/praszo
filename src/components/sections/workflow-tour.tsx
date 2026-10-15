"use client";

import { useRef } from "react";

import { TOUR_STAGES, WorkflowCanvas } from "@/components/mockups/workflow-canvas";
import { gsap, ScrollTrigger, useGSAP } from "@/components/motion/gsap";
import { createSceneSetter, scrollToSceneStep, stepOpacity } from "@/components/motion/use-scene";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ProductGlyph } from "@/components/ui/product-glyph";
import { ProductLockup } from "@/components/ui/product-lockup";
import { home } from "@/data/home";
import { workflowSteps, type WorkflowStep } from "@/data/workflow";
import { prefersReducedMotion } from "@/lib/motion";

const steps = workflowSteps;
const STEP_COUNT = steps.length;

function StepCopy({ step, className }: { step: WorkflowStep; className?: string }) {
  return (
    <article className={className}>
      <p className="label flex items-center gap-3 text-ink-3">
        <span className="tabular-nums">{String(step.index).padStart(2, "0")}</span>
        <span aria-hidden className="h-px w-6 bg-line-strong" />
        {step.product ? "Praszo step" : "Starting point"}
      </p>
      {step.product ? (
        <ProductLockup product={step.product} size="md" className="mt-5" />
      ) : (
        <Badge tone="accent" className="mt-5">
          {step.badge}
        </Badge>
      )}
      <h3 className="display-sm mt-5 text-ink">{step.label}</h3>
      <p className="lede mt-4 max-w-md">{step.body}</p>
      {step.product ? (
        <a href={`/${step.product.slug}`} className="mt-5 inline-flex text-sm font-bold text-brand-strong hover:underline">
          Explore Praszo {step.product.name} →
        </a>
      ) : null}
    </article>
  );
}

export function WorkflowTour() {
  const rootRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || prefersReducedMotion()) return;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        root.classList.add("is-ready");
        const track = root.querySelector<HTMLElement>("[data-scene-track]");
        const stage = root.querySelector<HTMLElement>("[data-scene-stage]");
        if (!track || !stage) return;

        const layers = gsap.utils.toArray<SVGGElement>(stage.querySelectorAll("[data-layer]"));
        const copies = gsap.utils.toArray<HTMLElement>(stage.querySelectorAll("[data-scene-item]"));
        const tabs = gsap.utils.toArray<HTMLElement>(stage.querySelectorAll("[data-scene-tab]"));
        const chips = gsap.utils.toArray<HTMLElement>(stage.querySelectorAll("[data-tour-chip]"));
        const strokes = gsap.utils.toArray<SVGGeometryElement>(stage.querySelectorAll("[data-stroke]"));
        const progressLine = stage.querySelector<HTMLElement>("[data-tour-progress]");
        // The pipeline track: a line that fills, a dot per stage, and the audit-file token with its status.
        const fill = stage.querySelector<SVGLineElement>("[data-tour-fill]");
        const nodes = gsap.utils.toArray<SVGCircleElement>(stage.querySelectorAll("[data-tour-node]"));
        const token = stage.querySelector<SVGGElement>("[data-tour-token]");
        const statuses = gsap.utils.toArray<SVGGElement>(stage.querySelectorAll("[data-tour-status]"));
        const firstX = TOUR_STAGES[0].x;
        const span = TOUR_STAGES[TOUR_STAGES.length - 1].x - firstX;
        if (fill) gsap.set(fill, { scaleX: 0, svgOrigin: `${firstX} 452` });
        gsap.set(nodes, { scale: 0, transformOrigin: "50% 50%" });

        const strokeLengths = strokes.map((stroke) => {
          try {
            return stroke.getTotalLength();
          } catch {
            return 200;
          }
        });
        strokes.forEach((stroke, index) => {
          gsap.set(stroke, { strokeDasharray: strokeLengths[index], strokeDashoffset: strokeLengths[index] });
        });

        // Change-only writes: parked layers, copies and chips are not rewritten every frame.
        const set = createSceneSetter();
        const apply = (progress: number) => {
          const t = progress * (STEP_COUNT - 1);
          const index = Math.round(t);
          layers.forEach((layer, layerIndex) => set(layer, { opacity: stepOpacity(t, layerIndex, 0.85) }));
          copies.forEach((copy, copyIndex) => {
            const opacity = stepOpacity(t, copyIndex, 0.62);
            const hidden = opacity < 0.05;
            set(copy, { opacity: hidden ? 0 : opacity, y: hidden ? 0 : (copyIndex - t) * 28, visibility: hidden ? "hidden" : "visible", zIndex: copyIndex === index ? 2 : 1 });
          });
          chips.forEach((chip, chipIndex) => {
            const opacity = stepOpacity(t, chipIndex, 0.5);
            const hidden = opacity < 0.05;
            set(chip, { opacity: hidden ? 0 : opacity, y: hidden ? 0 : (chipIndex - t) * 12, visibility: hidden ? "hidden" : "visible" });
          });
          tabs.forEach((tab, tabIndex) => {
            tab.classList.toggle("is-current", tabIndex === index);
            tab.classList.toggle("is-done", tabIndex < index);
          });
          if (progressLine) set(progressLine, { scaleX: progress });
          // Track: fill to the token, light each stage as the token reaches it, slide the token.
          if (fill) set(fill, { scaleX: progress });
          nodes.forEach((node, nodeIndex) => set(node, { scale: gsap.utils.clamp(0, 1, (t - nodeIndex) * 2.5 + 1) }));
          if (token) set(token, { x: firstX + span * progress });
          statuses.forEach((status, statusIndex) => set(status, { opacity: stepOpacity(t, statusIndex, 0.5) }));
          strokes.forEach((stroke, strokeIndex) => {
            const layerIndex = Number(stroke.closest<SVGGElement>("[data-layer]")?.dataset.layer ?? 0);
            const draw = gsap.utils.clamp(0, 1, 1.4 - Math.abs(t - layerIndex) * 1.6);
            set(stroke, { strokeDashoffset: strokeLengths[strokeIndex] * (1 - draw) });
          });
        };

        const trigger = ScrollTrigger.create({
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => apply(self.progress),
        });
        apply(trigger.progress);
        ScrollTrigger.refresh();

        return () => {
          root.classList.remove("is-ready");
        };
      });

      // Below desktop: the compact timeline. The coral line draws down as the visitor scrolls and each
      // step brightens when the line reaches it. Without this (reduced motion, no JS) every step is lit.
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        const list = root.querySelector<HTMLElement>("[data-tl]");
        if (!list) return;
        const line = list.querySelector<HTMLElement>("[data-tl-progress]");
        const items = gsap.utils.toArray<HTMLElement>(list.querySelectorAll("[data-tl-step]"));
        list.classList.add("tl-live");
        if (line) {
          gsap.fromTo(
            line,
            { scaleY: 0 },
            { scaleY: 1, ease: "none", scrollTrigger: { trigger: list, start: "top 65%", end: "bottom 65%", scrub: 0.5 } },
          );
        }
        items.forEach((item) => {
          ScrollTrigger.create({
            trigger: item,
            start: "top 68%",
            onEnter: () => item.classList.add("is-on"),
            onLeaveBack: () => item.classList.remove("is-on"),
          });
        });
        return () => {
          list.classList.remove("tl-live");
          items.forEach((item) => item.classList.remove("is-on"));
        };
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  const jumpTo = (index: number) => scrollToSceneStep(rootRef.current, index, STEP_COUNT);

  return (
    <section ref={rootRef} id="workflow" data-theme="dark" aria-labelledby="workflow-title" className="scene relative">
      <Container className="pt-24 md:pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow className="justify-center">{home.workflow.eyebrow}</Eyebrow>
          <h2 id="workflow-title" className="display-lg mt-5 text-ink">
            {home.workflow.title}
          </h2>
          <p className="lede mt-5">{home.workflow.description}</p>
        </div>
      </Container>

      {/* Scroll-driven stage (desktop, motion allowed) */}
      <div data-scene-track className="scene-track" style={{ height: "440svh" }}>
        <div data-scene-stage className="scene-stage">
          <Container className="w-full">
            <div className="flex justify-center">
              <ol className="scene-tabs" aria-label="Workflow steps">
                {steps.map((step, index) => (
                  <li key={step.id} data-scene-tab className="scene-tab">
                    <button type="button" onClick={() => jumpTo(index)} className="inline-flex items-center gap-2">
                      <span
                        className="inline-flex h-5 w-5 items-center justify-center rounded-full border text-[10px] tabular-nums"
                        style={step.product ? { borderColor: step.product.color, color: step.product.color } : undefined}
                      >
                        {index}
                      </span>
                      <span className="hidden xl:inline">{step.label}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-10 grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
              <div className="relative min-h-[22rem]">
                {steps.map((step) => (
                  <div key={step.id} data-scene-item className="scene-item">
                    <StepCopy step={step} />
                  </div>
                ))}
              </div>
              <figure className="relative">
                <div className="overflow-hidden rounded-media border border-line bg-surface p-3">
                  <WorkflowCanvas className="h-auto w-full rounded-[1.5rem]" />
                </div>
                <div className="pointer-events-none absolute top-6 right-6 flex flex-col items-end gap-2">
                  {steps.map((step) => (
                    <div
                      key={step.id}
                      data-tour-chip
                      className="glass-dark absolute top-0 right-0 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold whitespace-nowrap"
                    >
                      {step.product ? <ProductLockup product={step.product} size="sm" inverse className="[&_span]:text-[13px]" /> : step.badge}
                    </div>
                  ))}
                </div>
              </figure>
            </div>
            <div className="mt-10 h-px w-full overflow-hidden bg-line" aria-hidden>
              <span data-tour-progress className="block h-full w-full origin-left scale-x-0 bg-brand" />
            </div>
          </Container>
        </div>
      </div>

      {/* Below desktop (and reduced motion / no JS): a compact vertical timeline instead of the stage.
          Each step is a product glyph on the line, a label, a heading-tier title, one line of copy and a link. */}
      <div className="scene-stack">
        <Container className="pb-16 md:pb-24">
          <ol data-tl className="relative mt-12 md:mx-auto md:max-w-2xl">
            <span aria-hidden className="absolute top-5 bottom-5 left-5 w-px -translate-x-1/2 bg-line" />
            <span
              aria-hidden
              data-tl-progress
              className="absolute top-5 bottom-5 left-5 w-px origin-top -translate-x-1/2 bg-brand"
            />
            {steps.map((step) => (
              <li
                key={step.id}
                data-tl-step
                className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 pb-10 transition-opacity duration-500 last:pb-0 [.tl-live_&:not(.is-on)]:opacity-40"
              >
                <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-bg">
                  {step.product ? (
                    <ProductGlyph slug={step.product.slug} size={40} />
                  ) : (
                    <span className="label flex h-10 w-10 items-center justify-center rounded-full border border-accent/50 text-accent tabular-nums">
                      00
                    </span>
                  )}
                </span>
                <div className="pt-0.5">
                  <p className="label text-ink-3">
                    {step.product ? (
                      <>
                        <span className="tabular-nums">Step {String(step.index).padStart(2, "0")}</span> · Praszo {step.product.name}
                      </>
                    ) : (
                      "Starting point"
                    )}
                  </p>
                  <h3 className="heading mt-2 text-ink">{step.label}</h3>
                  <p className="copy mt-2">{step.body}</p>
                  {step.product ? (
                    <a
                      href={`/${step.product.slug}`}
                      className="label mt-3 inline-flex min-h-6 items-center text-brand-strong hover:underline"
                    >
                      Explore Praszo {step.product.name} →
                    </a>
                  ) : (
                    <Badge tone="accent" className="mt-3">
                      {step.badge}
                    </Badge>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </div>
      <div className="h-16 md:h-24" aria-hidden />
    </section>
  );
}
