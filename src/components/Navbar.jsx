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
            className="group inline-flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-white transition-opacity hover:opacity-90"
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
                className="hover:text-cyan-400 transition-colors flex items-center gap-1"
              >
                <HomeIcon size={12} />
                <span>Home</span>
              </button>
              <ChevronRight size={12} className="text-slate-600" />
              {activeCategory && (
                <button
                  onClick={() => onNavigateCategory && onNavigateCategory(activeCategory.id)}
                  className={`hover:text-cyan-400 transition-colors truncate max-w-[140px] ${
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
        <nav className="hidden md:flex items-center gap-6 font-mono text-xs text-slate-300">
          <button
            onClick={() => {
              onNavigateHome && onNavigateHome();
              const el = document.getElementById('highlight-tracks');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            01. TRACKS
          </button>

          <button
            onClick={() => {
              onNavigateHome && onNavigateHome();
              setTimeout(() => {
                const el = document.getElementById('about');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            02. ABOUT
          </button>

          <button
            onClick={() => {
              onNavigateHome && onNavigateHome();
              setTimeout(() => {
                const el = document.getElementById('skills');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            03. SKILLS
          </button>

          <button
            onClick={() => {
              onNavigateHome && onNavigateHome();
              setTimeout(() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            04. CONTACT
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

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          aria-label={open ? 'Close Menu' : 'Open Menu'}
          onClick={() => setOpen(!open)}
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-charcoal-900/80 text-slate-300 hover:text-white"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden border-b border-white/10 bg-charcoal-950/95 px-6 py-6 backdrop-blur-2xl">
          <div className="flex flex-col gap-4 font-mono text-xs">
            <button
              onClick={() => {
                onNavigateHome && onNavigateHome();
                setOpen(false);
                setTimeout(() => {
                  const el = document.getElementById('highlight-tracks');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="text-left text-slate-300 hover:text-cyan-400 py-1"
            >
              01. HIGHLIGHT TRACKS
            </button>

            <button
              onClick={() => {
                onNavigateHome && onNavigateHome();
                setOpen(false);
                setTimeout(() => {
                  const el = document.getElementById('about');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="text-left text-slate-300 hover:text-cyan-400 py-1"
            >
              02. ABOUT & PHILOSOPHY
            </button>

            <button
              onClick={() => {
                onNavigateHome && onNavigateHome();
                setOpen(false);
                setTimeout(() => {
                  const el = document.getElementById('skills');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="text-left text-slate-300 hover:text-cyan-400 py-1"
            >
              03. TECHNICAL SKILLS
            </button>

            <button
              onClick={() => {
                onNavigateHome && onNavigateHome();
                setOpen(false);
                setTimeout(() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="text-left text-slate-300 hover:text-cyan-400 py-1"
            >
              04. GET IN TOUCH
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
