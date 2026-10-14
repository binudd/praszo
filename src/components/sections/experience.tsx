import { experienceFacts } from "@/content/site";

export function Experience() {
  return (
    <section aria-label="Experience" className="border-t border-line px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="text-base text-ink-3">Meet the practice</p>
        <h2 className="mt-4 max-w-3xl font-serif text-[clamp(2.4rem,6vw,5.4rem)] leading-[0.94] text-ink">
          Overlapping experience.
          <br />
          One career.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-2">
          Not a single stack counted four times. These years sit on top of each
          other — design, frontend, and product work in the same person.
        </p>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {experienceFacts.map((fact) => (
            <article
              key={fact.label}
              className="flex min-h-[22rem] flex-col justify-between rounded-[1.75rem] border border-line bg-surface p-6"
            >
              <p className="font-serif text-[5.5rem] leading-none text-ink">{fact.years}</p>
              <div>
                <h3 className="text-lg text-ink">{fact.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-3">{fact.note}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-12 max-w-3xl text-base leading-relaxed text-ink-2">
          My work sits between visual design and implementation. I can contribute
          to interface design, translate requirements into frontend components,
          and improve the structure of existing application experiences.
        </p>
      </div>
    </section>
  );
}
