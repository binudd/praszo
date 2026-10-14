import { Section } from "@/components/ui/section";
import { technicalPrinciples } from "@/content/site";

export function Thinking() {
  return (
    <Section
      id="thinking"
      eyebrow="The structure"
      title={
        <>
          Good interfaces
          <br />
          need good
          <br />
          foundations.
        </>
      }
    >
      <p className="max-w-2xl text-lg leading-relaxed text-ink-2">
        An interface is not finished when it looks right. It needs clear
        component responsibilities, predictable state, consistent interaction
        patterns, and a structure that other developers can understand.
      </p>
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {technicalPrinciples.map((principle, index) => (
          <article
            key={principle.title}
            className="rounded-[1.75rem] border border-line bg-surface p-6"
          >
            <p className="text-[11px] tracking-[0.16em] text-accent uppercase">
              0{index + 1}
            </p>
            <h3 className="mt-8 text-xl text-ink">{principle.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-2">{principle.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
