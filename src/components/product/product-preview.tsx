import { RevealBlock } from "@/components/motion/reveal";
import { ClipReveal } from "@/components/product/clip-reveal";
import { ProductVisual } from "@/components/product/product-visual";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { Product } from "@/data/products";

/** The real interface, shown right after the hero. */
export function ProductPreview({ product }: { product: Product }) {
  const id = `${product.slug}-preview`;
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="pb-24 md:pb-32">
      <Container wide>
        <RevealBlock className="mx-auto max-w-2xl text-center">
          <Eyebrow tone="product" className="justify-center">
            Interface
          </Eyebrow>
          <h2 id={`${id}-title`} className="display-sm mt-4 text-ink">
            Inside Praszo {product.name}
          </h2>
        </RevealBlock>
        <ClipReveal className="mt-10">
          <ProductVisual visual={product.hero.visual} sizes="(min-width: 1024px) 86rem, 100vw" className="shadow-stage" />
        </ClipReveal>
        <p className="mt-4 text-center text-sm text-ink-3">{product.hero.visual.alt}</p>
      </Container>
    </section>
  );
}
