export default function SectionTabs({ categories, active, onChange, counts }) {
  return (
    <div className="project-tabs" role="tablist" aria-label="Filter projects by engineering track">
      {categories.map((category) => (
        <button
          key={category}
          className={`project-tab ${active === category ? 'active' : ''}`}
          id={`tab-${category.toLowerCase().replaceAll(' ', '-')}`}
          type="button"
          role="tab"
          aria-selected={active === category}
          onClick={() => onChange(category)}
        >
          {category}<span className="tab-count">{counts[category]}</span>
        </button>
      ))}
    </div>
  );
}
