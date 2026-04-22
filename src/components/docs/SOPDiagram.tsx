import { Workflow, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SOPNode = {
  label: string;
  sub?: string;
  icon?: LucideIcon;
  tone?: "neutral" | "primary" | "success";
};

export function SOPDiagram({
  title,
  caption,
  nodes,
}: {
  title?: string;
  caption?: string;
  nodes: SOPNode[];
}) {
  const highlightIndex = Math.floor((nodes.length - 1) / 2);

  return (
    <figure className="my-7">
      <div className="mb-3 flex items-center gap-2">
        <Workflow className="h-4 w-4 text-teal-bright" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal">
          Working Flow
        </span>
        {title && (
          <span className="font-display text-sm font-semibold text-foreground">
            — {title}
          </span>
        )}
      </div>

      <div
        className="relative overflow-hidden rounded-xl border border-navy/15 bg-gradient-to-br from-[oklch(0.98_0.01_240)] to-[oklch(0.96_0.02_220)] p-4 md:p-5"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(oklch(0.55 0.15 240 / 0.18) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        <ol className="relative flex flex-wrap items-center justify-center gap-2">
          {nodes.map((n, i) => {
            const isHighlight = n.tone === "primary" || i === highlightIndex;
            const isLast = i === nodes.length - 1;
            return (
              <li key={i} className="flex items-center gap-2">
                <div
                  className={`rounded-full border px-3 py-1.5 ${
                    isHighlight
                      ? "border-transparent bg-gradient-to-r from-[oklch(0.45_0.18_255)] to-[oklch(0.55_0.16_240)] text-white shadow-[0_6px_18px_-10px_oklch(0.45_0.18_255/0.6)]"
                      : "border-navy/15 bg-white text-foreground"
                  }`}
                >
                  <div
                    className={`text-[8px] font-semibold uppercase tracking-[0.16em] leading-none ${
                      isHighlight ? "text-white/70" : "text-teal"
                    }`}
                  >
                    Step {i + 1}
                  </div>
                  <div
                    className={`font-display text-[12px] font-semibold leading-tight mt-0.5 ${
                      isHighlight ? "text-white" : "text-foreground"
                    }`}
                  >
                    {n.label}
                  </div>
                  {n.sub && (
                    <div
                      className={`font-mono text-[9px] leading-tight ${
                        isHighlight ? "text-white/75" : "text-ink-soft"
                      }`}
                    >
                      {n.sub}
                    </div>
                  )}
                </div>
                {!isLast && (
                  <ArrowRight
                    className="h-3.5 w-3.5 shrink-0 text-navy/40"
                    aria-hidden
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {caption && (
        <figcaption className="mt-2 text-xs text-ink-soft">{caption}</figcaption>
      )}
    </figure>
  );
}
