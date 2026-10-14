"use client";

import { useEffect, useState, type CSSProperties } from "react";

import { productShowcases, showcaseAspect } from "@/components/mockups/product-showcases";
import { ProductIconNav } from "@/components/ui/product-icon-nav";
import { ProductLockup } from "@/components/ui/product-lockup";
import { productList, type ProductSlug } from "@/data/products";
import { cn } from "@/lib/cn";
import { prefersReducedMotion } from "@/lib/motion";

const DWELL = 7000;

/**
 * Hero visual: the five product mockups stacked in one frame. They rotate on a
 * timer; hovering or focusing a product icon shows that product and holds.
 * Only the visible mockup animates.
 */
export function HeroShowcase() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState<ProductSlug | null>(null);
  const current = hovered ? productList.findIndex((product) => product.slug === hovered) : index;
  const product = productList[current];

  useEffect(() => {
    if (hovered || prefersReducedMotion()) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % productList.length), DWELL);
    return () => window.clearInterval(timer);
  }, [hovered]);

  return (
    <div className="ml-auto w-full max-w-[calc(50svh*1.3846+1.5rem)]">
      <figure>
        <div className={cn("relative", showcaseAspect)}>
          {productList.map((item, itemIndex) => {
            const Showcase = productShowcases[item.slug].component;
            const active = itemIndex === current;
            return (
              <div
                key={item.slug}
                aria-hidden={!active}
                inert={!active}
                style={{ "--product": item.color, "--product-deep": item.colorDeep } as CSSProperties}
                className={cn(
                  "absolute inset-0 transition-[opacity,transform] duration-700 ease-[var(--ease-out)] motion-reduce:transition-none",
                  active ? "scale-100 opacity-100" : "pointer-events-none scale-[0.985] opacity-0",
                )}
              >
                <Showcase paused={!active} className="h-full" />
              </div>
            );
          })}
        </div>
        <figcaption className="sr-only">Praszo {product.name}: {productShowcases[product.slug].label}.</figcaption>
      </figure>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p className="flex min-w-0 items-center gap-3 text-sm text-ink-2" aria-live="polite">
          <ProductLockup product={product} size="sm" />
          <span aria-hidden className="text-ink-3">
            ·
          </span>
          <span className="truncate">{productShowcases[product.slug].label}</span>
        </p>
        <ProductIconNav orientation="horizontal" size={30} label="Explore a product" onHoverChange={setHovered} />
      </div>
    </div>
  );
}
