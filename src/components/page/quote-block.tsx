import Image, { type StaticImageData } from "next/image";

import { RevealBlock } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";

type Props = { text: string; name: string; role: string; photo?: StaticImageData };

/** A single pull quote at statement scale, attributed with a small portrait. */
export function QuoteBlock({ text, name, role, photo }: Props) {
  return (
    <section aria-label={`A word from ${name}`} className="border-t border-line py-20 md:py-28">
      <Container>
        <RevealBlock>
          <figure className="max-w-5xl">
            <blockquote className="display-md text-ink">
              <p>&ldquo;{text}&rdquo;</p>
            </blockquote>
            <figcaption className="mt-10 flex items-center gap-4">
              {photo ? (
                <Image src={photo} alt="" sizes="56px" className="h-14 w-14 rounded-full object-cover object-top" />
              ) : null}
              <span>
                <span className="heading block text-ink">{name}</span>
                <span className="label mt-1 block text-ink-3">{role}</span>
              </span>
            </figcaption>
          </figure>
        </RevealBlock>
      </Container>
    </section>
  );
}
