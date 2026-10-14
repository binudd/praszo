import { MockupThemeProvider } from "@/components/mockups/mockup-theme";
import { productShowcases } from "@/components/mockups/product-showcases";
import type { Product } from "@/data/products";
import { cn } from "@/lib/cn";

/** Product hero visual: that product's animated mockup, sized to the height it is given. */
export function ProductShowcase({ product, className }: { product: Product; className?: string }) {
  const { component: Showcase, label } = productShowcases[product.slug];
  return (
    <div className={cn("fit-box", className)}>
      <MockupThemeProvider>
        {(theme) => (
          <figure className="fit-frame" data-theme={theme} data-theme-local>
            <Showcase className="absolute inset-0" />
            <figcaption className="sr-only">
              Praszo {product.name}: {label}.
            </figcaption>
          </figure>
        )}
      </MockupThemeProvider>
    </div>
  );
}
