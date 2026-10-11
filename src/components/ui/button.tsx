import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "accent" | "green" | "light" | "outline" | "outline-light";
type ButtonSize = "md" | "lg";

type SharedProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonAsLink = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-primary)] text-[var(--color-secondary)] border border-[var(--color-primary)] hover:bg-[var(--color-primary-soft)]",
  accent:
    "bg-[var(--color-accent-red)] text-[var(--color-secondary)] border border-[var(--color-accent-red)] hover:brightness-110",
  green:
    "bg-[var(--color-accent-green)] text-[var(--color-secondary)] border border-[var(--color-accent-green)] hover:brightness-110",
  light: "bg-white text-black border border-white hover:bg-white/90",
  outline:
    "bg-transparent text-[var(--color-primary)] border border-[var(--color-primary)] hover:bg-black/5",
  "outline-light": "bg-transparent text-white border border-white hover:bg-white/10",
};

const sizeStyles: Record<ButtonSize, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-sm sm:text-[15px]",
};

const sharedClass =
  "inline-flex items-center justify-center whitespace-nowrap rounded-md font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-green)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60";

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    className,
    children,
    variant = "primary",
    size = "md",
    ...rest
  } = props;

  const classes = cn(sharedClass, variantStyles[variant], sizeStyles[size], className);

  if ("href" in props && props.href) {
    const href = props.href;
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");

    if (isExternal) {
      return (
        <a href={href} className={classes} {...anchorProps}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
