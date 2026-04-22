import { createFileRoute } from "@tanstack/react-router";
import { PageShell, H2, P, Steps, Step } from "@/components/docs/PageShell";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { PersonaOnly } from "@/lib/persona";
import { GuidedSnapshot, VideoSection, Prerequisites } from "@/components/docs/GuidedSnapshot";
import { SOPDiagram } from "@/components/docs/SOPDiagram";
import { User, IdCard, Database, Send } from "lucide-react";
import senderId1 from "@/assets/sender_id1.png";
import senderId2 from "@/assets/sender_id2.png";

export const Route = createFileRoute("/workflow/sender-ids")({
  head: () => ({
    meta: [
      { title: "Assign Sender IDs — Conversive" },
      { name: "description", content: "Map dedicated Sender IDs 1:1 to each recruiter for consistent SMS conversations in Salesforce." },
      { property: "og:title", content: "Step 1 · Assign Sender IDs" },
      { property: "og:description", content: "Identity layer for the Wavelength recruitment build." },
    ],
  }),
  component: SenderIds,
});

function SenderIds() {
  return (
    <PageShell
      eyebrow="Step 1 · Identity"
      title="Assign Sender IDs"
      description="Wavelength runs 42 recruiters, each owning their own candidate book. Conversive maps a dedicated Sender ID to every recruiter so candidates always reply to the same number — building trust and 1:1 continuity."
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "Wavelength Workflow" },
        { label: "Sender IDs" },
      ]}
      next={{ to: "/workflow/consent", label: "Capture Consent" }}
    >
      <Callout variant="info" title="What you'll build">
        A Sender Pool with 42 numbers, each statically routed to a single
        Salesforce User so outbound and inbound stay on the same thread.
      </Callout>

      <SOPDiagram
        title="Sender ID assignment flow"
        caption="A Salesforce User record is mapped to one Sender ID drawn from the SMS-Magic pool, then locked for inbound + outbound continuity."
        nodes={[
          { label: "User Record", sub: "Salesforce", icon: User },
          { label: "Salesforce User ID", sub: "0058x00000…", icon: IdCard },
          { label: "Sender ID Pool", sub: "SMS-Magic", icon: Database, tone: "primary" },
          { label: "Assigned", sub: "Static routing ON", icon: Send, tone: "success" },
        ]}
      />

      <Prerequisites
        items={[
          { label: "Watch · Conversive Onboarding Primer (5m)", href: "#video-onboarding-primer", note: "dummy walkthrough video" },
          { label: "Permission Set · SMS_Admin assigned to setup user", href: "#perm-sms-admin" },
          { label: "Converse App package installed in Salesforce org", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base/configure-a-converse-app/" },
        ]}
      />

      <PersonaOnly audience="admin">
        <H2 id="setup">Salesforce Console — Search & Assign Sender ID</H2>
        <P>
          Open the Converse App and follow the two-tab flow: <strong>Add Sender ID</strong>{" "}
          to procure numbers, then <strong>Assign Sender ID</strong> to map them
          to recruiter Users.
        </P>

        <Steps>
          <Step title="Open Sender ID Management">
            Salesforce → App Launcher → <em>Converse Settings</em> → <strong>Sender ID Assignment</strong>.
          </Step>
          <Step title="Add channel-specific Sender IDs">
            On the <strong>Add Sender ID</strong> tab, browse the pool and add
            SMS, WhatsApp, or LINE numbers. Channel type appears automatically
            in the table.
          </Step>
          <Step title="Switch to Assign Sender ID">
            On the <strong>Assign Sender ID</strong> tab, select one or more
            Users via checkbox and click <em>Assign Sender ID(s)</em>.
          </Step>
          <Step title="Lock as default per recruiter">
            Mark the chosen number as the recruiter's <strong>Default Sender ID</strong>{" "}
            so every outbound from their record uses the same long-code.
          </Step>
        </Steps>

        <GuidedSnapshot
          step="Snapshot 1"
          src={senderId1}
          caption="Add Sender ID & Assign Sender ID tabs — the table lists Sender ID, Label, Channel and Incoming Number for each long-code in the pool."
          source={{ label: "sms-magic.co · Search & Assign Sender ID", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base/search-and-assign-sender-id/" }}
        />
        <GuidedSnapshot
          step="Snapshot 2"
          src={senderId2}
          caption="Channel Type Assignment — the Sender ID table now reflects WhatsApp / SMS / LINE channels, and the Sender ID dropdown in the inbox shows channel-tagged options."
          source={{ label: "sms-magic.co · Channel Type Assignment", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base/search-and-assign-sender-id/" }}
        />

        <VideoSection
          videos={[
            { title: "How to Assign Sender ID (official video)", href: "https://www.sms-magic.co/docs/videos/", duration: "4 min" },
            { title: "Configure a Converse App", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base/configure-a-converse-app/", duration: "5 min" },
          ]}
        />
      </PersonaOnly>

      <PersonaOnly audience="dev">
        <H2 id="dev">Programmatic mapping</H2>
        <P>
          In the SMS-Magic Salesforce-native architecture, the Sender ID is
          validated during object insertion or the <code>pushSMSCallout()</code>{" "}
          execution. Bulk-provision recruiters from your HRIS using the snippets
          below.
        </P>
        <CodeBlock
          tabs={[
            {
              label: "Apex / Code",
              language: "apex",
              code: `smagicinteract__smsMagic__c smsObject = new smagicinteract__smsMagic__c();
smsObject.smagicinteract__SenderId__c    = 'Recruiter_Unique_ID';
smsObject.smagicinteract__PhoneNumber__c = '919623197650';
smsObject.smagicinteract__SMSText__c     = 'Hello from Wavelength';
smsObject.smagicinteract__external_field__c =
    smagicinteract.ApexAPI.generateUniqueKey();
insert smsObject;`,
            },
            {
              label: "Request JSON",
              language: "json",
              code: `{
  "senderId": "Recruiter_Unique_ID",
  "mobileNumber": "919623197650",
  "text": "Hello from Wavelength"
}`,
            },
            {
              label: "Response JSON",
              language: "json",
              code: `{
  "status": "queued",
  "message_id": "generated_external_key"
}`,
            },
          ]}
        />
        <p className="text-xs text-ink-soft">
          Reference: <a className="text-teal underline" target="_blank" rel="noreferrer" href="https://www.sms-magic.co/docs/developers/knowledge-base-category/sms-magic-for-developers/">SMS-Magic Developer Knowledge Base</a>.
        </p>
      </PersonaOnly>

      <Callout variant="warn" title="One number, one recruiter">
        Reusing a Sender ID across multiple recruiters breaks 1:1 continuity
        and confuses candidates mid-conversation. Always keep the Default Sender ID locked.
      </Callout>
    </PageShell>
  );
}
