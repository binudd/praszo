"use client";

import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { useHeroEntrance } from "@/components/motion/hero-entrance";
import { useHeroScroll } from "@/components/motion/hero-scroll";
import { HeroTitle } from "@/components/motion/hero-title";
import { scrollToTarget } from "@/components/motion/smooth-scroll";
import { ProductShowcase } from "@/components/product/product-showcase";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ProductGlyph } from "@/components/ui/product-glyph";
import type { Product } from "@/data/products";

/**
 * Minimal product hero (Workspace product-page pattern): the product identity (glyph + "Praszo X") sits
 * once, above the headline; then the description and one action on the left, the live mockup on the
 * right. The section pill (ProductSubNav) follows directly below. Entrance (useHeroEntrance) and scroll
 * depth (useHeroScroll) are the shared hero motion.
 */
export function ProductHero({ product }: { product: Product }) {
  const rootRef = useRef<HTMLElement | null>(null);
  useHeroEntrance(rootRef, `product:${product.slug}`);
  useHeroScroll(rootRef, { visualMedia: "(min-width: 1024px)" });
  const featuresId = `${product.slug}-features`;
  const titleId = `${product.slug}-hero-title`;

  const jumpToFeatures = () => {
    const node = rootRef.current?.closest("main")?.querySelector<HTMLElement>(`#${featuresId}`);
    if (node) scrollToTarget(node, -88);
  };

  return (
    <section
      ref={rootRef}
      id={`${product.slug}-overview`}
      data-entrance
      aria-labelledby={titleId}
      className="relative flex min-h-[min(100svh,58rem)] items-center overflow-hidden pt-[calc(var(--header-h)+2rem)] pb-10 lg:min-h-[calc(100svh-5rem)] lg:pb-12"
    >
      <Container className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
        <div data-hero-depth="lede" className="min-w-0">
          <p data-hero="eyebrow" className="inline-flex items-center gap-3">
            <ProductGlyph slug={product.slug} size={44} />
            <span className="text-[clamp(1.5rem,1.1rem+1.2vw,2.25rem)] font-semibold tracking-[-0.02em] text-ink">
              {product.fullName}
            </span>
          </p>
          {/* Sized so the (two-line) headline fits the text column at every width; capped by height on short desktops. */}
          <h1 id={titleId} className="display-md mt-6 text-ink text-[clamp(1.85rem,1.1rem+3.3vw,3.5rem)] lg:text-[min(3.6vw,3.5rem,7.5svh)]">
            <HeroTitle text={product.hero.headline} />
          </h1>
          <p data-hero="copy" className="lede mt-5 max-w-[36rem]">
            {product.hero.description}
          </p>
          <div data-hero="cta" className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              href={`#${featuresId}`}
              variant="secondary"
              size="lg"
              onClick={(event) => {
                event.preventDefault();
                jumpToFeatures();
              }}
            >
              <Play size={14} className="fill-current" aria-hidden />
              See the features
            </Button>
            <Link
              href="/#workflow"
              className="group inline-flex items-center gap-2 px-2 text-[15px] font-semibold text-ink-2 transition-colors hover:text-ink"
            >
              Step {product.workflowStep.order} · {product.workflowStep.label}
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </div>
        <div data-hero="visual" className="relative h-[19rem] min-w-0 sm:h-[25rem] lg:h-[min(31rem,58svh)]">
          <div data-hero-depth="visual" className="h-full will-change-transform">
            <ProductShowcase product={product} className="h-full" />
          </div>
        </div>
      </Container>
    </section>
  );
}
