import { ChevronRight } from "lucide-react";

import { DragRail } from "@/components/motion/drag-rail";
import { RevealHeading } from "@/components/motion/reveal";
import { WordReveal } from "@/components/motion/word-reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Icon } from "@/components/ui/icon";
import { home } from "@/data/home";

const railPadding = { paddingLeft: "max(1.25rem, calc((100vw - 86rem) / 2 + 2.5rem))", paddingRight: "2.5rem" };

export function WhyPraszo() {
  return (
    <section id="why-praszo" data-theme="dark" aria-labelledby="why-title" className="relative overflow-hidden py-24 md:py-32">
      <Container wide>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow className="justify-center">{home.why.eyebrow}</Eyebrow>
          <WordReveal text={home.why.description} highlights={["replaces chaos with consistency"]} className="lede mt-5" />
        </div>
        <h2 id="why-title" className="display-lg mt-12 text-center text-ink">
          <RevealHeading>{home.why.title}</RevealHeading>
        </h2>
      </Container>
      <DragRail className="relative z-10 mt-[-0.45em] pb-6" style={railPadding} aria-label="Why Praszo">
        {home.why.items.map((item, index) => (
          <article
            key={item.title}
            className="flex min-h-[26rem] w-[19rem] flex-col rounded-card border border-line bg-surface p-5 transition-colors duration-500 hover:bg-elevated md:w-[22rem]"
          >
            <div className="flex h-36 items-center justify-center rounded-sm bg-elevated text-brand">
              <Icon name={item.icon} size={44} strokeWidth={1.5} aria-hidden />
            </div>
            <p className="label mt-6 text-ink-3">0{index + 1}</p>
            <h3 className="mt-2 text-xl text-ink">{item.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{item.body}</p>
            <div className="mt-auto flex justify-end pt-6">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-3">
                <ChevronRight size={16} aria-hidden />
              </span>
            </div>
          </article>
        ))}
      </DragRail>
    </section>
  );
}
