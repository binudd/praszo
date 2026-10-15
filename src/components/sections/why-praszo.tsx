import { HorizontalCard, HorizontalScroll } from "@/components/motion/horizontal-scroll";
import { RevealHeading } from "@/components/motion/reveal";
import { WordReveal } from "@/components/motion/word-reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { EditorialItem } from "@/components/ui/editorial-item";
import type { IconName } from "@/lib/icons";

type Props = {
  /** Section anchor; unique per route (routes stay mounted). */
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  highlights?: ReadonlyArray<string>;
  items: ReadonlyArray<{ title: string; body: string; icon: IconName }>;
};

/** Dark pinned rail of differentiators: a scroll-revealed intro, a heading, then the items. */
export function WhyPraszo({ id = "why-praszo", eyebrow, title, description, highlights, items }: Props) {
  return (
    <HorizontalScroll
      id={id}
      theme="dark"
      label={eyebrow}
      header={
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-center">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <WordReveal text={description} highlights={highlights} className="lede mt-5" />
          <h2 id={`${id}-title`} className="display-md mt-8 text-ink">
            <RevealHeading>{title}</RevealHeading>
          </h2>
        </div>
      }
    >
      {items.map((item, index) => (
        <HorizontalCard key={item.title} className="w-[min(20rem,78vw)] md:w-[22rem]">
          <EditorialItem as="div" index={index} icon={item.icon} title={item.title} body={item.body} />
        </HorizontalCard>
      ))}
    </HorizontalScroll>
  );
}
