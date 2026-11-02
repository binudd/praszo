import { LegalDocument } from "@/components/page/legal-document";
import { PageHero } from "@/components/page/page-hero";
import { privacyPolicy } from "@/data/pages/legal";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({ ...privacyPolicy.meta, path: privacyPolicy.path });

export default function PrivacyPolicyPage() {
  return (
    <main id="main" className="relative z-10">
      <PageHero titleId="privacy-title" {...privacyPolicy.hero} />
      <LegalDocument document={privacyPolicy} />
    </main>
  );
}
