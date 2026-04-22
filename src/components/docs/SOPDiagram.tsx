import { Workflow } from "lucide-react";
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
    <figure className="my-7">
      <div className="mb-3 flex items-center gap-2">
        <Workflow className="h-5 w-5 text-teal-bright" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal">
          Working Flow
        </span>
        {title && (
          <span className="font-display text-base font-semibold text-foreground">
            — {title}
          </span>
        )}
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-navy/30 bg-[oklch(0.18_0.05_260)] p-6 shadow-[0_20px_60px_-30px_oklch(0.22_0.06_260/0.6)]">
        {/* grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(to right, oklch(0.72 0.13 195 / 0.5) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.72 0.13 195 / 0.5) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* glow blobs */}
        <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-teal/30 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-teal-bright/20 blur-3xl" />

        <div className="relative flex flex-col items-stretch gap-3 md:flex-row md:items-stretch md:gap-0">
          {nodes.map((n, i) => {
            const isMid = i === Math.floor((nodes.length - 1) / 2);
            const highlight = n.tone === "primary" || isMid;
            return (
              <div
                key={i}
                className="relative flex flex-1 items-center md:flex-col md:justify-center"
              >
                {/* connector line (md+) */}
                {i < nodes.length - 1 && (
                  <div
                    aria-hidden
                    className="absolute hidden md:block"
                    style={{
                      top: "50%",
                      right: "-8px",
                      width: "16px",
                      height: "2px",
                      background:
                        "linear-gradient(90deg, oklch(0.72 0.13 195 / 0.9), oklch(0.72 0.13 195 / 0.3))",
                    }}
                  />
                )}
                <div
                  className={`relative w-full rounded-xl border px-4 py-5 text-center transition ${
                    highlight
                      ? "border-teal-bright/40 bg-gradient-to-br from-teal-bright to-teal text-navy-deep shadow-[0_10px_40px_-10px_oklch(0.72_0.13_195/0.6)] node-pulse"
                      : "border-white/10 bg-white/[0.04] text-white/85 backdrop-blur-sm"
                  }`}
                  style={{ animationDelay: `${i * 220}ms` }}
                >
                  <div
                    className={`mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${
                      highlight ? "text-navy-deep/70" : "text-white/45"
                    }`}
                  >
                    Node {i + 1}
                  </div>
                  <div
                    className={`font-display text-base font-semibold leading-tight ${
                      highlight ? "text-navy-deep" : "text-white"
                    }`}
                  >
                    {n.label}
                  </div>
                  {n.sub && (
                    <div
                      className={`mt-1 font-mono text-[10px] ${
                        highlight ? "text-navy-deep/70" : "text-white/55"
                      }`}
                    >
                      {n.sub}
                    </div>
                  )}
                  {highlight && (
                    <span
                      aria-hidden
                      className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-white/80 ping-dot"
                    />
                  )}
                </div>

                {/* mobile arrow */}
                {i < nodes.length - 1 && (
                  <div
                    aria-hidden
                    className="absolute -bottom-2 left-1/2 hidden h-3 w-px -translate-x-1/2 bg-teal-bright/60 md:hidden"
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="relative mt-5 flex items-center justify-center gap-2">
          <span className="h-px w-8 bg-teal-bright/50" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-teal-bright/80">
            Live data flow simulation
          </span>
          <span className="h-px w-8 bg-teal-bright/50" />
        </div>
      </div>

      {caption && (
        <figcaption className="mt-3 text-xs text-ink-soft">{caption}</figcaption>
      )}

      <style>{`
        @keyframes nodePulse {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-3px) scale(1.015); }
        }
        @keyframes pingDot {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        .node-pulse { animation: nodePulse 3s ease-in-out infinite; }
        .ping-dot { animation: pingDot 1.6s ease-in-out infinite; }
      `}</style>
    </figure>
  );
}
