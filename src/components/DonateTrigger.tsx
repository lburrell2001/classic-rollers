"use client";

import type { MouseEvent } from "react";
import { Button } from "@/components/ui/button";

type DonateTriggerProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "accent" | "outline";
  size?: "md" | "lg";
  colorScheme?: "default" | "on-red";
};

export function DonateTrigger({ children, className, variant = "accent", size = "md", colorScheme = "default" }: DonateTriggerProps) {
  const openDonate = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    window.dispatchEvent(new Event("open-donate"));
  };

  const paletteClass =
    colorScheme === "on-red"
      ? "!border-[var(--color-accent-green)] !bg-[var(--color-accent-green)] !text-white hover:!border-[var(--color-accent-green)] hover:!bg-[var(--color-accent-green)] hover:brightness-110"
      : "!border-[var(--color-accent-red)] !bg-[var(--color-accent-red)] !text-white hover:!border-[var(--color-accent-red)] hover:!bg-[var(--color-accent-red)] hover:brightness-110";

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={`${paletteClass} ${className ?? ""}`}
      onClick={openDonate}
    >
      {children}
    </Button>
  );
}
