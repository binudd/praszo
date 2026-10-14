import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

type ButtonProps = ComponentProps<"a"> & {
  variant?: "primary" | "ghost" | "line";
  asChild?: boolean;
};

export function Button({
  className,
  variant = "primary",
  asChild,
  href,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "a";
  const external = typeof href === "string" && href.startsWith("http");

  return (
    <Comp
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-base font-normal transition-colors",
        variant === "primary" && "bg-accent text-accent-ink hover:bg-[#1b6ce6]",
        variant === "ghost" &&
          "border border-ink bg-white text-ink hover:bg-surface",
        variant === "line" && "rounded-none border-b border-accent px-0 text-ink",
        className,
      )}
      {...props}
    />
  );
}
