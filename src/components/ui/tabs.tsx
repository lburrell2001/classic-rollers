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
};

export function Tabs({ tabs, className }: TabsProps) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");

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
                ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
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
          <div key={tab.id} role="tabpanel" className="rounded-xl border border-black/10 bg-white p-5">
            {tab.content}
          </div>
        ) : null,
      )}
    </div>
  );
}
