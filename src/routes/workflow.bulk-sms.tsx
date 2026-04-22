import { createFileRoute } from "@tanstack/react-router";
import { PageShell, H2, P, Steps, Step } from "@/components/docs/PageShell";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { AudienceSection } from "@/components/docs/PersonaBadge";
import { Screenshot, VideoTutorials } from "@/components/docs/AdminMedia";
import converseApps from "@/assets/sf-converse-apps.png";

export const Route = createFileRoute("/workflow/bulk-sms")({
  head: () => ({
    meta: [
      { title: "Segment & Bulk SMS — Conversive" },
      { name: "description", content: "Use Campaign Manager to filter candidates by Specialty and Seniority, then broadcast compliant SMS at scale." },
      { property: "og:title", content: "Step 3 · Segment & Bulk SMS" },
      { property: "og:description", content: "The broadcast engine for Wavelength locum alerts." },
    ],
  }),
  component: BulkSms,
});

function BulkSms() {
  return (
    <PageShell
      eyebrow="Step 3 · Broadcast"
      title="Segment & Bulk SMS"
      description="Wavelength's value is speed: get the right locum role to the right specialist within minutes. Campaign Manager filters your candidate book by Specialty + Seniority + Region, runs a consent check, then dispatches via the assigned Sender IDs."
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "Wavelength Workflow" },
        { label: "Segment & Bulk SMS" },
      ]}
      prev={{ to: "/workflow/consent", label: "Capture Consent" }}
      next={{ to: "/workflow/converse-desk", label: "1:1 Conversation" }}
    >
      <H2 id="filters">Building a segment</H2>
      <P>
        Wavelength's most-used segment is <em>Emergency Medicine, Senior, NSW</em>.
        Define it once as a <strong>Saved Segment</strong> and reuse it across
        campaigns.
      </P>

      <div className="my-5 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="border-b border-border bg-surface-2 px-4 py-2 text-xs font-medium text-ink-soft">
          Converse App · Campaign Manager · New Segment
        </div>
        <div className="grid gap-3 p-5 sm:grid-cols-3">
          {[
            { label: "Specialty", value: "Emergency Medicine" },
            { label: "Seniority", value: "Senior (5+ yrs)" },
            { label: "Region", value: "NSW" },
            { label: "Consent", value: "Opted-In · SMS" },
            { label: "Last contacted", value: "> 7 days ago" },
            { label: "Estimated reach", value: "1,284 candidates" },
          ].map((f) => (
            <div key={f.label} className="rounded-md border border-border bg-surface-2 p-3">
              <div className="text-[11px] uppercase tracking-wider text-ink-soft">{f.label}</div>
              <div className="mt-1 text-sm font-semibold text-foreground">{f.value}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-border bg-teal-soft px-4 py-3">
          <span className="text-sm text-navy-deep">
            <strong>1,284</strong> recipients will receive this campaign.
          </span>
          <button className="rounded-md bg-navy-deep px-3 py-1.5 text-xs font-semibold text-white">
            Save segment
          </button>
        </div>
      </div>

      <AudienceSection audience="admin" title="Launch a Bulk Campaign">
        <Steps>
          <Step title="Open Campaign Manager">
            Converse App → <strong>Campaigns</strong> → <em>New SMS Campaign</em>.
          </Step>
          <Step title="Pick the segment">
            Select <em>EM Senior NSW</em>. Conversive auto-excludes candidates
            who opted out or were messaged in the last 7 days.
          </Step>
          <Step title="Choose template">
            Pick <code>wavelength_locum_alert</code>. Merge fields render from
            each candidate's record.
          </Step>
          <Step title="Throttle & dispatch">
            Set send rate to <strong>30 msgs/sec/sender</strong>. Sends fan out
            across the 42 recruiter Sender IDs so each candidate hears from
            their own recruiter.
          </Step>
        </Steps>

        <div className="mt-4 overflow-hidden rounded-md bg-navy-deep p-4 text-sm text-white">
          <div className="text-xs uppercase tracking-wider text-teal-bright">Template preview</div>
          <div className="mt-2 leading-relaxed">
            Hi <span className="text-teal-bright">{"{{FirstName}}"}</span>,
            locum job available for a{" "}
            <span className="text-teal-bright">{"{{Specialty}}"}</span> in NSW —
            3 days, $2,400/day, starts Mon. Reply <strong>YES</strong> to
            shortlist or <strong>STOP</strong> to opt out. — Wavelength
          </div>
        </div>

        <Screenshot
          src={converseApps}
          caption="Converse Apps → Setup → Bulk Campaign — the same Setup menu where Templates and Automation live also launches Bulk Campaigns."
          source={{ label: "sms-magic.co · Run SMS Campaign", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base/configure-run-sms-campaign-button-in-classic/" }}
        />

        <VideoTutorials
          videos={[
            { title: "Configure & run an SMS Campaign", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base/configure-run-sms-campaign-button-in-classic/", duration: "6 min" },
            { title: "Building your first Campaign", href: "https://www.sms-magic.co/docs/videos/", duration: "5 min" },
            { title: "Multichannel Compliance Configuration", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base-category/multichannel-compliance-configuration/" },
            { title: "All Conversive video tutorials", href: "https://www.sms-magic.co/docs/videos/" },
          ]}
        />
      </AudienceSection>

      <AudienceSection audience="dev" title="Send a bulk campaign via API">
        <CodeBlock
          tabs={[
            {
              label: "POST /v1/campaigns",
              language: "bash",
              code: `curl -X POST https://api.beconversive.com/v1/campaigns \\
  -H "Authorization: Bearer $CONVERSIVE_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "EM Senior NSW · 22 Apr",
    "template": "wavelength_locum_alert",
    "segment": {
      "specialty": "Emergency Medicine",
      "seniority": "senior",
      "region": "NSW",
      "consent_status": "opted_in",
      "last_contacted_before": "2026-04-15T00:00:00Z"
    },
    "fan_out": "by_assigned_recruiter",
    "throttle_per_sender": 30,
    "consent_check": true
  }'`,
            },
            {
              label: "Apex (Flow)",
              language: "apex",
              code: `smsmagic.SMS_Service.Campaign c = new smsmagic.SMS_Service.Campaign();
c.name        = 'EM Senior NSW · 22 Apr';
c.templateApi = 'wavelength_locum_alert';
c.segmentSOQL = 'SELECT Id FROM Candidate__c WHERE Specialty__c = \\'Emergency Medicine\\' '
              + 'AND Seniority__c = \\'Senior\\' AND Region__c = \\'NSW\\' '
              + 'AND SMS_Consent__c = true';
c.fanOutMode  = 'BY_ASSIGNED_RECRUITER';
c.throttle    = 30;

smsmagic.SMS_Service.dispatchCampaign(c);`,
            },
          ]}
        />
      </AudienceSection>

      <Callout variant="success" title="Wavelength benchmark">
        A 1,200-candidate EM Senior broadcast typically lands the first 3 acceptances
        within <strong>4 minutes</strong>, and fills the role in under 20.
      </Callout>
    </PageShell>
  );
}
