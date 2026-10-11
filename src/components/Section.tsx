import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  title?: string;
  eyebrow?: string;
  description?: string;
  className?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  contentClassName?: string;
  children: ReactNode;
};

export function Section({
  id,
  title,
  eyebrow,
  description,
  className,
  eyebrowClassName,
  titleClassName,
  descriptionClassName,
  contentClassName,
  children,
}: SectionProps) {
  void eyebrow;
  void eyebrowClassName;

  return (
    <section id={id} className={cn("mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8", className)}>
      {title ? (
        <h2 className={cn("font-display text-4xl leading-none tracking-wide text-[var(--color-primary)] sm:text-[2.75rem]", titleClassName)}>
          {title}
        </h2>
      ) : null}
      {description ? <p className={cn("mt-3 max-w-2xl text-[15px] leading-relaxed text-black/70 sm:text-base", descriptionClassName)}>{description}</p> : null}
      <div className={cn(title || description ? "mt-6 sm:mt-8" : "", contentClassName)}>{children}</div>
    </section>
  );
}
