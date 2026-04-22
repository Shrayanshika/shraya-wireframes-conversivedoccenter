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
    <article className="mx-auto w-full max-w-3xl px-4 py-10 lg:px-10">
      {breadcrumbs && (
        <nav className="mb-4 flex items-center gap-1 text-xs text-ink-soft">
          {breadcrumbs.map((b, i) => (
            <span key={i} className="flex items-center gap-1">
              {b.to ? (
                <Link to={b.to} className="hover:text-foreground">{b.label}</Link>
              ) : (
                <span>{b.label}</span>
              )}
              {i < breadcrumbs.length - 1 && <ChevronRight className="h-3 w-3" />}
            </span>
          ))}
        </nav>
      )}
      {eyebrow && (
        <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-teal">
          {eyebrow}
        </div>
      )}
      <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="mt-3 text-base text-ink-soft">{description}</p>
      )}

      <div className="prose-conversive mt-8 space-y-4 text-[15px] leading-7 text-foreground">
        {children}
      </div>

      {(prev || next) && (
        <div className="mt-14 grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
          {prev ? (
            <Link
              to={prev.to}
              className="group flex flex-col gap-1 rounded-lg border border-border bg-card p-4 transition hover:border-teal/40"
            >
              <span className="flex items-center gap-1 text-xs text-ink-soft">
                <ArrowLeft className="h-3 w-3" /> Previous
              </span>
              <span className="font-semibold text-foreground group-hover:text-teal">
                {prev.label}
              </span>
            </Link>
          ) : <div />}
          {next ? (
            <Link
              to={next.to}
              className="group flex flex-col items-end gap-1 rounded-lg border border-border bg-card p-4 text-right transition hover:border-teal/40"
            >
              <span className="flex items-center gap-1 text-xs text-ink-soft">
                Next <ArrowRight className="h-3 w-3" />
              </span>
              <span className="font-semibold text-foreground group-hover:text-teal">
                {next.label}
              </span>
            </Link>
          ) : <div />}
        </div>
      )}
    </article>
  );
}

export function H2({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2 id={id} className="mt-10 scroll-mt-20 font-display text-xl font-bold tracking-tight text-foreground">
      {children}
    </h2>
  );
}

export function H3({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h3 id={id} className="mt-6 scroll-mt-20 font-display text-base font-semibold text-foreground">
      {children}
    </h3>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="text-[15px] leading-7 text-ink-soft">{children}</p>;
}

export function Steps({ children }: { children: ReactNode }) {
  return (
    <ol className="my-6 space-y-4 border-l-2 border-border pl-6 [counter-reset:step]">
      {children}
    </ol>
  );
}

export function Step({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <li className="relative [counter-increment:step]">
      <span
        aria-hidden
        className="absolute -left-[34px] flex h-6 w-6 items-center justify-center rounded-full bg-navy-deep font-display text-[11px] font-bold text-teal-bright before:content-[counter(step)]"
      />
      <div className="font-semibold text-foreground">{title}</div>
      {children && <div className="mt-1 text-sm text-ink-soft">{children}</div>}
    </li>
  );
}
