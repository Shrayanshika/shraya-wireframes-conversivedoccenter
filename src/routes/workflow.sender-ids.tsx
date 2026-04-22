import { createFileRoute } from "@tanstack/react-router";
import { PageShell, H2, P, Steps, Step } from "@/components/docs/PageShell";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { PersonaOnly } from "@/lib/persona";
import { GuidedSnapshot, VideoSection, Prerequisites } from "@/components/docs/GuidedSnapshot";
import { SOPDiagram } from "@/components/docs/SOPDiagram";
import { FAQ } from "@/components/docs/FAQ";
import { CopilotButton } from "@/components/docs/CopilotButton";
import { User, IdCard, Database, Send } from "lucide-react";
import senderId1 from "@/assets/sender_id1.png";
import senderId2 from "@/assets/sender_id2.png";
import senderId3 from "@/assets/sender_id3.png";

export const Route = createFileRoute("/workflow/sender-ids")({
  head: () => ({
    meta: [
      { title: "Add & Assign Sender ID — Conversive" },
      { name: "description", content: "Procure long-code Sender IDs and assign them to recruiter Users for 1:1 outreach in Salesforce." },
      { property: "og:title", content: "Step 1 · Add & Assign Sender ID" },
      { property: "og:description", content: "Identity layer for the Recruitment Outreach Program." },
    ],
  }),
  component: SenderIds,
});

function SenderIds() {
  return (
    <PageShell
      eyebrow="Step 1 · Identity"
      title="Add & Assign Sender ID"
      description="A Sender ID is the alphanumeric name or mobile number that appears on the recipient's phone. With v1.64 you can self-procure long-codes for the destination country and map them to recruiter Users so candidates always reply to the same number."
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "Recruitment Outreach Program" },
        { label: "Sender IDs" },
      ]}
      next={{ to: "/workflow/consent", label: "Capture Consent" }}
    >
      {/* 1 — Prerequisites */}
      <Prerequisites
        items={[
          { label: "Converse App package installed in Salesforce org", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base/configure-a-converse-app/" },
          { label: "Permission Set · SMS_Admin assigned to setup user" },
          { label: "Destination country selected in Converse Settings → Registration & Setup" },
          { label: "For shortcodes, toll-free or channel numbers, contact sales@sms-magic.com", href: "mailto:sales@sms-magic.com" },
        ]}
      />

      {/* 2 — Working Flow */}
      <SOPDiagram
        title="Sender ID assignment flow"
        caption="A Salesforce User record is mapped to one Sender ID drawn from the long-code pool, then locked for inbound + outbound continuity."
        nodes={[
          { label: "User Record", sub: "Salesforce", icon: User },
          { label: "Salesforce User ID", sub: "0058x00000…", icon: IdCard },
          { label: "Sender ID Pool", sub: "Long-code · Country", icon: Database, tone: "primary" },
          { label: "Assigned", sub: "Static routing ON", icon: Send, tone: "success" },
        ]}
      />

      <PersonaOnly audience="admin">
        {/* 3 — Content with screenshots */}
        <H2 id="add">Add Sender ID</H2>
        <P>
          Open <strong>Converse Settings → Sender ID Assignment</strong>. Click
          the <em>Add Sender ID</em> button to procure long-codes for the
          destination country selected during Registration &amp; Setup.
        </P>

        <GuidedSnapshot
          step="Snapshot 1"
          src={senderId1}
          caption="Sender ID Assignment header — use Add Sender ID to procure long-codes. Note: every Sender ID needs an ISD prefix. For multichannel numbers, contact sales@sms-magic.com."
          source={{ label: "sms-magic.co · Search & Assign Sender ID", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base/search-and-assign-sender-id/" }}
        />

        <Steps>
          <Step title="Click Add Sender ID">
            The country selector is disabled if you've already locked a
            destination country. Otherwise pick the country here.
          </Step>
          <Step title="Pick number type = Long code">
            Long-code is the only self-serve type. Shortcodes / toll-free
            require a sales request.
          </Step>
          <Step title="Search and select">
            (Optional) Enter an Area Code, click <em>Search</em>, then tick
            available numbers and label each one for the recruiter.
          </Step>
          <Step title="Save">
            Click <strong>Save</strong>. The Sender ID appears in the table
            with its Channel column populated.
          </Step>
        </Steps>

        <GuidedSnapshot
          step="Snapshot 2"
          src={senderId2}
          caption="Add Sender ID modal — Sender Id Type = Longcode, Country = Australia, optional Area Code. Tick numbers from the list and label each before saving."
          source={{ label: "sms-magic.co · Add Sender ID", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base/search-and-assign-sender-id/" }}
        />

        <H2 id="all-countries">For Destination Country = "All"</H2>
        <P>
          If you selected destination country <strong>All</strong> in
          Registration &amp; Setup (multi-country messaging), the Add Sender ID
          dialog lets you choose a specific country per search. Repeat the flow
          for each country where you need numbers.
        </P>

        <H2 id="channels">Channel Type Assignment</H2>
        <P>
          The <strong>Channel(s)</strong> column on the Sender ID &amp;
          Assignment table reflects the channel each number supports —
          <em> SMS, WhatsApp, Facebook, LINE</em>. Channel-specific numbers are
          provisioned by the SMS-Magic team after a sales request.
        </P>

        <GuidedSnapshot
          step="Snapshot 3"
          src={senderId3}
          caption="Add / Assign Sender ID tabs — table shows Sender ID, Label, Channel(s) and Incoming Number for every long-code in your pool."
          source={{ label: "sms-magic.co · Channel Type Assignment", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base/search-and-assign-sender-id/" }}
        />

        <Callout variant="info" title="Inbox: Channel-aware Sender ID picker">
          Inside the Converse Desk conversation view, the Sender ID dropdown
          renders separate rows per Sender ID + channel combination so
          recruiters always reply on the right channel.
        </Callout>

        <H2 id="assign">Assign Sender ID to recruiters</H2>
        <P>
          Switch to the <strong>Assign Sender ID</strong> tab. The page lists
          each user with their email, default Sender ID and assigned Sender IDs.
        </P>
        <Steps>
          <Step title="Select users">
            Tick the checkbox beside one or more user names.
          </Step>
          <Step title="Click Assign Sender ID(s)">
            The assignment dialog opens.
          </Step>
          <Step title="Pick Sender ID, channel or label">
            Use the <em>Sender ID</em> dropdown — entries are filtered by
            channel and label.
          </Step>
          <Step title="Set the default Sender ID">
            Choose which assigned Sender ID is the recruiter's default for
            outbound from any record.
          </Step>
          <Step title="Click Assign">
            The user now sends and receives on the assigned long-code(s).
          </Step>
        </Steps>

        {/* 4 — Videos */}
        <VideoSection
          videos={[
            { title: "How to Assign Sender ID (official)", href: "https://www.sms-magic.co/docs/videos/", duration: "4 min" },
            { title: "Configure a Converse App", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base/configure-a-converse-app/", duration: "5 min" },
          ]}
        />

        {/* 5 — FAQs */}
        <FAQ
          items={[
            { q: "Can I self-procure shortcodes or toll-free numbers?", a: "No — only long-codes are self-serve in v1.64. Email sales@sms-magic.com to request shortcodes, toll-free numbers, or channel-specific Sender IDs (WhatsApp, Facebook, LINE)." },
            { q: "Why is the Country selector disabled?", a: "It's disabled when you've already locked a destination country in Converse Settings → Registration & Setup. Switch to destination = All if you need to procure numbers for additional countries." },
            { q: "Can two users share the same Sender ID?", a: "Technically yes, but it breaks 1:1 continuity for candidates. Best practice is one default Sender ID per recruiter." },
            { q: "What's BYON / BYOP?", a: "Bring Your Own Number / Bring Your Own Provider — alternative procurement paths if you already own DIDs or have a preferred carrier. See the SMS-Magic BYON / BYOP knowledge base." },
          ]}
        />
      </PersonaOnly>

      <PersonaOnly audience="dev">
        <H2 id="dev">Programmatic mapping</H2>
        <P>
          The Sender ID is validated during object insertion or the{" "}
          <code>pushSMSCallout()</code> execution. Bulk-provision recruiters
          from your HRIS using the snippets below.
        </P>
        <CodeBlock
          tabs={[
            {
              label: "Apex",
              language: "apex",
              code: `smagicinteract__smsMagic__c smsObject = new smagicinteract__smsMagic__c();
smsObject.smagicinteract__SenderId__c    = 'Recruiter_Unique_ID';
smsObject.smagicinteract__PhoneNumber__c = '919623197650';
smsObject.smagicinteract__SMSText__c     = 'Hello from the team';
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
  "text": "Hello from the team"
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

        <FAQ
          items={[
            { q: "Which field stores the assigned Sender ID at the user level?", a: "User mapping is held in the SMS-Magic User Sender ID assignment object — query it via SOQL on smagicinteract__SenderIdAssignment__c (consult the developer KB for exact namespace)." },
            { q: "How do I rotate Sender IDs in code?", a: "Set smagicinteract__SenderId__c per record before insert. The platform validates the value against the pool at insert time." },
            { q: "What is generateUniqueKey() for?", a: "It returns the external ID stamped on smagicinteract__external_field__c, which the gateway uses to correlate delivery callbacks." },
          ]}
        />
      </PersonaOnly>

      {/* 6 — Copilot button */}
      <CopilotButton hint="Need help mapping 40+ recruiters in one go? Ask the Copilot for a tailored bulk-provisioning recipe." />

      <Callout variant="warn" title="One number, one recruiter">
        Reusing a Sender ID across multiple recruiters breaks 1:1 continuity
        and confuses candidates mid-conversation. Always keep the Default
        Sender ID locked.
      </Callout>
    </PageShell>
  );
}
