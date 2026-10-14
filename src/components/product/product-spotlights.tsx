"use client";

import { CircleCheck } from "lucide-react";
import { useRef } from "react";

import { gsap } from "@/components/motion/gsap";
import { RevealBlock } from "@/components/motion/reveal";
import { scrollToTarget } from "@/components/motion/smooth-scroll";
import { applySceneItems, stepOpacity, useScene } from "@/components/motion/use-scene";
import { ClipReveal } from "@/components/product/clip-reveal";
import { ProductVisual } from "@/components/product/product-visual";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { Product, Spotlight } from "@/data/products";
import { cn } from "@/lib/cn";

function SpotlightCopy({ spotlight }: { spotlight: Spotlight }) {
  return (
    <div>
      {spotlight.eyebrow ? <Eyebrow tone="product">{spotlight.eyebrow}</Eyebrow> : null}
      <h3 className="display-md mt-4 text-ink">{spotlight.title}</h3>
      <p className="lede mt-5">{spotlight.body}</p>
      {spotlight.bullets?.length ? (
        <ul className="mt-6 space-y-2.5">
          {spotlight.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2.5 text-[15px] font-semibold text-ink">
              <CircleCheck size={18} className="mt-0.5 shrink-0 text-product-deep" aria-hidden />
              {bullet}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/** Spotlights as a sticky scene: copy and visual swap as the visitor scrolls through each one. */
export function ProductSpotlights({ product }: { product: Product }) {
  const rootRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const count = product.spotlights.length;

  useScene(rootRef, {
    count,
    onUpdate: (_progress, t, index) => {
      const stage = stageRef.current;
      if (!stage) return;
      applySceneItems(stage, t, index, 0.55, 30);
      stage.querySelectorAll<HTMLElement>("[data-scene-card]").forEach((card, cardIndex) => {
        const opacity = stepOpacity(t, cardIndex, 0.55);
        gsap.set(card, {
          opacity,
          y: (cardIndex - t) * 48,
          scale: 0.94 + 0.06 * opacity,
          visibility: opacity < 0.03 ? "hidden" : "visible",
          zIndex: cardIndex === index ? 2 : 1,
        });
      });
    },
  });

  if (count === 0) return null;

  const jumpTo = (index: number) => {
    const track = rootRef.current?.querySelector<HTMLElement>("[data-scene-track]");
    if (!track) return;
    const top = track.getBoundingClientRect().top + window.scrollY;
    const range = track.offsetHeight - window.innerHeight;
    scrollToTarget(top + (range * index) / Math.max(1, count - 1));
  };

  return (
    <section ref={rootRef} id={`${product.slug}-spotlights`} aria-label={`${product.fullName} in detail`} className="scene relative">
      <div data-scene-track className="scene-track" style={{ height: `${count * 110 + 40}svh` }}>
        <div ref={stageRef} data-scene-stage className="scene-stage">
          <Container wide className="w-full">
            <div className="flex justify-center">
              <ol className="scene-tabs" aria-label="Spotlights">
                {product.spotlights.map((spotlight, index) => (
                  <li key={spotlight.id} data-scene-tab className="scene-tab">
                    <button type="button" onClick={() => jumpTo(index)}>
                      {spotlight.eyebrow ?? spotlight.title}
                    </button>
                  </li>
                ))}
              </ol>
            </div>
            <div className="mt-10 grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
              <div className="relative min-h-[24rem]">
                {product.spotlights.map((spotlight) => (
                  <div key={spotlight.id} data-scene-item className="scene-item">
                    <SpotlightCopy spotlight={spotlight} />
                  </div>
                ))}
              </div>
              <div className="relative h-[min(62svh,34rem)]">
                {product.spotlights.map((spotlight) => (
                  <div key={spotlight.id} data-scene-card className="absolute inset-0 flex items-center justify-center">
                    <ProductVisual
                      visual={spotlight.visual}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="max-h-full w-auto max-w-full shadow-stage [&_img]:max-h-[min(62svh,34rem)] [&_img]:w-auto"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </div>

      <div className="scene-stack py-20 md:py-28">
        <Container wide>
          <div className="flex flex-col gap-20 md:gap-28">
            {product.spotlights.map((spotlight, index) => {
              const flip = index % 2 === 1;
              return (
                <article key={spotlight.id} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  <ClipReveal className={cn(flip && "lg:order-2")}>
                    <ProductVisual visual={spotlight.visual} sizes="(min-width: 1024px) 50vw, 100vw" />
                  </ClipReveal>
                  <RevealBlock className={cn(flip && "lg:order-1")}>
                    <SpotlightCopy spotlight={spotlight} />
                  </RevealBlock>
                </article>
              );
            })}
          </div>
        </Container>
      </div>
    </section>
  );
}
