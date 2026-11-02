import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

type Tone = "neutral" | "brand" | "product" | "success" | "accent";

const tones: Record<Tone, string> = {
  neutral: "border-line bg-white text-ink-2",
  brand: "border-brand/20 bg-brand-soft text-brand-strong",
  product: "border-product/25 bg-product-soft text-product-deep",
  success: "border-success/20 bg-success/10 text-success",
  accent: "border-accent/25 bg-accent-soft text-accent",
};

export function Badge({ tone = "neutral", className, ...props }: ComponentProps<"span"> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold tracking-[0.08em] uppercase",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
