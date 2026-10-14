import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { ProductLinks } from "@/components/ui/product-links";
import { otherProducts, type Product } from "@/data/products";

export function RelatedProducts({ product }: { product: Product }) {
  return (
    <section aria-labelledby="related-title" className="border-t border-line py-16 md:py-20">
      <Container wide>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label text-ink-3">Part of Praszo OS</p>
            <h2 id="related-title" className="display-sm mt-3 max-w-2xl text-ink">
              {product.name} works on its own, or as one step in the complete audit workflow.
            </h2>
          </div>
          <Link href="/#workflow" className="label inline-flex items-center gap-1.5 text-brand hover:underline">
            See the full workflow <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
        <ProductLinks products={otherProducts(product.slug)} className="mt-10 sm:grid-cols-2 lg:grid-cols-4" />
      </Container>
    </section>
  );
}
