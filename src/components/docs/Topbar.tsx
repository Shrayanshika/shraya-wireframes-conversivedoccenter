import { Link } from "@tanstack/react-router";
import { Search, Github, Code2, Settings2, ExternalLink } from "lucide-react";
import { usePersona } from "@/lib/persona";

export function Topbar() {
  const { persona, setPersona } = usePersona();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="flex h-14 items-center gap-5 px-4 lg:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-navy-deep">
            <span className="font-display text-sm font-bold text-teal-bright">C</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-[15px] font-semibold tracking-tight text-foreground">
              Conversive
            </span>
            <span className="hidden text-[13px] font-normal text-ink-soft sm:inline">
              Documentation
            </span>
          </div>
          <span className="ml-1 hidden rounded-md border border-border bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-soft md:inline">
            v1.64
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 text-[13px] text-ink-soft">
          <Link
            to="/"
            className="rounded-md px-2.5 py-1.5 font-medium hover:bg-muted hover:text-foreground"
          >
            Guides
          </Link>
          <Link
            to="/api"
            className="rounded-md px-2.5 py-1.5 font-medium hover:bg-muted hover:text-foreground"
          >
            API Reference
          </Link>
          <Link
            to="/messaging-library"
            className="rounded-md px-2.5 py-1.5 font-medium hover:bg-muted hover:text-foreground"
          >
            Library
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2.5">
          <div className="relative hidden md:block">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-soft" />
            <input
              placeholder="Search documentation"
              className="h-8 w-72 rounded-md border border-border bg-card pl-8 pr-14 text-[13px] outline-none transition placeholder:text-ink-soft/70 hover:border-ink-soft/40 focus:border-teal/60 focus:ring-2 focus:ring-teal/15"
            />
            <kbd className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded border border-border bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] text-ink-soft">
              ⌘K
            </kbd>
          </div>

          {/* Persona toggle */}
          <div className="hidden sm:flex items-center rounded-md border border-border bg-card p-0.5">
            <button
              onClick={() => setPersona("dev")}
              className={`flex items-center gap-1.5 rounded-[5px] px-2 py-1 text-[11px] font-semibold transition ${
                persona === "dev"
                  ? "bg-foreground text-background shadow-sm"
                  : "text-ink-soft hover:text-foreground"
              }`}
            >
              <Code2 className="h-3.5 w-3.5" /> Developer
            </button>
            <button
              onClick={() => setPersona("admin")}
              className={`flex items-center gap-1.5 rounded-[5px] px-2 py-1 text-[11px] font-semibold transition ${
                persona === "admin"
                  ? "bg-foreground text-background shadow-sm"
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
            className="hidden xl:inline-flex items-center gap-1 rounded-md px-2 py-1 text-[12px] text-ink-soft hover:text-foreground"
          >
            beconversive.com <ExternalLink className="h-3 w-3" />
          </a>
          <a
            href="#"
            className="hidden md:inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-ink-soft transition hover:border-ink-soft/40 hover:bg-muted"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
