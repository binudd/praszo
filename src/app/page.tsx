import { CorporateHero } from "@/components/sections/corporate-hero";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCta } from "@/components/sections/final-cta";
import { PlatformPillars } from "@/components/sections/platform-pillars";
import { ProductEcosystem } from "@/components/sections/product-ecosystem";
import { Segments } from "@/components/sections/segments";
import { Statement } from "@/components/sections/statement";
import { Testimonials } from "@/components/sections/testimonials";
import { TrustedBy } from "@/components/sections/trusted-by";
import { WhyPraszo } from "@/components/sections/why-praszo";
import { WorkflowTour } from "@/components/sections/workflow-tour";
import { home } from "@/data/home";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({ ...home.meta, path: "/" });

export default function HomePage() {
  return (
    <main id="main" className="relative z-10">
      <CorporateHero />
      <TrustedBy />
      <Statement {...home.statement} />
      <PlatformPillars />
      <ProductEcosystem />
      <WorkflowTour />
      <WhyPraszo />
      <Segments />
      <Testimonials />
      <FaqSection
        id="faq"
        eyebrow={home.faq.eyebrow}
        title={home.faq.title}
        description={home.faq.description}
        items={home.faq.items}
      />
      <FinalCta title={home.cta.title} subtitle={home.cta.subtitle} body={home.cta.body} bullets={home.cta.bullets} />
    </main>
  );
}
