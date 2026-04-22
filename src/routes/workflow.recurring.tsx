import { createFileRoute } from "@tanstack/react-router";
import { PageShell, H2, P } from "@/components/docs/PageShell";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { AudienceSection } from "@/components/docs/PersonaBadge";
import { Screenshot, VideoTutorials } from "@/components/docs/AdminMedia";
import converseApps from "@/assets/sf-converse-apps.png";

export const Route = createFileRoute("/workflow/recurring")({
  head: () => ({
    meta: [
      { title: "Recurring Alerts — Conversive" },
      { name: "description", content: "Schedule recurring SMS like Friday timesheet reminders using the Conversive Message Automation Library." },
      { property: "og:title", content: "Step 6 · Recurring Alerts" },
      { property: "og:description", content: "Cron-style recurring SMS in Conversive." },
    ],
  }),
  component: Recurring,
});

function Recurring() {
  return (
    <PageShell
      eyebrow="Step 6 · Reliability"
      title="Recurring Alerts (Friday Timesheets)"
      description="Wavelength locums must submit timesheets every Friday by 5 PM. Conversive's Message Automation Library schedules a recurring SMS to every active locum, segmented per region timezone."
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "Wavelength Workflow" },
        { label: "Recurring Alerts" },
      ]}
      prev={{ to: "/workflow/reminders", label: "Auto-Reminders" }}
    >
      <H2 id="schedule">The schedule</H2>
      <P>
        Recurring schedules use a friendly DSL on top of cron. Define{" "}
        <em>when</em>, <em>who</em>, and <em>what</em> — Conversive handles
        timezone fan-out, retry, and consent gating.
      </P>

      <div className="my-5 overflow-hidden rounded-xl border border-border bg-card">
        <div className="grid grid-cols-3 divide-x divide-border">
          {[
            { l: "When", v: "Every Friday · 14:00 local" },
            { l: "Who", v: "Active locums in last 30d" },
            { l: "What", v: "wavelength_timesheet_friday" },
          ].map((c) => (
            <div key={c.l} className="p-4">
              <div className="text-[11px] uppercase tracking-wider text-ink-soft">{c.l}</div>
              <div className="mt-1 text-sm font-semibold">{c.v}</div>
            </div>
          ))}
        </div>
      </div>

      <AudienceSection audience="admin" title="Build it in the Automation Library">
        <P>
          Open <strong>Converse App → Message Automation Library →
          Recurring</strong>. Pick the template, the SOQL-driven audience, and
          a recurrence rule. Per-region time zones are inferred from the
          candidate's <code>Region__c</code> field.
        </P>
        <Callout variant="tip" title="Tip — stagger the send">
          Set throttle to <strong>50 msgs/sec/sender</strong> so the Friday
          batch (≈3,400 locums across 4 regions) completes in &lt; 90 seconds
          without rate-limit errors.
        </Callout>

        <Screenshot
          src={converseApps}
          caption="Message Automation Library lives under the same Converse Apps → Setup menu — pick Automation to build recurring schedules."
          source={{ label: "sms-magic.co · Automate Message Flow", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base/automate-message-flow/" }}
        />

        <VideoTutorials
          videos={[
            { title: "Automate Message Flow — recurring sends", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base/automate-message-flow/", duration: "6 min" },
            { title: "Building templates for recurring alerts", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base/configure-a-converse-app/", duration: "5 min" },
            { title: "Compliance for outbound batches", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base-category/multichannel-compliance-configuration/", duration: "4 min" },
            { title: "All Conversive video tutorials", href: "https://www.sms-magic.co/docs/videos/" },
          ]}
        />
      </AudienceSection>

      <AudienceSection audience="dev" title="Schedule via API">
        <CodeBlock
          tabs={[
            {
              label: "POST /v1/schedules",
              language: "bash",
              code: `curl -X POST https://api.beconversive.com/v1/schedules \\
  -H "Authorization: Bearer $CONVERSIVE_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Friday timesheet reminder",
    "recurrence": {
      "rrule": "FREQ=WEEKLY;BYDAY=FR;BYHOUR=14;BYMINUTE=0",
      "timezone": "candidate.region"
    },
    "audience": {
      "object": "Candidate__c",
      "where": "Status__c = \\'Active\\' AND Last_Shift__c >= LAST_N_DAYS:30"
    },
    "template": "wavelength_timesheet_friday",
    "sender_routing": "owner_assigned",
    "consent_check": true,
    "throttle_per_sender": 50
  }'`,
            },
            {
              label: "Apex",
              language: "apex",
              code: `// Schedules are also addressable from Apex via the Automation Library
smsmagic.SMS_Service.Schedule s = new smsmagic.SMS_Service.Schedule();
s.name        = 'Friday timesheet reminder';
s.rrule       = 'FREQ=WEEKLY;BYDAY=FR;BYHOUR=14;BYMINUTE=0';
s.tzMode      = 'CANDIDATE_REGION';
s.audienceSOQL = 'SELECT Id FROM Candidate__c WHERE Status__c = \\'Active\\' '
               + 'AND Last_Shift__c >= LAST_N_DAYS:30';
s.templateApi = 'wavelength_timesheet_friday';
s.senderRouting = 'OWNER_ASSIGNED';
s.throttle    = 50;

smsmagic.SMS_Service.upsertSchedule(s);`,
            },
            {
              label: "Template",
              language: "text",
              code: `Hi {{FirstName}}, please submit your timesheet for this week
by 5pm today: {{TimesheetURL}}. Reply HELP if you need a hand.

— Wavelength Payroll`,
            },
          ]}
        />
      </AudienceSection>

      <Callout variant="success" title="You've shipped the Wavelength build 🎉">
        Identity → Trust → Broadcast → Conversation → Efficiency → Reliability.
        From here, explore the <a href="/api" className="text-teal underline">API Reference</a>{" "}
        or the <a href="/messaging-library" className="text-teal underline">Message Automation Library</a>{" "}
        for advanced patterns.
      </Callout>
    </PageShell>
  );
}
