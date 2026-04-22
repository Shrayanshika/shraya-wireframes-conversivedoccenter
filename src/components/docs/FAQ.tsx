import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export type FAQItem = { q: string; a: string };

export function FAQ({
  title = "Frequently asked questions",
  items,
}: {
  title?: string;
  items: FAQItem[];
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="my-10">
      <div className="mb-4 flex items-center gap-2">
        <HelpCircle className="h-4 w-4 text-ink-soft" />
        <h3 className="font-display text-[15px] font-semibold text-foreground">
          {title}
        </h3>
      </div>
      <div className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <div key={i}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left transition hover:bg-surface-2/60"
              >
                <span className="text-[14px] font-medium text-foreground">
                  {it.q}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-ink-soft transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-teal" : ""
                  }`}
                />
              </button>
              <div
                className={`grid overflow-hidden transition-all duration-200 ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="min-h-0">
                  <div className="border-t border-border bg-surface-2/40 px-4 py-3.5 text-[14px] leading-[1.7] text-ink-soft">
                    {it.a}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
