import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { ProductGlyph } from "@/components/ui/product-glyph";
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
          <Link href="/#workflow" className="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline">
            See the full workflow <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {otherProducts(product.slug).map((item) => (
            <li key={item.slug}>
              <Link
                href={`/${item.slug}`}
                className="flex h-full items-start gap-3 rounded-card border border-line bg-bg p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-float"
              >
                <ProductGlyph slug={item.slug} size={36} />
                <span>
                  <span className="block text-[15px] font-bold text-ink">Praszo {item.name}</span>
                  <span className="mt-1 block text-[13px] leading-snug text-ink-2">{item.tagline}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
