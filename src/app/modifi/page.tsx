import { FaqSection } from "@/components/sections/faq-section";
import { ProductAudience } from "@/components/product/product-audience";
import { ProductComparison } from "@/components/product/product-comparison";
import { ProductCta } from "@/components/product/product-cta";
import { ProductFeatureGrid } from "@/components/product/product-feature-grid";
import { ProductHero } from "@/components/product/product-hero";
import { ProductPage } from "@/components/product/product-page";
import { ProductSpotlights } from "@/components/product/product-spotlights";
import { ProductWorkflow } from "@/components/product/product-workflow";
import { getProduct } from "@/data/products";
import { buildMetadata } from "@/lib/metadata";

const product = getProduct("modifi");

export const metadata = buildMetadata({ ...product.meta, path: "/modifi" });

export default function ModifiPage() {
  return (
    <ProductPage product={product}>
      <ProductHero product={product} />
      <ProductSpotlights product={product} />
      <ProductFeatureGrid product={product} section={product.featureSections[0]} />
      <ProductComparison product={product} />
      <ProductWorkflow product={product} />
      <ProductAudience product={product} />
      <FaqSection id="modifi-faq" title="Frequently asked questions" items={product.faq} tone="product" />
      <ProductCta product={product} />
    </ProductPage>
  );
}
