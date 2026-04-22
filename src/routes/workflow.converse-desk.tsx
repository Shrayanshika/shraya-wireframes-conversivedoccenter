import { createFileRoute } from "@tanstack/react-router";
import { PageShell, H2, P, Steps, Step } from "@/components/docs/PageShell";
import { Callout } from "@/components/docs/Callout";
import { PersonaOnly } from "@/lib/persona";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { GuidedSnapshot, VideoSection, Prerequisites } from "@/components/docs/GuidedSnapshot";
import { SOPDiagram } from "@/components/docs/SOPDiagram";
import { FAQ } from "@/components/docs/FAQ";
import { CopilotButton } from "@/components/docs/CopilotButton";
import { MessageSquare, Radio, Inbox, Reply } from "lucide-react";
import desk1 from "@/assets/desk1.png";
import desk2 from "@/assets/desk2.png";

export const Route = createFileRoute("/workflow/converse-desk")({
  head: () => ({
    meta: [
      { title: "1:1 Conversation in Converse Desk — Conversive" },
      { name: "description", content: "Configure Converse Desk Layouts, Message Settings and General Settings for real-time 1:1 candidate conversations." },
      { property: "og:title", content: "Step 4 · 1:1 Conversation" },
      { property: "og:description", content: "Converse Desk inbox setup and recruiter assignment." },
    ],
  }),
  component: ConverseDesk,
});

function ConverseDesk() {
  return (
    <PageShell
      eyebrow="Step 4 · Engagement"
      title="1:1 Conversation in Converse Desk"
      description="Converse Desk is the Salesforce-native inbox where inbound replies land. Configure layouts, themes, message-bubble information, canned responses, character limits, internal notes, CRM actions and related-object lookups."
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "Recruitment Outreach Program" },
        { label: "Converse Desk" },
      ]}
      prev={{ to: "/workflow/bulk-sms", label: "Segment & Bulk SMS" }}
      next={{ to: "/workflow/reminders", label: "Auto-Reminders (soon)" }}
    >
      {/* 1 — Prerequisites */}
      <Prerequisites
        items={[
          { label: "Sender IDs assigned to recruiter Users (see Step 1)", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base/search-and-assign-sender-id/" },
          { label: "Permission Set · SMS_Inbox_User on every recruiter profile" },
          { label: "Salesforce Streaming API enabled (default for most orgs)" },
          { label: "(Optional) Salesforce Storage enabled if you want media files saved locally" },
        ]}
      />

      {/* 2 — Working Flow */}
      <SOPDiagram
        title="1:1 inbound flow"
        caption="An inbound SMS triggers a Salesforce Push Topic, which fires a Converse Desk notification routed to the recruiter who owns the Sender ID."
        nodes={[
          { label: "Incoming SMS", sub: "Candidate reply", icon: MessageSquare },
          { label: "Push Topic", sub: "Streaming API", icon: Radio },
          { label: "Converse Desk", sub: "Lightning inbox", icon: Inbox, tone: "primary" },
          { label: "Recruiter Reply", sub: "Threaded back", icon: Reply, tone: "success" },
        ]}
      />

      <PersonaOnly audience="admin">
        {/* 3 — Content + screenshots */}
        <H2 id="layout">Configure Converse Desk Layout</H2>
        <P>
          Open <strong>Converse Settings → Conversations → Converse Desk
          Layouts</strong>. A layout defines which Global and Conversation
          filters your recruiters see.
        </P>
        <Steps>
          <Step title="Click Create New Layout">
            The Create New Layout popup opens.
          </Step>
          <Step title="Name the layout">
            For example, <code>Recruiter Inbox</code>.
          </Step>
          <Step title="Pick Global &amp; Conversation Filters">
            Tick Global Filters (Account, Case, Contact, Lead, Opportunity) and
            Conversation Filters (All, Unread, Open, Follow Ups, Closed).
          </Step>
          <Step title="Assign users / profiles">
            Select the user profiles that should see this layout, then click{" "}
            <strong>Save</strong>.
          </Step>
          <Step title="Save Changes">
            Click <em>Save Changes</em> at the bottom of the Converse Desk
            Layouts tab.
          </Step>
        </Steps>

        <GuidedSnapshot
          step="Snapshot 1"
          src={desk1}
          caption="Create New Layout popup — name the layout, pick Global Filters and Conversation Filters, and assign users / profiles."
          source={{ label: "sms-magic.co · Conversations Guide", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base-category/222converse_desk159/" }}
        />

        <H2 id="theme">Theme the Desk</H2>
        <P>
          In the Converse Desk Layouts section, slide the <strong>Color</strong>{" "}
          toggle on. Pick a swatch or pattern, click <em>Preview Theme</em>,
          then <em>Save Changes</em>.
        </P>

        <H2 id="topic">Customize the Conversation Topic view</H2>
        <P>
          Under <em>Conversation Topic</em>, pick a Template Name and the
          Field Name to display as the conversation title in the inbox list.
        </P>

        <GuidedSnapshot
          step="Snapshot 2"
          src={desk2}
          caption="Conversations tab — Converse Desk Layouts, Message Settings and General Settings sub-tabs. The Color section themes the desk for recruiters."
          source={{ label: "sms-magic.co · Converse Desk", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base-category/222converse_desk159/" }}
        />

        <H2 id="message-settings">Configure Message Settings</H2>
        <P>
          Under <strong>Message Settings</strong>:
        </P>
        <ul className="ml-5 list-disc space-y-1.5 text-sm text-ink-soft">
          <li>
            <strong>Display Automated Message</strong> — toggle on, pick a
            colour for system-generated messages.
          </li>
          <li>
            <strong>Message Bubble Information</strong> — pick which fields
            appear under each incoming/outgoing bubble.
          </li>
          <li>
            <strong>Lookup Fields Display</strong> — toggle on, pick fields to
            show under the related-record lookup.
          </li>
        </ul>

        <H2 id="general">Configure General Settings</H2>
        <ul className="ml-5 list-disc space-y-1.5 text-sm text-ink-soft">
          <li>
            <strong>Reply Using Canned Responses</strong> — restrict a profile
            to only reply via Converse Templates. Overrides custom character
            limits for the same profile.
          </li>
          <li>
            <strong>Character Limit of a Message</strong> — cap message length
            per user / profile.
          </li>
          <li>
            <strong>Internal Note</strong> — enable the internal note tab on
            the conversation pane.
          </li>
          <li>
            <strong>Configure CRM Actions</strong> — pick which CRM actions
            (Create Case, Convert Lead, etc.) appear per object.
          </li>
          <li>
            <strong>Related Conversation Setting</strong> — define
            child/parent object lookup so a Contact's conversation shows on
            the parent Account record too.
          </li>
        </ul>

        <H2 id="multimedia">Multi-Media Settings</H2>
        <P>
          By default media is stored on SMS-Magic infrastructure (max 2.5 MB).
          Enable Salesforce Storage for higher file sizes and to associate
          media with records:
        </P>
        <ul className="ml-5 list-disc space-y-1.5 text-sm text-ink-soft">
          <li>
            <strong>Incoming Media Messages</strong> — store inbound media in
            Salesforce; auto-deletes from SMS-Magic after sync.
          </li>
          <li>
            <strong>Outgoing Media Messages</strong> — store outbound media in
            Salesforce instead of SMS-Magic.
          </li>
          <li>
            <strong>Association Media Files with Records</strong> — attach the
            media file to the primary object record (requires one of the two
            options above to be enabled).
          </li>
        </ul>

        {/* 4 — Videos */}
        <VideoSection
          videos={[
            { title: "Converse Desk Admin Tutorial (official)", href: "https://www.sms-magic.co/docs/videos/", duration: "7 min" },
            { title: "Conversations Guide overview", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base-category/222converse_desk159/", duration: "5 min" },
            { title: "Routing inbound replies", href: "https://www.sms-magic.co/docs/videos/", duration: "3 min" },
            { title: "Multi-Media Settings walkthrough", href: "https://www.sms-magic.co/docs/videos/", duration: "4 min" },
          ]}
        />

        {/* 5 — FAQs */}
        <FAQ
          items={[
            { q: "Can a recruiter belong to multiple Desk Layouts?", a: "A user resolves to one layout per profile/user assignment. If you need different views, create role-specific profiles or use the Conversation Filter selector inside the desk." },
            { q: "Does the Color theme apply per layout or org-wide?", a: "The Color theme applies to the layout it's enabled on, so different recruiter teams can have distinct themes." },
            { q: "Why is my media file capped at 2.5 MB?", a: "That's the SMS-Magic-storage default. Enable Salesforce Storage under Multi-Media Settings to use Salesforce file size limits instead." },
            { q: "What happens if I enable Canned Responses for a profile that has a character limit?", a: "Canned Responses overrides the character limit — users on that profile can only send Converse Templates and cannot type custom text." },
          ]}
        />
      </PersonaOnly>

      <PersonaOnly audience="dev">
        <H2 id="dev">Bidirectional logic</H2>
        <P>
          Outgoing replies are inserted into{" "}
          <code>smagicinteract__smsMagic__c</code> with{" "}
          <code>Direction__c = 'OUT'</code>. Inbound messages arrive on the
          incoming webhook and create a thread record automatically.
        </P>
        <CodeBlock
          tabs={[
            {
              label: "Apex",
              language: "apex",
              code: `// Outgoing reply
smagicinteract__smsMagic__c reply = new smagicinteract__smsMagic__c();
reply.smagicinteract__Direction__c = 'OUT';
reply.smagicinteract__SMSText__c   = 'Confirming your interview slot.';
insert reply;`,
            },
            {
              label: "Request JSON (incoming)",
              language: "json",
              code: `{
  "event": "message.received",
  "from": "+61400000000",
  "text": "Where exactly is this?"
}`,
            },
            {
              label: "Response JSON",
              language: "json",
              code: `{
  "status": "received",
  "thread_id": "thread_8821"
}`,
            },
          ]}
        />
        <p className="text-xs text-ink-soft">
          Reference: <a className="text-teal underline" target="_blank" rel="noreferrer" href="https://www.sms-magic.co/docs/developers/knowledge-base-category/sms-magic-for-developers/">SMS-Magic Developer Knowledge Base</a>.
        </p>

        <FAQ
          items={[
            { q: "How do I distinguish IN vs OUT messages in queries?", a: "Filter on smagicinteract__Direction__c — values are IN or OUT. Use it on triggers to route inbound replies to the right handler." },
            { q: "Where do I subscribe to the inbound stream?", a: "Subscribe to the SMS-Magic Push Topic via CometD or platform events. The Streaming API publishes new inbound records as they're created." },
            { q: "Can I attach a custom action to every inbound?", a: "Yes — write an after-insert trigger on smagicinteract__smsMagic__c filtered to Direction__c = 'IN' and dispatch your custom logic from there." },
          ]}
        />
      </PersonaOnly>

      <Callout variant="info" title="Up next — Auto-Reminders">
        Steps 5 (Auto-Reminders) and 6 (Recurring Alerts) are scheduled for the
        next prototype release.
      </Callout>

      <CopilotButton hint="Want a recommended Desk Layout for inbound recruiter triage? Ask the Copilot." />
    </PageShell>
  );
}
