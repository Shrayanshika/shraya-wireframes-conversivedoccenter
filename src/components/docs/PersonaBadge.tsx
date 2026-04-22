import type { ReactNode } from "react";
import { Code2, Settings2 } from "lucide-react";
import type { Persona } from "@/lib/persona";

export function PersonaBadge({ audience }: { audience: Persona | "both" }) {
  if (audience === "both") return null;
  const isDev = audience === "dev";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
        isDev
          ? "border-dev/30 bg-dev/10 text-dev"
          : "border-admin/30 bg-admin/10 text-admin"
      }`}
    >
      {isDev ? <Code2 className="h-3 w-3" /> : <Settings2 className="h-3 w-3" />}
      {isDev ? "Developer" : "Admin"}
    </span>
  );
}

export function AudienceSection({
  audience,
  title,
  children,
}: {
  audience: Persona;
  title: string;
  children: ReactNode;
}) {
  const isDev = audience === "dev";
  return (
    <section
      className={`my-6 rounded-xl border-l-4 bg-card p-5 shadow-sm ${
        isDev ? "border-dev" : "border-admin"
      } border-y border-r border-border`}
    >
      <div className="mb-3 flex items-center gap-2">
        <PersonaBadge audience={audience} />
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
      </div>
      <div className="space-y-3 text-sm leading-relaxed text-ink-soft">{children}</div>
    </section>
  );
}
