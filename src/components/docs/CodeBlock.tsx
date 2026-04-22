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
    <div className="my-5 overflow-hidden rounded-xl border border-border bg-code-bg text-code-fg shadow-sm">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <div className="flex items-center gap-1">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setActive(i)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                i === active
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
          {title && (
            <span className="ml-3 text-xs text-white/50">{title}</span>
          )}
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-white/60 hover:bg-white/10 hover:text-white"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code>{tabs[active].code}</code>
      </pre>
    </div>
  );
}
