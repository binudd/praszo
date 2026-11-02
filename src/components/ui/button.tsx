import { Slot } from "@radix-ui/react-slot";
import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

const NON_ROUTE = /^(https?:|mailto:|tel:|#)/;
const EXTERNAL = /^https?:/;

type Variant = "primary" | "secondary" | "ghost" | "product" | "inverse";
type Size = "sm" | "md" | "lg";

type ButtonProps = Omit<ComponentProps<"a">, "href"> & {
  href?: string;
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
  type?: "button" | "submit";
};

const variants: Record<Variant, string> = {
  primary: "bg-brand text-brand-ink hover:bg-brand-hover",
  secondary: "border border-line-strong bg-bg text-ink hover:border-ink/50",
  ghost: "text-ink hover:bg-elevated",
  product: "bg-product-deep text-product-ink hover:brightness-110",
  inverse: "bg-white text-[#121317] hover:bg-white/90",
};

const sizes: Record<Size, string> = {
  // 40px tall; the hit area still reaches 44px.
  sm: "tap-target h-10 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-12 px-6 text-base",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  return cn(
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background-color,color,border-color,box-shadow,filter,transform] duration-300 ease-[var(--ease-out)] active:scale-[0.98]",
    variants[variant],
    sizes[size],
    className,
  );
}

/**
 * Link-or-button. Internal paths render next/link; http(s), mailto:, tel: and
 * hash hrefs render a plain anchor; no href renders a native button.
 */
export function Button({
  className,
  variant = "primary",
  size = "md",
  asChild,
  href,
  type,
  children,
  ...props
}: ButtonProps) {
  const classes = buttonClasses({ variant, size, className });

  if (asChild) {
    return (
      <Slot className={classes} {...props}>
        {children}
      </Slot>
    );
  }

  if (!href) {
    const { onClick, "aria-label": ariaLabel, title } = props;
    return (
      <button
        type={type ?? "button"}
        className={classes}
        onClick={onClick as ComponentProps<"button">["onClick"]}
        aria-label={ariaLabel}
        title={title}
      >
        {children}
      </button>
    );
  }

  if (NON_ROUTE.test(href)) {
    const external = EXTERNAL.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
