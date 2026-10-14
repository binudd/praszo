import { Slot } from "@radix-ui/react-slot";
import { Play } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

export function FilmLink({
  className,
  children,
  href,
  asChild,
  invert = false,
  ...props
}: ComponentProps<"a"> & { asChild?: boolean; invert?: boolean }) {
  const Comp = asChild ? Slot : "a";
  const external = typeof href === "string" && href.startsWith("http");

  return (
    <Comp
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={cn(
        "inline-flex h-[50px] items-center gap-2 rounded-full px-[18px] text-base transition-transform duration-300 hover:scale-[1.03]",
        invert ? "bg-ink text-bg" : "border border-ink bg-white text-ink",
        className,
      )}
      {...props}
    >
      <Play size={14} fill="currentColor" aria-hidden />
      {children}
    </Comp>
  );
}
