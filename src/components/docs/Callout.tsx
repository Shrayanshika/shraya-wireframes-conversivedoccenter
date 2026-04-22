import type { ReactNode } from "react";
import { Info, AlertTriangle, CheckCircle2, Lightbulb } from "lucide-react";

type Variant = "info" | "warn" | "success" | "tip";

const styles: Record<Variant, { bg: string; border: string; icon: ReactNode; label: string }> = {
  info:    { bg: "bg-teal-soft", border: "border-teal/30",  icon: <Info className="h-4 w-4" />, label: "Note" },
  warn:    { bg: "bg-[oklch(0.97_0.04_60)]", border: "border-[oklch(0.7_0.15_60)]/40", icon: <AlertTriangle className="h-4 w-4" />, label: "Important" },
  success: { bg: "bg-[oklch(0.96_0.05_150)]", border: "border-[oklch(0.6_0.15_150)]/40", icon: <CheckCircle2 className="h-4 w-4" />, label: "Success" },
  tip:     { bg: "bg-[oklch(0.97_0.03_280)]", border: "border-[oklch(0.6_0.13_280)]/40", icon: <Lightbulb className="h-4 w-4" />, label: "Tip" },
};

export function Callout({
  variant = "info",
  title,
  children,
}: {
  variant?: Variant;
  title?: string;
  children: ReactNode;
}) {
  const s = styles[variant];
  return (
    <div className={`my-5 rounded-lg border ${s.border} ${s.bg} p-4`}>
      <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-navy-deep">
        {s.icon}
        {title ?? s.label}
      </div>
      <div className="text-sm text-ink-soft [&>p]:leading-relaxed">{children}</div>
    </div>
  );
}
