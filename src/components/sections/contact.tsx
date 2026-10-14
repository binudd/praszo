import { Button } from "@/components/ui/button";
import { primaryContactHref, site } from "@/content/site";

export function Contact() {
  const links = [
    site.email
      ? { href: `mailto:${site.email}`, label: site.email, name: "Email" }
      : null,
    { href: site.linkedin, label: "linkedin.com/in/binu-e-83a323139", name: "LinkedIn" },
    { href: site.github, label: "github.com/binuboston", name: "GitHub" },
    { href: site.behance, label: "behance.net/binuboston", name: "Behance" },
    { href: site.resumeHref, label: "Download PDF", name: "Resume" },
  ].filter((item) => item !== null);

  return (
    <section id="contact" className="border-t border-line px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] tracking-[0.22em] text-ink-3 uppercase">
          Contact
        </p>
        <h2 className="mt-4 max-w-4xl font-serif text-[clamp(2.4rem,6vw,5.4rem)] leading-[0.94] text-ink">
          Have something meaningful to build?
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
          I&apos;m interested in thoughtful digital products, strong frontend
          engineering, and experiences where design and technology work together.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={primaryContactHref()}>Let&apos;s talk</Button>
          <Button href={site.resumeHref} variant="ghost">
            Resume
          </Button>
        </div>
        <ul className="mt-16 divide-y divide-line border-y border-line">
          {links.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="flex flex-col justify-between gap-2 py-5 transition-colors hover:text-accent md:flex-row md:items-center"
                {...(link.href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                <span className="font-mono text-[11px] tracking-[0.16em] text-ink-3 uppercase">
                  {link.name}
                </span>
                <span className="text-ink">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
        {!site.email ? (
          <p className="mt-6 text-sm text-ink-3">
            Email is left unset until a preferred public address is confirmed.
            LinkedIn is the current primary contact.
          </p>
        ) : null}
      </div>
    </section>
  );
}
