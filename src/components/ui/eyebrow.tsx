import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

type Tone = "brand" | "product" | "muted" | "inverse";

const tones: Record<Tone, string> = {
  brand: "text-brand",
  product: "text-product-deep",
  muted: "text-ink-3",
  inverse: "text-white/80",
};

const dots: Record<Tone, string> = {
  brand: "bg-brand",
  product: "bg-product",
  muted: "bg-ink-3",
  inverse: "bg-white/70",
};

export function Eyebrow({
  tone = "brand",
  className,
  children,
  ...props
}: ComponentProps<"p"> & { tone?: Tone }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.16em] uppercase",
        tones[tone],
        className,
      )}
      {...props}
    >
      <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", dots[tone])} />
      {children}
    </p>
  );
}
