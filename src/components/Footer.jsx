import { ArrowUp, Heart, Terminal } from 'lucide-react';

export default function Footer({ onBackToTop }) {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onBackToTop && onBackToTop();
  };

  return (
    <footer className="border-t border-white/10 bg-charcoal-950 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Brand & Origin */}
          <div className="flex items-center gap-3">
            <span className="grid h-7 w-7 place-items-center rounded-lg border border-cyan-400/40 bg-cyan-950/40 font-mono text-sm text-cyan-400">
              i.
            </span>
            <div className="font-mono text-xs text-slate-400">
              <span className="text-white font-medium">Irosha</span> · Built with curiosity in Sri Lanka
            </div>
          </div>

          {/* System Specs Status Indicator */}
          <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500 bg-charcoal-900/60 px-3 py-1.5 rounded-full border border-white/5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>REACT 18 · VITE · TAILWIND CSS · OOP ARCHITECTURE</span>
          </div>

          {/* Back to top */}
          <button
            onClick={handleScrollTop}
            className="group flex items-center gap-2 font-mono text-xs text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-charcoal-900 group-hover:border-cyan-400/40">
              <ArrowUp size={13} className="group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-600">
          <div>© {new Date().getFullYear()} Irosha. All rights reserved.</div>
          <div>BSc (Hons) Software Engineering Undergrad · Sabaragamuwa University of Sri Lanka</div>
        </div>
      </div>
    </footer>
  );
}
