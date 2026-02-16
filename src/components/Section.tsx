import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  title?: string;
  eyebrow?: string;
  description?: string;
  className?: string;
  children: ReactNode;
};

export function Section({ id, title, eyebrow, description, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8", className)}>
      {eyebrow ? (
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-red)]">{eyebrow}</p>
      ) : null}
      {title ? <h2 className="font-display text-4xl tracking-wide text-[var(--color-primary)] sm:text-5xl">{title}</h2> : null}
      {description ? <p className="mt-3 max-w-2xl text-base text-black/75">{description}</p> : null}
      <div className={cn(title || description ? "mt-8" : "")}>{children}</div>
    </section>
  );
}
