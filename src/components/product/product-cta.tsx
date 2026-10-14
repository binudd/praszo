import { FinalCta } from "@/components/sections/final-cta";
import type { Product } from "@/data/products";

export function ProductCta({ product }: { product: Product }) {
  return (
    <FinalCta
      tone="product"
      subtitle={`Praszo ${product.name}`}
      title={product.cta.title}
      body={product.cta.body}
      bullets={product.cta.bullets}
    />
  );
}
