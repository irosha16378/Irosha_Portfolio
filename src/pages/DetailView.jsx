import { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Code2, 
  Calendar, 
  Clock, 
  Award, 
  Share2, 
  Copy, 
  Check, 
  Terminal,
  FileText,
  Activity,
  Maximize2
} from 'lucide-react';

export default function DetailView({
  item,
  categoryMeta,
  onBack,
  onNavigateItem,
  adjacentItems = { prev: null, next: null },
}) {
  const [copied, setCopied] = useState(false);
  const [activeMediaTab, setActiveMediaTab] = useState('preview');
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  if (!item) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-display font-medium text-white mb-2">Item Not Found</h2>
        <p className="text-slate-400 mb-6">The requested project or qualification detail could not be loaded.</p>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-lg bg-cyan-500/20 px-4 py-2 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30"
        >
          <ArrowLeft size={16} /> Return to list
        </button>
      </div>
    );
  }

  const mediaList = item.media && item.media.length > 0 
    ? item.media 
    : [
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80'
      ];

  const handleCopyShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const color = item.highlightColor || categoryMeta?.highlightColor || 'cyan';

  return (
    <div className="relative min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background ambient glow */}
      <div 
        className="pointer-events-none fixed top-24 right-1/4 -z-10 h-96 w-96 rounded-full opacity-15 blur-[120px]"
        style={{
          background: color === 'cyan' ? '#00f2fe' : 
                      color === 'teal' ? '#00e5b9' : 
                      color === 'blue' ? '#3b82f6' : 
                      color === 'violet' ? '#8b5cf6' : 
                      color === 'amber' ? '#f59e0b' : 
                      color === 'emerald' ? '#10b981' : '#f43f5e'
        }}
      />

      {/* Top Nav / Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <button 
            onClick={onBack}
            className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft size={14} /> Back to {categoryMeta?.shortTitle || 'List'}
          </button>
          <span className="text-slate-600">/</span>
          <span className="text-slate-500 uppercase">{item.category || categoryMeta?.shortTitle}</span>
          <span className="text-slate-600">/</span>
          <span className="text-white truncate max-w-[200px] sm:max-w-xs">{item.title}</span>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyShare}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-charcoal-900/60 px-3 py-1.5 font-mono text-xs text-slate-300 hover:border-white/20 hover:text-white transition-all backdrop-blur-md"
            title="Copy link"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            <span>{copied ? 'Copied' : 'Share'}</span>
          </button>

          {item.githubUrl && (
            <a
              href={item.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-charcoal-900/60 px-3 py-1.5 font-mono text-xs text-slate-300 hover:border-white/20 hover:text-white transition-all backdrop-blur-md"
            >
              <Github size={14} />
              <span>Source</span>
            </a>
          )}

          {item.liveUrl && (
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-950/40 px-3 py-1.5 font-mono text-xs text-cyan-300 hover:bg-cyan-900/50 transition-all backdrop-blur-md shadow-[0_0_15px_-3px_rgba(0,242,254,0.3)]"
            >
              <ExternalLink size={14} />
              <span>Live System</span>
            </a>
          )}
        </div>
      </div>

      {/* Header Section */}
      <div className="mb-10">
        <div className="flex flex-wrap items-center gap-2.5 mb-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/50 px-3 py-1 font-mono text-xs text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            {item.status || item.badgeText || 'Verified'}
          </span>
          {item.period && (
            <span className="inline-flex items-center gap-1 font-mono text-xs text-slate-400 border border-white/10 bg-charcoal-900/60 px-2.5 py-1 rounded-full">
              <Calendar size={12} />
              {item.period}
            </span>
          )}
          {item.duration && (
            <span className="inline-flex items-center gap-1 font-mono text-xs text-slate-400 border border-white/10 bg-charcoal-900/60 px-2.5 py-1 rounded-full">
              <Clock size={12} />
              {item.duration}
            </span>
          )}
        </div>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white mb-4">
          {item.title}
        </h1>

        {item.tagline && (
          <p className="font-mono text-sm sm:text-base text-cyan-300/90 max-w-4xl mb-4">
            {item.tagline}
          </p>
        )}

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-4xl">
          {item.description || item.summary}
        </p>
      </div>

      {/* Main Grid: Left deep content (8 cols) + Right specs sidebar (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Deep Architecture, Documentation & Code */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Media & Interactive Preview Panel */}
          <div className="overflow-hidden rounded-xl border border-white/10 bg-charcoal-900/70 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 bg-charcoal-950/40">
              <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
                <Activity size={14} className="text-cyan-400" />
                <span>INTERACTIVE SYSTEM PREVIEW</span>
              </div>

              {mediaList.length > 1 && (
                <div className="flex items-center gap-1.5">
                  {mediaList.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveMediaIndex(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === activeMediaIndex ? 'w-6 bg-cyan-400' : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                      aria-label={`View media ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="relative aspect-video w-full overflow-hidden bg-charcoal-950">
              <img
                src={mediaList[activeMediaIndex]}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-xs text-slate-300">
                <span className="bg-charcoal-900/80 px-2.5 py-1 rounded backdrop-blur-md border border-white/10">
                  FIG. 0{activeMediaIndex + 1} · {item.title} System Layout
                </span>
                <span className="text-slate-400 text-[11px]">
                  Frame {activeMediaIndex + 1} of {mediaList.length}
                </span>
              </div>
            </div>
          </div>

          {/* System Architecture Flow (if present) */}
          {item.architecture && item.architecture.length > 0 && (
            <div className="rounded-xl border border-white/10 bg-charcoal-900/70 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-6 font-mono text-xs tracking-wider text-cyan-400 uppercase">
                <Layers size={16} />
                <span>System Architecture & Signal Pipeline</span>
              </div>

              <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {item.architecture.map((step, idx) => (
                  <div
                    key={idx}
                    className="relative flex flex-col justify-between rounded-lg border border-white/10 bg-charcoal-850/80 p-4 transition-all duration-200 hover:border-cyan-400/40 hover:bg-charcoal-800/80"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] text-cyan-400/80">LAYER 0{idx + 1}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    </div>
                    <p className="font-sans text-xs font-medium text-slate-200 leading-snug">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Engineering Documentation / Execution Notes */}
          {item.documentation && item.documentation.length > 0 && (
            <div className="rounded-xl border border-white/10 bg-charcoal-900/70 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-5 font-mono text-xs tracking-wider text-cyan-400 uppercase">
                <FileText size={16} />
                <span>Technical Specifications & Verification Notes</span>
              </div>

              <ul className="space-y-3.5">
                {item.documentation.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Code Implementation / Firmware Snippet (if present) */}
          {item.codeSnippet && (
            <div className="overflow-hidden rounded-xl border border-white/10 bg-charcoal-900/70 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 bg-charcoal-950/60">
                <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
                  <Terminal size={14} className="text-cyan-400" />
                  <span>CORE IMPLEMENTATION KERNEL</span>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(item.codeSnippet);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="flex items-center gap-1 font-mono text-[11px] text-slate-400 hover:text-white transition-colors"
                >
                  {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copied ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>

              <div className="p-5 font-mono text-xs leading-relaxed text-cyan-300/90 overflow-x-auto bg-charcoal-950/80">
                <pre>{item.codeSnippet}</pre>
              </div>
            </div>
          )}

          {/* Course Modules / Syllabus (if Course) */}
          {item.modules && item.modules.length > 0 && (
            <div className="rounded-xl border border-white/10 bg-charcoal-900/70 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-4 font-mono text-xs tracking-wider text-amber-400 uppercase">
                <Award size={16} />
                <span>Curriculum Modules Mastered</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {item.modules.map((mod, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 rounded-lg border border-white/5 bg-charcoal-850/60 p-3 text-xs text-slate-300">
                    <span className="font-mono text-amber-400 font-semibold">0{idx + 1}.</span>
                    <span>{mod}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Passion Achievements & Life Lessons (if Passion) */}
          {item.achievements && item.achievements.length > 0 && (
            <div className="rounded-xl border border-white/10 bg-charcoal-900/70 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-4 font-mono text-xs tracking-wider text-rose-400 uppercase">
                <Award size={16} />
                <span>Key Milestones & Honours</span>
              </div>

              <div className="space-y-3">
                {item.achievements.map((ach, idx) => (
                  <div key={idx} className="flex items-center gap-3 rounded-lg border border-white/5 bg-charcoal-850/60 p-3 text-xs text-slate-200">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-mono">
                      ★
                    </span>
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Specs Sidebar & Quick Metadata */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Engineering Specifications Matrix */}
          {item.specs && Object.keys(item.specs).length > 0 && (
            <div className="rounded-xl border border-white/10 bg-charcoal-900/70 p-5 backdrop-blur-xl">
              <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-1.5">
                <Activity size={14} className="text-cyan-400" />
                Performance Metrics
              </h3>

              <div className="divide-y divide-white/5">
                {Object.entries(item.specs).map(([key, val]) => (
                  <div key={key} className="py-2.5 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono">{key}</span>
                    <span className="text-white font-medium text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hardware & Components List */}
          {item.hardware && item.hardware.length > 0 && (
            <div className="rounded-xl border border-white/10 bg-charcoal-900/70 p-5 backdrop-blur-xl">
              <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Cpu size={14} className="text-cyan-400" />
                Hardware Components
              </h3>
              <div className="space-y-2">
                {item.hardware.map((hw, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="h-1 w-1 rounded-full bg-cyan-400" />
                    <span>{hw}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Protocols & Buses */}
          {item.protocols && item.protocols.length > 0 && (
            <div className="rounded-xl border border-white/10 bg-charcoal-900/70 p-5 backdrop-blur-xl">
              <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-3">
                Industrial Protocols & Buses
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {item.protocols.map((proto, i) => (
                  <span key={i} className="rounded border border-cyan-500/20 bg-cyan-950/40 px-2 py-1 font-mono text-[10px] text-cyan-300">
                    {proto}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack / Skills */}
          {((item.technologies && item.technologies.length > 0) || 
            (item.skillsAcquired && item.skillsAcquired.length > 0) ||
            (item.coursesTaken && item.coursesTaken.length > 0)) && (
            <div className="rounded-xl border border-white/10 bg-charcoal-900/70 p-5 backdrop-blur-xl">
              <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-3">
                Technologies & Tools
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {(item.technologies || item.skillsAcquired || item.coursesTaken).map((t, i) => (
                  <span key={i} className="rounded border border-white/10 bg-charcoal-800/80 px-2.5 py-1 font-mono text-xs text-slate-200">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Passion Stats (if Passion) */}
          {item.stats && Object.keys(item.stats).length > 0 && (
            <div className="rounded-xl border border-white/10 bg-charcoal-900/70 p-5 backdrop-blur-xl">
              <h3 className="font-mono text-xs uppercase tracking-wider text-rose-400 mb-3">
                Athletic & Performance Stats
              </h3>
              <div className="divide-y divide-white/5">
                {Object.entries(item.stats).map(([k, v]) => (
                  <div key={k} className="py-2 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono">{k}</span>
                    <span className="text-white font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next / Previous Project Navigation Card */}
          <div className="rounded-xl border border-white/10 bg-charcoal-900/70 p-5 backdrop-blur-xl">
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-slate-500 mb-3">
              Explore More in {categoryMeta?.shortTitle || 'Category'}
            </h4>

            <div className="space-y-2">
              {adjacentItems.prev && (
                <button
                  onClick={() => onNavigateItem && onNavigateItem(adjacentItems.prev)}
                  className="w-full flex items-center justify-between rounded-lg border border-white/5 bg-charcoal-850/60 p-3 text-left hover:border-white/20 transition-all group"
                >
                  <div className="truncate pr-2">
                    <span className="block font-mono text-[10px] text-slate-500">← PREVIOUS</span>
                    <span className="text-xs text-slate-300 font-medium group-hover:text-cyan-300 transition-colors truncate">
                      {adjacentItems.prev.title}
                    </span>
                  </div>
                  <ArrowLeft size={14} className="text-slate-500 group-hover:text-cyan-400 group-hover:-translate-x-1 transition-all shrink-0" />
                </button>
              )}

              {adjacentItems.next && (
                <button
                  onClick={() => onNavigateItem && onNavigateItem(adjacentItems.next)}
                  className="w-full flex items-center justify-between rounded-lg border border-white/5 bg-charcoal-850/60 p-3 text-left hover:border-white/20 transition-all group"
                >
                  <div className="truncate pr-2">
                    <span className="block font-mono text-[10px] text-slate-500">NEXT →</span>
                    <span className="text-xs text-slate-300 font-medium group-hover:text-cyan-300 transition-colors truncate">
                      {adjacentItems.next.title}
                    </span>
                  </div>
                  <ArrowRight size={14} className="text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all shrink-0" />
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
