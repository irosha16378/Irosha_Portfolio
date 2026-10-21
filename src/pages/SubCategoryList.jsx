import { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Search, 
  SlidersHorizontal, 
  Cpu, 
  Factory, 
  Bot, 
  Brain, 
  GraduationCap, 
  Award, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import Card from '../components/Card.jsx';

const categoryIcons = {
  'embedded-systems': Cpu,
  'industrial-automation': Factory,
  'robotics': Bot,
  'machine-learning': Brain,
  'qualifications': GraduationCap,
  'courses': Award,
  'passions': Sparkles,
};

export default function SubCategoryList({
  categoryMeta,
  allCategories = [],
  onSelectCategory,
  onSelectItem,
  onBackToHome,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('ALL');

  const IconComponent = categoryIcons[categoryMeta?.id] || Layers;

  // Extract all unique tags across items in this category
  const allTags = useMemo(() => {
    if (!categoryMeta?.items) return [];
    const tagSet = new Set();
    categoryMeta.items.forEach((item) => {
      (item.technologies || item.skillsAcquired || item.coursesTaken || []).forEach((tag) => {
        tagSet.add(tag);
      });
    });
    return Array.from(tagSet);
  }, [categoryMeta]);

  // Filter items based on search and tag
  const filteredItems = useMemo(() => {
    if (!categoryMeta?.items) return [];
    return categoryMeta.items.filter((item) => {
      const matchesSearch = typeof item.matchesSearch === 'function'
        ? item.matchesSearch(searchQuery)
        : (
            item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.summary?.toLowerCase().includes(searchQuery.toLowerCase())
          );

      const itemTags = item.technologies || item.skillsAcquired || item.coursesTaken || [];
      const matchesTag = selectedTag === 'ALL' || itemTags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [categoryMeta, searchQuery, selectedTag]);

  const color = categoryMeta?.highlightColor || 'cyan';

  // Group categories for distinct switcher
  const engineeringTracks = allCategories.filter((c) => 
    ['embedded-systems', 'industrial-automation', 'robotics', 'machine-learning'].includes(c.id)
  );
  const educationTracks = allCategories.filter((c) => c.id === 'qualifications');
  const courseTracks = allCategories.filter((c) => c.id === 'courses');
  const passionTracks = allCategories.filter((c) => c.id === 'passions');

  return (
    <div className="relative min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background ambient glow */}
      <div 
        className="pointer-events-none fixed top-20 right-1/3 -z-10 h-80 w-80 rounded-full opacity-15 blur-[120px]"
        style={{
          background: color === 'cyan' ? '#00f2fe' : 
                      color === 'teal' ? '#00e5b9' : 
                      color === 'blue' ? '#3b82f6' : 
                      color === 'violet' ? '#8b5cf6' : 
                      color === 'amber' ? '#f59e0b' : 
                      color === 'emerald' ? '#10b981' : '#f43f5e'
        }}
      />

      {/* Top Breadcrumb & Return to Home */}
      <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-8">
        <button
          onClick={onBackToHome}
          className="group inline-flex items-center gap-2 font-mono text-xs text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-charcoal-900/60 group-hover:border-cyan-400/40">
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          </div>
          <span>Return to Highlights Overview</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-slate-500">
          <span>PORTFOLIO</span>
          <span>/</span>
          <span className="text-cyan-400 uppercase">{categoryMeta?.shortTitle || categoryMeta?.title}</span>
        </div>
      </div>

      {/* Category Hero Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-charcoal-900/80 text-cyan-400 shadow-[0_0_25px_-5px_rgba(0,242,254,0.3)]">
            <IconComponent size={24} />
          </div>
          <div>
            <span className="font-mono text-xs text-cyan-400 tracking-wider uppercase">
              {categoryMeta?.accentBadge || 'Category Section'}
            </span>
            <span className="mx-2 text-slate-600 font-mono">·</span>
            <span className="font-mono text-xs text-slate-400">
              {categoryMeta?.count || 0} {categoryMeta?.count === 1 ? 'Record' : 'Records'}
            </span>
          </div>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white mb-3">
          {categoryMeta?.title}
        </h1>

        <p className="font-mono text-sm text-cyan-300/80 mb-3">
          {categoryMeta?.subtitle}
        </p>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
          {categoryMeta?.description}
        </p>
      </div>

      {/* Switcher Bar: Distinctly separated groups */}
      <div className="mb-8 overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4 min-w-max">
          
          {/* Group 1: Engineering Projects */}
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-wider mr-1">
              ENGINEERING:
            </span>
            {engineeringTracks.map((cat) => {
              const isActive = cat.id === categoryMeta?.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory && onSelectCategory(cat.id)}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'border border-cyan-400/40 bg-cyan-950/60 text-cyan-300 shadow-[0_0_15px_-3px_rgba(0,242,254,0.3)]'
                      : 'border border-white/5 bg-charcoal-900/60 text-slate-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <span>{cat.shortTitle || cat.title}</span>
                  <span className="rounded-full bg-white/5 px-1.5 py-0.2 text-[10px] text-slate-400">
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          <span className="text-slate-700">|</span>

          {/* Group 2: Formal Education */}
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider mr-1">
              ACADEMIC:
            </span>
            {educationTracks.map((cat) => {
              const isActive = cat.id === categoryMeta?.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory && onSelectCategory(cat.id)}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'border border-emerald-500/50 bg-emerald-950/60 text-emerald-300 shadow-[0_0_15px_-3px_rgba(16,185,129,0.3)]'
                      : 'border border-white/5 bg-charcoal-900/60 text-slate-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <span>{cat.shortTitle}</span>
                  <span className="rounded-full bg-white/5 px-1.5 py-0.2 text-[10px] text-slate-400">
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          <span className="text-slate-700">|</span>

          {/* Group 3: Technical Courses */}
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[10px] text-amber-400 uppercase tracking-wider mr-1">
              COURSES:
            </span>
            {courseTracks.map((cat) => {
              const isActive = cat.id === categoryMeta?.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory && onSelectCategory(cat.id)}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'border border-amber-500/50 bg-amber-950/60 text-amber-300 shadow-[0_0_15px_-3px_rgba(245,158,11,0.3)]'
                      : 'border border-white/5 bg-charcoal-900/60 text-slate-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <span>{cat.shortTitle}</span>
                  <span className="rounded-full bg-white/5 px-1.5 py-0.2 text-[10px] text-slate-400">
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          <span className="text-slate-700">|</span>

          {/* Group 4: Passions / Beyond Code */}
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[10px] text-rose-400 uppercase tracking-wider mr-1">
              BEYOND:
            </span>
            {passionTracks.map((cat) => {
              const isActive = cat.id === categoryMeta?.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory && onSelectCategory(cat.id)}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'border border-rose-500/50 bg-rose-950/60 text-rose-300 shadow-[0_0_15px_-3px_rgba(244,63,94,0.3)]'
                      : 'border border-white/5 bg-charcoal-900/60 text-slate-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <span>{cat.shortTitle}</span>
                  <span className="rounded-full bg-white/5 px-1.5 py-0.2 text-[10px] text-slate-400">
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* Search & Tag Filter Toolbar */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={`Search ${categoryMeta?.shortTitle || 'items'} by name, keyword, or tech...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-charcoal-900/80 py-2.5 pl-10 pr-4 font-mono text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 backdrop-blur-md transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          <div className="font-mono text-xs text-slate-400 text-right">
            Showing <span className="text-white font-medium">{filteredItems.length}</span> of {categoryMeta?.items?.length || 0}
          </div>
        </div>

        {/* Tech Tag Pills (if available) */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 mr-1">
              Filter by:
            </span>
            <button
              onClick={() => setSelectedTag('ALL')}
              className={`rounded-md px-2.5 py-1 font-mono text-[11px] transition-all cursor-pointer ${
                selectedTag === 'ALL'
                  ? 'border border-cyan-400/40 bg-cyan-950/60 text-cyan-300'
                  : 'border border-white/5 bg-charcoal-900/60 text-slate-400 hover:text-white'
              }`}
            >
              All Tags
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? 'ALL' : tag)}
                className={`rounded-md px-2.5 py-1 font-mono text-[11px] transition-all cursor-pointer ${
                  selectedTag === tag
                    ? 'border border-cyan-400/40 bg-cyan-950/60 text-cyan-300 shadow-[0_0_12px_-2px_rgba(0,242,254,0.3)]'
                    : 'border border-white/5 bg-charcoal-900/60 text-slate-400 hover:text-white hover:border-white/15'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Items Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              item={item}
              type={categoryMeta?.shortTitle}
              accentColor={categoryMeta?.highlightColor}
              onClick={() => onSelectItem && onSelectItem(item)}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-white/10 bg-charcoal-900/40 p-12 text-center backdrop-blur-xl">
          <p className="font-display text-lg text-white mb-2">No matching items found</p>
          <p className="font-mono text-xs text-slate-400 mb-4">
            Try adjusting your search query "{searchQuery}" or clearing tag filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTag('ALL');
            }}
            className="rounded-lg border border-cyan-500/30 bg-cyan-950/40 px-4 py-2 font-mono text-xs text-cyan-300 hover:bg-cyan-900/50 transition-all cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
