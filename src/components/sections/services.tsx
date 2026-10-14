import { services } from "@/content/site";

export function Services() {
  return (
    <section className="border-t border-line px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-medium tracking-[0.22em] text-ink-3 uppercase">
          For product teams and clients
        </p>
        <h2 className="mt-4 max-w-3xl font-serif text-4xl text-ink md:text-5xl">
          How I can help a team move.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-2">
          These are ways of working, not a packaged consultancy menu. If the
          problem sits between design and frontend engineering, we should talk.
        </p>
        <ul className="mt-14 divide-y divide-line border-y border-line">
          {services.map((service) => (
            <li
              key={service.title}
              className="grid gap-3 py-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]"
            >
              <h3 className="text-lg text-ink">{service.title}</h3>
              <p className="text-sm leading-relaxed text-ink-2">{service.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
