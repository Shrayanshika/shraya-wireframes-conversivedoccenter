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
    <div className="my-10 flex flex-col items-start gap-4 overflow-hidden rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-deep text-teal-bright">
          <Sparkles className="h-[18px] w-[18px]" />
        </div>
        <div>
          <div className="font-display text-[14px] font-semibold text-foreground">
            Still have questions?
          </div>
          <div className="mt-0.5 text-[13px] leading-5 text-ink-soft">
            {hint}
          </div>
        </div>
      </div>
      <Link
        to="/"
        className="inline-flex shrink-0 items-center gap-2 rounded-md bg-foreground px-3.5 py-2 text-[13px] font-semibold text-background shadow-sm transition hover:opacity-90"
      >
        {label} <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
