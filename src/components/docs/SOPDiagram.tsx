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
  // Alternate sides: 0 = left, 1 = right
  const sideOf = (i: number) => (i % 2 === 0 ? "left" : "right");
  // Highlight the middle node by default
  const highlightIndex = Math.floor((nodes.length - 1) / 2);

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

      <div className="relative overflow-hidden rounded-2xl border border-navy/15 bg-gradient-to-br from-[oklch(0.98_0.01_240)] to-[oklch(0.95_0.03_220)] p-4 md:p-6 shadow-[0_20px_60px_-30px_oklch(0.45_0.15_240/0.35)]">
        {/* subtle dot pattern */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(oklch(0.55 0.15 240 / 0.15) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        <ol className="relative flex flex-col gap-0">
          {nodes.map((n, i) => {
            const side = sideOf(i);
            const isHighlight = n.tone === "primary" || i === highlightIndex;
            const next = nodes[i + 1];
            const nextSide = next ? sideOf(i + 1) : null;

            return (
              <li key={i} className="relative">
                <div
                  className={`flex w-full ${
                    side === "left" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`relative max-w-[260px] sm:max-w-[280px] rounded-full border px-4 py-2 transition-all ${
                      isHighlight
                        ? "border-transparent bg-gradient-to-r from-[oklch(0.45_0.18_255)] to-[oklch(0.55_0.16_240)] text-white shadow-[0_10px_28px_-12px_oklch(0.45_0.18_255/0.5)] node-pulse"
                        : "border-navy/15 bg-white text-foreground shadow-[0_6px_18px_-12px_oklch(0.45_0.15_240/0.25)]"
                    }`}
                    style={{ animationDelay: `${i * 200}ms` }}
                  >
                    <div
                      className={`text-[9px] font-semibold uppercase tracking-[0.18em] leading-none ${
                        isHighlight ? "text-white/70" : "text-teal"
                      }`}
                    >
                      Step {i + 1}
                    </div>
                    <div
                      className={`font-display text-[13px] font-semibold leading-tight mt-0.5 ${
                        isHighlight ? "text-white" : "text-foreground"
                      }`}
                    >
                      {n.label}
                    </div>
                    {n.sub && (
                      <div
                        className={`mt-0.5 font-mono text-[9px] leading-tight ${
                          isHighlight ? "text-white/75" : "text-ink-soft"
                        }`}
                      >
                        {n.sub}
                      </div>
                    )}
                    {isHighlight && (
                      <span
                        aria-hidden
                        className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-teal-bright ping-dot"
                      />
                    )}
                  </div>
                </div>

                {/* Connector to next node */}
                {next && (
                  <Connector
                    from={side as "left" | "right"}
                    to={nextSide as "left" | "right"}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {caption && (
        <figcaption className="mt-3 text-xs text-ink-soft">{caption}</figcaption>
      )}

      <style>{`
        @keyframes nodePulse {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-2px) scale(1.01); }
        }
        @keyframes pingDot {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
        @keyframes dashFlow {
          to { stroke-dashoffset: -16; }
        }
        .node-pulse { animation: nodePulse 3s ease-in-out infinite; }
        .ping-dot { animation: pingDot 1.6s ease-in-out infinite; }
        .flow-line { animation: dashFlow 1.8s linear infinite; }
      `}</style>
    </figure>
  );
}

function Connector({
  from,
  to,
}: {
  from: "left" | "right";
  to: "left" | "right";
}) {
  // SVG path connecting bottom of current node to top of next node, with a zigzag.
  // Coordinate system: 0..100 horizontal.
  const startX = from === "left" ? 30 : 70;
  const endX = to === "left" ? 30 : 70;

  const path =
    from === to
      ? `M ${startX} 0 L ${endX} 56`
      : `M ${startX} 0 L ${startX} 22 Q ${startX} 28 ${
          startX + (endX > startX ? 6 : -6)
        } 28 L ${endX - (endX > startX ? 6 : -6)} 28 Q ${endX} 28 ${endX} 34 L ${endX} 56`;

  return (
    <div className="relative h-14 w-full" aria-hidden>
      <svg
        viewBox="0 0 100 56"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d={path}
          fill="none"
          stroke="oklch(0.55 0.18 250)"
          strokeWidth="0.6"
          strokeLinecap="round"
        />
        <path
          d={path}
          fill="none"
          stroke="oklch(0.72 0.13 195)"
          strokeWidth="0.6"
          strokeLinecap="round"
          strokeDasharray="2 2"
          className="flow-line"
          opacity="0.85"
        />
        {/* joint circles */}
        <circle cx={startX} cy={2} r={1.4} fill="white" stroke="oklch(0.55 0.18 250)" strokeWidth="0.5" />
        <circle cx={endX} cy={54} r={1.4} fill="white" stroke="oklch(0.55 0.18 250)" strokeWidth="0.5" />
      </svg>
    </div>
  );
}
