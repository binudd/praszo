"use client";

import Link from "next/link";
import { useRef, type FocusEvent } from "react";

import { gsap } from "@/components/motion/gsap";
import { ProductGlyph } from "@/components/ui/product-glyph";
import { productList, type ProductSlug } from "@/data/products";
import { cn } from "@/lib/cn";
import { prefersReducedMotion } from "@/lib/motion";

type Props = {
  orientation?: "vertical" | "horizontal";
  size?: number;
  label?: string;
  className?: string;
  /** Fires with the hovered/focused product, or null when the pointer leaves. */
  onHoverChange?: (slug: ProductSlug | null) => void;
};

/**
 * The five product glyphs as a menu: each links to its product overview, a
 * GSAP-driven highlight slides behind the hovered or focused item, and a
 * tooltip names it. Works on touch (tap navigates) and keyboard (focus moves
 * the highlight and shows the tooltip).
 */
export function ProductIconNav({ orientation = "vertical", size = 28, label = "Praszo products", className, onHoverChange }: Props) {
  const rootRef = useRef<HTMLElement | null>(null);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);
  const vertical = orientation === "vertical";

  const move = (item: HTMLElement | null) => {
    const indicator = indicatorRef.current;
    const root = rootRef.current;
    if (!indicator || !root) return;
    const duration = prefersReducedMotion() ? 0 : 0.32;
    if (!item) {
      gsap.to(indicator, { opacity: 0, duration, ease: "power2.out", overwrite: true });
      return;
    }
    const rect = item.getBoundingClientRect();
    const base = root.getBoundingClientRect();
    gsap.to(indicator, {
      x: rect.left - base.left,
      y: rect.top - base.top,
      width: rect.width,
      height: rect.height,
      opacity: 1,
      duration,
      ease: "power3.out",
      overwrite: true,
    });
  };

  const enter = (item: HTMLElement, slug: ProductSlug) => {
    move(item);
    onHoverChange?.(slug);
  };

  const leave = () => {
    move(null);
    onHoverChange?.(null);
  };

  const onBlur = (event: FocusEvent<HTMLElement>) => {
    if (!rootRef.current?.contains(event.relatedTarget as Node | null)) leave();
  };

  return (
    <nav
      ref={rootRef}
      aria-label={label}
      className={cn("relative", vertical ? "flex flex-col items-center gap-1.5" : "flex items-center gap-1", className)}
      onPointerLeave={leave}
      onBlur={onBlur}
    >
      <span
        ref={indicatorRef}
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 rounded-[30%] bg-bg opacity-0 shadow-card ring-1 ring-line"
      />
      {productList.map((product) => (
        <Link
          key={product.slug}
          href={`/${product.slug}`}
          aria-label={`Praszo ${product.name}`}
          className="group relative z-10 inline-flex rounded-[30%] p-1 outline-none transition-[box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-brand aria-[current=step]:ring-2 aria-[current=step]:ring-brand"
          onPointerEnter={(event) => enter(event.currentTarget, product.slug)}
          onFocus={(event) => enter(event.currentTarget, product.slug)}
        >
          <ProductGlyph slug={product.slug} size={size} className="transition-transform duration-300 ease-[var(--ease-out)] group-hover:scale-105" />
          <span
            role="tooltip"
            className={cn(
              "glass pointer-events-none absolute z-20 rounded-full px-2.5 py-1 text-[11px] font-bold whitespace-nowrap text-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100",
              vertical ? "top-1/2 left-full ml-2.5 -translate-y-1/2" : "bottom-full left-1/2 mb-2 -translate-x-1/2",
            )}
          >
            Praszo {product.name}
          </span>
        </Link>
      ))}
    </nav>
  );
}
