import { Section } from "@/components/ui/section";

const uses = [
  {
    title: "Exploration",
    body: "Rapid prototypes and alternate implementations when the first structure is not obviously right.",
  },
  {
    title: "Reading unfamiliar code",
    body: "Getting oriented in a large existing module — then verifying that reading against the actual file.",
  },
  {
    title: "Refactor assistance",
    body: "Drafting extractions like the Timesheet split, then reviewing boundaries, types, and host-mode behavior by hand.",
  },
  {
    title: "Validation",
    body: "Generated code is a starting point. Review, typecheck, tests, and a manual pass decide what ships.",
  },
];

export function Ai() {
  return (
    <Section
      id="ai"
      eyebrow="AI-assisted product engineering"
      title="Using AI to move faster, without losing engineering judgment."
    >
      <p className="max-w-2xl text-lg leading-relaxed text-ink-2">
        AI can accelerate implementation, but the quality of the outcome still
        depends on understanding the problem, evaluating the solution, and
        validating the code.
      </p>
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-3">
        This is about one year of practical AI-assisted development on real
        design and frontend work — not production LLM features, agent
        deployments, or customer outcomes I cannot show.
      </p>
      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {uses.map((item) => (
          <article key={item.title} className="border-t border-line pt-5">
            <h3 className="text-lg text-ink">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-2">{item.body}</p>
          </article>
        ))}
      </div>
      <p className="mt-12 max-w-2xl text-sm leading-relaxed text-ink-2">
        I distinguish AI as a coding partner from building AI-powered product
        features. I use the first regularly. I will not invent the second.
      </p>
    </Section>
  );
}
