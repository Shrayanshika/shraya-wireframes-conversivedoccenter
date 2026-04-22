import { ExternalLink, Image as ImageIcon, PlayCircle, Lock } from "lucide-react";

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
    <figure className="my-5 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-2 text-xs text-ink-soft">
        <span className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-wider text-teal">
          <ImageIcon className="h-3.5 w-3.5" /> Guided Snapshot
          {step && <span className="ml-1 rounded bg-teal/10 px-1.5 py-0.5 text-[10px] text-navy-deep">{step}</span>}
        </span>
        {source && (
          <a
            href={source.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 hover:text-teal"
          >
            {source.label} <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
      <img src={src} alt={caption} loading="lazy" className="block w-full bg-white" />
      <figcaption className="border-t border-border bg-surface-2 px-4 py-2 text-xs text-ink-soft">
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
      className="group flex items-start gap-3 rounded-lg border border-border bg-card p-3 transition hover:border-teal/40 hover:bg-surface-2"
    >
      <div className="flex h-12 w-16 shrink-0 items-center justify-center rounded-md bg-navy-deep text-teal-bright">
        <PlayCircle className="h-6 w-6" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold text-foreground group-hover:text-teal">
          {title}
        </div>
        <div className="mt-0.5 flex items-center gap-1 text-xs text-ink-soft">
          {duration && <span>{duration} · </span>}
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
    <div className="my-6">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
        <PlayCircle className="h-4 w-4 text-teal" /> {title}
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
    <div className="my-5 rounded-lg border border-dashed border-border bg-surface-2 p-4">
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-soft">
        <Lock className="h-3.5 w-3.5" /> Prerequisites
      </div>
      <ul className="space-y-1.5 text-sm">
        {items.map((it) => (
          <li key={it.label} className="flex items-start gap-2 text-ink-soft">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
            <span>
              {it.href ? (
                <a
                  href={it.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-navy-deep underline decoration-teal/40 underline-offset-2 hover:text-teal"
                >
                  {it.label}
                </a>
              ) : (
                <span className="font-medium text-foreground">{it.label}</span>
              )}
              {it.note && <span className="ml-1 text-xs text-ink-soft">— {it.note}</span>}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-3 text-[11px] italic text-ink-soft">
        Placeholder links for prototype walkthrough.
      </div>
    </div>
  );
}
