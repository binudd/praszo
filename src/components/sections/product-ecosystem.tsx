"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, type CSSProperties } from "react";

import { scrollToTarget } from "@/components/motion/smooth-scroll";
import { applySceneItems, stepOpacity, useScene } from "@/components/motion/use-scene";
import { mockups } from "@/components/mockups/registry";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ProductGlyph } from "@/components/ui/product-glyph";
import { home } from "@/data/home";
import { productList, type Product } from "@/data/products";
import { cn } from "@/lib/cn";

/** WCAG contrast of white text on a hex color. */
function whiteContrast(hex: string) {
  const channel = (i: number) => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  const luminance = 0.2126 * channel(1) + 0.7152 * channel(3) + 0.0722 * channel(5);
  return 1.05 / (luminance + 0.05);
}

function productStyle(product: Product) {
  return { "--product": product.color, "--product-deep": product.colorDeep } as CSSProperties;
}

/** Poster card filled with the product color: glyph, name and a cropped interface preview. */
function ProductPoster({ product, className }: { product: Product; className?: string }) {
  const visual = product.hero.visual;
  const Mockup = visual.kind === "mockup" ? mockups[visual.id] : null;
  // Every text layer must reach WCAG AA (4.5:1) on the poster surface:
  // - white on the product colour when it passes (Practice 7.06, Docs 4.88);
  // - otherwise white on the product's deep shade when that passes (Modifi: #2874ff 4.17 -> #1f5fd6 5.73);
  // - otherwise dark ink on the product colour (Verifi 7.29, Match 8.34).
  const whiteOnColor = whiteContrast(product.color) >= 4.5;
  const useDeep = !whiteOnColor && whiteContrast(product.colorDeep) >= 4.5;
  const light = !whiteOnColor && !useDeep;
  return (
    <div
      style={productStyle(product)}
      className={cn(
        "flex flex-col overflow-hidden rounded-media shadow-stage",
        useDeep ? "bg-product-deep" : "bg-product",
        light ? "text-ink" : "text-white",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4 px-6 pt-6">
        <span className="inline-flex items-center gap-3">
          <ProductGlyph slug={product.slug} size={44} />
          <span className="flex flex-col leading-none">
            <span className="text-[11px] font-semibold">Praszo</span>
            <span className="mt-1 text-xl font-bold tracking-[-0.02em]">{product.name}</span>
          </span>
        </span>
        <Badge className={cn("hidden border-transparent sm:inline-flex", light ? "bg-black/10 text-ink" : "bg-black/15 text-white")}>
          {product.category}
        </Badge>
      </div>
      <p className="px-6 pt-4 pb-5 text-[15px] leading-relaxed">{product.tagline}</p>
      <div className="relative min-h-[14rem] flex-1 overflow-hidden bg-black/10 px-6 pt-5">
        <div className={cn("absolute inset-x-6 top-5 bottom-0 overflow-hidden rounded-t-xl text-ink", visual.kind === "image" && "bg-white shadow-float")}>
          {visual.kind === "image" ? (
            <Image src={visual.src} alt="" aria-hidden sizes="560px" className="h-full w-full object-cover object-left-top" />
          ) : Mockup ? (
            <div className="origin-top-left scale-[0.62] [width:161%]">
              <Mockup />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function ProductEcosystem() {
  const rootRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const count = productList.length;

  useScene(rootRef, {
    count,
    onUpdate: (_progress, t, index, set) => {
      const stage = stageRef.current;
      if (!stage) return;
      applySceneItems(stage, t, index, 0.6, 24, set);
      stage.querySelectorAll<HTMLElement>("[data-scene-card]").forEach((card, cardIndex) => {
        const d = cardIndex - t;
        const opacity = stepOpacity(t, cardIndex, 0.9);
        // Parked cards (out of view) are written once, then left alone.
        const hidden = opacity < 0.03;
        set(card, {
          opacity: hidden ? 0 : opacity,
          x: hidden ? 0 : d * 70,
          rotate: hidden ? 0 : d * 7,
          scale: hidden ? 0.9 : 1 - Math.min(Math.abs(d), 1) * 0.1,
          zIndex: 10 - Math.round(Math.abs(d)),
          visibility: hidden ? "hidden" : "visible",
        });
      });
    },
  });

  const jumpTo = (index: number) => {
    const track = rootRef.current?.querySelector<HTMLElement>("[data-scene-track]");
    if (!track) return;
    const top = track.getBoundingClientRect().top + window.scrollY;
    const range = track.offsetHeight - window.innerHeight;
    scrollToTarget(top + (range * index) / (count - 1));
  };

  return (
    <section ref={rootRef} id="products" aria-labelledby="products-title" className="scene relative">
      {/* Sticky scene: desktop + motion allowed */}
      <div data-scene-track className="scene-track" style={{ height: "520svh" }}>
        <div ref={stageRef} data-scene-stage className="scene-stage">
          <Container>
            <Eyebrow className="justify-center">{home.ecosystem.eyebrow}</Eyebrow>
            <h2 id="products-title" className="display-lg mt-4 text-center text-ink">
              {home.ecosystem.title}
            </h2>
            <div className="mt-[-0.3em] grid items-center gap-10 lg:grid-cols-[1fr_1.2fr_1fr]">
              <ol className="relative z-10 flex flex-col gap-1.5">
                {productList.map((product, index) => (
                  <li key={product.slug} data-scene-tab className="group">
                    <button
                      type="button"
                      onClick={() => jumpTo(index)}
                      className="block w-full text-left"
                      aria-label={`Show Praszo ${product.name}`}
                    >
                      <span className="block text-2xl font-semibold tracking-[-0.02em] text-ink-3 transition-colors duration-300 group-[.is-current]:text-ink">
                        {product.name}
                      </span>
                      <span className="block max-h-0 overflow-hidden text-sm text-ink-2 opacity-0 transition-all duration-500 group-[.is-current]:mt-1 group-[.is-current]:max-h-16 group-[.is-current]:opacity-100">
                        {product.category}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>

              <div className="relative mx-auto h-[min(66svh,34rem)] w-full max-w-[28rem]">
                {productList.map((product) => (
                  <div key={product.slug} data-scene-card className="absolute inset-0">
                    <ProductPoster product={product} className="h-full" />
                  </div>
                ))}
              </div>

              <div className="relative min-h-[14rem]">
                {productList.map((product) => (
                  <div key={product.slug} data-scene-item className="scene-item" style={productStyle(product)}>
                    <Badge tone="product">
                      Step {product.workflowStep.order} · {product.workflowStep.label}
                    </Badge>
                    <p className="lede mt-5">{product.summary}</p>
                    <Link
                      href={`/${product.slug}`}
                      className="mt-6 inline-flex items-center gap-2 text-[15px] font-bold text-product-deep hover:underline"
                    >
                      Explore Praszo {product.name}
                      <ArrowRight size={16} aria-hidden />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* Stacked fallback: mobile, reduced motion, no JS */}
      <div className="scene-stack py-20 md:py-28">
        <Container>
          <Eyebrow>{home.ecosystem.eyebrow}</Eyebrow>
          <h2 className="display-md mt-4 text-ink">{home.ecosystem.title}</h2>
          <p className="lede mt-5 max-w-2xl">{home.ecosystem.description}</p>
          <ol className="mt-12 grid gap-6 md:grid-cols-2">
            {productList.map((product) => (
              <li key={product.slug}>
                <Link href={`/${product.slug}`} className="group block">
                  <ProductPoster product={product} className="transition-transform duration-500 group-hover:-translate-y-1" />
                  <span className="mt-4 inline-flex items-center gap-2 text-[15px] font-bold text-brand">
                    Explore Praszo {product.name}
                    <ArrowRight size={16} aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </div>
    </section>
  );
}
