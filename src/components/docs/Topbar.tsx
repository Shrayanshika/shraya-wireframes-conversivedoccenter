import { Link } from "@tanstack/react-router";
import { Search, Github, Code2, Settings2, ExternalLink } from "lucide-react";
import { usePersona } from "@/lib/persona";

export function Topbar() {
  const { persona, setPersona } = usePersona();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="flex h-14 items-center gap-4 px-4 lg:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-navy-deep">
            <span className="font-display text-sm font-bold text-teal-bright">C</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-base font-bold tracking-tight text-navy-deep">
              Conversive
            </span>
            <span className="hidden text-xs font-medium text-ink-soft sm:inline">/ docs</span>
          </div>
          <span className="ml-1 hidden rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono text-ink-soft md:inline">
            powered by Fern
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-soft" />
            <input
              placeholder="Search docs…"
              className="h-9 w-64 rounded-md border border-border bg-card pl-8 pr-12 text-sm outline-none placeholder:text-ink-soft/70 focus:ring-focus"
            />
            <kbd className="absolute right-2 top-1/2 -translate-y-1/2 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-ink-soft">
              ⌘K
            </kbd>
          </div>

          {/* Persona toggle */}
          <div className="flex items-center rounded-lg border border-border bg-card p-0.5">
            <button
              onClick={() => setPersona("dev")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                persona === "dev"
                  ? "bg-dev text-white shadow-sm"
                  : "text-ink-soft hover:text-foreground"
              }`}
            >
              <Code2 className="h-3.5 w-3.5" /> Developer
            </button>
            <button
              onClick={() => setPersona("admin")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                persona === "admin"
                  ? "bg-admin text-white shadow-sm"
                  : "text-ink-soft hover:text-foreground"
              }`}
            >
              <Settings2 className="h-3.5 w-3.5" /> Admin
            </button>
          </div>

          <a
            href="https://www.beconversive.com"
            target="_blank"
            rel="noreferrer"
            className="hidden lg:inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-ink-soft hover:text-foreground"
          >
            beconversive.com <ExternalLink className="h-3 w-3" />
          </a>
          <a
            href="#"
            className="hidden md:inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-ink-soft hover:bg-muted"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
