import { createFileRoute } from "@tanstack/react-router";
import { PageShell, H2, P, Steps, Step } from "@/components/docs/PageShell";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { AudienceSection } from "@/components/docs/PersonaBadge";
import { Screenshot, VideoTutorials } from "@/components/docs/AdminMedia";
import converseApps from "@/assets/sf-converse-apps.png";

export const Route = createFileRoute("/workflow/reminders")({
  head: () => ({
    meta: [
      { title: "Auto-Reminders — Conversive" },
      { name: "description", content: "Trigger 2-day and 2-hour interview reminders automatically off Salesforce date fields." },
      { property: "og:title", content: "Step 5 · Auto-Reminders" },
      { property: "og:description", content: "Interview reminder triggers in the Conversive automation library." },
    ],
  }),
  component: Reminders,
});

function Reminders() {
  return (
    <PageShell
      eyebrow="Step 5 · Efficiency"
      title="Auto-Reminders for Interviews"
      description="No-show interviews cost recruiters hours. Conversive watches the Interview_Date__c field on each Candidate record and fires reminder SMS at 2 days and 2 hours before — using the recruiter's own Sender ID."
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "Wavelength Workflow" },
        { label: "Auto-Reminders" },
      ]}
      prev={{ to: "/workflow/converse-desk", label: "1:1 Conversation" }}
      next={{ to: "/workflow/recurring", label: "Recurring Alerts" }}
    >
      <H2 id="trigger">Trigger anatomy</H2>
      <P>
        A <strong>Reminder Trigger</strong> in Conversive is a 3-tuple:
        <em> source field</em>, <em>offset</em>, and <em>template</em>. Conversive
        evaluates triggers every minute and dispatches due messages.
      </P>

      <div className="my-5 grid gap-3 sm:grid-cols-3">
        {[
          { l: "Source field", v: "Candidate__c.Interview_Date__c" },
          { l: "Offset", v: "−2 days · −2 hours" },
          { l: "Template", v: "wavelength_interview_reminder" },
        ].map((c) => (
          <div key={c.l} className="rounded-lg border border-border bg-card p-4">
            <div className="text-[11px] uppercase tracking-wider text-ink-soft">{c.l}</div>
            <div className="mt-1 font-mono text-xs text-foreground">{c.v}</div>
          </div>
        ))}
      </div>

      <AudienceSection audience="admin" title="Configure in Converse App">
        <Steps>
          <Step title="Open Message Automation">
            Converse App → <strong>Automation Library</strong> → <em>New Trigger</em>.
          </Step>
          <Step title="Pick the source field">
            Object: <code>Candidate__c</code> · Field: <code>Interview_Date__c</code>.
          </Step>
          <Step title="Add two offsets">
            Click <em>+ Offset</em> twice. Set <strong>−2 days at 9:00 AM local</strong>{" "}
            and <strong>−2 hours</strong>.
          </Step>
          <Step title="Choose template & sender routing">
            Template <code>wavelength_interview_reminder</code>. Sender:{" "}
            <strong>Owner's assigned Sender ID</strong> so reminders come from
            the candidate's recruiter.
          </Step>
          <Step title="Activate">
            Toggle the trigger to <strong>Active</strong>. Conversive will
            backfill any interviews scheduled in the next 14 days.
          </Step>
        </Steps>

        <Screenshot
          src={converseApps}
          caption="Open Converse Apps → Setup → Automation to define the date-field trigger that powers Interview Reminders."
          source={{ label: "sms-magic.co · Automate Message Flow", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base/automate-message-flow/" }}
        />

        <VideoTutorials
          videos={[
            { title: "Automate Message Flow walkthrough", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base/automate-message-flow/", duration: "6 min" },
            { title: "Configure a Converse App (Templates & Automation)", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base/configure-a-converse-app/", duration: "5 min" },
            { title: "Converse Desk — handling reminder replies", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base-category/222converse_desk159/", duration: "4 min" },
            { title: "All Conversive video tutorials", href: "https://www.sms-magic.co/docs/videos/" },
          ]}
        />
      </AudienceSection>

      <AudienceSection audience="dev" title="Define a trigger via API">
        <CodeBlock
          tabs={[
            {
              label: "POST /v1/triggers",
              language: "bash",
              code: `curl -X POST https://api.beconversive.com/v1/triggers \\
  -H "Authorization: Bearer $CONVERSIVE_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Interview reminder · 2d + 2h",
    "source": {
      "object": "Candidate__c",
      "field": "Interview_Date__c"
    },
    "offsets": [
      { "value": -2, "unit": "days", "send_at_local": "09:00" },
      { "value": -2, "unit": "hours" }
    ],
    "template": "wavelength_interview_reminder",
    "sender_routing": "owner_assigned",
    "consent_check": true,
    "active": true
  }'`,
            },
            {
              label: "Apex",
              language: "apex",
              code: `smsmagic.SMS_Service.Trigger t = new smsmagic.SMS_Service.Trigger();
t.name           = 'Interview reminder · 2d + 2h';
t.sourceObject   = 'Candidate__c';
t.sourceField    = 'Interview_Date__c';
t.offsetsJson    = '[{"value":-2,"unit":"days","send_at_local":"09:00"},'
                 + ' {"value":-2,"unit":"hours"}]';
t.templateApi    = 'wavelength_interview_reminder';
t.senderRouting  = 'OWNER_ASSIGNED';
t.active         = true;

smsmagic.SMS_Service.upsertTrigger(t);`,
            },
            {
              label: "Template",
              language: "text",
              code: `Hi {{FirstName}}, friendly reminder — your interview for the
{{Specialty}} locum role is in {{TimeUntil}}. Location:
{{InterviewLocation}}. Reply CONFIRM or RESCHEDULE.

— {{RecruiterFirstName}}, Wavelength`,
            },
          ]}
        />
      </AudienceSection>

      <Callout variant="success" title="Measured impact">
        Wavelength saw interview no-shows drop from <strong>11% to 2.6%</strong>{" "}
        in the first month of running the dual-offset reminder.
      </Callout>
    </PageShell>
  );
}
