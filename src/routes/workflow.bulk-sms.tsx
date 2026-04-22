import { createFileRoute } from "@tanstack/react-router";
import { PageShell, H2, P, Steps, Step } from "@/components/docs/PageShell";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { PersonaOnly } from "@/lib/persona";
import { GuidedSnapshot, VideoSection, Prerequisites } from "@/components/docs/GuidedSnapshot";
import { SOPDiagram } from "@/components/docs/SOPDiagram";
import { FAQ } from "@/components/docs/FAQ";
import { CopilotButton } from "@/components/docs/CopilotButton";
import { ListFilter, Filter, LayoutTemplate, FileText, Send } from "lucide-react";
import bulk1 from "@/assets/bulk1.png";
import bulk2 from "@/assets/bulk2.png";

export const Route = createFileRoute("/workflow/bulk-sms")({
  head: () => ({
    meta: [
      { title: "Segment & Bulk SMS — Conversive" },
      { name: "description", content: "Drop the BulkSMSForCommunity component on an Experience Cloud page and broadcast compliant SMS at scale." },
      { property: "og:title", content: "Step 3 · Segment & Bulk SMS" },
      { property: "og:description", content: "The broadcast engine for the Recruitment Outreach Program." },
    ],
  }),
  component: BulkSms,
});

function BulkSms() {
  return (
    <PageShell
      eyebrow="Step 3 · Broadcast"
      title="Segment & Bulk SMS"
      description="The Bulk SMS component lets a community user filter records, pick a template and broadcast to up to 2,000 recipients per list view — without leaving Experience Cloud."
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "Recruitment Outreach Program" },
        { label: "Segment & Bulk SMS" },
      ]}
      prev={{ to: "/workflow/consent", label: "Capture Consent" }}
      next={{ to: "/workflow/converse-desk", label: "1:1 Conversation" }}
    >
      {/* 1 — Prerequisites */}
      <Prerequisites
        items={[
          { label: "Remote Site Setting created with the Community URL (Setup → Home → All Sites)" },
          { label: "Cloned 'SMS Converse Conversation User' permission set assigned to community users" },
          { label: "FetchSessionId VF Page enabled and 'API Enable' = true on the cloned permission set" },
          { label: "Sharing rules applied for License Type, Feature and License objects so the Sender ID is visible" },
          { label: "Community user has 'Community Power User' license" },
          { label: "Community user has access to the messaged object (Lead / Contact)" },
        ]}
      />

      {/* 2 — Working Flow */}
      <SOPDiagram
        title="Bulk dispatch flow"
        caption="A list view is filtered, opened in the Bulk SMS component, mapped to a template, and dispatched as a batch via the SMS-Magic engine."
        nodes={[
          { label: "Salesforce List View", sub: "Up to 2,000 recs", icon: ListFilter },
          { label: "Specialty Filter", sub: "List criteria", icon: Filter },
          { label: "BulkSMSForCommunity", sub: "Lightning component", icon: LayoutTemplate, tone: "primary" },
          { label: "Template Selection", sub: "Converse Template", icon: FileText },
          { label: "Batch Send", sub: "Throttle / sender", icon: Send, tone: "success" },
        ]}
      />

      <PersonaOnly audience="admin">
        {/* 3 — Content with screenshots */}
        <Callout variant="warn" title="2,000-record limit">
          Only 2,000 records can be fetched from a list view on the Community.
          Split larger campaigns across multiple list views.
        </Callout>

        <H2 id="add-component">Add the Bulk SMS component to a Community page</H2>
        <P>
          A new Lightning component — <strong>BulkSMSForCommunity</strong> — is
          available in Experience Builder. Drop it on the page where your
          recruiters work the candidate list.
        </P>

        <Steps>
          <Step title="Open Experience Builder">
            Setup → All Sites → Builder against the target Community.
          </Step>
          <Step title="Find BulkSMSForCommunity">
            In the components panel, search for{" "}
            <code>BulkSMSForCommunity</code>.
          </Step>
          <Step title="Drag and drop">
            Drop the component onto the page. Save and publish the
            Experience Cloud site.
          </Step>
        </Steps>

        <GuidedSnapshot
          step="Snapshot 1"
          src={bulk1}
          caption="SMS-Magic Converse home — Recent Items, Converse Templates, Consents and SMS History tabs used during a bulk dispatch."
          source={{ label: "sms-magic.co · Run SMS Campaign", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base/configure-run-sms-campaign-button-in-classic/" }}
        />

        <H2 id="run">Run a Bulk Campaign from a list view</H2>
        <Steps>
          <Step title="Open the candidate list view">
            Switch to a list view filtered to the audience you want to reach.
          </Step>
          <Step title="Select recipients">
            Tick the candidates. The SMS-Magic Bulk button appears once one or
            more rows are selected.
          </Step>
          <Step title="Open the Bulk SMS component">
            Click <strong>Send Bulk SMS</strong>. Pick the Sender ID (or let
            owner-routing fan out across your assigned numbers).
          </Step>
          <Step title="Choose template &amp; dispatch">
            Pick a Converse Template, preview the merge, confirm. The engine
            respects consent, throttles per sender, and writes the result back
            to each candidate's activity timeline.
          </Step>
        </Steps>

        <GuidedSnapshot
          step="Snapshot 2"
          src={bulk2}
          caption="Salesforce All Tabs view — Communication Subscription Consents and Channel Events tabs are key references for tracking opt-ins and delivery events."
          source={{ label: "sms-magic.co · Salesforce KB", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base/" }}
        />

        {/* 4 — Videos */}
        <VideoSection
          videos={[
            { title: "Bulk SMS Component walkthrough", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base/configure-run-sms-campaign-button-in-classic/", duration: "6 min" },
            { title: "Getting Started with Experience Cloud", href: "https://www.sms-magic.co/docs/videos/", duration: "5 min" },
            { title: "Multichannel Compliance for batches", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base-category/multichannel-compliance-configuration/", duration: "4 min" },
          ]}
        />

        {/* 5 — FAQs */}
        <FAQ
          items={[
            { q: "Why am I capped at 2,000 records?", a: "It's a platform limit on list-view fetches inside Experience Cloud. For larger campaigns, split into multiple list views or trigger from the core org via Apex." },
            { q: "Why does the Bulk button not appear?", a: "Most often this is the cloned permission set — confirm 'API Enable' is true and FetchSessionId VF Page access is granted." },
            { q: "Can I schedule a bulk send for later?", a: "Yes — through the Campaign Manager UI (or via Apex Schedulable for developers). Bulk SMS Component itself is for immediate sends." },
          ]}
        />
      </PersonaOnly>

      <PersonaOnly audience="dev">
        <H2 id="dev">Triggering mass alerts via <code>pushSMSCallout()</code></H2>
        <CodeBlock
          tabs={[
            {
              label: "Apex",
              language: "apex",
              code: `List<smagicinteract__smsMagic__c> smsList = new List<smagicinteract__smsMagic__c>();
for (Contact c : segmentedContacts) {
    smagicinteract__smsMagic__c sms = new smagicinteract__smsMagic__c();
    sms.smagicinteract__SenderId__c    = 'BulkSender';
    sms.smagicinteract__PhoneNumber__c = c.MobilePhone;
    sms.smagicinteract__SMSText__c     = 'New role available!';
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

        <FAQ
          items={[
            { q: "What's the Apex governor exposure for pushSMSCallout?", a: "It counts as a single callout per invocation regardless of the list size. Batch on the SMS-Magic side rather than looping per record." },
            { q: "How do I correlate delivery callbacks?", a: "Set smagicinteract__external_field__c via generateUniqueKey() on each record before insert; the gateway echoes that key on status callbacks." },
            { q: "Can I dispatch from a Schedulable class?", a: "Yes — Schedulable / Queueable both work. For very large batches use Queueable with chunking to stay within callout limits." },
          ]}
        />
      </PersonaOnly>

      <CopilotButton hint="Need to broadcast to 10k+ records? Ask the Copilot for a chunked Queueable recipe." />
    </PageShell>
  );
}
