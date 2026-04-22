import { createFileRoute } from "@tanstack/react-router";
import { PageShell, H2, P, Steps, Step } from "@/components/docs/PageShell";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { PersonaOnly } from "@/lib/persona";
import { GuidedSnapshot, VideoSection, Prerequisites } from "@/components/docs/GuidedSnapshot";
import { SOPDiagram } from "@/components/docs/SOPDiagram";
import { FAQ } from "@/components/docs/FAQ";
import { CopilotButton } from "@/components/docs/CopilotButton";
import { Contact, ToggleRight, Database, ShieldCheck } from "lucide-react";
import consent1 from "@/assets/consent1.png";
import consent2 from "@/assets/consent2.png";

export const Route = createFileRoute("/workflow/consent")({
  head: () => ({
    meta: [
      { title: "Configure Consent Method & Content — Conversive" },
      { name: "description", content: "Set consent mode per source (Automated, Bulk, Interactive) and create custom Content Types for campaign-specific compliance." },
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
      title="Configure Consent Method & Content"
      description="Each conversation source — Automated, Bulk and Interactive — has its own consent posture. Set the right method per source, then layer Content Types when a campaign needs a stricter rule."
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "Recruitment Outreach Program" },
        { label: "Consent" },
      ]}
      prev={{ to: "/workflow/sender-ids", label: "Add & Assign Sender ID" }}
      next={{ to: "/workflow/bulk-sms", label: "Segment & Bulk SMS" }}
    >
      {/* 1 — Prerequisites */}
      <Prerequisites
        items={[
          { label: "Multichannel Compliance enabled in Converse App", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base-category/multichannel-compliance-configuration/" },
          { label: "Audit Database configured (Step 1 of compliance setup)" },
          { label: "Sender IDs assigned (see Step 1 of this guide)" },
          { label: "SMS / WhatsApp / LINE channel keys provisioned by SMS-Magic" },
        ]}
      />

      {/* 2 — Working Flow */}
      <SOPDiagram
        title="Consent capture flow"
        caption="A Contact's opt-in field syncs to the SMS-Magic Consent Object. The Consent status is read by every outbound dispatch and gates delivery."
        nodes={[
          { label: "Contact Record", sub: "Salesforce", icon: Contact },
          { label: "Opt-in Field", sub: "SMS_Opt_In__c", icon: ToggleRight },
          { label: "Consent Object", sub: "smagicinteract__Consent__c", icon: Database, tone: "primary" },
          { label: "Status: Active", sub: "Send-eligible", icon: ShieldCheck, tone: "success" },
        ]}
      />

      <PersonaOnly audience="admin">
        {/* 3 — Content + screenshots */}
        <Callout variant="info" title="Why per-source consent?">
          Automated and Bulk sends typically require explicit opt-in. One-to-one
          interactive replies often don't (you're answering a candidate who
          messaged first). Configuring per-source keeps you compliant without
          blocking real conversations.
        </Callout>

        <H2 id="source">1. Create consent for source</H2>
        <P>
          In <strong>Consent for Source</strong>, use the dropdown beneath each
          message-interface card to pick the mode.
        </P>
        <ul className="ml-5 list-disc space-y-2 text-sm text-ink-soft">
          <li>
            <strong>Consent Required</strong> — only send to customers with
            explicit opt-in (mobile-initiated, web form, or offline form).
          </li>
          <li>
            <strong>Consent Not Required</strong> — send unless the customer
            has explicitly opted out. Allowed only where local regulation
            permits opt-out-only flows.
          </li>
          <li>
            <strong>Consent Not Applicable</strong> — bypass consent checks
            entirely (emergency messaging, or you run your own compliance
            engine).
          </li>
        </ul>
        <Callout variant="warn" title="SMS-only setting">
          The source-level consent setting applies to channel <strong>SMS</strong>{" "}
          only. Use <em>View Source</em> to see which interfaces fall under each
          card and <em>How it works</em> to understand mode behaviour.
        </Callout>

        <GuidedSnapshot
          step="Snapshot 1"
          src={consent1}
          caption="Multichannel Compliance · Step 2 — pick the consent mode for each source (Automated, Bulk, Interactive)."
          source={{ label: "sms-magic.co · Compliance Configuration", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base-category/multichannel-compliance-configuration/" }}
        />

        <H2 id="content">2. Create consent for specific Content</H2>
        <P>
          Content Types let one campaign carry its own consent rule, opt-out
          message and expiry — independent of the source default.
        </P>
        <Steps>
          <Step title="Click Create New">
            Under <em>Consent For Specific Content</em> click{" "}
            <strong>Create New</strong>.
          </Step>
          <Step title="Define the content">
            Name (≤40 alphanumeric chars, no leading/trailing underscore),
            Consent Mode, message-sending limits per mobile (daily / monthly /
            unlimited), and Applicable Sources.
          </Step>
          <Step title="Configure Sender ID & keywords">
            Pick the Sender ID for this content type, then add Opt-In keywords
            and the Opt-In confirmation message. These override the global
            keyword settings for this content type only.
          </Step>
          <Step title="Validate &amp; Next → opt-out instructions">
            Choose <em>Auto-append opt-out</em> on every send, or omit it. Set
            the opt-out message text. Set Consent Expiry rules.
          </Step>
          <Step title="Save → activate → attach templates">
            Save the wizard, flip the Content Type to <strong>Active</strong>,
            then click <em>View</em> in the Templates column to associate
            Converse Templates with this content type.
          </Step>
        </Steps>

        <GuidedSnapshot
          step="Snapshot 2"
          src={consent2}
          caption="Create New Content Type wizard — name, consent mode, sending limits and applicable sources for campaign-specific consent."
          source={{ label: "sms-magic.co · Content Types", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base-category/multichannel-compliance-configuration/" }}
        />

        <H2 id="edit">3. Edit or delete a Content Type</H2>
        <P>
          On the Content Type table click the down arrow next to a row →{" "}
          <strong>Edit</strong> to modify, or <strong>Delete</strong> →{" "}
          <em>Confirm</em> to remove. Deletion is immediate and cannot be
          undone from the UI.
        </P>

        {/* 4 — Videos */}
        <VideoSection
          videos={[
            { title: "Consent Setup Tutorial (official)", href: "https://www.sms-magic.co/docs/videos/", duration: "5 min" },
            { title: "Step 1 · Setup Audit Database", href: "https://www.sms-magic.co/docs/videos/", duration: "4 min" },
            { title: "Step 3 · Double Opt-in", href: "https://www.sms-magic.co/docs/videos/", duration: "4 min" },
            { title: "Step 4 · Keyword Management (STOP / START)", href: "https://www.sms-magic.co/docs/videos/", duration: "3 min" },
          ]}
        />

        {/* 5 — FAQs */}
        <FAQ
          items={[
            { q: "Does Content-Type consent override source-level consent?", a: "Yes. Content Types take precedence over the source-level setting for any send associated with that Content Type." },
            { q: "Can I reuse opt-in keywords across content types?", a: "No — keywords must be unique. The Content Type wizard validates against the global keyword list before letting you save." },
            { q: "What happens when consent expires?", a: "The Consent record flips to Expired and the recipient becomes ineligible for sends until they opt back in. Expiry rules are set per Content Type." },
            { q: "Which channels respect this setting?", a: "Source-level consent applies to SMS only. WhatsApp, LINE and other channels have their own consent rails per provider policy." },
          ]}
        />
      </PersonaOnly>

      <PersonaOnly audience="dev">
        <H2 id="dev">Webhook integration</H2>
        <P>
          Sync external opt-in events (web forms, IVR, partner APIs) into
          Salesforce by listening to Conversive consent webhooks and updating
          the Contact's <code>Consent__c</code> field.
        </P>
        <CodeBlock
          tabs={[
            {
              label: "Code (Node.js)",
              language: "javascript",
              code: `app.post('/consent-webhook', (req, res) => {
  const { contact_id, status } = req.body;
  // Update Salesforce Contact.Consent__c via JSForce
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

        <FAQ
          items={[
            { q: "Where is consent state persisted?", a: "On the smagicinteract__Consent__c custom object, linked to the parent Contact / Lead. Status field holds Active / Opted Out / Expired." },
            { q: "Can I bulk-import historical opt-ins?", a: "Yes — use Data Loader against smagicinteract__Consent__c with status = Active and the original opt-in timestamp." },
            { q: "How do I bypass consent for an emergency send?", a: "Set the source-level consent to Consent Not Applicable for the relevant interface, or define a Content Type with mode = Not Applicable scoped to that campaign." },
          ]}
        />
      </PersonaOnly>

      {/* 6 — Copilot */}
      <CopilotButton hint="Unsure which consent mode fits your jurisdiction? Ask the Copilot." />
    </PageShell>
  );
}
