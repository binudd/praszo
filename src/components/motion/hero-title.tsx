import { Fragment } from "react";

import { cn } from "@/lib/cn";

/**
 * Hero headline split into words for the entrance: each word sits in its own
 * clipping mask and rises, un-tilts and sharpens into place (see
 * useHeroEntrance). Words never break internally, so hyphenated words such as
 * "Purpose-built" stay on one line. `highlight` colours one word in the brand
 * tone (punctuation stays ink).
 */
export function HeroTitle({ text, highlight, className }: { text: string; highlight?: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={cn("block", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="block">
        {words.map((word, index) => {
          const match = highlight ? word.match(new RegExp(`^(${highlight})(\\W*)$`)) : null;
          return (
            <Fragment key={`${word}-${index}`}>
              {index > 0 ? " " : null}
              <span className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
                <span data-hero="word" className="inline-block origin-[0%_100%] whitespace-nowrap will-change-transform">
                  {match ? (
                    <>
                      <span className="text-brand">{match[1]}</span>
                      {match[2]}
                    </>
                  ) : (
                    word
                  )}
                </span>
              </span>
            </Fragment>
          );
        })}
      </span>
    </span>
  );
}
