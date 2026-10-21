import { useState, useEffect, useRef } from 'react';
import { 
  ArrowUpRight, 
  Cpu, 
  Factory, 
  Bot, 
  Brain, 
  GraduationCap, 
  Award, 
  Sparkles, 
  BookOpen, 
  Radio, 
  Activity, 
  Camera, 
  Trophy, 
  Eye, 
  Layers, 
  ExternalLink,
  ChevronRight,
  Code
} from 'lucide-react';

const iconMap = {
  cpu: Cpu,
  factory: Factory,
  bot: Bot,
  brain: Brain,
  'graduation-cap': GraduationCap,
  award: Award,
  sparkles: Sparkles,
  'book-open': BookOpen,
  radio: Radio,
  activity: Activity,
  camera: Camera,
  trophy: Trophy,
  eye: Eye,
  layers: Layers,
  code: Code,
};

const glowBorderClasses = {
  cyan: 'hover:border-cyan-400/50 hover:shadow-[0_0_30px_-5px_rgba(0,242,254,0.3)]',
  teal: 'hover:border-teal-400/50 hover:shadow-[0_0_30px_-5px_rgba(0,229,185,0.3)]',
  blue: 'hover:border-blue-400/50 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]',
  violet: 'hover:border-violet-400/50 hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.3)]',
  emerald: 'hover:border-emerald-400/50 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]',
  amber: 'hover:border-amber-400/50 hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.3)]',
  rose: 'hover:border-rose-400/50 hover:shadow-[0_0_30px_-5px_rgba(244,63,94,0.3)]',
};

const badgeColorClasses = {
  cyan: 'text-cyan-400 bg-cyan-950/40 border-cyan-500/30',
  teal: 'text-teal-400 bg-teal-950/40 border-teal-500/30',
  blue: 'text-blue-400 bg-blue-950/40 border-blue-500/30',
  violet: 'text-violet-400 bg-violet-950/40 border-violet-500/30',
  emerald: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30',
  amber: 'text-amber-400 bg-amber-950/40 border-amber-500/30',
  rose: 'text-rose-400 bg-rose-950/40 border-rose-500/30',
};

export default function Card({
  item,
  type = 'project',
  onClick,
  accentColor = 'cyan',
  showCategory = true,
  className = '',
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const slideTimerRef = useRef(null);

  // Extract media items or fallback to curated previews
  const mediaList = item?.media && item.media.length > 0 
    ? item.media 
    : [
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      ];

  // Hover slideshow effect: cycles slides while hovered
  useEffect(() => {
    if (isHovered && mediaList.length > 1) {
      slideTimerRef.current = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % mediaList.length);
      }, 1800);
    } else {
      setActiveSlide(0);
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    }

    return () => {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    };
  }, [isHovered, mediaList.length]);

  const IconComponent = iconMap[item?.icon] || Cpu;
  const color = item?.highlightColor || accentColor || 'cyan';
  const glowStyle = glowBorderClasses[color] || glowBorderClasses.cyan;
  const badgeStyle = badgeColorClasses[color] || badgeColorClasses.cyan;

  // Derive badges and subtitle based on item type
  const subtitle = item?.institution || item?.provider || item?.subcategory || item?.role || item?.tagline || '';
  const statusBadge = item?.status || item?.grade || item?.badgeText || item?.period || 'Featured';
  const tags = item?.technologies || item?.skillsAcquired || item?.coursesTaken || item?.highlights?.slice(0, 3) || [];

  return (
    <article
      onClick={() => onClick && onClick(item)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-charcoal-900/70 p-6 backdrop-blur-xl transition-all duration-300 cursor-pointer ${glowStyle} ${className}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick && onClick(item);
        }
      }}
    >
      {/* Subtle background glow effect */}
      <div 
        className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full opacity-10 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
        style={{
          background: color === 'cyan' ? '#00f2fe' : 
                      color === 'teal' ? '#00e5b9' : 
                      color === 'blue' ? '#3b82f6' : 
                      color === 'violet' ? '#8b5cf6' : 
                      color === 'amber' ? '#f59e0b' : 
                      color === 'emerald' ? '#10b981' : '#f43f5e'
        }}
      />

      {/* Top Header: Category / Status / Icon */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className={`grid h-9 w-9 place-items-center rounded-lg border bg-charcoal-850/80 transition-transform duration-300 group-hover:scale-105 ${badgeStyle}`}>
              <IconComponent size={18} />
            </div>
            {showCategory && (
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                {item?.category || type}
              </span>
            )}
          </div>

          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wide ${badgeStyle}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
            {statusBadge}
          </span>
        </div>

        {/* Media / Video Slideshow Simulation Preview */}
        <div className="relative mb-5 h-44 w-full overflow-hidden rounded-lg border border-white/5 bg-charcoal-950">
          {mediaList.map((src, index) => (
            <img
              key={src + index}
              src={src}
              alt={item?.title || 'Preview'}
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                index === activeSlide ? 'opacity-90 scale-100' : 'opacity-0 scale-105 pointer-events-none'
              }`}
            />
          ))}

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/30 to-transparent" />

          {/* Hover indicator pill */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
            <span className="inline-flex items-center gap-1 rounded bg-charcoal-900/80 px-2 py-0.5 font-mono text-[9px] text-slate-300 backdrop-blur-md border border-white/10">
              <span className="h-1 w-1 rounded-full bg-emerald-400 animate-ping" />
              {isHovered ? 'SLIDESHOW PREVIEW' : 'HOVER TO PREVIEW'}
            </span>

            {/* Slideshow dots */}
            {mediaList.length > 1 && (
              <div className="flex items-center gap-1.5 bg-charcoal-900/80 px-2 py-1 rounded-full border border-white/10 backdrop-blur-md">
                {mediaList.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeSlide ? 'w-4 bg-white' : 'w-1.5 bg-white/30'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Title & Subtitle */}
        <h3 className="font-display text-lg font-medium tracking-tight text-white transition-colors duration-200 group-hover:text-cyan-200 line-clamp-1">
          {item?.title}
        </h3>

        {subtitle && (
          <p className="mt-1 font-mono text-xs text-slate-400 line-clamp-1">
            {subtitle}
          </p>
        )}

        {/* Summary Description */}
        <p className="mt-2.5 text-xs leading-relaxed text-slate-300/80 line-clamp-2">
          {item?.summary}
        </p>

        {/* Tech Stack / Skill Pills */}
        {tags && tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="rounded border border-white/5 bg-charcoal-800/60 px-2 py-0.5 font-mono text-[10px] text-slate-300 transition-colors group-hover:border-white/15"
              >
                {tech}
              </span>
            ))}
            {tags.length > 4 && (
              <span className="rounded border border-white/5 bg-charcoal-800/40 px-1.5 py-0.5 font-mono text-[10px] text-slate-400">
                +{tags.length - 4}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer Callout */}
      <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-3.5">
        <span className="font-mono text-[11px] text-slate-400 transition-colors group-hover:text-white flex items-center gap-1">
          Deep specs & architecture
        </span>
        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:border-cyan-400/50 group-hover:text-cyan-400">
          <ArrowUpRight size={14} />
        </div>
      </div>
    </article>
  );
}
