import { useState } from 'react';
import { 
  ArrowDownRight, 
  ArrowRight, 
  Cpu, 
  Factory, 
  Bot, 
  Brain, 
  GraduationCap, 
  Award, 
  Sparkles, 
  Layers,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import TechnicalSkills from '../components/TechnicalSkills.jsx';
import Contact from '../components/Contact.jsx';

const categoryIcons = {
  'embedded-systems': Cpu,
  'industrial-automation': Factory,
  'robotics': Bot,
  'machine-learning': Brain,
  'qualifications': GraduationCap,
  'courses': Award,
  'passions': Sparkles,
};

const categoryGlowClasses = {
  cyan: 'hover:border-cyan-400/50 hover:shadow-[0_0_35px_-5px_rgba(0,242,254,0.35)]',
  teal: 'hover:border-teal-400/50 hover:shadow-[0_0_35px_-5px_rgba(0,229,185,0.35)]',
  blue: 'hover:border-blue-400/50 hover:shadow-[0_0_35px_-5px_rgba(59,130,246,0.35)]',
  violet: 'hover:border-violet-400/50 hover:shadow-[0_0_35px_-5px_rgba(139,92,246,0.35)]',
  emerald: 'hover:border-emerald-400/50 hover:shadow-[0_0_35px_-5px_rgba(16,185,129,0.35)]',
  amber: 'hover:border-amber-400/50 hover:shadow-[0_0_35px_-5px_rgba(245,158,11,0.35)]',
  rose: 'hover:border-rose-400/50 hover:shadow-[0_0_35px_-5px_rgba(244,63,94,0.35)]',
};

const categoryBadgeStyles = {
  cyan: 'text-cyan-400 bg-cyan-950/40 border-cyan-500/30',
  teal: 'text-teal-400 bg-teal-950/40 border-teal-500/30',
  blue: 'text-blue-400 bg-blue-950/40 border-blue-500/30',
  violet: 'text-violet-400 bg-violet-950/40 border-violet-500/30',
  emerald: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30',
  amber: 'text-amber-400 bg-amber-950/40 border-amber-500/30',
  rose: 'text-rose-400 bg-rose-950/40 border-rose-500/30',
};

export default function Home({
  categories = [],
  onSelectCategory,
}) {
  const scrollToTracks = () => {
    const el = document.getElementById('highlight-tracks');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative">
      
      {/* Hero Section */}
      <Hero onExploreTracks={scrollToTracks} />

      {/* Main Section Divider */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="highlight-tracks">
        <div className="flex items-center justify-between border-y border-white/10 py-4 font-mono text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-semibold">01</span>
            <span className="text-slate-300">SYSTEM TRACKS</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-500">7 SPECIALIZED DISCIPLINES</span>
          </div>
          <ArrowDownRight size={14} className="text-cyan-400" />
        </div>
      </div>

      {/* 7 HIGHLIGHT CATEGORY CARDS SECTION */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-cyan-400">
                MULTI-LEVEL ENGINEERING PORTFOLIO
              </span>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white">
                Choose a track to <span className="text-cyan-400">explore in depth.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm text-slate-300 leading-relaxed">
              Click any category highlight card below to route directly to its dedicated sub-page featuring project specs, schematics, system architecture, and media previews.
            </p>
          </div>

          {/* Grid of the 7 Main Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {categories.map((cat, index) => {
              const IconComponent = categoryIcons[cat.id] || Layers;
              const color = cat.highlightColor || 'cyan';
              const glowClass = categoryGlowClasses[color] || categoryGlowClasses.cyan;
              const badgeStyle = categoryBadgeStyles[color] || categoryBadgeStyles.cyan;
              const isLarge = index === 0 || index === 3; // visually dynamic layout

              return (
                <div
                  key={cat.id}
                  onClick={() => onSelectCategory && onSelectCategory(cat.id)}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-charcoal-900/70 p-7 backdrop-blur-xl transition-all duration-300 cursor-pointer ${glowClass} ${
                    isLarge ? 'md:col-span-2 lg:col-span-1' : ''
                  }`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectCategory && onSelectCategory(cat.id);
                    }
                  }}
                >
                  {/* Background ambient corner glow */}
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-10 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
                    style={{
                      background: color === 'cyan' ? '#00f2fe' : 
                                  color === 'teal' ? '#00e5b9' : 
                                  color === 'blue' ? '#3b82f6' : 
                                  color === 'violet' ? '#8b5cf6' : 
                                  color === 'amber' ? '#f59e0b' : 
                                  color === 'emerald' ? '#10b981' : '#f43f5e'
                    }}
                  />

                  {/* Card Header: Icon, Number, Badge */}
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-11 w-11 items-center justify-center rounded-xl border bg-charcoal-850 transition-transform duration-300 group-hover:scale-105 ${badgeStyle}`}>
                          <IconComponent size={22} />
                        </div>
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-wide ${badgeStyle}`}>
                          {cat.accentBadge}
                        </span>
                      </div>
                      <span className="font-mono text-sm font-semibold text-slate-600">0{index + 1}</span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="font-display text-xl sm:text-2xl font-medium tracking-tight text-white transition-colors duration-200 group-hover:text-cyan-200">
                      {cat.title}
                    </h3>

                    <p className="mt-1 font-mono text-xs text-cyan-300/80">
                      {cat.subtitle}
                    </p>

                    {/* Description */}
                    <p className="mt-3 text-xs sm:text-sm text-slate-300/80 leading-relaxed">
                      {cat.description}
                    </p>

                    {/* Preview of key items inside */}
                    {cat.items && cat.items.length > 0 && (
                      <div className="mt-5 space-y-2 border-t border-white/5 pt-4">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                          Featured in this track:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {cat.items.slice(0, 3).map((item) => (
                            <span
                              key={item.id}
                              className="rounded border border-white/5 bg-charcoal-850/80 px-2 py-1 font-mono text-[10px] text-slate-300 transition-colors group-hover:border-white/20"
                            >
                              {item.title}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Footer: Record count & CTA arrow */}
                  <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="font-mono text-xs text-slate-400">
                      <span className="text-white font-medium">{cat.count}</span> {cat.count === 1 ? 'Record' : 'Records'}
                    </span>

                    <div className="flex items-center gap-2 font-mono text-xs text-cyan-300 transition-all duration-300 group-hover:translate-x-1">
                      <span>Explore Track</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* About & Philosophy Section */}
      <About onNavigateCategory={onSelectCategory} />

      {/* Technical Skills Section */}
      <TechnicalSkills />

      {/* Contact Section */}
      <Contact />

    </div>
  );
}
