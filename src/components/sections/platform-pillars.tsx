import { RevealGroup, RevealHeading } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { EditorialItem } from "@/components/ui/editorial-item";
import { home } from "@/data/home";

export function PlatformPillars() {
  return (
    <section aria-labelledby="pillars-title" className="relative py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">{home.pillars.eyebrow}</Eyebrow>
          <p className="lede mt-5">{home.pillars.description}</p>
        </div>
        <h2 id="pillars-title" className="display-lg mt-10 text-center text-ink">
          <RevealHeading>Praszo OS.</RevealHeading>
          <RevealHeading>One platform.</RevealHeading>
        </h2>
        <RevealGroup className="mt-14 grid gap-x-10 gap-y-12 md:mt-20 md:grid-cols-3">
          {home.pillars.items.map((item, index) => (
            <EditorialItem key={item.title} reveal index={index} icon={item.icon} size="display" title={item.title} body={item.body} />
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
