export default function SectionTabs({
  categories = [],
  active,
  onChange,
  counts = {},
  variant = 'highlight',
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4" role="tablist">
      {categories.map((category) => {
        const id = typeof category === 'string' ? category : category.id;
        const label = typeof category === 'string' ? category : category.label || category.title;
        const count = counts[id] ?? (typeof category === 'object' ? category.count : undefined);
        const isActive = active === id;

        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(id)}
            className={`group flex items-center gap-2 rounded-lg px-3.5 py-2 font-mono text-xs transition-all duration-200 cursor-pointer ${
              isActive
                ? 'border border-cyan-400/40 bg-cyan-950/40 text-cyan-300 shadow-[0_0_20px_-3px_rgba(0,242,254,0.25)]'
                : 'border border-white/5 bg-charcoal-900/60 text-slate-400 hover:border-white/20 hover:text-white'
            }`}
          >
            <span className="font-sans font-medium text-xs tracking-tight">{label}</span>
            {count !== undefined && (
              <span
                className={`rounded-full px-1.5 py-0.2 font-mono text-[10px] ${
                  isActive
                    ? 'bg-cyan-400/20 text-cyan-200'
                    : 'bg-white/5 text-slate-500 group-hover:text-slate-300'
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
