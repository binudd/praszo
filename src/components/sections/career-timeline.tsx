import { careerMilestones } from "@/content/story";

export function CareerTimeline() {
  return (
    <section
      id="timeline"
      className="border-t border-line px-5 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] tracking-[0.22em] text-ink-3 uppercase">
          Craft timeline
        </p>
        <h2 className="mt-4 max-w-2xl font-serif text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.02] text-ink">
          Skills in sequence. Not a list of jobs.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-2">
          Dates stay off this record until they can be verified. Expand a stage
          to read how the craft expanded.
        </p>
        <ol className="mt-12 divide-y divide-line border-y border-line">
          {careerMilestones.map((milestone) => (
            <li key={milestone.id}>
              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex min-w-0 items-baseline gap-5">
                    <span className="font-mono text-[11px] tracking-[0.16em] text-accent">
                      {milestone.id}
                    </span>
                    <span className="font-serif text-2xl text-ink md:text-3xl">
                      {milestone.title}
                    </span>
                  </span>
                  <span className="hidden shrink-0 font-mono text-[11px] tracking-[0.12em] text-ink-3 uppercase md:inline">
                    {milestone.tools}
                  </span>
                </summary>
                <div className="mt-4 max-w-2xl pl-[3.25rem] text-sm leading-relaxed text-ink-2 md:text-base">
                  <p className="mb-3 font-mono text-[11px] tracking-[0.12em] text-ink-3 uppercase md:hidden">
                    {milestone.tools}
                  </p>
                  <p>{milestone.body}</p>
                </div>
              </details>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
