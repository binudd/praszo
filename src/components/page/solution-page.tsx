import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { WordReveal } from "@/components/motion/word-reveal";
import { FeatureGrid } from "@/components/page/feature-grid";
import { MediaFrame } from "@/components/page/media-frame";
import { PageHero } from "@/components/page/page-hero";
import { PageSection } from "@/components/page/page-section";
import { FinalCta } from "@/components/sections/final-cta";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ProductLinks } from "@/components/ui/product-links";
import { solutions, type Solution } from "@/data/pages/solutions";
import { getProduct } from "@/data/products";

/** A firm-size solution page, rendered entirely from its entry in data/pages/solutions.ts. */
export function SolutionPage({ solution }: { solution: Solution }) {
  const products = solution.products.slugs.map(getProduct);
  const others = solutions.filter((item) => item.slug !== solution.slug);
  const id = solution.slug;

  return (
    <main id="main" className="relative z-10">
      <PageHero
        titleId={`${id}-hero-title`}
        eyebrow={solution.hero.eyebrow}
        title={solution.hero.title}
        description={solution.hero.description}
        size="md"
        actions={
          <Button href={`#${id}-features`} variant="secondary" size="lg">
            See the features
            <ArrowRight size={18} aria-hidden />
          </Button>
        }
        aside={<MediaFrame image={solution.hero.image} priority />}
      />

      {solution.intro ? (
        <section aria-label="Overview" className="border-t border-line py-20 md:py-28">
          <Container>
            <WordReveal text={solution.intro} className="display-sm max-w-5xl" />
          </Container>
        </section>
      ) : null}

      <PageSection
        id={`${id}-features`}
        eyebrow={solution.features.eyebrow}
        title={solution.features.title}
        description={solution.features.description}
      >
        <FeatureGrid items={solution.features.items} />
      </PageSection>

      <PageSection id={`${id}-products`} eyebrow="Praszo OS" title={solution.products.title}>
        <ProductLinks products={products} className={products.length > 1 ? "sm:grid-cols-2 lg:grid-cols-3" : "max-w-xl"} />
        {others.length ? (
          <p className="copy mt-10 text-ink-3">
            Also built for{" "}
            {others.map((other, index) => (
              <span key={other.slug}>
                {index > 0 ? ", " : null}
                <Link href={other.path} className="font-semibold text-ink hover:text-brand-strong">
                  {other.label.toLowerCase()}
                </Link>
              </span>
            ))}
            .
          </p>
        ) : null}
      </PageSection>

      <FinalCta id={`${id}-cta`} subtitle={solution.cta.kicker} title={solution.cta.title} body={solution.cta.body} bullets={solution.cta.bullets} />
    </main>
  );
}
