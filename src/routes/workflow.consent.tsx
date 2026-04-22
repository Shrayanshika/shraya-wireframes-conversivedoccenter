import { createFileRoute } from "@tanstack/react-router";
import { PageShell, H2, P, Steps, Step } from "@/components/docs/PageShell";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { AudienceSection } from "@/components/docs/PersonaBadge";

export const Route = createFileRoute("/workflow/consent")({
  head: () => ({
    meta: [
      { title: "Capture Consent — Conversive" },
      { name: "description", content: "Sync Salesforce Communication Preferences with the Conversive Consent Object to keep every send compliant." },
      { property: "og:title", content: "Step 2 · Capture Consent" },
      { property: "og:description", content: "The trust layer for SMS recruitment." },
    ],
  }),
  component: Consent,
});

function Consent() {
  return (
    <PageShell
      eyebrow="Step 2 · Trust"
      title="Capture Consent"
      description="Every Conversive send is gated by an explicit consent record. Wire your Salesforce Communication Preference fields to the Conversive Consent Object so opt-ins, opt-outs, and STOP keywords stay perfectly in sync."
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "Wavelength Workflow" },
        { label: "Consent" },
      ]}
      prev={{ to: "/workflow/sender-ids", label: "Assign Sender IDs" }}
      next={{ to: "/workflow/bulk-sms", label: "Segment & Bulk SMS" }}
    >
      <Callout variant="info" title="Why consent first?">
        Australian Spam Act and global TCPA regulations require provable opt-in.
        Conversive's <code>consent_check: true</code> flag blocks sends to any
        candidate without an active consent record — even if you forget.
      </Callout>

      <H2 id="model">The Consent Object</H2>
      <P>
        Conversive ships a managed object <code>conversive__Consent__c</code> with
        these fields, joined to <code>Contact</code> / <code>Lead</code> /
        <code>Candidate__c</code> via lookup.
      </P>

      <div className="my-5 overflow-hidden rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted text-xs uppercase text-ink-soft">
            <tr>
              <th className="px-4 py-2 text-left">Field</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Purpose</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Channel__c", "Picklist", "SMS · WhatsApp · Voice"],
              ["Status__c", "Picklist", "Opted-In · Opted-Out · Pending"],
              ["Source__c", "Text", "Web form · Inbound STOP · Recruiter manual"],
              ["Captured_At__c", "DateTime", "Audit trail timestamp"],
              ["Expires_At__c", "DateTime", "Optional — for time-bound consent (EU)"],
            ].map((r) => (
              <tr key={r[0]} className="border-t border-border">
                <td className="px-4 py-2 font-mono text-xs">{r[0]}</td>
                <td className="px-4 py-2 text-ink-soft">{r[1]}</td>
                <td className="px-4 py-2">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AudienceSection audience="admin" title="Map the field to Salesforce Communication Preferences">
        <Steps>
          <Step title="Open Communication Preferences">
            Setup → Object Manager → <em>Contact</em> → Field Sets →{" "}
            <strong>Communication Preferences</strong>.
          </Step>
          <Step title="Add the SMS_Opt_In__c checkbox">
            Drag the field onto the page layout. Mark it required for new candidates.
          </Step>
          <Step title="Wire to the Consent Object">
            In Converse Settings → <em>Consent Mapping</em>, link{" "}
            <code>Contact.SMS_Opt_In__c</code> → <code>conversive__Consent__c.Status__c</code>.
            Conversive will mirror changes both ways.
          </Step>
          <Step title="Enable inbound STOP handling">
            Toggle <strong>Auto-Opt-Out on STOP/UNSUBSCRIBE keywords</strong> to ON.
            The platform will write a new Consent record with status <em>Opted-Out</em>
            within 200ms of the inbound message.
          </Step>
        </Steps>
      </AudienceSection>

      <AudienceSection audience="dev" title="Read consent status & subscribe to webhooks">
        <CodeBlock
          tabs={[
            {
              label: "GET",
              language: "bash",
              code: `curl https://api.beconversive.com/v1/consent-status?phone=%2B61412345678&channel=sms \\
  -H "Authorization: Bearer $CONVERSIVE_TOKEN"`,
            },
            {
              label: "Response",
              language: "json",
              code: `{
  "phone": "+61412345678",
  "channel": "sms",
  "status": "opted_in",
  "source": "web_form",
  "captured_at": "2026-03-12T04:18:09Z",
  "expires_at": null,
  "candidate_id": "0038x00000XYZ12"
}`,
            },
            {
              label: "Webhook",
              language: "json",
              code: `// POST {your_listener}/conversive/consent
{
  "event": "consent.updated",
  "delivered_at": "2026-04-22T09:14:02Z",
  "data": {
    "phone": "+61412345678",
    "previous_status": "opted_in",
    "status": "opted_out",
    "source": "inbound_stop",
    "candidate_id": "0038x00000XYZ12"
  }
}`,
            },
          ]}
        />
        <P>
          Verify webhook signatures with the <code>X-Conversive-Signature</code>
          header (HMAC-SHA256 of the raw body using your webhook secret).
        </P>
      </AudienceSection>

      <Callout variant="warn" title="Never bypass consent_check">
        Sending with <code>consent_check: false</code> is reserved for transactional
        flows your legal team has signed off on (e.g. interview confirmations).
        Marketing broadcasts must always honour the consent ledger.
      </Callout>
    </PageShell>
  );
}
