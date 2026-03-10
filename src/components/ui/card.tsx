import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-black shadow-[0_10px_35px_-20px_rgba(0,0,0,0.35)]",
        className,
      )}
      {...props}
    />
  );
}
