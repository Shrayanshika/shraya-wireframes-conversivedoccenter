import { createFileRoute } from "@tanstack/react-router";
import { PageShell, H2, P, Steps, Step } from "@/components/docs/PageShell";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { PersonaOnly } from "@/lib/persona";
import { GuidedSnapshot, VideoSection, Prerequisites } from "@/components/docs/GuidedSnapshot";
import { SOPDiagram } from "@/components/docs/SOPDiagram";
import { Contact, ToggleRight, Database, ShieldCheck } from "lucide-react";
import consent1 from "@/assets/consent1.png";
import consent2 from "@/assets/consent2.png";

export const Route = createFileRoute("/workflow/consent")({
  head: () => ({
    meta: [
      { title: "Capture Consent — Conversive" },
      { name: "description", content: "Configure Multichannel Compliance: Audit Database, Consent Method & Content, Double Opt-in and Keyword Management." },
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
      description="Every Conversive send is gated by an explicit consent record. Use the four-step Multichannel Compliance setup to wire Audit Database, Consent Method, Double Opt-in and Keyword Management — then create custom Content Types when a campaign needs its own consent mode."
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
        Conversive blocks any send without an active consent record — even if you
        forget the flag.
      </Callout>

      <SOPDiagram
        title="Consent capture flow"
        caption="A Salesforce Contact's opt-in field syncs to the SMS-Magic Consent Object, which sets the active status read by every outbound dispatch."
        nodes={[
          { label: "Contact Record", sub: "Salesforce", icon: Contact },
          { label: "Opt-in Field", sub: "SMS_Opt_In__c", icon: ToggleRight },
          { label: "SMS-Magic Consent Object", sub: "conversive__Consent__c", icon: Database, tone: "primary" },
          { label: "Status: Active", sub: "Send-eligible", icon: ShieldCheck, tone: "success" },
        ]}
      />

      <Prerequisites
        items={[
          { label: "Watch · Multichannel Compliance Overview (3m)", href: "#video-compliance-overview", note: "dummy preview video" },
          { label: "Audit Database enabled in Converse App (Step 1)", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base-category/multichannel-compliance-configuration/" },
          { label: "SMS, WhatsApp or LINE Sender IDs assigned (see Step 1 of this guide)" },
        ]}
      />

      <PersonaOnly audience="admin">
        <H2 id="setup">Configure Consent Method & Content (Step 2 of 4)</H2>
        <P>
          From Multichannel Compliance, click into <strong>Step 2 · Consent
          Method & Content</strong>. Here you choose the consent mode per
          message source — Automated, Bulk and Interactive Conversations.
        </p>

        <Steps>
          <Step title="Open Multichannel Compliance">
            Converse App → <em>SMS-Magic Setup</em> → <strong>Multichannel
            Compliance</strong>. Confirm the toggle is <em>Enabled</em> at the top right.
          </Step>
          <Step title="Pick consent mode per source">
            Under <strong>Consent For Source</strong>, use the drop-down beneath
            each card — Automated, Bulk and Interactive Conversations — to set
            <em> Consent Required</em> or <em>Consent Not Required</em>.
          </Step>
          <Step title="Create a custom Content Type">
            For campaigns that need a tighter rule, click <strong>Create New
            Content Type</strong>. Define a unique name, pick a Consent Mode,
            set message-sending limits and choose Applicable Sources.
          </Step>
          <Step title="Save & advance">
            Save the wizard and continue to <em>Step 3 · Double Opt-in</em>{" "}
            and <em>Step 4 · Keyword Management</em> for full compliance.
          </Step>
        </Steps>

        <GuidedSnapshot
          step="Snapshot 1"
          src={consent1}
          caption="Multichannel Compliance · Step 2 — pick the consent mode for each source (Automated, Bulk, Interactive). Settings apply to SMS, LINE and Viber channels."
          source={{ label: "sms-magic.co · Compliance Configuration", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base-category/multichannel-compliance-configuration/" }}
        />
        <GuidedSnapshot
          step="Snapshot 2"
          src={consent2}
          caption="Create New Content Type wizard — define name, consent mode, sending limits and applicable sources for campaign-specific consent rules."
          source={{ label: "sms-magic.co · Content Types", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base-category/multichannel-compliance-configuration/" }}
        />

        <VideoSection
          videos={[
            { title: "Consent Setup Tutorial (official)", href: "https://www.sms-magic.co/docs/videos/", duration: "5 min" },
            { title: "Step 1 · Setup Audit Database", href: "https://www.sms-magic.co/docs/videos/", duration: "4 min" },
            { title: "Step 3 · Double Opt-in", href: "https://www.sms-magic.co/docs/videos/", duration: "4 min" },
            { title: "Step 4 · Keyword Management (STOP / START)", href: "https://www.sms-magic.co/docs/videos/", duration: "3 min" },
          ]}
        />
      </PersonaOnly>

      <PersonaOnly audience="dev">
        <H2 id="dev">Webhook integration</H2>
        <P>
          Sync external opt-in events (web forms, IVR, partner APIs) into
          Salesforce by listening to Conversive consent webhooks and updating
          the Contact's <code>Consent__c</code> field.
        </p>
        <CodeBlock
          tabs={[
            {
              label: "Code (Node.js)",
              language: "javascript",
              code: `app.post('/consent-webhook', (req, res) => {
  const { contact_id, status } = req.body;
  // Logic to update Salesforce Contact.Consent__c via JSForce
  res.status(200).send({ success: true });
});`,
            },
            {
              label: "Request JSON",
              language: "json",
              code: `{
  "event": "consent.updated",
  "contact_id": "003XXXXXXXXXXXX",
  "status": "OPTED_IN",
  "source": "WebForm"
}`,
            },
            {
              label: "Response JSON",
              language: "json",
              code: `{ "success": true, "updated": true }`,
            },
          ]}
        />
        <p className="text-xs text-ink-soft">
          Reference: <a className="text-teal underline" target="_blank" rel="noreferrer" href="https://www.sms-magic.co/docs/developers/knowledge-base-category/sms-magic-for-developers/">SMS-Magic Developer Knowledge Base</a>.
        </p>
      </PersonaOnly>

      <Callout variant="warn" title="Content Types override sources">
        The consent method defined at the Content level takes precedence over
        the source-level setting. Use Content Types when one campaign needs
        a stricter rule than your default.
      </Callout>
    </PageShell>
  );
}
