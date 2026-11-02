import { ProductGlyph } from "@/components/ui/product-glyph";
import type { Product } from "@/data/products";
import { cn } from "@/lib/cn";

/** "Praszo <Name>" lockup with the product glyph. */
export function ProductLockup({
  product,
  size = "md",
  className,
  inverse,
}: {
  product: Pick<Product, "slug" | "name">;
  size?: "sm" | "md" | "lg";
  className?: string;
  inverse?: boolean;
}) {
  const glyph = size === "lg" ? 56 : size === "md" ? 40 : 28;
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <ProductGlyph slug={product.slug} size={glyph} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-semibold tracking-[0.02em]",
            size === "lg" ? "text-sm" : "text-[11px]",
            inverse ? "text-white/70" : "text-ink-3",
          )}
        >
          Praszo
        </span>
        <span
          className={cn(
            "mt-1 font-bold tracking-[-0.02em]",
            size === "lg" ? "text-2xl" : size === "md" ? "text-lg" : "text-[15px]",
            inverse ? "text-white" : "text-ink",
          )}
        >
          {product.name}
        </span>
      </span>
    </span>
  );
}
