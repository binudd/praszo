import { Section } from "@/components/ui/section";
import { capabilityChapters } from "@/content/site";

export function Story() {
  return (
    <Section
      id="story"
      eyebrow="Professional story"
      title={
        <>
          One career.
          <br />
          Multiple
          <br />
          perspectives.
        </>
      }
    >
      <div className="space-y-6 text-base leading-relaxed text-ink-2 md:text-lg">
        <p>
          Over the years, my work has brought me across visual design, frontend
          development, and increasingly complex digital products.
        </p>
        <p>
          I began with the fundamentals of building and styling the web, developed
          a strong foundation in UI/UX design, and expanded into React-based
          application development.
        </p>
        <p>
          Today, I bring those perspectives together. I think about how a product
          should work, how the experience should feel, and how the underlying
          interface should be structured to remain maintainable as the product
          evolves.
        </p>
        <p>
          I&apos;m continuing to extend that foundation into AI-enabled product
          engineering, where understanding the problem and delivering a practical
          solution matter as much as the technology used to build it.
        </p>
      </div>
      <ol className="mt-12 divide-y divide-line border-y border-line">
        {capabilityChapters.map((chapter) => (
          <li key={chapter.id} className="grid gap-3 py-6 md:grid-cols-[4rem_1fr]">
            <span className="text-[12px] tracking-[0.16em] text-accent uppercase">
              {chapter.id}
            </span>
            <div>
              <h3 className="text-lg text-ink">{chapter.title}</h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-2">
                {chapter.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
