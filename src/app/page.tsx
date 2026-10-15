import { CorporateHero } from "@/components/sections/corporate-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { ProductEcosystem } from "@/components/sections/product-ecosystem";
import { Testimonials } from "@/components/sections/testimonials";
import { TrustedBy } from "@/components/sections/trusted-by";
import { WorkflowTour } from "@/components/sections/workflow-tour";
import { home } from "@/data/home";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({ ...home.meta, path: "/" });

/**
 * Kept short on purpose: hero, proof, the five products, the workflow, testimonials, the CTA.
 * The long-form case (pillars, statement, differentiators, impact, segments, FAQ) lives on /why-praszo.
 */
export default function HomePage() {
  return (
    <main id="main" className="relative z-10">
      <CorporateHero />
      <TrustedBy />
      <ProductEcosystem />
      <WorkflowTour />
      <Testimonials />
      <FinalCta title={home.cta.title} subtitle={home.cta.subtitle} body={home.cta.body} bullets={home.cta.bullets} />
    </main>
  );
}
