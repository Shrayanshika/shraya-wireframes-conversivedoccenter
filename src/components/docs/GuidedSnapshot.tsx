import { ExternalLink, Image as ImageIcon, PlayCircle, CheckCircle2 } from "lucide-react";

export function GuidedSnapshot({
  src,
  caption,
  step,
  source,
}: {
  src: string;
  caption: string;
  step?: string;
  source?: { label: string; href: string };
}) {
  return (
    <figure className="my-7 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border bg-surface-2/70 px-4 py-2.5 text-[12px]">
        <span className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
          <ImageIcon className="h-3.5 w-3.5" /> Snapshot
          {step && (
            <span className="rounded border border-border bg-card px-1.5 py-0.5 font-sans text-[10px] tracking-normal text-foreground normal-case">
              {step}
            </span>
          )}
        </span>
        {source && (
          <a
            href={source.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-ink-soft transition hover:text-teal"
          >
            {source.label} <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
      <div className="bg-[linear-gradient(180deg,oklch(0.98_0.005_240),oklch(1_0_0))] p-3">
        <img
          src={src}
          alt={caption}
          loading="lazy"
          className="block w-full rounded-md border border-border bg-white"
        />
      </div>
      <figcaption className="border-t border-border bg-surface-2/40 px-4 py-2.5 text-[12.5px] leading-[1.55] text-ink-soft">
        {caption}
      </figcaption>
    </figure>
  );
}

export function VideoCard({
  title,
  href,
  duration,
  source = "sms-magic.co",
}: {
  title: string;
  href: string;
  duration?: string;
  source?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-start gap-3 rounded-lg border border-border bg-card p-3.5 transition hover:border-teal/40 hover:bg-surface-2/50"
    >
      <div className="flex h-12 w-16 shrink-0 items-center justify-center rounded-md bg-navy-deep text-teal-bright">
        <PlayCircle className="h-6 w-6" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[13.5px] font-semibold text-foreground group-hover:text-teal">
          {title}
        </div>
        <div className="mt-1 flex items-center gap-1 text-[11.5px] text-ink-soft">
          {duration && <span>{duration} ·</span>}
          <span className="truncate">{source}</span>
          <ExternalLink className="h-3 w-3" />
        </div>
      </div>
    </a>
  );
}

export function VideoSection({
  title = "Video walkthroughs",
  videos,
}: {
  title?: string;
  videos: { title: string; href: string; duration?: string; source?: string }[];
}) {
  return (
    <div className="my-8">
      <div className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-foreground">
        <PlayCircle className="h-4 w-4 text-ink-soft" /> {title}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {videos.map((v) => (
          <VideoCard key={v.href + v.title} {...v} />
        ))}
      </div>
    </div>
  );
}

export function Prerequisites({
  items,
}: {
  items: { label: string; href?: string; note?: string }[];
}) {
  return (
    <div className="my-6 rounded-lg border border-border bg-surface-2/50 p-4">
      <div className="mb-2.5 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
        <CheckCircle2 className="h-3.5 w-3.5 text-teal" /> Prerequisites
      </div>
      <ul className="space-y-2 text-[13.5px]">
        {items.map((it) => (
          <li key={it.label} className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-[3px] h-3.5 w-3.5 shrink-0 text-teal/80" />
            <span className="leading-[1.55]">
              {it.href ? (
                <a
                  href={it.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-foreground underline decoration-teal/40 underline-offset-2 transition hover:text-teal"
                >
                  {it.label}
                </a>
              ) : (
                <span className="font-medium text-foreground">{it.label}</span>
              )}
              {it.note && (
                <span className="ml-1 text-[12.5px] text-ink-soft">
                  — {it.note}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
