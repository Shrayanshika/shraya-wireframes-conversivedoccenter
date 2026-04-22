import { useState } from "react";
import { Check, Copy } from "lucide-react";

type Tab = { label: string; language: string; code: string };

export function CodeBlock({ tabs, title }: { tabs: Tab[]; title?: string }) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(tabs[active].code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-navy/15 bg-code-bg text-code-fg shadow-[0_1px_0_oklch(0_0_0/0.04),0_8px_24px_-12px_oklch(0.22_0.06_260/0.25)]">
      <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.02] px-3 py-1.5">
        <div className="flex items-center gap-1">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setActive(i)}
              className={`relative rounded-md px-2.5 py-1 font-mono text-[11px] font-medium transition ${
                i === active
                  ? "bg-white/10 text-white"
                  : "text-white/55 hover:bg-white/5 hover:text-white/90"
              }`}
            >
              {t.label}
            </button>
          ))}
          {title && (
            <span className="ml-3 font-mono text-[11px] text-white/40">
              {title}
            </span>
          )}
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] text-white/55 transition hover:bg-white/10 hover:text-white"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-teal-bright" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-[1.65]">
        <code>{tabs[active].code}</code>
      </pre>
    </div>
  );
}
