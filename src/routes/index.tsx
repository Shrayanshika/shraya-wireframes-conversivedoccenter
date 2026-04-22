import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Code2, Settings2, BookOpen, Shield, MessageSquare, Users, Send, CalendarClock, Repeat } from "lucide-react";
import { usePersona } from "@/lib/persona";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Conversive Docs — Wavelength Recruitment" },
      { name: "description", content: "Conversive documentation for Salesforce-native messaging. Static prototype showcasing the Wavelength locum recruitment workflow on Fern." },
      { property: "og:title", content: "Conversive Documentation Center" },
      { property: "og:description", content: "A Fern-powered docs prototype for the Conversive Wavelength recruitment use case." },
    ],
  }),
  component: Landing,
});

const STEPS = [
  { to: "/workflow/sender-ids", icon: Users, step: "Step 1", title: "Sender IDs", desc: "Map 42 long-codes to recruiter Users in Salesforce." },
  { to: "/workflow/consent", icon: Shield, step: "Step 2", title: "Capture Consent", desc: "Sync opt-in / opt-out into Communication Subscription Consents." },
  { to: "/workflow/bulk-sms", icon: Send, step: "Step 3", title: "Segment & Bulk SMS", desc: "Filter by Specialty, dispatch the locum alert in seconds." },
  { to: "/workflow/converse-desk", icon: MessageSquare, step: "Step 4", title: "Converse Desk", desc: "1:1 replies with AI suggestions in the recruiter inbox." },
  { to: "/workflow/reminders", icon: CalendarClock, step: "Step 5", title: "Interview Reminders", desc: "2-day & 2-hour automated nudges. (Preview)" },
  { to: "/workflow/recurring", icon: Repeat, step: "Step 6", title: "Recurring Timesheets", desc: "Friday RRULE alerts to active locums. (Preview)" },
];

const REFERENCE = [
  { to: "/api", icon: Code2, title: "API Reference", desc: "POST /v1/messages, GET /v1/consent-status." },
  { to: "/salesforce", icon: Settings2, title: "Salesforce Integration", desc: "Package install, permission sets, object model." },
  { to: "/compliance", icon: Shield, title: "Compliance", desc: "Multichannel consent, audit DB, STOP / START keywords." },
  { to: "/messaging-library", icon: BookOpen, title: "Messaging Library", desc: "Reusable templates for the recruitment flow." },
];

function Landing() {
  const { persona, setPersona } = usePersona();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 lg:py-20">
      {/* Hero */}
      <div className="rounded-3xl border border-border bg-gradient-to-br from-surface-elevated to-background p-8 lg:p-14 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-accent">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          Conversive · Documentation Center
        </div>
        <h1 className="mt-5 font-display text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          Build the Wavelength recruitment journey on Conversive.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-soft">
          A Fern-powered prototype showing how Wavelength automates locum job
          alerts end-to-end on Salesforce — from Sender ID mapping to recurring
          timesheet reminders. Pick a persona to tailor the content.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setPersona("admin")}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${persona === "admin" ? "bg-accent text-accent-foreground" : "bg-surface-elevated text-foreground hover:bg-border"}`}
          >
            <Settings2 className="h-4 w-4" /> Admin view
          </button>
          <button
            onClick={() => setPersona("dev")}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${persona === "dev" ? "bg-accent text-accent-foreground" : "bg-surface-elevated text-foreground hover:bg-border"}`}
          >
            <Code2 className="h-4 w-4" /> Developer view
          </button>
          <Link
            to="/workflow/sender-ids"
            className="ml-auto inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:opacity-90"
          >
            Start with Step 1 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 text-xs text-ink-soft font-mono">
          Active persona: <span className="text-accent">{persona === "admin" ? "Admin · Salesforce setup" : "Developer · Apex & REST"}</span>
        </div>
      </div>

      {/* Workflow grid */}
      <div className="mt-14">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-2xl font-bold text-foreground">Wavelength Workflow</h2>
          <span className="text-xs font-mono uppercase tracking-wider text-ink-soft">6 steps</span>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="group rounded-2xl border border-border bg-surface-elevated p-5 transition hover:border-accent hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-background p-2 ring-1 ring-border">
                  <s.icon className="h-4 w-4 text-accent" />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-ink-soft">{s.step}</span>
              </div>
              <div className="mt-4 font-display text-lg font-semibold text-foreground group-hover:text-accent">
                {s.title}
              </div>
              <p className="mt-1.5 text-sm leading-6 text-ink-soft">{s.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Reference */}
      <div className="mt-14">
        <h2 className="font-display text-2xl font-bold text-foreground">Reference</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {REFERENCE.map((r) => (
            <Link
              key={r.to}
              to={r.to}
              className="group flex items-start gap-4 rounded-2xl border border-border bg-surface-elevated p-5 transition hover:border-accent"
            >
              <div className="rounded-lg bg-background p-2.5 ring-1 ring-border">
                <r.icon className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="font-display text-base font-semibold text-foreground group-hover:text-accent">{r.title}</div>
                <p className="mt-1 text-sm leading-6 text-ink-soft">{r.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
