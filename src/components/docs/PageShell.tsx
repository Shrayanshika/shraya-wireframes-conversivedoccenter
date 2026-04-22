import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight, ArrowRight, ArrowLeft } from "lucide-react";

export function PageShell({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
  prev,
  next,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: { label: string; to?: string }[];
  children: ReactNode;
  prev?: { to: string; label: string };
  next?: { to: string; label: string };
}) {
  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-12 lg:px-12">
      {breadcrumbs && (
        <nav className="mb-5 flex items-center gap-1 text-[12px] text-ink-soft">
          {breadcrumbs.map((b, i) => (
            <span key={i} className="flex items-center gap-1">
              {b.to ? (
                <Link to={b.to} className="hover:text-foreground">
                  {b.label}
                </Link>
              ) : (
                <span className="text-foreground">{b.label}</span>
              )}
              {i < breadcrumbs.length - 1 && (
                <ChevronRight className="h-3 w-3 text-ink-soft/60" />
              )}
            </span>
          ))}
        </nav>
      )}
      {eyebrow && (
        <div className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-teal">
          {eyebrow}
        </div>
      )}
      <h1 className="font-display text-[32px] font-semibold leading-[1.15] tracking-tight text-foreground sm:text-[38px]">
        {title}
      </h1>
      {description && (
        <p className="mt-4 text-[15px] leading-7 text-ink-soft">
          {description}
        </p>
      )}

      <hr className="mt-8 border-border" />

      <div className="prose-conversive mt-8 space-y-4 text-[15px] leading-[1.7] text-foreground">
        {children}
      </div>

      {(prev || next) && (
        <div className="mt-16 grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
          {prev ? (
            <Link
              to={prev.to}
              className="group flex flex-col gap-1 rounded-lg border border-border bg-card p-4 transition hover:border-teal/40 hover:bg-surface-2/50"
            >
              <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-ink-soft">
                <ArrowLeft className="h-3 w-3" /> Previous
              </span>
              <span className="text-[14px] font-semibold text-foreground group-hover:text-teal">
                {prev.label}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              to={next.to}
              className="group flex flex-col items-end gap-1 rounded-lg border border-border bg-card p-4 text-right transition hover:border-teal/40 hover:bg-surface-2/50"
            >
              <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-ink-soft">
                Next <ArrowRight className="h-3 w-3" />
              </span>
              <span className="text-[14px] font-semibold text-foreground group-hover:text-teal">
                {next.label}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      )}
    </article>
  );
}

export function H2({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="mt-12 scroll-mt-20 font-display text-[22px] font-semibold tracking-tight text-foreground"
    >
      {children}
    </h2>
  );
}

export function H3({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h3
      id={id}
      className="mt-7 scroll-mt-20 font-display text-[16px] font-semibold text-foreground"
    >
      {children}
    </h3>
  );
}

export function P({ children }: { children: ReactNode }) {
  return (
    <p className="text-[15px] leading-[1.75] text-ink-soft">{children}</p>
  );
}

export function Steps({ children }: { children: ReactNode }) {
  return (
    <ol className="my-6 space-y-5 border-l border-border pl-7 [counter-reset:step]">
      {children}
    </ol>
  );
}

export function Step({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <li className="relative [counter-increment:step]">
      <span
        aria-hidden
        className="absolute -left-[34px] flex h-[22px] w-[22px] items-center justify-center rounded-full border border-border bg-card font-mono text-[10px] font-semibold text-foreground before:content-[counter(step)]"
      />
      <div className="text-[14px] font-semibold text-foreground">{title}</div>
      {children && (
        <div className="mt-1 text-[14px] leading-[1.7] text-ink-soft">
          {children}
        </div>
      )}
    </li>
  );
}
