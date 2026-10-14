import { FeatureGrid } from "@/components/page/feature-grid";
import { PageHero } from "@/components/page/page-hero";
import { PageSection } from "@/components/page/page-section";
import { QuoteBlock } from "@/components/page/quote-block";
import { TeamGrid } from "@/components/page/team-grid";
import { FinalCta } from "@/components/sections/final-cta";
import { TrustedBy } from "@/components/sections/trusted-by";
import { home } from "@/data/home";
import { about } from "@/data/pages/about";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({ ...about.meta, path: about.path });

export default function AboutPage() {
  return (
    <main id="main" className="relative z-10">
      <PageHero titleId="about-title" {...about.hero} />
      <QuoteBlock {...about.quote} />
      <PageSection id="about-purpose" eyebrow={about.purpose.eyebrow} title={about.purpose.title} description={about.purpose.description}>
        <FeatureGrid items={about.purpose.items} columns={2} size="display" />
      </PageSection>
      <TrustedBy id="about-trusted" />
      <PageSection id="about-team" eyebrow={about.team.eyebrow} title={about.team.title} description={about.team.description}>
        <TeamGrid members={about.team.members} />
      </PageSection>
      <PageSection id="about-values" eyebrow={about.values.eyebrow} title={about.values.title} description={about.values.description}>
        <FeatureGrid items={about.values.items} numbered />
      </PageSection>
      <FinalCta id="about-cta" title={home.cta.title} subtitle={home.cta.subtitle} body={home.cta.body} bullets={home.cta.bullets} />
    </main>
  );
}
