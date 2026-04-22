import { createFileRoute } from "@tanstack/react-router";
import { PageShell, H2, P, Steps, Step } from "@/components/docs/PageShell";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { PersonaOnly } from "@/lib/persona";
import { GuidedSnapshot, VideoSection, Prerequisites } from "@/components/docs/GuidedSnapshot";
import { SOPDiagram } from "@/components/docs/SOPDiagram";
import { ListFilter, Filter, LayoutTemplate, FileText, Send } from "lucide-react";
import bulk1 from "@/assets/bulk1.png";
import bulk2 from "@/assets/bulk2.png";

export const Route = createFileRoute("/workflow/bulk-sms")({
  head: () => ({
    meta: [
      { title: "Segment & Bulk SMS — Conversive" },
      { name: "description", content: "Filter Salesforce list views by Specialty, pick a template, and broadcast compliant SMS at scale via the SMS-Magic Bulk component." },
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
      description="Wavelength's value is speed: get the right locum role to the right specialist within minutes. Use a Salesforce list view (e.g. Emergency Medicine candidates), open the SMS-Magic Bulk component, pick a template and dispatch."
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "Wavelength Workflow" },
        { label: "Segment & Bulk SMS" },
      ]}
      prev={{ to: "/workflow/consent", label: "Capture Consent" }}
      next={{ to: "/workflow/converse-desk", label: "1:1 Conversation" }}
    >
      <SOPDiagram
        title="Bulk dispatch flow"
        caption="A list view is filtered by specialty, opened in the Bulk SMS component, mapped to a template, and dispatched as a batch via the SMS-Magic engine."
        nodes={[
          { label: "Salesforce List View", sub: "Candidates", icon: ListFilter },
          { label: "Specialty Filter", sub: "Emergency Medicine", icon: Filter },
          { label: "SMS-Magic Component", sub: "Bulk SMS", icon: LayoutTemplate, tone: "primary" },
          { label: "Template Selection", sub: "wavelength_locum_alert", icon: FileText },
          { label: "Batch Send", sub: "Throttle 30/sec/sender", icon: Send, tone: "success" },
        ]}
      />

      <Prerequisites
        items={[
          { label: "Watch · Bulk Campaigns Tutorial (6m)", href: "#video-bulk-tutorial", note: "dummy walkthrough video" },
          { label: "Required Permissions · SMS_User + Bulk_SMS_Allowed", href: "#perm-bulk-sms" },
          { label: "Video Library · All SMS-Magic tutorials", href: "https://www.sms-magic.co/docs/videos/" },
          { label: "Consent configured for source: Bulk Conversations (see Step 2)" },
        ]}
      />

      <PersonaOnly audience="admin">
        <H2 id="launch">Launch a Bulk Campaign from a list view</H2>

        <Steps>
          <Step title="Open the candidate list view">
            From the Salesforce home or All Tabs page, navigate to your{" "}
            <strong>Contacts</strong> or custom <em>Candidates</em> tab. Switch
            to a list view filtered to the right specialty.
          </Step>
          <Step title="Select recipients">
            Tick the candidates you want to message. The SMS-Magic Bulk button
            appears once one or more rows are selected.
          </Step>
          <Step title="Open the Bulk SMS component">
            Click <strong>Send Bulk SMS</strong>. Pick the Sender ID (or let
            owner-routing fan out across the 42 recruiter numbers).
          </Step>
          <Step title="Choose template & dispatch">
            Select <code>wavelength_locum_alert</code>, preview the merge, and
            confirm. The engine respects consent, throttles per sender, and
            writes the result back to each candidate's activity timeline.
          </Step>
        </Steps>

        <GuidedSnapshot
          step="Snapshot 1"
          src={bulk1}
          caption="SMS-Magic Converse home — Recent Items list shows recent candidate records and the Converse Templates / Consents / SMS History tabs used during a bulk dispatch."
          source={{ label: "sms-magic.co · Run SMS Campaign", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base/configure-run-sms-campaign-button-in-classic/" }}
        />

        <P>
          The <strong>All Tabs</strong> page in Salesforce is your fast-path to
          objects you'll touch during a campaign — Contacts, Leads, Channel
          Events, Communication Subscription Consents and the SMS-Magic
          objects all live here.
        </P>

        <GuidedSnapshot
          step="Snapshot 2"
          src={bulk2}
          caption="Salesforce All Tabs view — the Communication Subscription Consents and Channel Events tabs are key references for campaign managers tracking opt-ins and delivery events."
          source={{ label: "sms-magic.co · Salesforce KB", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base/" }}
        />

        <VideoSection
          videos={[
            { title: "Bulk SMS Component walkthrough", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base/configure-run-sms-campaign-button-in-classic/", duration: "6 min" },
            { title: "All SMS-Magic Video Library", href: "https://www.sms-magic.co/docs/videos/" },
            { title: "Multichannel Compliance for batches", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base-category/multichannel-compliance-configuration/", duration: "4 min" },
          ]}
        />
      </PersonaOnly>

      <PersonaOnly audience="dev">
        <H2 id="dev">Triggering mass alerts via <code>pushSMSCallout()</code></H2>
        <CodeBlock
          tabs={[
            {
              label: "Apex / Code",
              language: "apex",
              code: `List<smagicinteract__smsMagic__c> smsList = new List<smagicinteract__smsMagic__c>();
for (Contact c : segmentedContacts) {
    smagicinteract__smsMagic__c sms = new smagicinteract__smsMagic__c();
    sms.smagicinteract__SenderId__c    = 'BulkSender';
    sms.smagicinteract__PhoneNumber__c = c.MobilePhone;
    sms.smagicinteract__SMSText__c     = 'New Locum Role Available!';
    smsList.add(sms);
}
String response = smagicinteract.ApexAPI.pushSMSCallout(smsList);`,
            },
            {
              label: "Request JSON",
              language: "json",
              code: `{
  "batch_id": "batch_99",
  "recipients": 300,
  "template": "Job_Alert_Template"
}`,
            },
            {
              label: "Response JSON",
              language: "json",
              code: `{
  "status": "submitted",
  "batch_size": 300,
  "responseText": "success"
}`,
            },
          ]}
        />
        <p className="text-xs text-ink-soft">
          Reference: <a className="text-teal underline" target="_blank" rel="noreferrer" href="https://www.sms-magic.co/docs/developers/knowledge-base-category/sms-magic-for-developers/">SMS-Magic Developer Knowledge Base</a>.
        </p>
      </PersonaOnly>

      <Callout variant="success" title="Wavelength benchmark">
        A 1,200-candidate Emergency Medicine broadcast typically lands the first
        3 acceptances within <strong>4 minutes</strong>, and fills the role in
        under 20.
      </Callout>
    </PageShell>
  );
}
