import { ExternalLink, PlayCircle, ImageIcon } from "lucide-react";

export function Screenshot({
  src,
  caption,
  source,
}: {
  src: string;
  caption: string;
  source?: { label: string; href: string };
}) {
  return (
    <figure className="my-5 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-2 text-xs text-ink-soft">
        <span className="inline-flex items-center gap-1.5 font-medium">
          <ImageIcon className="h-3.5 w-3.5" /> Salesforce screenshot
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
      <img
        src={src}
        alt={caption}
        loading="lazy"
        className="block w-full bg-white"
      />
      <figcaption className="border-t border-border bg-surface-2 px-4 py-2 text-xs text-ink-soft">
        {caption}
      </figcaption>
    </figure>
  );
}

export type VideoItem = { title: string; href: string; duration?: string };

export function VideoTutorials({
  title = "Video tutorials",
  videos,
}: {
  title?: string;
  videos: VideoItem[];
}) {
  return (
    <div className="my-6">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
        <PlayCircle className="h-4 w-4 text-teal" />
        {title}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {videos.map((v) => (
          <a
            key={v.href}
            href={v.href}
            target="_blank"
            rel="noreferrer"
            className="group flex items-start gap-3 rounded-lg border border-border bg-card p-3 transition hover:border-teal/40 hover:bg-surface-2"
          >
            <div className="flex h-12 w-16 shrink-0 items-center justify-center rounded-md bg-navy-deep text-teal-bright">
              <PlayCircle className="h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-foreground group-hover:text-teal">
                {v.title}
              </div>
              <div className="mt-0.5 flex items-center gap-1 text-xs text-ink-soft">
                {v.duration && <span>{v.duration} · </span>}
                <span className="truncate">sms-magic.co</span>
                <ExternalLink className="h-3 w-3" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
