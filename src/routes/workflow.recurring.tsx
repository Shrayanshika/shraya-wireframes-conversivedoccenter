import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, ArrowRight, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/workflow/recurring")({
  head: () => ({
    meta: [
      { title: "Recurring Alerts — Coming Soon" },
      { name: "description", content: "Recurring Alerts (e.g. Friday timesheet reminders) is on the Conversive prototype roadmap." },
    ],
  }),
  component: ComingSoon,
});

function ComingSoon() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="rounded-2xl border border-dashed border-border bg-surface-2 p-10 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-ink-soft">
          <RefreshCw className="h-7 w-7" />
        </div>
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
          <Lock className="h-3 w-3" /> Coming Soon · Step 6
        </div>
        <h1 className="font-display text-3xl font-bold text-foreground">
          Recurring Alerts
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-ink-soft">
          Friday timesheet alerts and other RRULE-driven schedules are on the
          Recruitment Outreach Program roadmap. The next release will document the Message
          Automation Library for admins and the{" "}
          <code className="rounded bg-muted px-1 font-mono text-[12px]">Schedulable</code>{" "}
          context for developers.
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
