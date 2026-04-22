import { ArrowRight, Workflow } from "lucide-react";
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
    <figure className="my-8">
      <div className="mb-3 flex items-center gap-2">
        <Workflow className="h-3.5 w-3.5 text-ink-soft" />
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
          Working Flow
        </span>
        {title && (
          <span className="text-[13px] font-medium text-foreground">
            · {title}
          </span>
        )}
      </div>

      <div className="relative overflow-hidden rounded-xl border border-border bg-card">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(oklch(0.55 0.05 240 / 0.18) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        />

        <ol className="relative flex flex-nowrap items-center justify-center gap-1.5 overflow-x-auto px-4 py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {nodes.map((n, i) => {
            const isPrimary = n.tone === "primary";
            const isSuccess = n.tone === "success";
            const Icon = n.icon;
            const isLast = i === nodes.length - 1;
            return (
              <li key={i} className="flex shrink-0 items-center gap-1.5">
                <div
                  className={`group flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md border px-2.5 py-1.5 shadow-sm transition ${
                    isPrimary
                      ? "border-navy/20 bg-navy-deep text-white"
                      : isSuccess
                        ? "border-teal/30 bg-teal-soft text-navy-deep"
                        : "border-border bg-background text-foreground"
                  }`}
                >
                  {Icon && (
                    <Icon
                      className={`h-3 w-3 shrink-0 ${
                        isPrimary
                          ? "text-teal-bright"
                          : isSuccess
                            ? "text-teal"
                            : "text-ink-soft"
                      }`}
                    />
                  )}
                  <div className="leading-tight">
                    <div
                      className={`font-mono text-[8px] font-semibold uppercase tracking-[0.12em] ${
                        isPrimary
                          ? "text-white/55"
                          : isSuccess
                            ? "text-teal/80"
                            : "text-ink-soft/70"
                      }`}
                    >
                      Step {i + 1}
                    </div>
                    <div
                      className={`font-display text-[11px] font-semibold leading-tight ${
                        isPrimary ? "text-white" : "text-foreground"
                      }`}
                    >
                      {n.label}
                    </div>
                    {n.sub && (
                      <div
                        className={`font-mono text-[8.5px] leading-tight ${
                          isPrimary
                            ? "text-white/65"
                            : isSuccess
                              ? "text-navy/65"
                              : "text-ink-soft/80"
                        }`}
                      >
                        {n.sub}
                      </div>
                    )}
                  </div>
                </div>
                {!isLast && (
                  <ArrowRight
                    className="h-3 w-3 shrink-0 text-ink-soft/40"
                    aria-hidden
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {caption && (
        <figcaption className="mt-2.5 text-[12.5px] leading-[1.55] text-ink-soft">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
