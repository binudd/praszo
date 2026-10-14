import { RevealGroup } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import type { Product } from "@/data/products";

export function ProductHighlights({ product }: { product: Product }) {
  if (!product.highlights?.length) return null;
  return (
    <section aria-label={`${product.fullName} highlights`} className="py-16 md:py-24">
      <Container wide>
        <RevealGroup className="grid gap-4 md:grid-cols-3">
          {product.highlights.map((item) => (
            <Card key={item.title} data-reveal className="p-7 md:p-8">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-sm bg-product-soft text-product-deep">
                <Icon name={item.icon} size={24} aria-hidden />
              </span>
              <h2 className="mt-7 text-xl text-ink">{item.title}</h2>
              <p className="mt-3 text-[15.5px] leading-relaxed text-ink-2">{item.body}</p>
            </Card>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
