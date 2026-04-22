import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, H2, P } from "@/components/docs/PageShell";
import { Callout } from "@/components/docs/Callout";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/salesforce")({
  head: () => ({
    meta: [
      { title: "Salesforce Integration — Conversive" },
      { name: "description", content: "Configure Conversive inside Salesforce — Converse App builder, permission sets, audit DB, and user management." },
      { property: "og:title", content: "Conversive · Salesforce Integration" },
      { property: "og:description", content: "Admin guide for the Converse App." },
    ],
  }),
  component: Salesforce,
});

function Salesforce() {
  return (
    <PageShell
      eyebrow="Reference"
      title="Salesforce Integration"
      description="The Converse App is Conversive's primary configuration engine inside Salesforce. This guide walks the org-level setup an admin needs to support 42 recruiters and a compliant Audit Database."
      breadcrumbs={[{ label: "Docs", to: "/" }, { label: "Salesforce Integration" }]}
    >
      <Callout variant="info" title="Admin-first guide">
        Switch to the <strong>Admin</strong> persona in the top bar to see screenshots
        and Salesforce Setup screens. Developers can stay on Dev mode for object schemas.
      </Callout>

      <H2 id="install">Install the Converse App</H2>
      <P>
        Install the managed package from AppExchange (<em>Conversive — Converse App</em>),
        then assign the <code>Converse_Admin</code> and <code>Converse_Recruiter</code>{" "}
        permission sets.
      </P>

      <H2 id="users">User Management — 42 recruiter Sender IDs</H2>
      <P>
        Each recruiter User needs a unique mobile-capable number from your Sender Pool.
        Manage these in <strong>Converse Settings → Sender ID Management</strong>{" "}
        (see <Link to="/workflow/sender-ids" className="text-teal underline">Step 1</Link>).
      </P>

      <div className="my-5 grid gap-4 sm:grid-cols-2">
        {[
          { t: "Permission Sets", d: "Converse_Admin · Converse_Recruiter · Converse_Compliance" },
          { t: "Profiles", d: "Recruiter, Recruitment Manager, Payroll" },
          { t: "Object access", d: "Candidate__c · Consent__c · Conversation__c · AuditLog__c" },
          { t: "App Builder", d: "Converse Desk Lightning Component placed on Recruiter Console" },
        ].map((c) => (
          <div key={c.t} className="rounded-lg border border-border bg-card p-4">
            <div className="text-sm font-semibold">{c.t}</div>
            <div className="mt-1 text-sm text-ink-soft">{c.d}</div>
          </div>
        ))}
      </div>

      <H2 id="audit">Audit Database setup</H2>
      <P>
        Enable <strong>Audit Mode</strong> in Converse Settings to write every
        outbound, inbound, and consent event to a partitioned{" "}
        <code>conversive__AuditLog__c</code> table. Recommended retention:
        7 years for healthcare placements.
      </P>

      <Callout variant="warn" title="Field-Level Security">
        Restrict the Audit object to the <code>Converse_Compliance</code>
        permission set. Recruiters should never have direct edit access.
      </Callout>

      <H2 id="videos">Video tutorials</H2>
      <ul className="my-3 space-y-2 text-sm">
        {[
          ["Installing the Converse App", "https://www.sms-magic.co/docs/videos/"],
          ["Configuring Sender IDs", "https://www.sms-magic.co/docs/salesforce/knowledge-base/configure-a-converse-app/"],
          ["Building your first Campaign", "https://www.sms-magic.co/docs/salesforce/knowledge-base/configure-run-sms-campaign-button-in-classic/"],
        ].map(([title, href]) => (
          <li key={title}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-2 hover:border-teal/40"
            >
              ▶ {title} <ExternalLink className="h-3 w-3 text-ink-soft" />
            </a>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
