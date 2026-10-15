import { FeatureGrid } from "@/components/page/feature-grid";
import { PageHero } from "@/components/page/page-hero";
import { PageSection } from "@/components/page/page-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCta } from "@/components/sections/final-cta";
import { PlatformPillars } from "@/components/sections/platform-pillars";
import { Segments } from "@/components/sections/segments";
import { Statement } from "@/components/sections/statement";
import { WhyPraszo } from "@/components/sections/why-praszo";
import { home } from "@/data/home";
import { whyPraszo } from "@/data/pages/why-praszo";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({ ...whyPraszo.meta, path: whyPraszo.path });

/** The long-form case for Praszo, moved off the homepage so the homepage stays short. */
export default function WhyPraszoPage() {
  return (
    <main id="main" className="relative z-10">
      <PageHero titleId="why-praszo-hero-title" {...whyPraszo.hero} />
      <PlatformPillars />
      <Statement {...home.statement} />
      <WhyPraszo id="why-praszo" {...whyPraszo.different} />
      <PageSection
        id="why-impact"
        eyebrow={whyPraszo.impact.eyebrow}
        title={whyPraszo.impact.title}
        description={whyPraszo.impact.description}
      >
        <FeatureGrid items={whyPraszo.impact.items} />
      </PageSection>
      <Segments />
      <FaqSection
        id="why-faq"
        eyebrow={home.faq.eyebrow}
        title={home.faq.title}
        description={home.faq.description}
        items={home.faq.items}
      />
      <FinalCta
        id="why-cta"
        title={home.cta.title}
        subtitle={home.cta.subtitle}
        body={home.cta.body}
        bullets={home.cta.bullets}
      />
    </main>
  );
}
