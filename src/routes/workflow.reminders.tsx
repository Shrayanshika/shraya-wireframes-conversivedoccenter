import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, ArrowRight, BellRing } from "lucide-react";

export const Route = createFileRoute("/workflow/reminders")({
  head: () => ({
    meta: [
      { title: "Auto-Reminders — Coming Soon" },
      { name: "description", content: "Auto-Reminders is part of the Conversive Wavelength roadmap and will ship in the next prototype release." },
    ],
  }),
  component: ComingSoon,
});

function ComingSoon() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="rounded-2xl border border-dashed border-border bg-surface-2 p-10 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-ink-soft">
          <BellRing className="h-7 w-7" />
        </div>
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
          <Lock className="h-3 w-3" /> Coming Soon · Step 5
        </div>
        <h1 className="font-display text-3xl font-bold text-foreground">
          Auto-Reminders
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-ink-soft">
          The 2-day and 2-hour interview reminder triggers are part of the
          Recruitment Outreach Program roadmap. They'll ship alongside
          Recurring Alerts in the next prototype release. The Admin guide will
          showcase the Message Automation Library; the Developer guide will
          document{" "}
          <code className="rounded bg-muted px-1 font-mono text-[12px]">@future(callout=true)</code>{" "}
          patterns.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/workflow/converse-desk"
            className="inline-flex items-center gap-2 rounded-md bg-navy-deep px-4 py-2 text-sm font-semibold text-white hover:bg-navy"
          >
            ← Back to 1:1 Conversation
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium hover:border-teal/50"
          >
            Ask the Copilot <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
