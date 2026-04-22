import { Link, useRouterState } from "@tanstack/react-router";
import { usePersona } from "@/lib/persona";
import {
  Rocket, Code2, Cog, ShieldCheck, Hash, MessageSquareText,
  Megaphone, MessagesSquare, BellRing, RefreshCw, FileCheck2, Lock,
} from "lucide-react";

type Item = {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  audience?: "dev" | "admin" | "both";
  disabled?: boolean;
};
type Group = { title: string; items: Item[] };

const groups: Group[] = [
  {
    title: "Get Started",
    items: [
      { to: "/", label: "Copilot Home", icon: Rocket, audience: "both" },
    ],
  },
  {
    title: "Recruitment Outreach Program",
    items: [
      { to: "/workflow/sender-ids",   label: "Assign Sender IDs",   icon: Hash, audience: "both" },
      { to: "/workflow/consent",      label: "Capture Consent",     icon: ShieldCheck, audience: "both" },
      { to: "/workflow/bulk-sms",     label: "Segment & Bulk SMS",  icon: Megaphone, audience: "both" },
      { to: "/workflow/converse-desk",label: "1:1 Conversation",    icon: MessagesSquare, audience: "both" },
      { to: "/workflow/reminders",    label: "Auto-Reminders",      icon: BellRing, audience: "both", disabled: true },
      { to: "/workflow/recurring",    label: "Recurring Alerts",    icon: RefreshCw, audience: "both", disabled: true },
    ],
  },
  {
    title: "Reference",
    items: [
      { to: "/api",                label: "API Reference",        icon: Code2, audience: "dev" },
      { to: "/salesforce",         label: "Salesforce Integration", icon: Cog, audience: "admin" },
      { to: "/compliance",         label: "Compliance & Privacy", icon: FileCheck2, audience: "both" },
      { to: "/messaging-library",  label: "Automation Library",   icon: MessageSquareText, audience: "both" },
    ],
  },
];

export function DocsSidebar() {
  const { persona } = usePersona();
  const path = useRouterState({ select: (s) => s.location.pathname });

  const filteredGroups = groups.map((g) => {
    const seen = new Set<string>();
    const items = g.items.filter((it) => {
      if (it.audience !== "both" && it.audience !== persona) return false;
      if (seen.has(it.to)) return false;
      seen.add(it.to);
      return true;
    });
    return { ...g, items };
  });

  // Find global step index for outreach program items
  const programItems = groups[1].items;

  return (
    <aside className="hidden lg:block w-64 shrink-0 border-r border-border bg-background">
      <div className="sticky top-14 max-h-[calc(100vh-3.5rem)] overflow-y-auto px-3 py-6">
        <div className="mb-6 flex items-center justify-between rounded-md border border-border bg-card px-3 py-2">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
              Persona
            </div>
            <div className="mt-0.5 text-[13px] font-semibold text-foreground">
              {persona === "admin" ? "Salesforce Admin" : "Developer"}
            </div>
          </div>
          <span
            className={`inline-flex h-6 items-center rounded-full px-2 text-[10px] font-semibold uppercase tracking-wider ${
              persona === "admin"
                ? "bg-admin/10 text-admin"
                : "bg-dev/10 text-dev"
            }`}
          >
            {persona === "admin" ? "Admin" : "Dev"}
          </span>
        </div>

        {filteredGroups.map((g, gi) => (
          <div key={g.title} className={gi === 0 ? "mb-5" : "mb-5 mt-5"}>
            <div className="mb-1.5 flex items-center gap-2 px-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
              {g.title}
            </div>
            <ul className="relative">
              {g.items.map((it) => {
                const Icon = it.icon;
                const active = path === it.to;
                const isProgram = g.title === "Recruitment Outreach Program";
                const stepIndex = isProgram
                  ? programItems.findIndex((p) => p.to === it.to) + 1
                  : null;

                if (it.disabled) {
                  return (
                    <li key={it.to + it.label}>
                      <div
                        title="Coming soon"
                        className="group flex cursor-not-allowed items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px] text-ink-soft/45"
                      >
                        {stepIndex && (
                          <span className="font-mono text-[10px] tabular-nums opacity-60">
                            {String(stepIndex).padStart(2, "0")}
                          </span>
                        )}
                        <Icon className="h-3.5 w-3.5 opacity-50" />
                        <span className="truncate">{it.label}</span>
                        <span className="ml-auto inline-flex items-center gap-0.5 rounded border border-border bg-muted/60 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider">
                          <Lock className="h-2.5 w-2.5" /> Soon
                        </span>
                      </div>
                    </li>
                  );
                }
                return (
                  <li key={it.to + it.label} className="relative">
                    {active && (
                      <span
                        aria-hidden
                        className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-r bg-teal"
                      />
                    )}
                    <Link
                      to={it.to}
                      className={`group flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px] transition ${
                        active
                          ? "bg-muted/60 font-semibold text-foreground"
                          : "text-ink-soft hover:bg-muted/50 hover:text-foreground"
                      }`}
                    >
                      {stepIndex && (
                        <span
                          className={`font-mono text-[10px] tabular-nums ${
                            active ? "text-teal" : "text-ink-soft/60"
                          }`}
                        >
                          {String(stepIndex).padStart(2, "0")}
                        </span>
                      )}
                      <Icon
                        className={`h-3.5 w-3.5 ${
                          active ? "text-teal" : "text-ink-soft/70 group-hover:text-foreground"
                        }`}
                      />
                      <span className="truncate">{it.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        <div className="mt-8 border-t border-border pt-4 px-2.5">
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
            Need help?
          </div>
          <p className="mt-1.5 text-[12px] leading-5 text-ink-soft">
            Ask the Copilot for a tailored walkthrough on any step.
          </p>
        </div>
      </div>
    </aside>
  );
}
