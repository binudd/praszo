import { RevealGroup } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { EditorialItem } from "@/components/ui/editorial-item";
import type { Product } from "@/data/products";

export function ProductHighlights({ product }: { product: Product }) {
  if (!product.highlights?.length) return null;
  return (
    <section aria-label={`${product.fullName} highlights`} className="py-16 md:py-24">
      <Container wide>
        <RevealGroup className="grid gap-x-10 gap-y-12 md:grid-cols-3">
          {product.highlights.map((item, index) => (
            <EditorialItem key={item.title} reveal index={index} icon={item.icon} tone="product" size="display" titleAs="h2" title={item.title} body={item.body} />
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
