import { ArrowUpRight, CircleCheck } from "lucide-react";

import { RevealGroup } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { SectionHeader } from "@/components/ui/section-header";
import { home } from "@/data/home";

export function Segments() {
  return (
    <section aria-labelledby="segments-title" className="py-24 md:py-32">
      <Container wide>
        <SectionHeader eyebrow={home.segments.eyebrow} title={home.segments.title} titleId="segments-title" align="center" size="lg" />
        <RevealGroup className="mt-14 grid gap-4 lg:grid-cols-2">
          {home.segments.items.map((segment) => (
            <Card key={segment.title} data-reveal className="flex flex-col p-7 md:p-10">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-sm bg-brand-soft text-brand">
                <Icon name={segment.icon} size={24} aria-hidden />
              </span>
              <h3 className="display-sm mt-8 text-ink">{segment.title}</h3>
              <p className="mt-3 text-[15px] font-semibold text-brand">{segment.subtitle}</p>
              <p className="lede mt-5">{segment.body}</p>
              <ul className="mt-7 space-y-3 text-[15px] text-ink-2">
                {segment.points.map((point) => (
                  <li key={point} className="flex gap-2.5">
                    <CircleCheck size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <a
                href={segment.href}
                target="_blank"
                rel="noreferrer"
                className="mt-9 inline-flex items-center gap-1 text-sm font-bold text-ink hover:text-brand"
              >
                Read more on praszo.com
                <ArrowUpRight size={16} aria-hidden />
              </a>
            </Card>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
