import { Quote } from "lucide-react";

import { HorizontalCard, HorizontalScroll } from "@/components/motion/horizontal-scroll";
import { SectionHeader } from "@/components/ui/section-header";
import { home } from "@/data/home";

export function Testimonials() {
  return (
    <HorizontalScroll
      label="Testimonials"
      className="border-t border-line"
      header={<SectionHeader eyebrow={home.testimonials.eyebrow} title={home.testimonials.title} titleId="testimonials-title" size="lg" />}
    >
      {home.testimonials.items.map((item) => (
        <HorizontalCard key={item.name} className="flex w-[min(24rem,82vw)] flex-col border-t border-line-strong pt-6 md:w-[30rem]">
          <Quote size={22} className="text-brand" aria-hidden />
          <blockquote className="lede mt-5 text-ink">
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
              <span className="copy block font-semibold text-ink">{item.name}</span>
              <span className="label mt-1 block text-ink-3">
                {item.role}, <span className="text-brand-strong">{item.company}</span>
              </span>
            </span>
          </figcaption>
        </HorizontalCard>
      ))}
    </HorizontalScroll>
  );
}
