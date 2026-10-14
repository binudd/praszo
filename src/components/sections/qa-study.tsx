export function QaStudy() {
  return (
    <section id="qa-review" className="border-t border-line px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
          <div>
            <p className="text-[11px] font-medium tracking-[0.22em] text-ink-3 uppercase">
              Case study 02 · Application engineering
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2.1rem,4vw,3.6rem)] leading-[1.08] text-ink">
              QA Review Portal
            </h2>
            <p className="mt-5 text-[12px] tracking-[0.12em] text-ink-3 uppercase">
              Next.js · TypeScript · shadcn/ui · Redux Toolkit
            </p>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-ink-2">
            <p>
              The portal is an application for structured QA review — not a
              marketing site. Review work needs role-specific surfaces, lists that
              stay scannable, and components that behave the same from reviewer to
              director to admin.
            </p>
            <p>
              The implementation uses Next.js App Router, TypeScript, and
              shadcn/Radix primitives. Features are organized around reviews,
              reviewers, and member firms, with dedicated routes for reviewer,
              director, admin, firm, and executive views.
            </p>
            <p>
              That structure is the interesting part: the interface has to present
              the same underlying review work differently depending on who is
              looking, without inventing a new visual language for each role.
            </p>
            <p className="text-sm text-ink-3">
              This is documented application work in progress. I am not claiming
              every feature is production-ready, and there is no public product
              URL to invent.
            </p>
          </div>
        </div>
        <ol className="mt-16 divide-y divide-line border-y border-line">
          {[
            {
              title: "Review workflows",
              body: "Surfaces organized around the job: who reviews, what is waiting, and what decision is next.",
            },
            {
              title: "Reusable components",
              body: "Radix-backed primitives for dialogs, selects, and navigation so interaction states stay consistent.",
            },
            {
              title: "Role-based information",
              body: "The same review data, framed for reviewer, director, admin, and firm contexts.",
            },
          ].map((item, index) => (
            <li
              key={item.title}
              className="grid gap-3 py-6 md:grid-cols-[4rem_14rem_1fr]"
            >
              <span className="text-[12px] tracking-[0.16em] text-accent uppercase">
                0{index + 1}
              </span>
              <h3 className="text-ink">{item.title}</h3>
              <p className="text-sm leading-relaxed text-ink-2">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
