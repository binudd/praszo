import Image from "next/image";

import mark from "@/assets/brand/praszo-mark.png";
import { cn } from "@/lib/cn";

/** Praszo wordmark: the "z" is the coral brand mark. */
export function Logo({ className, size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-extrabold tracking-[-0.035em] text-ink",
        size === "sm" && "text-[1.2rem]",
        size === "md" && "text-[1.625rem] lg:text-[1.875rem]",
        size === "lg" && "text-[2rem]",
        className,
      )}
    >
      <span className="sr-only">Praszo</span>
      <span aria-hidden>Pras</span>
      <Image
        src={mark}
        alt=""
        aria-hidden
        data-logo-mark
        className="mx-[0.04em] h-[0.74em] w-auto translate-y-[0.03em]"
        sizes="32px"
      />
      <span aria-hidden>o</span>
    </span>
  );
}

/** The coral Praszo mark on its own (decorative; label the surrounding link). */
export function BrandMark({ className }: { className?: string }) {
  return <Image src={mark} alt="" aria-hidden data-logo-mark className={cn("h-8 w-auto", className)} sizes="48px" />;
}
