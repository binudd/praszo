import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ProductLinks } from "@/components/ui/product-links";
import { productList } from "@/data/products";

export default function NotFound() {
  return (
    <main id="main" className="relative z-10 pt-36 pb-24 md:pt-44">
      <Container className="max-w-3xl">
        <Eyebrow tone="muted">404</Eyebrow>
        <h1 className="display-md mt-4 text-ink">This page is not in the audit file.</h1>
        <p className="lede mt-5 max-w-xl">
          The link may be outdated. Head back to the homepage or jump straight to one of the Praszo products.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/">Back to the homepage</Button>
          <Button href="/contact" variant="secondary">
            Contact Praszo
          </Button>
        </div>
        <ProductLinks products={productList} detail="category" className="mt-12 sm:grid-cols-2" />
      </Container>
    </main>
  );
}
