import { RevealGroup } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { SectionHeader } from "@/components/ui/section-header";
import type { Product } from "@/data/products";
import { cn } from "@/lib/cn";

export function ProductAudience({ product }: { product: Product }) {
  const audience = product.audience;
  if (!audience) return null;
  const id = `${product.slug}-audience`;
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line py-24 md:py-32">
      <Container wide>
        <SectionHeader eyebrow="Who it is for" title={audience.title} description={audience.description} tone="product" size="lg" titleId={`${id}-title`} />
        <RevealGroup className={cn("mt-14 grid gap-4", audience.items.length > 2 ? "md:grid-cols-3" : "md:grid-cols-2")}>
          {audience.items.map((item) => (
            <Card key={item.title} data-reveal className="p-7 md:p-8">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-sm bg-product-soft text-product-deep">
                <Icon name={item.icon} size={24} aria-hidden />
              </span>
              <h3 className="mt-7 text-2xl text-ink">{item.title}</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-ink-2">{item.body}</p>
            </Card>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
