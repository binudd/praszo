"use client";

import { ArrowRight, Play } from "lucide-react";
import { useRef } from "react";

import { OsConsole } from "@/components/mockups/os-console";
import { useHeroEntrance } from "@/components/motion/hero-entrance";
import { Magnetic } from "@/components/motion/magnetic";
import { scrollToTarget } from "@/components/motion/smooth-scroll";
import { Tilt } from "@/components/motion/tilt";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ProductGlyph } from "@/components/ui/product-glyph";
import { company } from "@/data/company";
import { home } from "@/data/home";
import { productList } from "@/data/products";

const headline = ["Run it on Praszo."];
const opener = "Simplify your practice management.";

function Lede() {
  return (
    <>
      <strong>{opener}</strong> {company.description}
    </>
  );
}

function HeadlineLine({ line }: { line: string }) {
  const index = line.indexOf("Praszo");
  if (index === -1) return <>{line}</>;
  return (
    <>
      {line.slice(0, index)}
      <span className="text-brand">Praszo</span>
      {line.slice(index + "Praszo".length)}
    </>
  );
}

export function CorporateHero() {
  const rootRef = useRef<HTMLElement | null>(null);
  useHeroEntrance(rootRef, "home");

  return (
    <section
      ref={rootRef}
      data-entrance
      aria-labelledby="home-hero-title"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-28 pb-10 md:pt-30 lg:pt-32 lg:pb-12"
    >
      <Container wide className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
        <div className="relative z-10 lg:col-span-5">
          <Eyebrow data-hero="eyebrow">{home.hero.eyebrow}</Eyebrow>
          <p data-hero="copy" className="lede mt-5 max-w-[34rem]">
            <Lede />
          </p>
          <div data-hero="cta" className="mt-7 flex flex-wrap items-center gap-3">
            <Button
              href="#workflow"
              variant="secondary"
              size="lg"
              onClick={(event) => {
                event.preventDefault();
                scrollToTarget("#workflow");
              }}
            >
              <Play size={14} className="fill-current" aria-hidden />
              See the workflow
            </Button>
            <Magnetic>
              <Button href={home.hero.primaryCta.href} size="lg">
                {home.hero.primaryCta.label}
                <ArrowRight size={18} aria-hidden />
              </Button>
            </Magnetic>
          </div>
        </div>
        <div data-hero="visual" className="relative lg:col-span-7">
          <Tilt>
            <OsConsole />
          </Tilt>
        </div>
      </Container>

      <Container wide className="mt-14 flex flex-col gap-8 lg:mt-16 lg:flex-row lg:items-end lg:justify-between">
        <h1 id="home-hero-title" className="display-lg text-ink">
          {headline.map((line) => (
            <span key={line} className="mask-reveal block pb-[0.08em]">
              <span data-hero="headline" className="block">
                <HeadlineLine line={line} />
              </span>
            </span>
          ))}
        </h1>
        <div data-hero="cta" className="flex items-center gap-4 lg:pb-3">
          <span className="flex -space-x-2">
            {productList.map((product) => (
              <ProductGlyph key={product.slug} slug={product.slug} size={40} className="ring-2 ring-bg" />
            ))}
          </span>
          <span className="text-sm leading-tight font-semibold text-ink">
            Praszo OS
            <span className="block font-medium text-ink-3">{home.ecosystem.title}</span>
          </span>
        </div>
      </Container>
    </section>
  );
}
