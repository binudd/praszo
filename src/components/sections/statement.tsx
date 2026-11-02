import { WordReveal } from "@/components/motion/word-reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";

type Props = {
  id?: string;
  eyebrow?: string;
  text: string;
  highlights?: ReadonlyArray<string>;
  chips?: ReadonlyArray<string>;
  theme?: "dark" | "light";
  /** Scroll distance the statement takes to reveal. */
  height?: string;
  className?: string;
};

/** Full-viewport statement whose words light up as the visitor scrolls through it. */
export function Statement({ id, eyebrow, text, highlights, chips, theme = "dark", height = "190svh", className }: Props) {
  return (
    <section id={id} data-theme={theme} aria-label={text} className={cn("relative", className)}>
      <div data-reveal-track className="relative" style={{ height }}>
        <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden">
          <div className="dot-field" aria-hidden />
          <Container className="relative text-center">
            {eyebrow ? <Eyebrow className="justify-center">{eyebrow}</Eyebrow> : null}
            <WordReveal
              text={text}
              highlights={highlights}
              start="top top"
              end="bottom bottom"
              className="display-md mx-auto mt-6 max-w-[24ch]"
            />
            {chips?.length ? (
              <ul className="mt-10 flex flex-wrap justify-center gap-2.5">
                {chips.map((chip) => (
                  <li key={chip} className="glass rounded-full px-4 py-2 text-sm font-semibold text-ink">
                    {chip}
                  </li>
                ))}
              </ul>
            ) : null}
          </Container>
        </div>
      </div>
    </section>
  );
}
