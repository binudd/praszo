import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { ProductGlyph } from "@/components/ui/product-glyph";
import type { Product } from "@/data/products";
import { cn } from "@/lib/cn";

/**
 * Product links as editorial rows (hairline rule, glyph, heading, one line of copy) instead of
 * cards. Shared by related products, the contact page and the 404 page.
 */
export function ProductLinks({
  products,
  detail = "tagline",
  className,
}: {
  products: Product[];
  detail?: "tagline" | "category";
  className?: string;
}) {
  return (
    <ul className={cn("grid gap-x-8 gap-y-2", className)}>
      {products.map((product) => (
        <li key={product.slug}>
          <Link href={`/${product.slug}`} className="group flex h-full items-start gap-4 border-t border-line-strong pt-5 pb-3">
            <ProductGlyph slug={product.slug} size={36} />
            <span className="min-w-0 flex-1">
              <span className="heading flex items-center gap-1.5 text-ink transition-colors group-hover:text-brand">
                Praszo {product.name}
                <ArrowUpRight size={16} className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </span>
              <span className="copy mt-1 block">{detail === "tagline" ? product.tagline : product.category}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
