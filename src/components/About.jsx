import { Compass, Waypoints, Lightbulb, ShieldCheck, ArrowUpRight } from 'lucide-react';

const principles = [
  { 
    icon: Compass, 
    number: '01',
    title: 'Stay Curious & Question Foundations', 
    text: 'Dig deep beneath the abstraction layer. Understand register-level mechanics, silicon constraints, and the physics of the physical system.' 
  },
  { 
    icon: Waypoints, 
    number: '02',
    title: 'Think in Closed Systems', 
    text: 'A circuit, a control loop, and a user interface are interconnected links. Designing robust software requires respecting electrical noise, latency, and real-world failure modes.' 
  },
  { 
    icon: Lightbulb, 
    number: '03',
    title: 'Build with Measurable Utility', 
    text: 'Engineering exists to solve tangible problems—whether reducing conveyor cycle times by 40ms or delivering reliable telemetry from remote sensor nodes.' 
  },
  { 
    icon: ShieldCheck, 
    number: '04',
    title: 'Fail-Safe by Default', 
    text: 'In embedded firmware and robotics, unhandled edge cases have real consequences. Defensive programming, watchdog timers, and hardware interlocks come first.' 
  },
];

export default function About({ onNavigateCategory }) {
  return (
    <section className="py-20 border-t border-white/10" id="about">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Bio Section: 5 cols */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-cyan-400">
                02 / A LITTLE ABOUT ME
              </span>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-medium tracking-tight text-white leading-tight">
                Between lines of code and <span className="text-cyan-400">physical systems.</span>
              </h2>
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-slate-300">
              I’m an undergraduate reading for a <strong className="text-white font-medium">BSc (Hons) in Software Engineering</strong> at <span className="text-cyan-300">Sabaragamuwa University of Sri Lanka</span>. While my degree is anchored in modern software patterns, my passion pulls me toward hardware that moves, senses, and automates.
            </p>

            <p className="text-sm sm:text-base leading-relaxed text-slate-300">
              My engineering journey covers embedded C/C++ firmware on ESP32 and STM32, deterministic PLC programming with Siemens and Mitsubishi, ROS 2 autonomous robotics, and edge machine learning. I treat every project as an opportunity to bridge the gap between software elegance and physical reliability.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onNavigateCategory && onNavigateCategory('qualifications')}
                className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 hover:text-cyan-300 transition-colors group cursor-pointer"
              >
                <span>Explore my academic journey & qualifications</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Engineering Philosophy Grid: 7 cols */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-white/10 bg-charcoal-900/70 p-6 sm:p-8 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <span className="font-mono text-xs tracking-wider text-slate-400 uppercase">
                  HOW I APPROACH ENGINEERING
                </span>
                <span className="font-mono text-xs text-cyan-400">CORE ETHOS</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {principles.map(({ icon: Icon, number, title, text }) => (
                  <div
                    key={title}
                    className="flex flex-col justify-between rounded-xl border border-white/5 bg-charcoal-850/60 p-5 transition-all duration-300 hover:border-cyan-400/40 hover:bg-charcoal-800/80"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-950/40 text-cyan-400">
                          <Icon size={16} />
                        </div>
                        <span className="font-mono text-xs text-slate-600 font-semibold">{number}</span>
                      </div>
                      <h3 className="font-display text-sm font-medium text-white mb-2">{title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[11px] text-slate-500">
                <span>SYSTEM ARCHITECTURE & INTEGRATION</span>
                <span className="text-cyan-400">ALWAYS IN BETA ✳</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
