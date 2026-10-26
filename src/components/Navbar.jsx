import { useState } from 'react';
import { ArrowUpRight, Menu, X, FileText, Home as HomeIcon, ChevronRight } from 'lucide-react';

export default function Navbar({
  currentView = 'home',
  activeCategory = null,
  activeItem = null,
  onNavigateHome,
  onNavigateCategory,
}) {
  const [open, setOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    onNavigateHome && onNavigateHome();
    setOpen(false);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  return (
    <header className="sticky top-0 z-50 h-18 border-b border-white/10 bg-charcoal-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Wordmark & Interactive Breadcrumbs */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              onNavigateHome && onNavigateHome();
              setOpen(false);
            }}
            className="group inline-flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-white transition-opacity hover:opacity-90 cursor-pointer"
          >
            <span className="grid h-7 w-7 place-items-center rounded-lg border border-cyan-400/40 bg-cyan-950/50 font-mono text-sm text-cyan-400 shadow-[0_0_12px_-2px_rgba(0,242,254,0.4)]">
              i.
            </span>
            <span className="tracking-tight">irosha<span className="text-cyan-400">/</span></span>
          </button>

          {/* Breadcrumb pill if navigated deep */}
          {currentView !== 'home' && (
            <div className="hidden md:flex items-center gap-1.5 font-mono text-xs text-slate-400 bg-charcoal-900/60 px-3 py-1 rounded-full border border-white/10">
              <button
                onClick={onNavigateHome}
                className="hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <HomeIcon size={12} />
                <span>Home</span>
              </button>
              <ChevronRight size={12} className="text-slate-600" />
              {activeCategory && (
                <button
                  onClick={() => onNavigateCategory && onNavigateCategory(activeCategory.id)}
                  className={`hover:text-cyan-400 transition-colors truncate max-w-[140px] cursor-pointer ${
                    currentView === 'category' ? 'text-cyan-300 font-medium' : ''
                  }`}
                >
                  {activeCategory.shortTitle || activeCategory.title}
                </button>
              )}
              {currentView === 'detail' && activeItem && (
                <>
                  <ChevronRight size={12} className="text-slate-600" />
                  <span className="text-white truncate max-w-[140px]">{activeItem.title}</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 font-mono text-[11px] text-slate-300">
          <button
            onClick={() => scrollToSection('about')}
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            01. ABOUT
          </button>

          <button
            onClick={() => scrollToSection('engineering-tracks')}
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            02. ENGINEERING
          </button>

          <button
            onClick={() => scrollToSection('formal-education')}
            className="hover:text-emerald-400 transition-colors cursor-pointer"
          >
            03. EDUCATION
          </button>

          <button
            onClick={() => scrollToSection('skills')}
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            04. SKILLS
          </button>

          <button
            onClick={() => scrollToSection('technical-courses')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            05. COURSES
          </button>

          <button
            onClick={() => scrollToSection('beyond-code')}
            className="hover:text-rose-400 transition-colors cursor-pointer"
          >
            06. BEYOND CODE
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            07. CONTACT
          </button>

          {/* Resume PDF Download */}
          <a
            href="/assets/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Irosha_Resume.pdf"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-charcoal-900/60 px-3 py-1.5 font-mono text-xs text-slate-200 hover:border-cyan-400/40 hover:text-cyan-300 hover:shadow-[0_0_15px_-3px_rgba(0,242,254,0.25)] transition-all"
          >
            <FileText size={13} className="text-cyan-400" />
            <span>RESUME</span>
            <ArrowUpRight size={12} />
          </a>
        </nav>

        {/* Mobile / Tablet Menu Toggle */}
        <button
          type="button"
          aria-label={open ? 'Close Menu' : 'Open Menu'}
          onClick={() => setOpen(!open)}
          className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-charcoal-900/80 text-slate-300 hover:text-white cursor-pointer"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile / Tablet Drawer */}
      {open && (
        <div className="lg:hidden border-b border-white/10 bg-charcoal-950/95 px-6 py-6 backdrop-blur-2xl">
          <div className="flex flex-col gap-3.5 font-mono text-xs">
            <button
              onClick={() => scrollToSection('about')}
              className="text-left text-slate-300 hover:text-cyan-400 py-1"
            >
              01. ABOUT & ETHOS
            </button>

            <button
              onClick={() => scrollToSection('engineering-tracks')}
              className="text-left text-slate-300 hover:text-cyan-400 py-1 flex items-center justify-between"
            >
              <span>02. CORE ENGINEERING TRACKS</span>
              <span className="text-[10px] text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">4 DISCIPLINES</span>
            </button>

            <button
              onClick={() => scrollToSection('formal-education')}
              className="text-left text-slate-300 hover:text-emerald-400 py-1 flex items-center justify-between"
            >
              <span>03. FORMAL EDUCATION</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">ACADEMICS</span>
            </button>

            <button
              onClick={() => scrollToSection('skills')}
              className="text-left text-slate-300 hover:text-cyan-400 py-1"
            >
              04. TECHNICAL SKILLS ARSENAL
            </button>

            <button
              onClick={() => scrollToSection('technical-courses')}
              className="text-left text-slate-300 hover:text-amber-400 py-1 flex items-center justify-between"
            >
              <span>05. ADDITIONAL TECHNICAL COURSES</span>
              <span className="text-[10px] text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20">CERTS</span>
            </button>

            <button
              onClick={() => scrollToSection('beyond-code')}
              className="text-left text-slate-300 hover:text-rose-400 py-1 flex items-center justify-between"
            >
              <span>06. PASSIONS & EXTRACURRICULARS</span>
              <span className="text-[10px] text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded border border-rose-500/20">BEYOND CODE</span>
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="text-left text-slate-300 hover:text-cyan-400 py-1"
            >
              07. GET IN TOUCH
            </button>

            <a
              href="/assets/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Irosha_Resume.pdf"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-cyan-500/40 bg-cyan-950/40 py-2.5 font-mono text-xs text-cyan-300 mt-2"
            >
              <FileText size={14} />
              <span>DOWNLOAD RESUME (PDF)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
