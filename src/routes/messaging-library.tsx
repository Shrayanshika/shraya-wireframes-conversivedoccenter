import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, H2, P } from "@/components/docs/PageShell";
import { BellRing, RefreshCw, Megaphone, MessageSquareText } from "lucide-react";

export const Route = createFileRoute("/messaging-library")({
  head: () => ({
    meta: [
      { title: "Message Automation Library — Conversive" },
      { name: "description", content: "Pre-built triggers, schedules, and templates for recruitment, healthcare, and field-service SMS use cases." },
      { property: "og:title", content: "Conversive · Message Automation Library" },
      { property: "og:description", content: "Reusable building blocks for compliant SMS automation." },
    ],
  }),
  component: Library,
});

const blocks = [
  { icon: BellRing, title: "Interview Reminder · 2d/2h", tag: "Trigger", to: "/workflow/reminders", desc: "Dual-offset reminder off Interview_Date__c." },
  { icon: RefreshCw, title: "Friday Timesheet", tag: "Schedule", to: "/workflow/recurring", desc: "Weekly recurring SMS, region-aware timezone." },
  { icon: Megaphone, title: "Locum Job Alert · EM Senior", tag: "Campaign", to: "/workflow/bulk-sms", desc: "Segment by Specialty + Seniority + Region." },
  { icon: MessageSquareText, title: "AI Reply Suggestions", tag: "AI", to: "/workflow/converse-desk", desc: "Grounded suggestions inside Converse Desk." },
];

function Library() {
  return (
    <PageShell
      eyebrow="Reference"
      title="Message Automation Library"
      description="Reusable, compliant building blocks. Drop into Converse App, customise the template, and ship."
      breadcrumbs={[{ label: "Docs", to: "/" }, { label: "Message Automation Library" }]}
    >
      <H2 id="blocks">Building blocks</H2>
      <P>Each block links to its full guide in the Wavelength workflow.</P>

      <div className="my-6 grid gap-4 sm:grid-cols-2">
        {blocks.map((b) => {
          const I = b.icon;
          return (
            <Link
              to={b.to}
              key={b.title}
              className="group rounded-xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-teal/50 hover:shadow-md"
            >
              <div className="mb-2 flex items-center justify-between">
                <I className="h-4 w-4 text-teal" />
                <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-soft">
                  {b.tag}
                </span>
              </div>
              <div className="font-display text-base font-semibold text-foreground group-hover:text-teal">
                {b.title}
              </div>
              <p className="mt-1 text-sm text-ink-soft">{b.desc}</p>
            </Link>
          );
        })}
      </div>
    </PageShell>
  );
}
