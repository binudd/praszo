import type { CSSProperties, ReactNode } from "react";

import { ProductHero } from "@/components/product/product-hero";
import { ProductSubNav } from "@/components/product/product-sub-nav";
import { RelatedProducts } from "@/components/product/related-products";
import { siteUrl } from "@/data/company";
import type { Product } from "@/data/products";
import { jsonLd } from "@/lib/json-ld";

type Props = {
  product: Product;
  children: ReactNode;
};

/**
 * Shared shell for product landing pages: product color scope, the minimal hero, the sticky section
 * pill directly under it (ProductSubNav; a direct child of <main> so it can stick for the whole page),
 * structured data and related products. --subnav-h lets pinned scenes reserve the stuck pill's height.
 */
export function ProductPage({ product, children }: Props) {
  const style = { "--product": product.color, "--product-deep": product.colorDeep, "--subnav-h": "4.75rem" } as CSSProperties;
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.fullName,
    applicationCategory: "BusinessApplication",
    description: product.meta.description,
    url: `${siteUrl}/${product.slug}`,
    publisher: { "@type": "Organization", name: "Praszo", url: siteUrl },
    isPartOf: { "@type": "SoftwareApplication", name: "Praszo OS", url: siteUrl },
  };

  return (
    <main id="main" data-product={product.slug} style={style} className="relative z-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(softwareJsonLd) }} />
      <ProductHero product={product} />
      <ProductSubNav product={product} />
      {children}
      <RelatedProducts product={product} />
    </main>
  );
}
