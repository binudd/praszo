import { productShowcases } from "@/components/mockups/product-showcases";
import type { Product } from "@/data/products";
import { cn } from "@/lib/cn";

/** Product hero visual: that product's animated mockup, sized to the height it is given. */
export function ProductShowcase({ product, className }: { product: Product; className?: string }) {
  const { component: Showcase, label } = productShowcases[product.slug];
  return (
    <div className={cn("fit-box", className)}>
      <figure className="fit-frame">
        <Showcase className="absolute inset-0" />
        <figcaption className="sr-only">
          Praszo {product.name}: {label}.
        </figcaption>
      </figure>
    </div>
  );
}
