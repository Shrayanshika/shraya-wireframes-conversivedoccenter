import { createFileRoute } from "@tanstack/react-router";
import { PageShell, H2, P } from "@/components/docs/PageShell";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/Callout";

export const Route = createFileRoute("/api")({
  head: () => ({
    meta: [
      { title: "API Reference — Conversive" },
      { name: "description", content: "Conversive REST API: messages, consent, campaigns, triggers, schedules, and webhooks." },
      { property: "og:title", content: "Conversive API Reference" },
      { property: "og:description", content: "Endpoints for the Wavelength build." },
    ],
  }),
  component: ApiRef,
});

const endpoints = [
  { method: "POST", path: "/v1/messages",          desc: "Send a single SMS." },
  { method: "POST", path: "/v1/campaigns",         desc: "Dispatch a bulk segmented campaign." },
  { method: "GET",  path: "/v1/consent-status",    desc: "Look up consent for a phone + channel." },
  { method: "POST", path: "/v1/senders/assign",    desc: "Map Sender IDs to Salesforce users." },
  { method: "POST", path: "/v1/triggers",          desc: "Create date-field-driven reminder triggers." },
  { method: "POST", path: "/v1/schedules",         desc: "Schedule recurring messages (RRULE)." },
  { method: "POST", path: "/v1/webhooks",          desc: "Register a listener for events." },
];

const methodColor: Record<string, string> = {
  GET:    "bg-[oklch(0.94_0.06_180)] text-[oklch(0.4_0.13_200)]",
  POST:   "bg-[oklch(0.94_0.06_150)] text-[oklch(0.4_0.14_150)]",
  DELETE: "bg-[oklch(0.94_0.07_30)]  text-[oklch(0.45_0.18_30)]",
};

function ApiRef() {
  return (
    <PageShell
      eyebrow="Reference"
      title="API Reference"
      description="All Conversive endpoints. Bearer-token auth, JSON in/out, signed webhooks. Base URL: api.beconversive.com."
      breadcrumbs={[{ label: "Docs", to: "/" }, { label: "API Reference" }]}
    >
      <Callout variant="info" title="Authentication">
        Send <code>Authorization: Bearer {"<token>"}</code> on every request.
        Tokens are scoped to a single Salesforce org. Rotate from
        Converse Settings → API Keys.
      </Callout>

      <H2 id="endpoints">Endpoints</H2>
      <div className="my-5 overflow-hidden rounded-lg border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted text-xs uppercase text-ink-soft">
            <tr>
              <th className="px-4 py-2 text-left">Method</th>
              <th className="px-4 py-2 text-left">Path</th>
              <th className="px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {endpoints.map((e) => (
              <tr key={e.path + e.method} className="border-t border-border">
                <td className="px-4 py-2">
                  <span className={`rounded px-2 py-0.5 font-mono text-[11px] font-bold ${methodColor[e.method]}`}>
                    {e.method}
                  </span>
                </td>
                <td className="px-4 py-2 font-mono text-xs">{e.path}</td>
                <td className="px-4 py-2 text-ink-soft">{e.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2 id="messages">POST /v1/messages</H2>
      <P>Send a single SMS. Honours consent unless explicitly disabled.</P>
      <CodeBlock
        tabs={[
          {
            label: "Request",
            language: "json",
            code: `{
  "sender_id": "+61480123007",
  "to": "+61412345678",
  "template": "wavelength_locum_alert",
  "merge_fields": {
    "FirstName": "Priya",
    "Specialty": "Emergency Medicine"
  },
  "consent_check": true
}`,
          },
          {
            label: "Response",
            language: "json",
            code: `{
  "id": "msg_01HX9ABCD",
  "status": "queued",
  "sender_id": "+61480123007",
  "to": "+61412345678",
  "estimated_delivery": "2026-04-22T09:14:08Z"
}`,
          },
        ]}
      />

      <H2 id="consent">GET /v1/consent-status</H2>
      <CodeBlock
        tabs={[
          {
            label: "Request",
            language: "bash",
            code: `GET /v1/consent-status?phone=%2B61412345678&channel=sms`,
          },
          {
            label: "Response",
            language: "json",
            code: `{
  "phone": "+61412345678",
  "channel": "sms",
  "status": "opted_in",
  "captured_at": "2026-03-12T04:18:09Z",
  "candidate_id": "0038x00000XYZ12"
}`,
          },
        ]}
      />

      <H2 id="webhooks">Webhook events</H2>
      <P>Subscribe via <code>POST /v1/webhooks</code>. Payloads are HMAC-SHA256-signed.</P>
      <ul className="my-3 space-y-2 text-sm">
        {[
          ["message.delivered", "Carrier-confirmed delivery."],
          ["message.failed",    "Permanent failure (invalid number, etc)."],
          ["message.inbound",   "Candidate replied."],
          ["consent.updated",   "Opt-in/opt-out state changed."],
          ["campaign.completed","All messages in a campaign dispatched."],
        ].map(([e, d]) => (
          <li key={e} className="flex items-baseline gap-3 rounded-md border border-border bg-card px-3 py-2">
            <code className="font-mono text-xs text-teal">{e}</code>
            <span className="text-ink-soft">{d}</span>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
