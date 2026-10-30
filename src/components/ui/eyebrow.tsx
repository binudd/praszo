import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

type Tone = "brand" | "product" | "muted" | "inverse";

const tones: Record<Tone, string> = {
  brand: "text-brand-strong",
  product: "text-product-deep dark:text-product-bright",
  muted: "text-ink-3",
  inverse: "text-white/80",
};

/**
 * Section kicker. Instead of a dot it carries a hand-drawn pen underline that draws itself while the kicker's block is hovered; see .eyebrow in
 * globals.css. Shown drawn on touch screens, where there is no hover.
 */
export function Eyebrow({
  tone = "brand",
  className,
  children,
  ...props
}: ComponentProps<"p"> & { tone?: Tone }) {
  return (
    <p className={cn("eyebrow inline-flex items-center text-[12px] font-bold tracking-[0.16em] uppercase", tones[tone], className)} {...props}>
      {children}
      <svg aria-hidden focusable="false" className="eyebrow-scribble" viewBox="0 0 100 10" preserveAspectRatio="none">
        <path pathLength={1} d="M1.5 6.4C9 3.9 15.5 7.9 24 6.1S38.5 3 47.5 5.2 63 8.4 72 5.6 88 2.9 98.5 4.8" />
      </svg>
    </p>
  );
}
