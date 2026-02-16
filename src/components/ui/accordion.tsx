"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Item = {
  title: string;
  content: ReactNode;
};

type AccordionProps = {
  items: Item[];
  className?: string;
};

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item.title} className="overflow-hidden rounded-xl border border-black/10 bg-white">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span>{item.title}</span>
              <span className="text-xl leading-none">{isOpen ? "-" : "+"}</span>
            </button>
            {isOpen ? <div className="border-t border-black/10 px-5 py-4 text-sm text-black/80">{item.content}</div> : null}
          </div>
        );
      })}
    </div>
  );
}
