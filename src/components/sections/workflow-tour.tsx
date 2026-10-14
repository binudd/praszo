"use client";

import { useRef } from "react";

import { WorkflowCanvas } from "@/components/mockups/workflow-canvas";
import { gsap, ScrollTrigger, useGSAP } from "@/components/motion/gsap";
import { scrollToTarget } from "@/components/motion/smooth-scroll";
import { stepOpacity } from "@/components/motion/use-scene";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ProductLockup } from "@/components/ui/product-lockup";
import { home } from "@/data/home";
import { workflowProducts, type Product } from "@/data/products";
import { cn } from "@/lib/cn";
import { prefersReducedMotion } from "@/lib/motion";

type Step = {
  id: string;
  index: number;
  label: string;
  body: string;
  product?: Product;
  badge?: string;
};

const steps: Step[] = [
  { id: "raw-data", index: 0, label: home.workflow.start.label, body: home.workflow.start.body, badge: home.workflow.start.badge },
  ...workflowProducts.map((product, index) => ({
    id: product.slug,
    index: index + 1,
    label: product.workflowStep.label,
    body: product.workflowStep.body,
    product,
  })),
];

const STEP_COUNT = steps.length;

function StepCopy({ step, className }: { step: Step; className?: string }) {
  return (
    <article className={className}>
      <p className="label inline-flex items-center gap-3 text-ink-3">
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
        <a href={`/${step.product.slug}`} className="mt-5 inline-flex text-sm font-bold text-brand hover:underline">
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
        const path = stage.querySelector<SVGPathElement>("[data-tour-path]");
        const dot = stage.querySelector<SVGCircleElement>("[data-tour-dot]");

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

        const dotTween =
          dot && path
            ? gsap.to(dot, { motionPath: { path, align: path, alignOrigin: [0.5, 0.5] }, duration: 1, ease: "none", paused: true })
            : null;

        const apply = (progress: number) => {
          const t = progress * (STEP_COUNT - 1);
          const index = Math.round(t);
          layers.forEach((layer, layerIndex) => gsap.set(layer, { opacity: stepOpacity(t, layerIndex, 0.85) }));
          copies.forEach((copy, copyIndex) => {
            const opacity = stepOpacity(t, copyIndex, 0.62);
            gsap.set(copy, { opacity, y: (copyIndex - t) * 28, visibility: opacity < 0.05 ? "hidden" : "visible", zIndex: copyIndex === index ? 2 : 1 });
          });
          chips.forEach((chip, chipIndex) => {
            const opacity = stepOpacity(t, chipIndex, 0.5);
            gsap.set(chip, { opacity, y: (chipIndex - t) * 12, visibility: opacity < 0.05 ? "hidden" : "visible" });
          });
          tabs.forEach((tab, tabIndex) => {
            tab.classList.toggle("is-current", tabIndex === index);
            tab.classList.toggle("is-done", tabIndex < index);
          });
          if (progressLine) gsap.set(progressLine, { scaleX: progress });
          strokes.forEach((stroke, strokeIndex) => {
            const layerIndex = Number(stroke.closest<SVGGElement>("[data-layer]")?.dataset.layer ?? 0);
            const draw = gsap.utils.clamp(0, 1, 1.4 - Math.abs(t - layerIndex) * 1.6);
            gsap.set(stroke, { strokeDashoffset: strokeLengths[strokeIndex] * (1 - draw) });
          });
          dotTween?.progress(progress);
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
          dotTween?.kill();
          root.classList.remove("is-ready");
        };
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  const jumpTo = (index: number) => {
    const track = rootRef.current?.querySelector<HTMLElement>("[data-scene-track]");
    if (!track) return;
    const top = track.getBoundingClientRect().top + window.scrollY;
    const range = track.offsetHeight - window.innerHeight;
    scrollToTarget(top + (range * index) / (STEP_COUNT - 1));
  };

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
          <Container wide className="w-full">
            <div className="flex justify-center">
              <ol className="scene-tabs glass" aria-label="Workflow steps">
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
                <div className="overflow-hidden rounded-media border border-line bg-surface p-3 shadow-stage">
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

      {/* Static stacked fallback (mobile, reduced motion, no JS) */}
      <div className="scene-stack">
        <Container className="pb-20 md:pb-28">
          <ol className="mt-12 flex flex-col gap-12 md:gap-16">
            {steps.map((step, index) => (
              <li
                key={step.id}
                className={cn("grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center", index > 0 && "border-t border-line pt-12 md:pt-16")}
              >
                <StepCopy step={step} />
                <figure className="overflow-hidden rounded-media border border-line bg-surface p-3">
                  <WorkflowCanvas activeLayer={index} className="h-auto w-full rounded-[1.5rem]" />
                </figure>
              </li>
            ))}
          </ol>
        </Container>
      </div>
      <div className="h-16 md:h-24" aria-hidden />
    </section>
  );
}
