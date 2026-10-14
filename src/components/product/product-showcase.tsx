import { productShowcases, showcaseAspect } from "@/components/mockups/product-showcases";
import type { Product } from "@/data/products";
import { cn } from "@/lib/cn";

/** Product hero visual: that product's animated service mockup in the shared frame. */
export function ProductShowcase({ product, className }: { product: Product; className?: string }) {
  const { component: Showcase, label } = productShowcases[product.slug];
  return (
    <figure className={cn("overflow-hidden rounded-media border border-line bg-surface p-3 shadow-stage", className)}>
      <div className={cn("relative", showcaseAspect)}>
        <Showcase className="absolute inset-0" />
      </div>
      <figcaption className="sr-only">
        Praszo {product.name}: {label}.
      </figcaption>
    </figure>
  );
}
