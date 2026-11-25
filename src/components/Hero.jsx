import { ArrowDown, ArrowUpRight, FileText } from 'lucide-react';

export default function Hero({ onExploreTracks }) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28" id="home">
      
      {/* Background radial glowing ambient orbs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute top-1/2 -left-40 -z-10 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[130px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Copy: 7 columns */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-charcoal-900/80 px-3.5 py-1.5 backdrop-blur-xl shadow-inner">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-300">
                SOFTWARE ENGINEERING UNDERGRADUATE <span className="text-slate-500">· 2026</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white leading-[1.06]">
              Curious by nature.<br />
              Engineering <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">what’s next.</span>
            </h1>

            {/* Subtext */}
            <p className="max-w-2xl text-base sm:text-lg text-slate-300/90 leading-relaxed font-sans">
              I’m <strong className="text-white font-medium">Irosha</strong> — a Software Engineering undergraduate at Sabaragamuwa University of Sri Lanka drawn to the intersection where deterministic firmware, robotics, and industrial intelligence meet the physical world.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreTracks}
                className="group inline-flex items-center gap-2 rounded-xl border border-cyan-400/40 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 px-6 py-3.5 font-mono text-xs font-medium text-cyan-200 shadow-[0_0_25px_-5px_rgba(0,242,254,0.3)] backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-cyan-400 hover:shadow-[0_0_35px_-5px_rgba(0,242,254,0.5)] cursor-pointer"
              >
                <span>EXPLORE 7 HIGHLIGHT TRACKS</span>
                <ArrowDown size={15} className="group-hover:translate-y-0.5 transition-transform" />
              </button>

              <a
                href="/assets/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Irosha_Resume.pdf"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-charcoal-900/70 px-5 py-3.5 font-mono text-xs text-slate-300 hover:border-white/20 hover:text-white backdrop-blur-xl transition-all hover:bg-charcoal-850"
              >
                <FileText size={14} className="text-cyan-400" />
                <span>DOWNLOAD RESUME (PDF)</span>
                <ArrowUpRight size={13} className="text-slate-400" />
              </a>
            </div>

            {/* Quick Stat Pill Ribbon */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap gap-6 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="font-display text-base font-semibold text-white">4</span>
                <span>Engineering Tracks</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-display text-base font-semibold text-cyan-300">SLIoT</span>
                <span>National Semi-Finalist</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-display text-base font-semibold text-teal-300">BSc (Hons)</span>
                <span>Sabaragamuwa SE</span>
              </div>
            </div>

          </div>

          {/* Right Visual Element: Profile Portrait with soft gradient blurred edges */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Ambient Background Glow Halo */}
            <div className="pointer-events-none absolute h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-gradient-to-tr from-cyan-500/25 via-teal-400/15 to-blue-600/20 blur-[80px] -z-10" />
            <div className="pointer-events-none absolute -bottom-4 -right-4 h-48 w-48 rounded-full bg-cyan-400/15 blur-[60px] -z-10" />

            {/* Portrait Frame Container */}
            <div className="relative group flex items-center justify-center">
              
              {/* Outer Cybernetic Decorative Rings */}
              <div className="absolute -inset-4 sm:-inset-6 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute -inset-2 sm:-inset-3 rounded-full border border-cyan-400/20 border-dashed animate-[spin_60s_linear_infinite] pointer-events-none" />

              {/* Main Photo Wrapper with Radial Gradient Feathering & Blur Mask */}
              <div className="relative h-72 w-72 sm:h-88 sm:w-88 md:h-96 md:w-96 rounded-full overflow-hidden p-1.5 flex items-center justify-center">
                
                {/* Glowing border ring */}
                <div className="absolute inset-0 rounded-full border border-cyan-400/30 shadow-[0_0_35px_rgba(0,242,254,0.25)] pointer-events-none" />

                {/* Inner Image with Radial Gradient Mask & Blurred Edges */}
                <div 
                  className="relative w-full h-full rounded-full overflow-hidden"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle at 50% 45%, rgba(0,0,0,1) 55%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0) 98%)',
                    maskImage: 'radial-gradient(circle at 50% 45%, rgba(0,0,0,1) 55%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0) 98%)',
                  }}
                >
                  <img
                    src="/images/profile.jpg"
                    alt="Irosha - Software & Embedded Systems Engineer"
                    className="w-full h-full object-cover object-[50%_25%] scale-105 transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Subtle Dark Vignette & Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-transparent opacity-70 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-blue-500/10 mix-blend-overlay pointer-events-none" />
                </div>
              </div>

              {/* Sleek Floating Status Pill */}
              <div className="absolute -bottom-2 sm:bottom-1 right-2 sm:right-4 flex items-center gap-2 rounded-full border border-cyan-400/30 bg-charcoal-900/90 px-3.5 py-1.5 font-mono text-[10px] text-slate-200 backdrop-blur-xl shadow-[0_0_20px_-3px_rgba(0,242,254,0.3)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                </span>
                <span className="text-cyan-300 font-medium">SYS_STATUS: ACTIVE</span>
              </div>

              {/* Geo Coordinate Stamp */}
              <div className="hidden sm:block absolute -top-3 left-2 font-mono text-[9px] text-slate-400 tracking-wider bg-charcoal-900/80 px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-md">
                <span>7° 15' N, 80° 35' E</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
