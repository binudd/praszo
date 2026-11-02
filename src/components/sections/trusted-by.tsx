import Image from "next/image";

import { Container } from "@/components/ui/container";
import { home } from "@/data/home";

/** `id` must be unique per route (routes stay mounted). */
export function TrustedBy({ id = "trusted" }: { id?: string }) {
  const logos = home.trustedBy.logos;
  return (
    <section aria-labelledby={`${id}-title`} className="border-y border-line py-10 md:py-12">
      <Container>
        <p id={`${id}-title`} className="label text-center text-ink-3">
          {home.trustedBy.title}
        </p>
        <div className="marquee mt-8 overflow-hidden">
          <ul className="marquee-track flex w-max items-center gap-12 md:gap-16">
            {[...logos, ...logos].map((logo, index) => {
              const duplicate = index >= logos.length;
              return (
                <li key={`${logo.name}-${index}`} className={duplicate ? "motion-reduce:hidden" : undefined} aria-hidden={duplicate || undefined}>
                  <Image
                    src={logo.src}
                    alt={duplicate ? "" : logo.name}
                    className="h-8 w-auto opacity-70 grayscale md:h-9 dark:invert"
                    sizes="180px"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
