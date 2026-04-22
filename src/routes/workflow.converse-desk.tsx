import { createFileRoute } from "@tanstack/react-router";
import { PageShell, H2, P, Steps, Step } from "@/components/docs/PageShell";
import { Callout } from "@/components/docs/Callout";
import { PersonaOnly } from "@/lib/persona";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { GuidedSnapshot, VideoSection, Prerequisites } from "@/components/docs/GuidedSnapshot";
import { SOPDiagram } from "@/components/docs/SOPDiagram";
import { MessageSquare, Radio, Inbox, Reply } from "lucide-react";
import desk1 from "@/assets/desk1.png";
import desk2 from "@/assets/desk2.png";

export const Route = createFileRoute("/workflow/converse-desk")({
  head: () => ({
    meta: [
      { title: "1:1 Conversation — Conversive" },
      { name: "description", content: "Configure the Converse Desk Layout, theme and recruiter routing for real-time 1:1 candidate conversations inside Salesforce." },
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
      description="When a candidate replies, the inbound message lands in Converse Desk — Conversive's Salesforce-native inbox routed to the assigned recruiter. Define a custom layout with the right filters, set a theme, and let recruiters work the queue."
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "Wavelength Workflow" },
        { label: "Converse Desk" },
      ]}
      prev={{ to: "/workflow/bulk-sms", label: "Segment & Bulk SMS" }}
    >
      <SOPDiagram
        title="1:1 inbound flow"
        caption="An inbound SMS triggers a Salesforce Push Topic, which fires a Converse Desk notification routed to the recruiter who owns the Sender ID."
        nodes={[
          { label: "Incoming SMS", sub: "Candidate reply", icon: MessageSquare },
          { label: "Salesforce Push Topic", sub: "Streaming API", icon: Radio },
          { label: "Converse Desk Notification", sub: "Lightning component", icon: Inbox, tone: "primary" },
          { label: "Recruiter Reply", sub: "Threaded back to sender", icon: Reply, tone: "success" },
        ]}
      />

      <Prerequisites
        items={[
          { label: "Watch · Converse Desk Admin Tutorial (7m)", href: "#video-converse-desk", note: "dummy walkthrough video" },
          { label: "Sender IDs assigned to recruiter Users (see Step 1)", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base/search-and-assign-sender-id/" },
          { label: "Permission Set · SMS_Inbox_User on every recruiter profile" },
        ]}
      />

      <PersonaOnly audience="admin">
        <H2 id="layout">Configure Converse Desk Layout</H2>
        <P>
          Open <strong>Converse App → Conversations → Converse Desk Layouts</strong>{" "}
          and create a layout that defines which Global and Conversation filters
          your recruiters see in the inbox.
        </P>

        <Steps>
          <Step title="Click Create New Layout">
            Under <em>Configure Converse Desk Layout</em>, click{" "}
            <strong>Create New Layout</strong>. The Create New Layout popup opens.
          </Step>
          <Step title="Name the layout">
            Enter a layout name like <code>Wavelength Recruiters</code>.
          </Step>
          <Step title="Pick Global & Conversation Filters">
            Tick relevant Global Filters (Account, Case, Contact, Lead, Opportunity)
            and Conversation Filters (All, Unread, Open Conversations, Follow Ups
            etc.) to scope the inbox to recruiter work.
          </Step>
          <Step title="Assign users / profiles">
            In the bottom search, select the user profiles that should see this
            layout, then click <strong>Save</strong>.
          </Step>
          <Step title="Theme the desk">
            Switch to the <strong>Conversations</strong> tab. Under{" "}
            <em>Color · Select a color or pattern for the desk theme</em>,
            pick the brand swatch and click <em>Preview Theme</em>.
          </Step>
        </Steps>

        <GuidedSnapshot
          step="Snapshot 1"
          src={desk1}
          caption="Create New Layout popup — name the layout, pick Global Filters (Account, Case, Contact, Lead, Opportunity) and Conversation Filters (All, Unread, Closed, etc.) and assign users / profiles."
          source={{ label: "sms-magic.co · Conversations Guide", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base-category/222converse_desk159/" }}
        />
        <GuidedSnapshot
          step="Snapshot 2"
          src={desk2}
          caption="Conversations tab — Converse Desk Layouts, Message Settings and General Settings sub-tabs. The Color section themes the desk for recruiters."
          source={{ label: "sms-magic.co · Converse Desk", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base-category/222converse_desk159/" }}
        />

        <VideoSection
          videos={[
            { title: "Converse Desk Admin Tutorial (official)", href: "https://www.sms-magic.co/docs/videos/", duration: "7 min" },
            { title: "Conversations Guide overview", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base-category/222converse_desk159/", duration: "5 min" },
            { title: "Routing inbound replies", href: "https://www.sms-magic.co/docs/videos/", duration: "3 min" },
          ]}
        />
      </PersonaOnly>

      <PersonaOnly audience="dev">
        <H2 id="dev">Bidirectional logic</H2>
        <P>
          Outgoing replies are inserted into <code>smagicinteract__smsMagic__c</code>
          with <code>Direction__c = 'OUT'</code>. Inbound messages arrive on the
          incoming webhook and create a thread record automatically.
        </P>
        <CodeBlock
          tabs={[
            {
              label: "Apex / Code",
              language: "apex",
              code: `// Outgoing reply
smagicinteract__smsMagic__c reply = new smagicinteract__smsMagic__c();
reply.smagicinteract__Direction__c = 'OUT';
reply.smagicinteract__SMSText__c   = 'The hospital is in Shoalhaven, Tim.';
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
        <P className="text-xs text-ink-soft">
          Reference: <a className="text-teal underline" target="_blank" rel="noreferrer" href="https://www.sms-magic.co/docs/developers/knowledge-base-category/sms-magic-for-developers/">SMS-Magic Developer Knowledge Base</a>.
        </P>
      </PersonaOnly>

      <Callout variant="info" title="Up next — Auto-Reminders">
        Steps 5 (Auto-Reminders) and 6 (Recurring Alerts) are scheduled for the
        next prototype release. They'll showcase <code>@future(callout=true)</code>
        and <code>Schedulable</code> patterns for dev, and the Message Automation
        Library for admins.
      </Callout>
    </PageShell>
  );
}
