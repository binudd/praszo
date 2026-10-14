import { skillGroups, technicalPrinciples } from "@/content/site";

export function StoryPrinciples() {
  return (
    <section className="border-t border-line px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] tracking-[0.22em] text-ink-3 uppercase">
          How I work
        </p>
        <h2 className="mt-4 max-w-3xl font-serif text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.02] text-ink">
          Good interfaces need good foundations.
        </h2>
        <ol className="mt-14 grid gap-10 md:grid-cols-2">
          {technicalPrinciples.map((principle, index) => (
            <li key={principle.title} className="border-t border-line pt-5">
              <p className="font-mono text-[11px] tracking-[0.16em] text-accent">
                0{index + 1}
              </p>
              <h3 className="mt-3 font-serif text-2xl text-ink">{principle.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">{principle.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-20 grid gap-8 border-t border-line pt-12 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-sans text-sm text-ink">{group.title}</h3>
              <p className="mt-2 text-sm text-ink-3">{group.note}</p>
              <ul className="mt-4 space-y-1 font-mono text-[12px] text-ink-2">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
