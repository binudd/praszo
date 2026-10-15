"use client";

import { useRef } from "react";

import { MockupFrameProvider, MockupThemeProvider } from "@/components/mockups/mockup-theme";
import { productShowcases } from "@/components/mockups/product-showcases";
import { useOnScreen } from "@/components/motion/use-on-screen";
import type { Product } from "@/data/products";
import { cn } from "@/lib/cn";

/** Product hero visual: that product's animated mockup, sized to the height it is given. Paused while off screen. */
export function ProductShowcase({ product, className }: { product: Product; className?: string }) {
  const { component: Showcase, label } = productShowcases[product.slug];
  const boxRef = useRef<HTMLDivElement | null>(null);
  const onScreen = useOnScreen(boxRef);
  return (
    <div ref={boxRef} className={cn("fit-box", className)}>
      <MockupThemeProvider>
        {(theme) => (
          <figure className="fit-frame" data-theme={theme} data-theme-local>
            {/* Product heroes show the mockup frameless on a soft, edge-faded background. */}
            <MockupFrameProvider value="bare">
              <Showcase className="absolute inset-0" paused={!onScreen} />
            </MockupFrameProvider>
            <figcaption className="sr-only">
              Praszo {product.name}: {label}.
            </figcaption>
          </figure>
        )}
      </MockupThemeProvider>
    </div>
  );
}
