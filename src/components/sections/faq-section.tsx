import { Plus } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/cn";
import { jsonLd } from "@/lib/json-ld";

type Props = {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  items: ReadonlyArray<{ q: string; a: string }>;
  tone?: "brand" | "product";
  className?: string;
};

export function FaqSection({ id, eyebrow = "FAQs", title, description, items, tone = "brand", className }: Props) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("border-t border-line py-24 md:py-32", className)}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqJsonLd) }} />
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
            tone={tone}
            size="lg"
            titleId={`${id}-title`}
            className="lg:sticky lg:top-28 lg:self-start"
          />
          <div className="divide-y divide-line-strong border-y border-line-strong">
            {items.map((item) => (
              <details key={item.q} className="group py-6">
                <summary className="heading flex cursor-pointer list-none items-start justify-between gap-6 text-left text-ink">
                  <span>{item.q}</span>
                  <span
                    className={cn(
                      "faq-chevron mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-surface transition-transform duration-300",
                      tone === "product" ? "text-product-deep" : "text-brand",
                    )}
                    aria-hidden
                  >
                    <Plus size={16} />
                  </span>
                </summary>
                <p className="copy mt-4 max-w-2xl pr-14">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
