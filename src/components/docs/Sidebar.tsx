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
    title: "Wavelength Workflow",
    items: [
      { to: "/workflow/sender-ids",   label: "1 · Assign Sender IDs",   icon: Hash, audience: "both" },
      { to: "/workflow/consent",      label: "2 · Capture Consent",     icon: ShieldCheck, audience: "both" },
      { to: "/workflow/bulk-sms",     label: "3 · Segment & Bulk SMS",  icon: Megaphone, audience: "both" },
      { to: "/workflow/converse-desk",label: "4 · 1:1 Conversation",    icon: MessagesSquare, audience: "both" },
      { to: "/workflow/reminders",    label: "5 · Auto-Reminders",      icon: BellRing, audience: "both", disabled: true },
      { to: "/workflow/recurring",    label: "6 · Recurring Alerts",    icon: RefreshCw, audience: "both", disabled: true },
    ],
  },
  {
    title: "Reference",
    items: [
      { to: "/api",                label: "API Reference",        icon: Code2, audience: "dev" },
      { to: "/salesforce",         label: "Salesforce Integration", icon: Cog, audience: "admin" },
      { to: "/compliance",         label: "Compliance & Privacy", icon: FileCheck2, audience: "both" },
      { to: "/messaging-library",  label: "Message Automation Library", icon: MessageSquareText, audience: "both" },
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

  return (
    <aside className="hidden lg:block w-64 shrink-0 border-r border-border bg-surface-2/60">
      <div className="sticky top-14 max-h-[calc(100vh-3.5rem)] overflow-y-auto px-4 py-6">
        <div className="mb-5 rounded-lg border border-border bg-card px-3 py-2.5">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-soft">Active persona</div>
          <div className="mt-0.5 flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <span className={`h-2 w-2 rounded-full ${persona === "admin" ? "bg-admin" : "bg-dev"}`} />
            {persona === "admin" ? "Salesforce Admin" : "Developer"}
          </div>
        </div>
        {filteredGroups.map((g) => (
          <div key={g.title} className="mb-6">
            <div className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
              {g.title}
            </div>
            <ul className="space-y-0.5">
              {g.items.map((it) => {
                const Icon = it.icon;
                const active = path === it.to;
                if (it.disabled) {
                  return (
                    <li key={it.to + it.label}>
                      <div
                        title="Coming soon"
                        className="group flex cursor-not-allowed items-center gap-2 rounded-md px-2 py-1.5 text-sm text-ink-soft/50"
                      >
                        <Icon className="h-3.5 w-3.5 opacity-50" />
                        <span className="truncate line-through decoration-ink-soft/30">{it.label}</span>
                        <span className="ml-auto inline-flex items-center gap-0.5 rounded-full bg-muted px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider">
                          <Lock className="h-2.5 w-2.5" /> Soon
                        </span>
                      </div>
                    </li>
                  );
                }
                return (
                  <li key={it.to + it.label}>
                    <Link
                      to={it.to}
                      className={`group flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition ${
                        active
                          ? "bg-teal-soft text-navy-deep font-semibold"
                          : "text-ink-soft hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <Icon className={`h-3.5 w-3.5 ${active ? "text-teal" : "text-ink-soft/70 group-hover:text-foreground"}`} />
                      <span className="truncate">{it.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
