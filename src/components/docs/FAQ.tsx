import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export type FAQItem = { q: string; a: string };

export function FAQ({
  title = "FAQs",
  items,
}: {
  title?: string;
  items: FAQItem[];
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="my-8">
      <div className="mb-3 flex items-center gap-2">
        <HelpCircle className="h-4 w-4 text-teal" />
        <h3 className="font-display text-base font-semibold text-foreground">
          {title}
        </h3>
      </div>
      <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <div key={i}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition hover:bg-surface-2"
              >
                <span className="text-sm font-semibold text-foreground">
                  {it.q}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-ink-soft transition-transform ${
                    isOpen ? "rotate-180 text-teal" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="border-t border-border bg-surface-2/50 px-4 py-3 text-sm leading-6 text-ink-soft">
                  {it.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
