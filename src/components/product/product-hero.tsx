"use client";

import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { useHeroEntrance } from "@/components/motion/hero-entrance";
import { Magnetic } from "@/components/motion/magnetic";
import { scrollToTarget } from "@/components/motion/smooth-scroll";
import { Tilt } from "@/components/motion/tilt";
import { ProductVisual } from "@/components/product/product-visual";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { demoCta } from "@/data/company";
import type { Product } from "@/data/products";

export function ProductHero({ product }: { product: Product }) {
  const rootRef = useRef<HTMLElement | null>(null);
  useHeroEntrance(rootRef, `product:${product.slug}`);
  const featuresId = `${product.slug}-features`;

  const jumpToFeatures = () => {
    const node = rootRef.current?.closest("[data-product]")?.querySelector<HTMLElement>(`#${featuresId}`);
    if (node) scrollToTarget(node);
  };

  return (
    <section
      ref={rootRef}
      data-entrance
      id={`${product.slug}-overview`}
      aria-labelledby={`${product.slug}-hero-title`}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-28 pb-10 md:pt-30 lg:pt-32 lg:pb-12"
    >
      <Container wide className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
        <div className="relative z-10 lg:col-span-5">
          <Eyebrow tone="product" data-hero="eyebrow">
            {product.hero.eyebrow}
          </Eyebrow>
          <p data-hero="copy" className="lede mt-5 max-w-[34rem]">
            {product.hero.description}
          </p>
          <div data-hero="cta" className="mt-7 flex flex-wrap items-center gap-3">
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
            <Magnetic>
              <Button href={demoCta.href} variant="product" size="lg">
                {demoCta.label}
                <ArrowRight size={18} aria-hidden />
              </Button>
            </Magnetic>
          </div>
        </div>
        <div data-hero="visual" className="relative lg:col-span-7">
          <Tilt>
            <ProductVisual visual={product.hero.visual} eager className="shadow-stage" />
          </Tilt>
        </div>
      </Container>

      <Container wide className="mt-14 flex flex-col gap-8 lg:mt-16 lg:flex-row lg:items-end lg:justify-between">
        <h1 id={`${product.slug}-hero-title`} className="display-hero max-w-[16ch] text-ink">
          <span className="mask-reveal block pb-[0.08em]">
            <span data-hero="headline" className="block">
              {product.hero.headline}
            </span>
          </span>
        </h1>
        <Link
          data-hero="cta"
          href="/#workflow"
          className="group inline-flex shrink-0 items-center gap-3 rounded-full border border-line bg-bg py-2 pr-4 pl-2 text-sm font-semibold whitespace-nowrap text-ink-2 transition-colors hover:text-ink lg:mb-3"
        >
          <Badge tone="product">Step {product.workflowStep.order}</Badge>
          {product.workflowStep.label} · Praszo workflow
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </Container>
    </section>
  );
}
