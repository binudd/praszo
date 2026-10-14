import { ArrowRight, CircleCheck, Phone } from "lucide-react";

import { RevealBlock, RevealHeading } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { company, demoCta } from "@/data/company";

type Props = {
  title: string;
  subtitle?: string;
  body: string;
  bullets?: ReadonlyArray<string>;
  tone?: "brand" | "product";
};

/** Dark closing scene: a statement-sized headline and the demo CTA. */
export function FinalCta({ title, subtitle, body, bullets, tone = "brand" }: Props) {
  return (
    <section data-theme="dark" aria-labelledby="final-cta-title" className="relative overflow-hidden py-28 md:py-40">
      <div className="dot-field" aria-hidden />
      <Container className="relative text-center">
        {subtitle ? <p className="label text-brand-strong">{subtitle}</p> : null}
        <h2 id="final-cta-title" className="display-lg mx-auto mt-5 max-w-[14ch] text-ink">
          <RevealHeading>{title}</RevealHeading>
        </h2>
        <RevealBlock>
          <p className="lede mx-auto mt-7 max-w-2xl">{body}</p>
          {bullets?.length ? (
            <ul className="label mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-ink-2">
              {bullets.map((bullet) => (
                <li key={bullet} className="inline-flex items-center gap-2">
                  <CircleCheck size={16} className="text-brand" aria-hidden /> {bullet}
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={demoCta.href} variant={tone === "product" ? "product" : "primary"} size="lg">
              {demoCta.label}
              <ArrowRight size={18} aria-hidden />
            </Button>
            <a href={company.phone.href} className="label inline-flex items-center gap-2 text-ink-2 hover:text-ink">
              <Phone size={16} aria-hidden /> {company.phone.display}
            </a>
          </div>
        </RevealBlock>
      </Container>
    </section>
  );
}
