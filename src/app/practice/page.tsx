import { FaqSection } from "@/components/sections/faq-section";
import { PracticeMobileSection } from "@/components/product/practice-mobile-section";
import { ProductAudience } from "@/components/product/product-audience";
import { ProductCta } from "@/components/product/product-cta";
import { ProductFeatureGrid } from "@/components/product/product-feature-grid";
import { ProductHero } from "@/components/product/product-hero";
import { ProductPage } from "@/components/product/product-page";
import { ProductProblem } from "@/components/product/product-problem";
import { getProduct } from "@/data/products";
import { buildMetadata } from "@/lib/metadata";

const product = getProduct("practice");

export const metadata = buildMetadata({ ...product.meta, path: "/practice" });

export default function PracticePage() {
  return (
    <ProductPage product={product}>
      <ProductHero product={product} />
      <ProductProblem product={product} />
      <ProductFeatureGrid product={product} section={product.featureSections[0]} />
      <PracticeMobileSection />
      <ProductFeatureGrid product={product} section={product.featureSections[1]} />
      <ProductAudience product={product} />
      <FaqSection id="practice-faq" title="Frequently asked questions" items={product.faq} tone="product" />
      <ProductCta product={product} />
    </ProductPage>
  );
}
