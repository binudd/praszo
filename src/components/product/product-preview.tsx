import { ArrowRight } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";

import { mockups } from "@/components/mockups/registry";
import { WindowFrame } from "@/components/mockups/window-frame";
import { HorizontalCard, HorizontalScroll } from "@/components/motion/horizontal-scroll";
import { RevealBlock, RevealHeading } from "@/components/motion/reveal";
import { ClipReveal } from "@/components/product/clip-reveal";
import { ProductVisual } from "@/components/product/product-visual";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { demoCta } from "@/data/company";
import type { Product, Screen } from "@/data/products";

/** Hero capture first, then each spotlight capture, then extra screens; duplicates dropped. */
function screensFor(product: Product): Screen[] {
  const all: Screen[] = [
    { title: product.hero.visual.screenTitle ?? "Overview", visual: product.hero.visual },
    ...product.spotlights.map((spotlight) => ({ title: spotlight.title, visual: spotlight.visual })),
    ...(product.screens ?? []),
  ];
  const seen = new Set<string>();
  return all.filter(({ visual }) => {
    const key = visual.kind === "image" ? visual.src.src : visual.id;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function ScreenCard({ screen, index }: { screen: Screen; index: number }) {
  const { visual } = screen;
  const aspect = visual.kind === "image" ? visual.src.width / visual.src.height : 1.5;
  const Mockup = visual.kind === "mockup" ? mockups[visual.id] : null;
  return (
    <HorizontalCard
      className="flex w-[calc(var(--screen-h)*var(--aspect))] flex-col"
      style={{ "--aspect": aspect } as CSSProperties}
    >
      <WindowFrame title={`Praszo ${screen.title}`}>
        <figure className="flex h-[var(--screen-h)] items-center overflow-hidden bg-surface">
          {visual.kind === "image" ? (
            <Image
              src={visual.src}
              alt={visual.alt}
              sizes="(min-width: 768px) 70rem, 120vw"
              placeholder="blur"
              className="h-full w-full object-cover object-top"
            />
          ) : Mockup ? (
            <div role="img" aria-label={visual.alt} className="w-full p-4 sm:p-6">
              <Mockup />
            </div>
          ) : null}
        </figure>
      </WindowFrame>
      <div className="mt-4 flex gap-3 pr-4">
        <span className="label mt-0.5 shrink-0 text-ink-3">{String(index + 1).padStart(2, "0")}</span>
        <span className="min-w-0">
          <span className="heading block text-ink">{screen.title}</span>
          <span className="copy mt-1 line-clamp-3 text-ink-3">{visual.caption ?? visual.alt}</span>
        </span>
      </div>
    </HorizontalCard>
  );
}

/** Closing card of the rail: these captures are a first look, the full application is in a demo. */
function MoreCard({ product }: { product: Product }) {
  return (
    <HorizontalCard className="flex w-[calc(var(--screen-h)*1.15)] min-w-[15rem] flex-col">
      <div className="flex h-[calc(var(--screen-h)+2.6rem)] flex-col justify-between rounded-card bg-product-soft p-6">
        <span className="label text-product-deep dark:text-product">And more inside</span>
        <div>
          <p className="heading text-ink">There is more to Praszo {product.name} than these screens</p>
          <p className="copy mt-2 text-ink-2">See the full application in a live demo.</p>
          <Button href={demoCta.href} variant="product" size="sm" className="mt-5">
            {demoCta.label}
            <ArrowRight size={16} aria-hidden />
          </Button>
        </div>
      </div>
    </HorizontalCard>
  );
}

/** The real interface, right after the hero: a rail of captures, or the single capture when that is all there is. */
export function ProductPreview({ product }: { product: Product }) {
  const id = `${product.slug}-preview`;
  const screens = screensFor(product);

  if (screens.length < 2) {
    return (
      <section id={id} aria-labelledby={`${id}-title`} className="pb-24 md:pb-32">
        <Container>
          <RevealBlock className="mx-auto max-w-2xl text-center">
            <Eyebrow tone="product" className="justify-center">
              Interface
            </Eyebrow>
            <h2 id={`${id}-title`} className="display-sm mt-4 text-ink">
              Inside Praszo {product.name}
            </h2>
          </RevealBlock>
          <ClipReveal className="mt-10">
            <ProductVisual visual={product.hero.visual} sizes="(min-width: 1024px) 86rem, 100vw" />
          </ClipReveal>
          <p className="copy mt-4 text-center text-ink-3">{product.hero.visual.alt}</p>
        </Container>
      </section>
    );
  }

  return (
    <HorizontalScroll
      id={id}
      label={`Praszo ${product.name} screens`}
      className="screen-rail pb-8 md:pb-12"
      header={
        <div className="max-w-2xl">
          <Eyebrow tone="product">Interface</Eyebrow>
          <h2 id={`${id}-title`} className="display-sm mt-4 text-ink">
            <RevealHeading>{`Inside Praszo ${product.name}`}</RevealHeading>
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-ink-2">
            A first look at the application. Scroll to explore, and see everything in a live demo.
          </p>
        </div>
      }
    >
      {screens.map((screen, index) => (
        <ScreenCard
          key={screen.visual.kind === "image" ? screen.visual.src.src : screen.visual.id}
          screen={screen}
          index={index}
        />
      ))}
      <MoreCard product={product} />
    </HorizontalScroll>
  );
}
