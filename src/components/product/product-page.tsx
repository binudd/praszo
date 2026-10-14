import type { CSSProperties, ReactNode } from "react";

import { RelatedProducts } from "@/components/product/related-products";
import { siteUrl } from "@/data/company";
import type { Product } from "@/data/products";
import { jsonLd } from "@/lib/json-ld";

type Props = {
  product: Product;
  children: ReactNode;
};

/**
 * Shared shell for product landing pages: product color scope, structured data,
 * related products. The site header reads the route and shows this product's
 * lockup and section menu.
 */
export function ProductPage({ product, children }: Props) {
  const style = { "--product": product.color, "--product-deep": product.colorDeep } as CSSProperties;
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
      {children}
      <RelatedProducts product={product} />
    </main>
  );
}
