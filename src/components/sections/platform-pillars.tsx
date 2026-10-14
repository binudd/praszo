import { RevealGroup, RevealHeading } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
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
        <RevealGroup className="relative z-10 mt-[-0.55em] grid gap-4 md:grid-cols-3">
          {home.pillars.items.map((item) => (
            <Card key={item.title} data-reveal hover className="p-7 md:p-8">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-sm bg-brand-soft text-brand">
                <Icon name={item.icon} size={24} aria-hidden />
              </span>
              <h3 className="mt-8 text-2xl text-ink">{item.title}</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-ink-2">{item.body}</p>
            </Card>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
