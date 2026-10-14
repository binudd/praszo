import { CircleCheck, X } from "lucide-react";

import { RevealGroup } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import type { Product } from "@/data/products";

export function ProductComparison({ product }: { product: Product }) {
  const comparison = product.comparison;
  if (!comparison) return null;
  const id = `${product.slug}-impact`;
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line py-24 md:py-32">
      <Container>
        <SectionHeader eyebrow="The impact" title={comparison.title} description={comparison.subtitle} tone="product" size="lg" titleId={`${id}-title`} align="center" />
        <RevealGroup className="mt-14 grid gap-x-10 gap-y-12 md:mt-20 md:grid-cols-2">
          <div data-reveal className="border-t border-line-strong pt-6">
            <p className="label text-ink-3">{comparison.before.label}</p>
            <ul className="mt-6 space-y-5">
              {comparison.before.items.map((item) => (
                <li key={item} className="heading flex items-start gap-3 font-medium text-ink-2">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <X size={14} aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal className="border-t-2 border-product pt-6">
            <p className="label text-product-deep">{comparison.after.label}</p>
            <ul className="mt-6 space-y-5">
              {comparison.after.items.map((item) => (
                <li key={item} className="heading flex items-start gap-3 text-ink">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-product text-white">
                    <CircleCheck size={14} aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </RevealGroup>
      </Container>
    </section>
  );
}
