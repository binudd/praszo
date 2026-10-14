import { RevealGroup, RevealHeading } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Icon } from "@/components/ui/icon";
import { home } from "@/data/home";

export function PlatformPillars() {
  return (
    <section aria-labelledby="pillars-title" className="relative py-24 md:py-32">
      <Container wide>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">{home.pillars.eyebrow}</Eyebrow>
          <p className="lede mt-5">{home.pillars.description}</p>
        </div>
        <h2 id="pillars-title" className="display-lg mt-10 text-center text-ink">
          <RevealHeading>Praszo OS.</RevealHeading>
          <RevealHeading>One platform.</RevealHeading>
        </h2>
        {/* Editorial columns (no card surface): a hairline rule, index label, display title and lede body. */}
        <RevealGroup className="mt-14 grid gap-x-10 gap-y-12 md:mt-20 md:grid-cols-3">
          {home.pillars.items.map((item, index) => (
            <article key={item.title} data-reveal className="border-t border-line-strong pt-6">
              <p className="label flex items-center gap-3 text-ink-3">
                <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                <Icon name={item.icon} size={18} className="text-brand" aria-hidden />
              </p>
              <h3 className="display-sm mt-6 text-ink">{item.title}</h3>
              <p className="lede mt-4">{item.body}</p>
            </article>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
