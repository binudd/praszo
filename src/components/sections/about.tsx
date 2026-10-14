import { site } from "@/content/site";

export function About() {
  return (
    <section id="about" className="border-t border-line px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-[11px] font-medium tracking-[0.22em] text-ink-3 uppercase">
            About
          </p>
          <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">
            Curious by nature. Practical by design.
          </h2>
          <div
            aria-hidden
            className="mt-10 flex aspect-square max-w-xs items-end border border-line bg-surface p-6"
          >
            <div>
              <p className="text-[12px] tracking-[0.28em] text-accent uppercase">
                {site.name}
              </p>
              <p className="mt-3 font-serif text-4xl leading-none">{site.name}</p>
              <p className="mt-4 text-sm text-ink-3">{site.company}</p>
            </div>
          </div>
        </div>
        <div className="space-y-6 text-base leading-relaxed text-ink-2 md:text-lg">
          <p>
            I&apos;m Binu, a UI/UX designer and frontend developer who enjoys
            working where product thinking, design, and engineering meet.
          </p>
          <p>
            Over the years, I&apos;ve developed a perspective that spans the
            visual structure of an interface and the technical decisions that
            make it work. I enjoy turning complex workflows into clearer
            experiences, improving existing implementations, and finding
            practical ways to make software easier to use and maintain.
          </p>
          <p>
            My recent work has deepened my interest in frontend architecture,
            complex product systems, and AI-assisted development. I&apos;m
            building on that foundation as I move toward broader product
            engineering and Forward Deployed Engineering responsibilities.
          </p>
          <p>
            I care about the details people see, the code developers maintain,
            and the real problem the product is supposed to solve.
          </p>
        </div>
      </div>
    </section>
  );
}
