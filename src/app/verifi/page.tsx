import { FaqSection } from "@/components/sections/faq-section";
import { ProductAudience } from "@/components/product/product-audience";
import { ProductCta } from "@/components/product/product-cta";
import { ProductFeatureGrid } from "@/components/product/product-feature-grid";
import { ProductHighlights } from "@/components/product/product-highlights";
import { ProductPage } from "@/components/product/product-page";
import { ProductPreview } from "@/components/product/product-preview";
import { ProductProblem } from "@/components/product/product-problem";
import { ProductSpotlights } from "@/components/product/product-spotlights";
import { ProductWorkflow } from "@/components/product/product-workflow";
import { getProduct } from "@/data/products";
import { buildMetadata } from "@/lib/metadata";

const product = getProduct("verifi");

export const metadata = buildMetadata({ ...product.meta, path: "/verifi" });

export default function VerifiPage() {
  return (
    <ProductPage product={product}>
      <ProductProblem product={product} />
      <ProductPreview product={product} />
      <ProductHighlights product={product} />
      <ProductFeatureGrid product={product} section={product.featureSections[0]} />
      <ProductFeatureGrid product={product} section={product.featureSections[1]} />
      <ProductSpotlights product={product} />
      <ProductWorkflow product={product} />
      <ProductAudience product={product} />
      <FaqSection id="verifi-faq" title="Frequently asked questions" items={product.faq} tone="product" />
      <ProductCta product={product} />
    </ProductPage>
  );
}
