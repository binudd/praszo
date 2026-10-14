"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { EvolutionCanvas } from "@/components/diagrams/evolution-canvas";
import { evolutionChapters, evolutionIntro } from "@/content/evolution";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(useGSAP, ScrollTrigger, MotionPathPlugin);

const CHAPTER_COUNT = evolutionChapters.length;

function layerOpacity(progress: number, index: number) {
  const t = progress * (CHAPTER_COUNT - 1);
  const distance = Math.abs(t - index);
  const fade = 0.72;
  if (distance >= fade) return 0;
  return 1 - distance / fade;
}

function ChapterCopy({
  chapter,
  className,
}: {
  chapter: (typeof evolutionChapters)[number];
  className?: string;
}) {
  return (
    <article className={className}>
      <p className="evo-kicker">
        <span className="tabular-nums">{chapter.id}</span>
        <span aria-hidden="true" className="mx-3 text-white/25">
          —
        </span>
        {chapter.kicker}
      </p>
      <h3 className="evo-serif mt-4 text-[clamp(1.85rem,3.4vw,3.15rem)] leading-[1.05] text-white">
        {chapter.title}
      </h3>
      <p className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-[#c5cbd3]">{chapter.body}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {chapter.skills.map((skill) => (
          <li key={skill} className="evo-skill">
            {skill}
          </li>
        ))}
      </ul>
      {chapter.closing ? (
        <div className="mt-10 border-t border-white/10 pt-8">
          <p className="evo-serif text-[clamp(1.45rem,2.4vw,2.15rem)] leading-[1.15] text-[#217BFE]">
            {chapter.closing.headline}
          </p>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#9aa0a6]">
            {chapter.closing.subhead}
          </p>
        </div>
      ) : null}
    </article>
  );
}

export function Evolution() {
  const rootRef = useRef<HTMLElement | null>(null);

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

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        root.classList.add("is-ready");

        const track = root.querySelector<HTMLElement>("[data-evo-track]");
        const canvas = root.querySelector<SVGSVGElement>("[data-evo-stage] .evo-canvas");
        const layers = gsap.utils.toArray<SVGGElement>(
          root.querySelectorAll("[data-evo-stage] [data-evo-layer]"),
        );
        const copies = gsap.utils.toArray<HTMLElement>(
          root.querySelectorAll("[data-evo-copy]"),
        );
        const ticks = gsap.utils.toArray<HTMLElement>(
          root.querySelectorAll("[data-evo-tick]"),
        );
        const progressLine = root.querySelector<HTMLElement>("[data-evo-progress]");
        const strokes = gsap.utils.toArray<SVGGeometryElement>(
          root.querySelectorAll("[data-evo-stage] [data-stroke]"),
        );
        const motionPath = canvas?.querySelector<SVGPathElement>("[data-motion-path]");
        const motionDot = canvas?.querySelector<SVGCircleElement>("[data-motion-dot]");
        const pixels = gsap.utils.toArray<SVGRectElement>(
          root.querySelectorAll("[data-evo-stage] [data-pixel]"),
        );

        if (!track || layers.length === 0) return;

        const strokeLengths = strokes.map((stroke) => {
          try {
            return stroke.getTotalLength();
          } catch {
            return 240;
          }
        });

        strokes.forEach((stroke, index) => {
          gsap.set(stroke, {
            strokeDasharray: strokeLengths[index],
            strokeDashoffset: strokeLengths[index],
          });
        });

        const voidPixels = pixels.filter((pixel) => pixel.dataset.pixelZone === "void");
        const chromePixels = pixels.filter((pixel) => pixel.dataset.pixelZone === "chrome");

        const motionTween =
          motionDot && motionPath
            ? gsap.to(motionDot, {
                motionPath: {
                  path: motionPath,
                  align: motionPath,
                  alignOrigin: [0.5, 0.5],
                },
                duration: 1,
                ease: "none",
                paused: true,
              })
            : null;

        const applyChapter = (progress: number) => {
          const t = progress * (CHAPTER_COUNT - 1);
          const index = Math.round(t);
          root.dataset.active = String(index);

          layers.forEach((layer, layerIndex) => {
            gsap.set(layer, { opacity: layerOpacity(progress, layerIndex) });
          });

          copies.forEach((copy, copyIndex) => {
            const distance = Math.abs(t - copyIndex);
            const fade = 0.55;
            const opacity = distance >= fade ? 0 : 1 - distance / fade;
            gsap.set(copy, {
              opacity,
              y: (copyIndex - t) * 8,
              visibility: opacity < 0.05 ? "hidden" : "visible",
              zIndex: copyIndex === index ? 2 : 1,
            });
          });

          ticks.forEach((tick, tickIndex) => {
            tick.classList.toggle("is-current", tickIndex === index);
          });

          if (progressLine) {
            gsap.set(progressLine, { scaleX: progress });
          }

          const gather = gsap.utils.clamp(0, 1, t);
          gsap.set(voidPixels, { opacity: 0.22 - gather * 0.14 });
          gsap.set(chromePixels, { opacity: 0.55 + gather * 0.4 });

          const draw = gsap.utils.clamp(0, 1, (progress - 0.08) / 0.78);
          strokes.forEach((stroke, strokeIndex) => {
            gsap.set(stroke, {
              strokeDashoffset: strokeLengths[strokeIndex] * (1 - draw),
            });
          });

          motionTween?.progress(gsap.utils.clamp(0, 1, t - 2));
        };

        const trigger = ScrollTrigger.create({
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.65,
          invalidateOnRefresh: true,
          onUpdate: (self) => applyChapter(self.progress),
        });

        applyChapter(trigger.progress);

        return () => {
          motionTween?.kill();
          root.classList.remove("is-ready");
          delete root.dataset.active;
        };
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="evolution"
      data-active="0"
      aria-labelledby="evolution-title"
      className="evolution border-t border-transparent"
    >
      <div className="evolution-intro px-5 py-20 md:px-10 md:py-24">
        <p className="evo-kicker">Professional evolution</p>
        <h2
          id="evolution-title"
          className="evo-serif mt-5 max-w-4xl text-[clamp(2.6rem,7vw,6.4rem)] leading-[0.92] text-white"
        >
          {evolutionIntro.title}
        </h2>
        <p className="evo-serif mt-6 max-w-2xl text-[clamp(1.2rem,2.2vw,1.75rem)] italic leading-snug text-[#217BFE]">
          {evolutionIntro.subtitle}
        </p>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#9aa0a6]">{evolutionIntro.lede}</p>
      </div>

      <div data-evo-track className="evolution-cinematic">
        <div data-evo-stage className="evolution-stage">
          <div className="evolution-progress" aria-hidden="true">
            <span data-evo-progress />
          </div>

          <div className="evolution-stage-grid">
            <div className="evolution-copy relative min-h-[22rem]">
              {evolutionChapters.map((chapter, index) => (
                <div
                  key={chapter.id}
                  data-evo-copy={index}
                  className="evolution-copy-item"
                >
                  <ChapterCopy chapter={chapter} />
                </div>
              ))}
            </div>

            <figure className="evolution-visual">
              <div className="evo-canvas-frame">
                <EvolutionCanvas variant="journey" />
              </div>
              <figcaption className="sr-only">
                An evolving diagram of the professional journey from pixels to product
                systems. Each chapter’s meaning is in the accompanying text.
              </figcaption>
            </figure>
          </div>

          <ol className="evolution-rail" aria-hidden="true">
            {evolutionChapters.map((chapter, index) => (
              <li
                key={chapter.id}
                data-evo-tick={index}
                className={index === 0 ? "is-current" : undefined}
              >
                {chapter.id}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="evolution-stack px-5 pb-20 md:px-10 md:pb-28">
        <ol className="mx-auto flex max-w-6xl flex-col gap-16 md:gap-20">
          {evolutionChapters.map((chapter) => (
            <li key={chapter.id} className="evolution-stack-item">
              <figure className="evolution-visual evolution-visual-static">
                <div className="evo-canvas-frame">
                  <EvolutionCanvas variant="snapshot" activeLayer={chapter.index} />
                </div>
                <figcaption className="mt-3 text-[12px] leading-relaxed text-[#9aa0a6]">
                  {chapter.visual}
                </figcaption>
              </figure>
              <ChapterCopy chapter={chapter} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
