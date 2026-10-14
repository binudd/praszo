import { HorizontalCard, HorizontalScroll } from "@/components/motion/horizontal-scroll";
import { RevealHeading } from "@/components/motion/reveal";
import { WordReveal } from "@/components/motion/word-reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Icon } from "@/components/ui/icon";
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
        <HorizontalCard
          key={item.title}
          className="flex min-h-[21rem] w-[min(22rem,80vw)] flex-col rounded-card border border-line bg-surface p-5 transition-colors duration-500 hover:bg-elevated md:w-[24rem]"
        >
          <div className="flex h-32 items-center justify-center rounded-sm bg-elevated text-brand">
            <Icon name={item.icon} size={44} strokeWidth={1.5} aria-hidden />
          </div>
          <p className="label mt-6 text-ink-3">0{index + 1}</p>
          <h3 className="mt-2 text-xl text-ink">{item.title}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{item.body}</p>
        </HorizontalCard>
      ))}
    </HorizontalScroll>
  );
}
