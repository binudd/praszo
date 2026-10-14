"use client";

import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { useHeroEntrance } from "@/components/motion/hero-entrance";
import { Magnetic } from "@/components/motion/magnetic";
import { scrollToTarget } from "@/components/motion/smooth-scroll";
import { ProductShowcase } from "@/components/product/product-showcase";
import { HeroShell } from "@/components/sections/hero-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { demoCta } from "@/data/company";
import type { Product } from "@/data/products";

/** Hero CTAs: compact on phones (both fit one row), regular on tablets, large on desktop. */
const heroButton = "max-sm:h-10 max-sm:px-4 max-sm:text-sm lg:h-12 lg:px-6 lg:text-base";

/** Keeps hyphenated words such as "Purpose-built" on one line; the giant type otherwise breaks at the hyphen. */
function Headline({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, index) => (
        <span key={`${word}-${index}`}>
          {index > 0 ? " " : null}
          {word.includes("-") ? <span className="whitespace-nowrap">{word}</span> : word}
        </span>
      ))}
    </>
  );
}

export function ProductHero({ product }: { product: Product }) {
  const rootRef = useRef<HTMLElement | null>(null);
  useHeroEntrance(rootRef, `product:${product.slug}`);
  const featuresId = `${product.slug}-features`;

  const jumpToFeatures = () => {
    const node = rootRef.current?.closest("[data-product]")?.querySelector<HTMLElement>(`#${featuresId}`);
    if (node) scrollToTarget(node);
  };

  return (
    <HeroShell
      rootRef={rootRef}
      id={`${product.slug}-overview`}
      labelledBy={`${product.slug}-hero-title`}
      lede={
        <>
          <Eyebrow tone="product" data-hero="eyebrow">
            {product.hero.eyebrow}
          </Eyebrow>
          <p data-hero="copy" className="lede mt-4 max-w-[34rem] max-lg:line-clamp-5 lg:line-clamp-4 max-lg:text-[0.98rem] max-lg:leading-snug lg:mt-5">
            {product.hero.description}
          </p>
          <div data-hero="cta" className="mt-5 flex flex-wrap items-center gap-3 lg:mt-7">
            <Button
              href={`#${featuresId}`}
              variant="secondary"
              className={heroButton}
              onClick={(event) => {
                event.preventDefault();
                jumpToFeatures();
              }}
            >
              <Play size={14} className="fill-current" aria-hidden />
              See the features
            </Button>
            <Magnetic>
              <Button href={demoCta.href} variant="product" className={heroButton}>
                {demoCta.label}
                <ArrowRight size={18} aria-hidden />
              </Button>
            </Magnetic>
          </div>
        </>
      }
      visual={<ProductShowcase product={product} />}
      title={
        <h1 id={`${product.slug}-hero-title`} className="display-hero max-w-[16ch] text-ink lg:max-w-[24ch] lg:text-[min(5.9rem,6.2vw,9.5svh)]">
          <span className="mask-reveal block pb-[0.08em]">
            <span data-hero="headline" className="block">
              <Headline text={product.hero.headline} />
            </span>
          </span>
        </h1>
      }
      aside={
        <Link
          data-hero="cta"
          href="/#workflow"
          className="group inline-flex shrink-0 items-center gap-3 rounded-full border border-line bg-bg py-2 pr-4 pl-2 text-sm font-semibold whitespace-nowrap text-ink-2 transition-colors hover:text-ink lg:mb-3"
        >
          <Badge tone="product">Step {product.workflowStep.order}</Badge>
          {product.workflowStep.label} · Praszo workflow
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      }
    />
  );
}
