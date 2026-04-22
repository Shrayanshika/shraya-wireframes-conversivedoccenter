import { createFileRoute } from "@tanstack/react-router";
import { PageShell, H2, P } from "@/components/docs/PageShell";
import { Callout } from "@/components/docs/Callout";

export const Route = createFileRoute("/compliance")({
  head: () => ({
    meta: [
      { title: "Compliance & Privacy — Conversive" },
      { name: "description", content: "Conversive's compliance posture: Spam Act, TCPA, GDPR, audit logging and consent guarantees." },
      { property: "og:title", content: "Conversive · Compliance & Privacy" },
      { property: "og:description", content: "How Conversive keeps recruitment SMS compliant by default." },
    ],
  }),
  component: Compliance,
});

function Compliance() {
  return (
    <PageShell
      eyebrow="Reference"
      title="Compliance & Privacy"
      description="Recruitment SMS is regulated. Conversive is built to make compliance the default, not an afterthought."
      breadcrumbs={[{ label: "Docs", to: "/" }, { label: "Compliance" }]}
    >
      <H2 id="frameworks">Regulatory coverage</H2>
      <div className="my-5 grid gap-3 sm:grid-cols-2">
        {[
          { t: "🇦🇺 Australian Spam Act 2003", d: "Express consent, identify-sender, working unsubscribe — all enforced by the Consent Object." },
          { t: "🇺🇸 TCPA + CTIA",               d: "Quiet hours, STOP/HELP/INFO keyword auto-handling, A2P 10DLC compliance." },
          { t: "🇪🇺 GDPR",                       d: "Right-to-erasure API, time-bound consent expiry, EU data residency option." },
          { t: "ISO 27001 + SOC 2 Type II",     d: "Independently audited annually. Reports available under NDA." },
        ].map((c) => (
          <div key={c.t} className="rounded-lg border border-border bg-card p-4">
            <div className="text-sm font-semibold">{c.t}</div>
            <div className="mt-1 text-sm text-ink-soft">{c.d}</div>
          </div>
        ))}
      </div>

      <H2 id="consent">Consent guarantees</H2>
      <P>
        Every send through the Conversive API runs the consent gate first.
        If <code>consent_check: true</code> (the default for marketing
        templates) and no opt-in record exists, the request returns{" "}
        <code>409 Conflict</code> and is logged.
      </P>

      <Callout variant="warn" title="Quiet hours">
        Marketing templates are blocked between <strong>21:00 and 09:00</strong>{" "}
        in the candidate's local timezone. Transactional templates (interview
        confirmations, password resets) bypass this when explicitly flagged.
      </Callout>

      <H2 id="audit">Audit ledger</H2>
      <P>
        Every event — message, consent change, campaign dispatch, recruiter
        action — is written immutably to the Audit ledger. Exports are
        available as CSV or via signed S3 URLs from the API.
      </P>
    </PageShell>
  );
}
