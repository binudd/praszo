import { skillGroups } from "@/content/site";

export function Capabilities() {
  return (
    <section className="border-t border-line px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-medium tracking-[0.22em] text-ink-3 uppercase">
          Capabilities
        </p>
        <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">
          Familiarity is not the same as mastery.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-2">
          Grouped by how I actually use them. These are not equal scores, and
          there are no percentage bars.
        </p>
        <div className="mt-14 grid gap-10 md:grid-cols-2">
          {skillGroups.map((group) => (
            <article key={group.title} className="border-t border-line pt-5">
              <h3 className="text-xl text-ink">{group.title}</h3>
              <p className="mt-2 text-sm text-ink-3">{group.note}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border border-line px-3 py-1.5 text-[13px] text-ink-2"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
