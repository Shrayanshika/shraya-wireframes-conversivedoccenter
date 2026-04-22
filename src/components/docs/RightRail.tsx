export function RightRail({
  items,
}: {
  items: { id: string; label: string; level?: 2 | 3 }[];
}) {
  return (
    <aside className="hidden xl:block w-56 shrink-0">
      <div className="sticky top-20 px-4 py-12">
        <div className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
          On this page
        </div>
        <ul className="space-y-1 border-l border-border">
          {items.map((it) => (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={`-ml-px block border-l-2 border-transparent py-0.5 pl-3 text-[12.5px] text-ink-soft transition hover:border-teal hover:text-foreground ${
                  it.level === 3 ? "pl-5 text-[12px]" : ""
                }`}
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
