import { createFileRoute } from "@tanstack/react-router";
import { PageShell, H2, P, Steps, Step } from "@/components/docs/PageShell";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { AudienceSection } from "@/components/docs/PersonaBadge";

export const Route = createFileRoute("/workflow/sender-ids")({
  head: () => ({
    meta: [
      { title: "Assign Sender IDs — Conversive" },
      { name: "description", content: "Map unique Sender IDs to each of 42 recruiters for 1:1 consistent SMS messaging in Salesforce." },
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

      <H2 id="prereqs">Prerequisites</H2>
      <P>
        You'll need an active Conversive org, the <strong>Converse App</strong>
        package installed in Salesforce, and SMS_Admin permission set assigned
        to the user running setup.
      </P>

      <AudienceSection audience="admin" title="Salesforce Console — Search & Assign Sender ID">
        <Steps>
          <Step title="Open the Converse App builder">
            Salesforce → App Launcher → <em>Converse Settings</em> → <strong>Sender ID Management</strong>.
          </Step>
          <Step title="Search the Sender Pool">
            Filter by country (AU), capability (SMS, 2-way), and availability.
            Select 42 long-codes from the pool.
          </Step>
          <Step title="Assign to recruiter Users">
            Drag each number to a Salesforce User record. The mapping is
            written to <code>smagicinteract__SenderID__c</code> and respected
            on every outbound send.
          </Step>
          <Step title="Lock the assignment">
            Toggle <em>Static Routing</em> to <strong>ON</strong> so inbound
            replies always land in the assigned recruiter's Converse Desk inbox.
          </Step>
        </Steps>
        <div className="mt-4 overflow-hidden rounded-lg border border-border bg-surface-2">
          <div className="border-b border-border bg-card px-4 py-2 text-xs font-medium text-ink-soft">
            Salesforce · Sender ID Management
          </div>
          <table className="w-full text-sm">
            <thead className="bg-muted text-xs uppercase text-ink-soft">
              <tr>
                <th className="px-4 py-2 text-left">Sender ID</th>
                <th className="px-4 py-2 text-left">Recruiter</th>
                <th className="px-4 py-2 text-left">Region</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["+61 480 123 007", "Jaspreet Singh", "NSW", "Active"],
                ["+61 480 123 011", "Mei Tan", "VIC", "Active"],
                ["+61 480 123 023", "Liam O'Connor", "QLD", "Active"],
                ["+61 480 123 042", "Ana Cordeiro", "WA", "Active"],
              ].map((r) => (
                <tr key={r[0]} className="border-t border-border">
                  <td className="px-4 py-2 font-mono text-xs">{r[0]}</td>
                  <td className="px-4 py-2">{r[1]}</td>
                  <td className="px-4 py-2 text-ink-soft">{r[2]}</td>
                  <td className="px-4 py-2">
                    <span className="rounded-full bg-[oklch(0.94_0.06_150)] px-2 py-0.5 text-[11px] font-semibold text-[oklch(0.4_0.14_150)]">
                      ● {r[3]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AudienceSection>

      <AudienceSection audience="dev" title="Programmatic assignment via API">
        <P>
          Need to bulk-provision recruiters from your HRIS? Use the Sender
          Assignment endpoint. Conversive will reject duplicate mappings and
          enforce one-to-one routing.
        </P>
        <CodeBlock
          tabs={[
            {
              label: "cURL",
              language: "bash",
              code: `curl -X POST https://api.beconversive.com/v1/senders/assign \\
  -H "Authorization: Bearer $CONVERSIVE_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "assignments": [
      { "sender_id": "+61480123007", "user_id": "0058x00000ABC1", "static_routing": true },
      { "sender_id": "+61480123011", "user_id": "0058x00000ABC2", "static_routing": true }
    ]
  }'`,
            },
            {
              label: "Apex",
              language: "apex",
              code: `List<smagicinteract__SenderID__c> assignments = new List<smagicinteract__SenderID__c>();
for (User u : [SELECT Id, Recruiter_Phone__c FROM User WHERE Profile.Name = 'Recruiter']) {
    assignments.add(new smagicinteract__SenderID__c(
        Name = u.Recruiter_Phone__c,
        smagicinteract__User__c = u.Id,
        smagicinteract__StaticRouting__c = true
    ));
}
insert assignments;`,
            },
          ]}
        />
      </AudienceSection>

      <Callout variant="warn" title="One number, one recruiter">
        Reusing a Sender ID across multiple recruiters breaks 1:1 continuity
        and confuses candidates mid-conversation. Always keep static routing on.
      </Callout>
    </PageShell>
  );
}
