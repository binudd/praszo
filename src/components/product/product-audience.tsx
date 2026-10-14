import { RevealGroup } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { EditorialItem } from "@/components/ui/editorial-item";
import { SectionHeader } from "@/components/ui/section-header";
import type { Product } from "@/data/products";
import { cn } from "@/lib/cn";

export function ProductAudience({ product }: { product: Product }) {
  const audience = product.audience;
  if (!audience) return null;
  const id = `${product.slug}-audience`;
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line py-24 md:py-32">
      <Container>
        <SectionHeader eyebrow="Who it is for" title={audience.title} description={audience.description} tone="product" size="lg" titleId={`${id}-title`} />
        <RevealGroup className={cn("mt-14 grid gap-x-10 gap-y-12 md:mt-20", audience.items.length > 2 ? "md:grid-cols-3" : "md:grid-cols-2")}>
          {audience.items.map((item, index) => (
            <EditorialItem key={item.title} reveal index={index} icon={item.icon} tone="product" size="display" title={item.title} body={item.body} />
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
