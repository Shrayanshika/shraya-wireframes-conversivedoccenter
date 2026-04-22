import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Hash, ShieldCheck, Megaphone, MessagesSquare, BellRing, RefreshCw, Code2, Settings2, Sparkles, BookOpen } from "lucide-react";
import { usePersona } from "@/lib/persona";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/Callout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Quickstart — Conversive Docs" },
      { name: "description", content: "Get the Wavelength recruitment workflow live on Salesforce in under an hour with Conversive." },
      { property: "og:title", content: "Conversive Quickstart — Wavelength Recruitment" },
      { property: "og:description", content: "From Sender ID to recurring timesheet alerts — the full Conversive build." },
    ],
  }),
  component: Quickstart,
});

const steps = [
  { n: 1, to: "/workflow/sender-ids",    title: "Assign Sender IDs",     desc: "Map dedicated numbers to each of 42 recruiters for 1:1 trust.", icon: Hash },
  { n: 2, to: "/workflow/consent",       title: "Capture Consent",       desc: "Sync Salesforce preferences with the Conversive Consent Object.", icon: ShieldCheck },
  { n: 3, to: "/workflow/bulk-sms",      title: "Segment & Bulk SMS",    desc: "Filter candidates by Specialty + Seniority and broadcast jobs.", icon: Megaphone },
  { n: 4, to: "/workflow/converse-desk", title: "1:1 Conversation",      desc: "Handle inbound replies in the Converse Desk inbox.", icon: MessagesSquare },
  { n: 5, to: "/workflow/reminders",     title: "Auto-Reminders",        desc: "Trigger 2-day and 2-hour interview reminders automatically.", icon: BellRing },
  { n: 6, to: "/workflow/recurring",     title: "Recurring Alerts",      desc: "Schedule the Friday timesheet flow via Message Automation Library.", icon: RefreshCw },
];

function Quickstart() {
  const { persona, setPersona } = usePersona();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative mx-auto max-w-5xl px-6 py-16 lg:py-24">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-teal-bright backdrop-blur">
            <Sparkles className="h-3 w-3" /> Wavelength Recruitment · Reference build
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Build compliant SMS journeys
            <br />
            <span className="text-gradient-teal">on Salesforce</span> in under an hour.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-white/70 sm:text-lg">
            Conversive is the conversational layer for Salesforce CRM. This Quickstart
            walks the exact 6-step build that powers Wavelength's locum recruitment
            engine — from Sender IDs to Friday timesheet alerts.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              to="/workflow/sender-ids"
              className="inline-flex items-center gap-2 rounded-md bg-teal-bright px-4 py-2.5 text-sm font-semibold text-navy-deep shadow-lg shadow-teal/20 transition hover:bg-white"
            >
              Start the workflow <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/api"
              className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              <Code2 className="h-4 w-4" /> API Reference
            </Link>
          </div>

          {/* Persona switcher hero */}
          <div className="mt-10 inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 p-3 backdrop-blur">
            <span className="px-2 text-xs font-medium uppercase tracking-wider text-white/60">
              I'm a
            </span>
            <button
              onClick={() => setPersona("dev")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-semibold transition ${
                persona === "dev" ? "bg-dev text-white" : "text-white/70 hover:bg-white/10"
              }`}
            >
              <Code2 className="h-4 w-4" /> Developer
            </button>
            <button
              onClick={() => setPersona("admin")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-semibold transition ${
                persona === "admin" ? "bg-admin text-white" : "text-white/70 hover:bg-white/10"
              }`}
            >
              <Settings2 className="h-4 w-4" /> Salesforce Admin
            </button>
          </div>
        </div>
      </section>

      {/* Mock first call */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-teal">
              Your first message
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              {persona === "dev" ? "Send an SMS in one POST." : "Send an SMS from the Converse App."}
            </h2>
            <p className="mt-3 text-sm leading-7 text-ink-soft">
              {persona === "dev"
                ? "All Conversive endpoints live under api.beconversive.com. Auth is a bearer token scoped to your org. Webhooks deliver Consent Status and Inbound Message events back to your listener."
                : "Inside Salesforce, open the Converse App builder, pick a sender, and use the SMS Action on any Contact, Lead, or custom Candidate__c record. Templates merge fields like {{FirstName}} and {{Specialty}} from the record."}
            </p>
            <ul className="mt-5 space-y-2 text-sm text-ink-soft">
              <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-teal" /> 42 dedicated recruiter Sender IDs supported per org</li>
              <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-teal" /> Native Consent Object syncs to Communication Preferences</li>
              <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-teal" /> Apex library <code className="rounded bg-muted px-1 font-mono text-[12px]">smsmagic.SMS_Service</code> for triggers & flows</li>
            </ul>
          </div>
          <div>
            {persona === "dev" ? (
              <CodeBlock
                title="POST /v1/messages"
                tabs={[
                  {
                    label: "cURL",
                    language: "bash",
                    code: `curl -X POST https://api.beconversive.com/v1/messages \\
  -H "Authorization: Bearer $CONVERSIVE_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "sender_id": "SID_RECRUITER_07",
    "to": "+61412345678",
    "template": "wavelength_locum_alert",
    "merge_fields": {
      "FirstName": "Priya",
      "Specialty": "Emergency Medicine",
      "Region": "NSW"
    },
    "consent_check": true
  }'`,
                  },
                  {
                    label: "Apex",
                    language: "apex",
                    code: `smsmagic.SMS_Service.SMS sms = new smsmagic.SMS_Service.SMS();
sms.senderId   = 'SID_RECRUITER_07';
sms.toNumber   = candidate.Mobile_Phone__c;
sms.templateApi = 'wavelength_locum_alert';
sms.mergeFields = new Map<String, String>{
    'FirstName' => candidate.FirstName,
    'Specialty' => candidate.Specialty__c,
    'Region'    => 'NSW'
};
sms.consentCheck = true;

smsmagic.SMS_Service.sendSMS(new List<smsmagic.SMS_Service.SMS>{ sms });`,
                  },
                  {
                    label: "Node.js",
                    language: "javascript",
                    code: `import Conversive from "@conversive/sdk";

const conversive = new Conversive(process.env.CONVERSIVE_TOKEN);

await conversive.messages.send({
  senderId: "SID_RECRUITER_07",
  to: "+61412345678",
  template: "wavelength_locum_alert",
  mergeFields: {
    FirstName: "Priya",
    Specialty: "Emergency Medicine",
    Region: "NSW",
  },
  consentCheck: true,
});`,
                  },
                ]}
              />
            ) : (
              <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-2.5 text-xs font-medium text-ink-soft">
                  <span className="h-2 w-2 rounded-full bg-[oklch(0.7_0.17_30)]" />
                  <span className="h-2 w-2 rounded-full bg-[oklch(0.85_0.15_90)]" />
                  <span className="h-2 w-2 rounded-full bg-[oklch(0.7_0.15_150)]" />
                  <span className="ml-2">Salesforce · Converse App Builder</span>
                </div>
                <div className="space-y-3 p-5">
                  <div className="text-xs uppercase tracking-wider text-ink-soft">Action</div>
                  <div className="rounded-md border border-teal/30 bg-teal-soft px-3 py-2 text-sm font-medium text-navy-deep">
                    📨 Send SMS · wavelength_locum_alert
                  </div>
                  <div className="text-xs uppercase tracking-wider text-ink-soft">Sender</div>
                  <div className="rounded-md border border-border bg-surface-2 px-3 py-2 text-sm">
                    <span className="font-mono">+61 480 123 007</span>
                    <span className="ml-2 text-xs text-ink-soft">· Recruiter: J. Singh</span>
                  </div>
                  <div className="text-xs uppercase tracking-wider text-ink-soft">Preview</div>
                  <div className="rounded-md bg-navy-deep px-3 py-3 text-sm text-white">
                    Hi <span className="text-teal-bright">Priya</span>, locum job available
                    for an <span className="text-teal-bright">Emergency Medicine</span> specialist
                    in NSW. Reply YES to apply. — Wavelength
                  </div>
                  <button className="mt-2 w-full rounded-md bg-navy-deep px-3 py-2 text-sm font-semibold text-white hover:bg-navy">
                    Send via Conversive
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Workflow grid */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-teal">
          The Wavelength journey
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
          Six steps to a live recruitment workflow
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-ink-soft">
          Each step maps to a real Wavelength outcome — identity, trust, broadcast,
          conversation, efficiency, reliability.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.n}
                to={s.to}
                className="group relative flex flex-col rounded-xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-teal/50 hover:shadow-lg hover:shadow-teal/10"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-navy-deep font-display text-xs font-bold text-teal-bright">
                    {s.n}
                  </span>
                  <Icon className="h-4 w-4 text-teal" />
                </div>
                <div className="font-display text-base font-semibold text-foreground">
                  {s.title}
                </div>
                <p className="mt-1 text-sm text-ink-soft">{s.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-teal opacity-0 transition group-hover:opacity-100">
                  Open guide <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            );
          })}
        </div>

        <Callout variant="tip" title="Audience-aware docs">
          Use the <strong>Developer / Admin</strong> toggle in the header (or hero above)
          to switch the entire portal. Code blocks, screenshots, video tutorials and
          configuration steps re-render to match your role.
        </Callout>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/api" className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium hover:border-teal/50">
            <Code2 className="h-4 w-4 text-dev" /> API Reference
          </Link>
          <Link to="/salesforce" className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium hover:border-teal/50">
            <Settings2 className="h-4 w-4 text-admin" /> Salesforce Integration
          </Link>
          <Link to="/compliance" className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium hover:border-teal/50">
            <ShieldCheck className="h-4 w-4 text-teal" /> Compliance & Privacy
          </Link>
          <Link to="/messaging-library" className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium hover:border-teal/50">
            <BookOpen className="h-4 w-4 text-teal" /> Message Automation Library
          </Link>
        </div>
      </section>
    </div>
  );
}
