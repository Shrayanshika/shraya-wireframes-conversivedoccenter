import { Link } from "@tanstack/react-router";
import { Sparkles, ArrowRight } from "lucide-react";

export function CopilotButton({
  label = "Ask the Conversive Copilot",
  hint = "Have a follow-up question? Jump back to the Copilot for a tailored answer.",
}: {
  label?: string;
  hint?: string;
}) {
  return (
    <div className="my-8 flex flex-col items-start gap-3 rounded-2xl border border-teal/20 bg-gradient-to-br from-teal-soft to-card p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-deep text-teal-bright">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <div className="font-display text-sm font-semibold text-navy-deep">
            Still stuck?
          </div>
          <div className="text-xs text-ink-soft">{hint}</div>
        </div>
      </div>
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-lg bg-navy-deep px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-navy"
      >
        {label} <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
