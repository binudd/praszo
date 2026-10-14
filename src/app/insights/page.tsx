import { ArticleList } from "@/components/page/article-list";
import { PageHero } from "@/components/page/page-hero";
import { PageSection } from "@/components/page/page-section";
import { FinalCta } from "@/components/sections/final-cta";
import { home } from "@/data/home";
import { insights } from "@/data/pages/insights";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({ ...insights.meta, path: insights.path });

export default function InsightsPage() {
  return (
    <main id="main" className="relative z-10">
      <PageHero titleId="insights-title" {...insights.hero} />
      <PageSection id="insights-articles" eyebrow="Articles" title="Latest insights">
        <ArticleList articles={insights.articles} />
      </PageSection>
      <FinalCta id="insights-cta" title={home.cta.title} subtitle={home.cta.subtitle} body={home.cta.body} bullets={home.cta.bullets} />
    </main>
  );
}
