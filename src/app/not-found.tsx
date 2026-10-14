import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ProductGlyph } from "@/components/ui/product-glyph";
import { productList } from "@/data/products";
import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="relative z-10 pt-36 pb-24 md:pt-44">
      <Container className="max-w-3xl">
        <Eyebrow tone="muted">404</Eyebrow>
        <h1 className="mt-4 text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.05] text-ink">This page is not in the audit file.</h1>
        <p className="mt-5 max-w-xl text-lg text-ink-2">
          The link may be outdated. Head back to the homepage or jump straight to one of the Praszo products.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/">Back to the homepage</Button>
          <Button href="/contact" variant="secondary">
            Contact Praszo
          </Button>
        </div>
        <ul className="mt-12 grid gap-3 sm:grid-cols-2">
          {productList.map((product) => (
            <li key={product.slug}>
              <Link
                href={`/${product.slug}`}
                className="flex items-center gap-3 rounded-card border border-line bg-bg p-4 transition-colors hover:bg-surface"
              >
                <ProductGlyph slug={product.slug} size={32} />
                <span className="text-[15px] font-bold text-ink">Praszo {product.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}
