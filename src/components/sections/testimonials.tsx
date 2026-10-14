import { Quote } from "lucide-react";

import { DragRail } from "@/components/motion/drag-rail";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { home } from "@/data/home";

const railPadding = { paddingLeft: "max(1.25rem, calc((100vw - 86rem) / 2 + 2.5rem))", paddingRight: "2.5rem" };

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="border-t border-line py-24 md:py-32">
      <Container wide>
        <SectionHeader eyebrow={home.testimonials.eyebrow} title={home.testimonials.title} titleId="testimonials-title" size="lg" />
      </Container>
      <DragRail className="mt-12 pb-6" style={railPadding} aria-label="Testimonials">
        {home.testimonials.items.map((item) => (
          <figure
            key={item.name}
            className="flex w-[22rem] flex-col rounded-card border border-line bg-surface p-7 md:w-[30rem] md:p-9"
          >
            <Quote size={26} className="text-brand" aria-hidden />
            <blockquote className="mt-5 text-xl leading-snug font-semibold tracking-[-0.015em] text-ink md:text-2xl">
              <p>“{item.quote}”</p>
            </blockquote>
            <figcaption className="mt-auto flex items-center gap-3 pt-8">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                {item.name
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <span>
                <span className="block text-[15px] font-bold text-ink">{item.name}</span>
                <span className="block text-sm text-ink-3">{item.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </DragRail>
    </section>
  );
}
