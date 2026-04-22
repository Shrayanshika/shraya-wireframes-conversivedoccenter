export function RightRail({ items }: { items: { id: string; label: string; level?: 2 | 3 }[] }) {
  return (
    <aside className="hidden xl:block w-56 shrink-0">
      <div className="sticky top-20 px-4 py-6">
        <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
          On this page
        </div>
        <ul className="space-y-1.5 border-l border-border">
          {items.map((it) => (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={`block border-l-2 -ml-px pl-3 text-xs text-ink-soft hover:text-foreground hover:border-teal transition ${
                  it.level === 3 ? "pl-5" : ""
                } border-transparent`}
              >
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
