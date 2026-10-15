import Image from "next/image";

import type { TeamMember } from "@/data/pages/about";

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

/*
 * Organic "bubble" grounds, one per card (cycled). Drawn in a 100 × 125 box: the 4/5 portrait frame,
 * so every shape scales evenly. Each starts around y 25–35 (the head breaks out above it) and is
 * broad and low enough at the bottom to hold the shoulders.
 */
const BLOBS = [
  "M50 28C72 24 96 36 97 62C99 86 95 110 78 119C62 127 34 126 18 117C3 108 1 84 3 62C5 38 26 31 50 28Z",
  "M46 34C66 26 92 30 96 54C100 76 97 104 84 116C70 128 30 124 14 112C0 100 2 74 6 56C10 40 28 40 46 34Z",
  "M54 30C78 30 98 46 96 70C94 94 98 112 80 120C58 129 30 122 14 114C-2 104 4 80 4 60C4 40 30 30 54 30Z",
  "M40 32C58 22 86 28 94 48C102 68 96 98 88 112C78 126 40 128 20 118C4 110 0 90 2 70C4 50 22 42 40 32Z",
];

/** The hand-drawn loop: the same bubble, slightly larger and tilted, like a pen circling it. */
const LOOP_TRANSFORM = "translate(50 76) rotate(-3) scale(1.07 1.05) translate(-50 -76)";

/**
 * Team portraits as cut-outs on organic bubble shapes. Each transparent PNG is clipped to its bubble
 * below the shoulders and left free above (a central column up to y 62), so the head breaks out.
 *
 * Static by design: nothing moves on scroll. Movement happens only on hover (hover-capable devices):
 * the pen loop draws round the bubble, behind the figure so the head overlaps it, and the figure lifts
 * from its base. Touch screens have no hover, so the loop shows drawn (as the Eyebrow underline does).
 * CSS only (.team-scribble in globals.css), so this stays a Server Component.
 */
export function TeamGrid({ members, idPrefix = "team" }: { members: ReadonlyArray<TeamMember>; idPrefix?: string }) {
  return (
    <ul className="mx-auto grid max-w-sm grid-cols-1 gap-y-12 sm:max-w-none sm:grid-cols-2 sm:gap-x-6 md:gap-x-8 lg:grid-cols-4">
      {members.map((member, index) => {
        const blob = BLOBS[index % BLOBS.length];
        // Unique per route: routes stay mounted, so pass a route-specific idPrefix if reused elsewhere.
        const clipId = `${idPrefix}-clip-${index}`;
        return (
          <li key={member.name} data-team-card className="group">
            <div className="relative aspect-[4/5]">
              {/* The bubble the figure stands on. */}
              <svg
                aria-hidden
                focusable="false"
                viewBox="0 0 100 125"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full overflow-visible text-elevated"
              >
                <path d={blob} fill="currentColor" />
              </svg>

              {/* Pen loop round the bubble, between bubble and figure so the head overlaps it. */}
              <svg
                aria-hidden
                focusable="false"
                viewBox="0 0 100 125"
                preserveAspectRatio="none"
                className="team-scribble absolute inset-0 h-full w-full text-brand"
              >
                <path pathLength={1} d={blob} transform={LOOP_TRANSFORM} />
              </svg>

              {/* Clip: a central column above the shoulders (head free) plus the bubble below.
                  Both subpaths run clockwise, so they add up instead of cancelling where they overlap. */}
              <svg aria-hidden focusable="false" width="0" height="0" className="absolute">
                <defs>
                  <clipPath id={clipId} clipPathUnits="objectBoundingBox">
                    <path transform="scale(0.01 0.008)" d={`M14 -40H86V62H14Z${blob}`} />
                  </clipPath>
                </defs>
              </svg>

              <div className="absolute inset-0" style={{ clipPath: `url(#${clipId})` }}>
                {member.photo ? (
                  <div className="relative h-full w-full origin-bottom transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-[1.04]">
                    <Image
                      src={member.photo}
                      alt={`Portrait of ${member.name}`}
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 46vw, 92vw"
                      className="object-contain object-bottom"
                    />
                  </div>
                ) : (
                  <span
                    aria-hidden
                    className="display-md absolute inset-x-0 top-[30%] bottom-0 flex items-center justify-center text-brand-strong"
                  >
                    {initials(member.name)}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-5">
              <h3 className="heading text-ink">{member.name}</h3>
              <p className="label mt-2 text-ink-3">{member.role}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
