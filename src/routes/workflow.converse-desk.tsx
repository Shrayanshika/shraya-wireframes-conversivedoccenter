import { createFileRoute } from "@tanstack/react-router";
import { PageShell, H2, P } from "@/components/docs/PageShell";
import { Callout } from "@/components/docs/Callout";
import { AudienceSection } from "@/components/docs/PersonaBadge";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Screenshot, VideoTutorials } from "@/components/docs/AdminMedia";
import converseApps from "@/assets/sf-converse-apps.png";

export const Route = createFileRoute("/workflow/converse-desk")({
  head: () => ({
    meta: [
      { title: "1:1 Conversation — Conversive" },
      { name: "description", content: "Handle inbound candidate replies in Converse Desk — Conversive's unified SMS inbox inside Salesforce." },
      { property: "og:title", content: "Step 4 · 1:1 Conversation" },
      { property: "og:description", content: "Converse Desk inbox for candidate Q&A." },
    ],
  }),
  component: ConverseDesk,
});

function ConverseDesk() {
  return (
    <PageShell
      eyebrow="Step 4 · Engagement"
      title="1:1 Conversation in Converse Desk"
      description="When a candidate replies, the message lands in Converse Desk — a Salesforce-native inbox routed to the assigned recruiter. Threads keep full context: candidate record, prior messages, consent status, and AI-suggested replies."
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "Wavelength Workflow" },
        { label: "Converse Desk" },
      ]}
      prev={{ to: "/workflow/bulk-sms", label: "Segment & Bulk SMS" }}
      next={{ to: "/workflow/reminders", label: "Auto-Reminders" }}
    >
      <H2 id="ui">The Converse Desk inbox</H2>
      <P>
        Built as a Lightning Component, Converse Desk drops into any Salesforce
        Console app. Recruiters live here.
      </P>

      <div className="my-6 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
        <div className="grid grid-cols-12">
          {/* Inbox list */}
          <div className="col-span-4 border-r border-border bg-surface-2">
            <div className="border-b border-border px-3 py-2 text-xs font-semibold uppercase tracking-wider text-ink-soft">
              Inbox · 3 new
            </div>
            {[
              { name: "Priya N.", msg: "Yes, I'm available Mon!", time: "2m", unread: true, active: true },
              { name: "Daniel R.", msg: "What's the day rate?", time: "8m", unread: true },
              { name: "Mei T.", msg: "Can you push to Wed?", time: "14m", unread: true },
              { name: "Jordan K.", msg: "Thanks, all set.", time: "1h" },
              { name: "Sara A.", msg: "STOP", time: "2h" },
            ].map((c) => (
              <div
                key={c.name}
                className={`flex items-start gap-2 border-b border-border px-3 py-2.5 ${
                  c.active ? "bg-teal-soft" : "hover:bg-card"
                }`}
              >
                <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-navy-deep text-[10px] font-bold text-teal-bright">
                  {c.name.split(" ").map((s) => s[0]).join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`truncate text-sm ${c.unread ? "font-semibold text-foreground" : "text-ink-soft"}`}>
                      {c.name}
                    </span>
                    <span className="text-[10px] text-ink-soft">{c.time}</span>
                  </div>
                  <div className="truncate text-xs text-ink-soft">{c.msg}</div>
                </div>
                {c.unread && <div className="mt-1 h-2 w-2 rounded-full bg-teal" />}
              </div>
            ))}
          </div>

          {/* Thread */}
          <div className="col-span-8 flex flex-col bg-card">
            <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
              <div>
                <div className="text-sm font-semibold">Priya Naidoo</div>
                <div className="text-xs text-ink-soft">
                  Emergency Medicine · Senior · NSW · <span className="text-[oklch(0.5_0.15_150)]">● Opted-In</span>
                </div>
              </div>
              <div className="text-xs text-ink-soft">
                Sender: <span className="font-mono">+61 480 123 007</span>
              </div>
            </div>
            <div className="flex-1 space-y-3 px-4 py-4">
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-navy-deep px-3 py-2 text-sm text-white">
                  Hi Priya, locum job available for an Emergency Medicine specialist
                  in NSW — 3 days, $2,400/day, starts Mon. Reply YES to shortlist.
                </div>
              </div>
              <div className="flex">
                <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-muted px-3 py-2 text-sm text-foreground">
                  Yes, I'm available Mon! Is accommodation included?
                </div>
              </div>
              <div className="flex">
                <div className="max-w-[80%] rounded-2xl rounded-bl-sm border border-dashed border-teal/40 bg-teal-soft px-3 py-2 text-xs text-navy-deep">
                  <span className="font-semibold">Conversive AI suggests:</span> Yes — Travelodge Sydney, paid by Wavelength. I'll send confirmation shortly.
                </div>
              </div>
            </div>
            <div className="border-t border-border p-3">
              <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-2">
                <input className="flex-1 bg-transparent text-sm outline-none" placeholder="Reply to Priya…" />
                <button className="rounded-md bg-teal px-3 py-1.5 text-xs font-semibold text-white">Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AudienceSection audience="admin" title="Configure Converse Desk for recruiters">
        <P>
          Add the <strong>Converse Desk</strong> Lightning Component to the
          Recruiter Console app. Set <em>routing</em> to <strong>Owner-of-Sender-ID</strong>{" "}
          so each thread auto-assigns to the recruiter who owns the number.
        </P>
        <P>
          Enable <em>AI Reply Suggestions</em> in Converse Settings → <em>AI</em>.
          Suggestions are grounded on the candidate record + prior thread.
        </P>
        <Screenshot
          src={converseApps}
          caption="Converse Desk lives alongside Converse Apps in Salesforce — drop the Lightning Component into the Recruiter Console."
          source={{ label: "sms-magic.co · Converse Desk", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base-category/222converse_desk159/" }}
        />

        <VideoTutorials
          videos={[
            { title: "Converse Desk overview & inbox", href: "https://www.sms-magic.co/docs/salesforce/knowledge-base-category/222converse_desk159/", duration: "4 min" },
            { title: "Routing inbound replies to recruiters", href: "https://www.sms-magic.co/docs/videos/", duration: "3 min" },
            { title: "AI Reply Suggestions setup", href: "https://www.sms-magic.co/docs/videos/", duration: "5 min" },
            { title: "All Conversive video tutorials", href: "https://www.sms-magic.co/docs/videos/" },
          ]}
        />
      </AudienceSection>

      <AudienceSection audience="dev" title="Subscribe to inbound message events">
        <CodeBlock
          tabs={[
            {
              label: "Webhook",
              language: "json",
              code: `// POST {your_listener}/conversive/inbound
{
  "event": "message.inbound",
  "delivered_at": "2026-04-22T09:18:44Z",
  "data": {
    "thread_id": "thr_01HX9F2A",
    "from": "+61412345678",
    "to_sender_id": "+61480123007",
    "body": "Yes, I'm available Mon! Is accommodation included?",
    "candidate_id": "0038x00000XYZ12",
    "recruiter_user_id": "0058x00000ABC1"
  }
}`,
            },
          ]}
        />
      </AudienceSection>
    </PageShell>
  );
}
