import { useState } from 'react';
import { Mail, ArrowUpRight, Copy, Check, Send, Github, Linkedin, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const emailAddress = 'irosha.engineering@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section className="py-20 border-t border-white/10" id="contact">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-charcoal-900/90 to-charcoal-950/90 p-8 sm:p-12 lg:p-16 backdrop-blur-2xl shadow-2xl">
          
          {/* Ambient Glow in background */}
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-cyan-500/15 blur-[120px]" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy: 6 cols */}
            <div className="lg:col-span-6 space-y-6">
              <span className="font-mono text-xs uppercase tracking-wider text-cyan-400">
                04 / HAVE A GOOD QUESTION OR PROJECT?
              </span>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-tight">
                Let’s engineer something <span className="text-cyan-400">that matters.</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg">
                I’m always open to discussing embedded systems architecture, industrial automation, robotics opportunities, or collaborative research. My inbox is always open.
              </p>

              {/* Direct Email Pill with Copy Button */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`mailto:${emailAddress}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-950/40 px-4 py-3 font-mono text-xs text-cyan-300 hover:bg-cyan-900/50 shadow-[0_0_20px_-3px_rgba(0,242,254,0.25)] transition-all"
                >
                  <Mail size={15} />
                  <span>{emailAddress}</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-charcoal-850 px-3.5 py-3 font-mono text-xs text-slate-300 hover:border-white/20 hover:text-white transition-all cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Social Channels */}
              <div className="flex items-center gap-3 pt-2 font-mono text-xs text-slate-400">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg border border-white/5 bg-charcoal-850/60 px-3 py-2 text-slate-300 hover:border-cyan-400/30 hover:text-cyan-300 transition-colors"
                >
                  <Github size={14} />
                  <span>GitHub</span>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg border border-white/5 bg-charcoal-850/60 px-3 py-2 text-slate-300 hover:border-cyan-400/30 hover:text-cyan-300 transition-colors"
                >
                  <Linkedin size={14} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Right Contact Form: 6 cols */}
            <div className="lg:col-span-6">
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-white/10 bg-charcoal-850/80 p-6 sm:p-8 backdrop-blur-xl shadow-inner space-y-4"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <span className="font-mono text-xs text-slate-400 flex items-center gap-1.5">
                    <MessageSquare size={13} className="text-cyan-400" />
                    DIRECT MESSAGE DISPATCH
                  </span>
                  <span className="font-mono text-[10px] text-emerald-400">STATUS: READY</span>
                </div>

                <div>
                  <label className="block font-mono text-xs text-slate-300 mb-1.5">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-charcoal-900/90 px-3.5 py-2.5 font-mono text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-slate-300 mb-1.5">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-charcoal-900/90 px-3.5 py-2.5 font-mono text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-slate-300 mb-1.5">Project Scope or Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your project, idea, or role..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-charcoal-900/90 px-3.5 py-2.5 font-mono text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formSent}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-cyan-400/40 bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 font-mono text-xs font-semibold text-charcoal-950 shadow-[0_0_20px_-3px_rgba(0,242,254,0.4)] transition-all hover:opacity-95 hover:scale-[1.01] cursor-pointer disabled:opacity-50"
                >
                  {formSent ? (
                    <>
                      <Check size={15} />
                      <span>DISPATCH TRANSMITTED (THANK YOU!)</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>TRANSMIT MESSAGE SIGNAL</span>
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
