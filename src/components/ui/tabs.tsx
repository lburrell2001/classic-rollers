"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tab = {
  id: string;
  label: string;
  content: ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  className?: string;
  tone?: "light" | "dark";
};

export function Tabs({ tabs, className, tone = "light" }: TabsProps) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");
  const isDark = tone === "dark";

  return (
    <div className={className}>
      <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="Content tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active === tab.id}
            className={cn(
              "rounded-xl border px-4 py-2 text-sm font-semibold transition-colors",
              active === tab.id
                ? isDark
                  ? "border-[var(--color-accent-red)] bg-[var(--color-accent-red)] text-white"
                  : "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                : isDark
                  ? "border-white/15 bg-black text-white/85 hover:bg-white/10"
                  : "border-black/15 bg-white text-black hover:bg-[var(--color-neutral-gray)]",
            )}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab) =>
        active === tab.id ? (
          <div
            key={tab.id}
            role="tabpanel"
            className={cn(
              "rounded-xl border p-5",
              isDark ? "border-white/10 bg-black text-white/80" : "border-black/10 bg-white",
            )}
          >
            {tab.content}
          </div>
        ) : null,
      )}
    </div>
  );
}
