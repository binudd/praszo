import { HorizontalCard, HorizontalScroll } from "@/components/motion/horizontal-scroll";
import { RevealHeading } from "@/components/motion/reveal";
import { WordReveal } from "@/components/motion/word-reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { EditorialItem } from "@/components/ui/editorial-item";
import { home } from "@/data/home";

export function WhyPraszo() {
  return (
    <HorizontalScroll
      id="why-praszo"
      theme="dark"
      label="Why Praszo"
      header={
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow className="justify-center">{home.why.eyebrow}</Eyebrow>
          <WordReveal text={home.why.description} highlights={["replaces chaos with consistency"]} className="lede mt-5" />
          <h2 id="why-title" className="display-md mt-8 text-ink">
            <RevealHeading>{home.why.title}</RevealHeading>
          </h2>
        </div>
      }
    >
      {home.why.items.map((item, index) => (
        <HorizontalCard key={item.title} className="w-[min(20rem,78vw)] md:w-[22rem]">
          <EditorialItem as="div" index={index} icon={item.icon} title={item.title} body={item.body} />
        </HorizontalCard>
      ))}
    </HorizontalScroll>
  );
}
