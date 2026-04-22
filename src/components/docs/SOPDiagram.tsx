import { ArrowRight } from "lucide-react";
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
  return (
    <figure className="my-6 overflow-hidden rounded-xl border border-border bg-gradient-to-br from-surface-2 to-card p-5 shadow-sm">
      {title && (
        <div className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-teal">
          Animated SOP Flow
        </div>
      )}
      {title && (
        <div className="mb-4 font-display text-base font-semibold text-foreground">
          {title}
        </div>
      )}

      <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center md:gap-2">
        {nodes.map((n, i) => {
          const Icon = n.icon;
          const tone =
            n.tone === "primary"
              ? "border-teal/50 bg-teal-soft text-navy-deep"
              : n.tone === "success"
                ? "border-[oklch(0.6_0.15_150)]/40 bg-[oklch(0.96_0.05_150)] text-[oklch(0.32_0.14_150)]"
                : "border-border bg-card text-foreground";
          return (
            <div key={i} className="flex flex-1 items-center gap-2 md:flex-col">
              <div
                className={`relative flex-1 rounded-lg border p-3 text-center shadow-sm md:w-full ${tone} sop-pulse`}
                style={{ animationDelay: `${i * 250}ms` }}
              >
                {Icon && (
                  <Icon className="mx-auto mb-1.5 h-4 w-4 opacity-80" />
                )}
                <div className="text-[13px] font-semibold leading-tight">
                  {n.label}
                </div>
                {n.sub && (
                  <div className="mt-0.5 font-mono text-[10px] opacity-70">
                    {n.sub}
                  </div>
                )}
              </div>
              {i < nodes.length - 1 && (
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-teal sop-arrow md:rotate-0"
                  style={{ animationDelay: `${i * 250 + 120}ms` }}
                />
              )}
            </div>
          );
        })}
      </div>

      {caption && (
        <figcaption className="mt-4 text-xs text-ink-soft">{caption}</figcaption>
      )}

      <style>{`
        @keyframes sopPulse {
          0%, 100% { transform: translateY(0); box-shadow: 0 1px 2px rgba(0,0,0,0.04); }
          50% { transform: translateY(-2px); box-shadow: 0 6px 18px -8px oklch(0.52 0.1 200 / 0.35); }
        }
        @keyframes sopArrow {
          0%, 100% { opacity: 0.5; transform: translateX(0); }
          50% { opacity: 1; transform: translateX(3px); }
        }
        .sop-pulse { animation: sopPulse 2.6s ease-in-out infinite; }
        .sop-arrow { animation: sopArrow 2.6s ease-in-out infinite; }
      `}</style>
    </figure>
  );
}
