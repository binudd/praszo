import { experienceFacts, site } from "@/content/site";
import { storyIntro } from "@/content/story";

export function StoryIntro() {
  return (
    <section className="px-5 pb-16 pt-28 md:px-10 md:pb-20 md:pt-32">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <p className="font-mono text-[11px] tracking-[0.22em] text-ink-3 uppercase">
            {storyIntro.eyebrow}
          </p>
          <h1 className="mt-5 max-w-xl font-serif text-[clamp(2.6rem,6vw,5.2rem)] leading-[0.94] text-ink">
            {storyIntro.title}
          </h1>
          <div
            aria-hidden
            className="mt-12 flex aspect-[4/5] max-w-xs items-end overflow-hidden rounded-[1.75rem] border border-line bg-surface p-6"
          >
            <div>
              <p className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase">
                Portrait placeholder
              </p>
              <p className="mt-4 font-serif text-4xl leading-none">{site.name}</p>
              <p className="mt-3 text-sm text-ink-3">{site.descriptor}</p>
              <p className="mt-2 font-mono text-[11px] text-ink-3">{site.company}</p>
            </div>
          </div>
        </div>
        <div className="space-y-6 pt-2 text-base leading-relaxed text-ink-2 md:text-lg lg:pt-16">
          {storyIntro.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>
            Nine years of overlapping experience — not a single stack counted four
            times. Design, frontend, and product work in the same person.
          </p>
        </div>
      </div>
      <ul className="mx-auto mt-16 grid max-w-6xl gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {experienceFacts.map((fact) => (
          <li key={fact.label} className="bg-bg p-6">
            <p className="font-serif text-5xl leading-none text-ink">{fact.years}</p>
            <p className="mt-4 text-sm text-ink">{fact.label}</p>
            <p className="mt-2 text-sm text-ink-3">{fact.note}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
