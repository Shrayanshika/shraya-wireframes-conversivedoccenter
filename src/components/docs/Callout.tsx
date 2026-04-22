import type { ReactNode } from "react";
import { Info, AlertTriangle, CheckCircle2, Lightbulb } from "lucide-react";

type Variant = "info" | "warn" | "success" | "tip";

const styles: Record<
  Variant,
  { bg: string; border: string; bar: string; iconColor: string; icon: ReactNode; label: string }
> = {
  info: {
    bg: "bg-teal-soft/40",
    border: "border-teal/25",
    bar: "bg-teal",
    iconColor: "text-teal",
    icon: <Info className="h-[15px] w-[15px]" />,
    label: "Note",
  },
  warn: {
    bg: "bg-[oklch(0.98_0.03_70)]",
    border: "border-[oklch(0.78_0.13_65)]/35",
    bar: "bg-[oklch(0.7_0.16_60)]",
    iconColor: "text-[oklch(0.55_0.16_55)]",
    icon: <AlertTriangle className="h-[15px] w-[15px]" />,
    label: "Important",
  },
  success: {
    bg: "bg-[oklch(0.97_0.04_150)]",
    border: "border-[oklch(0.6_0.13_150)]/30",
    bar: "bg-[oklch(0.55_0.14_150)]",
    iconColor: "text-[oklch(0.45_0.14_150)]",
    icon: <CheckCircle2 className="h-[15px] w-[15px]" />,
    label: "Success",
  },
  tip: {
    bg: "bg-[oklch(0.97_0.025_280)]",
    border: "border-[oklch(0.6_0.12_280)]/30",
    bar: "bg-[oklch(0.55_0.14_280)]",
    iconColor: "text-[oklch(0.5_0.14_280)]",
    icon: <Lightbulb className="h-[15px] w-[15px]" />,
    label: "Tip",
  },
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
    <aside
      className={`my-6 flex gap-3 overflow-hidden rounded-lg border ${s.border} ${s.bg} pr-4 py-3.5`}
    >
      <div className={`w-[3px] shrink-0 rounded-r ${s.bar}`} aria-hidden />
      <div className="pl-1">
        <div className={`flex items-center gap-2 text-[13px] font-semibold text-foreground ${s.iconColor}`}>
          <span className={s.iconColor}>{s.icon}</span>
          <span className="text-foreground">{title ?? s.label}</span>
        </div>
        <div className="mt-1 text-[14px] leading-[1.65] text-ink-soft [&>p]:leading-[1.65]">
          {children}
        </div>
      </div>
    </aside>
  );
}
