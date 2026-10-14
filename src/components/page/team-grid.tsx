import Image from "next/image";

import { RevealGroup } from "@/components/motion/reveal";
import type { TeamMember } from "@/data/pages/about";

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

/** Team portraits in one frame size; a member without a real portrait gets an initials tile. */
export function TeamGrid({ members }: { members: ReadonlyArray<TeamMember> }) {
  return (
    <RevealGroup>
      <ul className="grid grid-cols-2 gap-x-5 gap-y-10 md:gap-x-8 lg:grid-cols-4">
        {members.map((member) => (
          <li key={member.name} data-reveal>
            <div className="aspect-[4/5] overflow-hidden rounded-card bg-elevated">
              {member.photo ? (
                <Image
                  src={member.photo}
                  alt={`Portrait of ${member.name}`}
                  placeholder="blur"
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <span aria-hidden className="display-md flex h-full w-full items-center justify-center bg-brand-soft text-brand-strong">
                  {initials(member.name)}
                </span>
              )}
            </div>
            <h3 className="heading mt-5 text-ink">{member.name}</h3>
            <p className="label mt-2 text-ink-3">{member.role}</p>
          </li>
        ))}
      </ul>
    </RevealGroup>
  );
}
