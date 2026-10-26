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
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Trophy, 
  Layers, 
  ExternalLink,
  ChevronRight
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
  emerald: 'hover:border-emerald-500/50 hover:shadow-[0_0_35px_-5px_rgba(16,185,129,0.35)]',
  amber: 'hover:border-amber-400/50 hover:shadow-[0_0_35px_-5px_rgba(245,158,11,0.35)]',
  rose: 'hover:border-rose-500/50 hover:shadow-[0_0_35px_-5px_rgba(244,63,94,0.35)]',
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
  onSelectItem,
}) {
  const scrollToEngineering = () => {
    const el = document.getElementById('engineering-tracks');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Segregate categories by domain
  const engineeringTracks = categories.filter((c) => 
    ['embedded-systems', 'industrial-automation', 'robotics', 'machine-learning'].includes(c.id)
  );

  const educationCategory = categories.find((c) => c.id === 'qualifications');
  const coursesCategory = categories.find((c) => c.id === 'courses');
  const passionsCategory = categories.find((c) => c.id === 'passions');

  return (
    <div className="relative">
      
      {/* Hero Section */}
      <Hero onExploreTracks={scrollToEngineering} />

      {/* ==================================================================== */}
      {/* SECTION 01: ABOUT & ENGINEERING PHILOSOPHY                           */}
      {/* ==================================================================== */}
      <About onNavigateCategory={onSelectCategory} />

      {/* ==================================================================== */}
      {/* SECTION 02: CORE ENGINEERING PROJECTS TRACKS                         */}
      {/* ==================================================================== */}
      <section className="py-16 sm:py-24 border-t border-white/10" id="engineering-tracks">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Divider Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-10 font-mono text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-semibold">01</span>
              <span className="text-white font-medium">CORE ENGINEERING DISCIPLINES</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-500">EMBEDDED · AUTOMATION · ROBOTICS · MACHINE LEARNING</span>
            </div>
            <ArrowDownRight size={14} className="text-cyan-400" />
          </div>

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-cyan-400">
                APPLIED SYSTEMS & HARDWARE-SOFTWARE INTEGRATION
              </span>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white">
                Engineering Projects & <span className="text-cyan-400">Architecture.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm text-slate-300 leading-relaxed font-sans">
              From low-level FreeRTOS microcontroller drivers and Siemens S7-1500 PLC lines to ROS 2 autonomous navigation and edge vibration ML inference.
            </p>
          </div>

          {/* Grid of the 4 Engineering Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {engineeringTracks.map((cat, index) => {
              const IconComponent = categoryIcons[cat.id] || Layers;
              const color = cat.highlightColor || 'cyan';
              const glowClass = categoryGlowClasses[color] || categoryGlowClasses.cyan;
              const badgeStyle = categoryBadgeStyles[color] || categoryBadgeStyles.cyan;

              return (
                <div
                  key={cat.id}
                  onClick={() => onSelectCategory && onSelectCategory(cat.id)}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-charcoal-900/70 p-7 sm:p-8 backdrop-blur-xl transition-all duration-300 cursor-pointer ${glowClass}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectCategory && onSelectCategory(cat.id);
                    }
                  }}
                >
                  {/* Subtle Background Radial Glow */}
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-10 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
                    style={{
                      background: color === 'cyan' ? '#00f2fe' : 
                                  color === 'teal' ? '#00e5b9' : 
                                  color === 'blue' ? '#3b82f6' : '#8b5cf6'
                    }}
                  />

                  <div>
                    {/* Header: Icon, Badge, Counter */}
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl border bg-charcoal-850 transition-transform duration-300 group-hover:scale-105 ${badgeStyle}`}>
                          <IconComponent size={24} />
                        </div>
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-wide ${badgeStyle}`}>
                          {cat.accentBadge}
                        </span>
                      </div>
                      <span className="font-mono text-sm font-semibold text-slate-600">0{index + 1}</span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="font-display text-2xl font-medium tracking-tight text-white transition-colors duration-200 group-hover:text-cyan-200">
                      {cat.title}
                    </h3>
                    <p className="mt-1 font-mono text-xs text-cyan-300/80">
                      {cat.subtitle}
                    </p>

                    {/* Description */}
                    <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {cat.description}
                    </p>

                    {/* Featured items preview */}
                    {cat.items && cat.items.length > 0 && (
                      <div className="mt-5 space-y-2 border-t border-white/5 pt-4">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                          Featured in this track:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {cat.items.map((item) => (
                            <span
                              key={item.id}
                              className="rounded border border-white/5 bg-charcoal-850/80 px-2.5 py-1 font-mono text-[11px] text-slate-300 transition-colors group-hover:border-white/20"
                            >
                              {item.title}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Footer: Record count & CTA arrow */}
                  <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="font-mono text-xs text-slate-400">
                      <span className="text-white font-medium">{cat.count}</span> Engineering Projects
                    </span>

                    <div className="flex items-center gap-2 font-mono text-xs text-cyan-300 transition-all duration-300 group-hover:translate-x-1">
                      <span>Explore Projects & Architecture</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 03: FORMAL EDUCATIONAL QUALIFICATIONS (SEPARATE SECTION)     */}
      {/* ==================================================================== */}
      <section className="py-16 sm:py-24 border-t border-white/10 bg-charcoal-900/20" id="formal-education">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Divider Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-10 font-mono text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-semibold">02</span>
              <span className="text-white font-medium">FORMAL EDUCATION & ACADEMIC ACHIEVEMENTS</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-500">UNIVERSITY · PHYSICAL SCIENCE · SECONDARY EDUCATION · ESOFT CERTIFICATIONS</span>
            </div>
            <ArrowDownRight size={14} className="text-emerald-400" />
          </div>

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-emerald-400">
                ACADEMIC FOUNDATION & RECOGNITION
              </span>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white">
                Formal Educational <span className="text-emerald-400">Qualifications.</span>
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <p className="max-w-md text-sm text-slate-300 leading-relaxed font-sans">
                Rigorous higher education at Sabaragamuwa University, strong physical science and secondary education fundamentals from Vidyartha College Kandy, and professional IT & English qualifications from ESOFT Metro Campus.
              </p>
              <button
                onClick={() => onSelectCategory && onSelectCategory('qualifications')}
                className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-2 font-mono text-xs text-emerald-300 hover:bg-emerald-900/50 transition-all cursor-pointer"
              >
                <span>View Full Academic Record</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Academic Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {educationCategory?.items?.map((qual, idx) => (
              <div
                key={qual.id}
                onClick={() => onSelectItem ? onSelectItem(qual) : onSelectCategory('qualifications')}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-charcoal-900/70 p-7 backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] cursor-pointer"
                role="button"
                tabIndex={0}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-950/40 text-emerald-400">
                      {qual.icon === 'graduation-cap' ? (
                        <GraduationCap size={22} />
                      ) : qual.icon === 'cpu' || qual.icon === 'code' ? (
                        <Cpu size={20} />
                      ) : qual.icon === 'award' ? (
                        <Award size={20} />
                      ) : (
                        <BookOpen size={20} />
                      )}
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-2.5 py-0.5 font-mono text-[10px] text-emerald-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {qual.badgeText || qual.date}
                    </span>
                  </div>

                  {/* Institution */}
                  <span className="font-mono text-xs text-emerald-300/80 uppercase tracking-wide block">
                    {qual.institution}
                  </span>

                  {/* Degree Title */}
                  <h3 className="mt-1 font-display text-xl font-medium text-white transition-colors group-hover:text-emerald-200">
                    {qual.title}
                  </h3>

                  {qual.grade && (
                    <div className="mt-2 inline-block rounded border border-white/5 bg-charcoal-850/80 px-2.5 py-1 font-mono text-xs text-slate-300">
                      {qual.grade}
                    </div>
                  )}

                  <p className="mt-3 text-xs sm:text-sm text-slate-300/80 leading-relaxed">
                    {qual.summary}
                  </p>

                  {/* Courses Taken / Key Modules */}
                  {qual.coursesTaken && qual.coursesTaken.length > 0 && (
                    <div className="mt-5 border-t border-white/5 pt-4 space-y-1.5">
                      <span className="font-mono text-[10px] uppercase text-slate-500 tracking-wider">
                        Key Curriculum & Modules:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {qual.coursesTaken.slice(0, 3).map((c, i) => (
                          <span key={i} className="rounded border border-white/5 bg-charcoal-850/60 px-2 py-0.5 font-mono text-[10px] text-slate-300">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Link */}
                <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4 text-xs font-mono text-slate-400">
                  <span>{qual.period || qual.date}</span>
                  <div className="flex items-center gap-1.5 text-emerald-300 group-hover:translate-x-1 transition-transform">
                    <span>View Academic Specs</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 04: TECHNICAL SKILLS ARSENAL (TOOLKIT)                       */}
      {/* ==================================================================== */}
      <TechnicalSkills />

      {/* ==================================================================== */}
      {/* SECTION 05: ADDITIONAL TECHNICAL COURSES (SEPARATE SECTION)          */}
      {/* ==================================================================== */}
      <section className="py-16 sm:py-24 border-t border-white/10" id="technical-courses">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Divider Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-10 font-mono text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-semibold">03</span>
              <span className="text-white font-medium">ADDITIONAL TECHNICAL COURSES & CERTIFICATIONS</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-500">MITSUBISHI PLC · ROS 2 HUMBLE · FREERTOS KERNEL</span>
            </div>
            <ArrowDownRight size={14} className="text-amber-400" />
          </div>

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                CONTINUOUS SPECIALIZED INDUSTRIAL TRAINING
              </span>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white">
                Additional Technical <span className="text-amber-400">Courses.</span>
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <p className="max-w-md text-sm text-slate-300 leading-relaxed font-sans">
                Hands-on industrial masteries: deterministic Mitsubishi GX Works3 programming, ROS 2 autonomous navigation, and FreeRTOS multitasking kernels.
              </p>
              <button
                onClick={() => onSelectCategory && onSelectCategory('courses')}
                className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-950/40 px-3.5 py-2 font-mono text-xs text-amber-300 hover:bg-amber-900/50 transition-all cursor-pointer"
              >
                <span>View All Certifications</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Courses Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {coursesCategory?.items?.map((course) => (
              <div
                key={course.id}
                onClick={() => onSelectItem ? onSelectItem(course) : onSelectCategory('courses')}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-charcoal-900/70 p-7 backdrop-blur-xl transition-all duration-300 hover:border-amber-400/50 hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.3)] cursor-pointer"
                role="button"
                tabIndex={0}
              >
                <div>
                  {/* Top Bar: Provider & Status */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-950/40 text-amber-400">
                      <Award size={22} />
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-950/40 px-2.5 py-0.5 font-mono text-[10px] text-amber-300">
                      <Clock size={11} />
                      {course.duration}
                    </span>
                  </div>

                  {/* Provider */}
                  <span className="font-mono text-xs text-amber-300/80 uppercase tracking-wide block">
                    {course.provider}
                  </span>

                  {/* Course Title */}
                  <h3 className="mt-1 font-display text-xl font-medium text-white transition-colors group-hover:text-amber-200">
                    {course.title}
                  </h3>

                  {/* Certificate ID Pill */}
                  {course.certificateId && (
                    <div className="mt-2 inline-flex items-center gap-1 rounded border border-white/10 bg-charcoal-850 px-2 py-0.5 font-mono text-[10px] text-slate-400">
                      <span>CERT:</span>
                      <span className="text-amber-300 font-semibold">{course.certificateId}</span>
                    </div>
                  )}

                  <p className="mt-3 text-xs sm:text-sm text-slate-300/80 leading-relaxed">
                    {course.summary}
                  </p>

                  {/* Skills Acquired */}
                  {course.skillsAcquired && course.skillsAcquired.length > 0 && (
                    <div className="mt-5 border-t border-white/5 pt-4 space-y-1.5">
                      <span className="font-mono text-[10px] uppercase text-slate-500 tracking-wider">
                        Competencies Acquired:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {course.skillsAcquired.slice(0, 4).map((skill, i) => (
                          <span key={i} className="rounded border border-white/5 bg-charcoal-850/60 px-2 py-0.5 font-mono text-[10px] text-slate-300">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Link */}
                <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4 text-xs font-mono text-slate-400">
                  <span className="text-amber-400">{course.status}</span>
                  <div className="flex items-center gap-1.5 text-amber-300 group-hover:translate-x-1 transition-transform">
                    <span>View Syllabus & Labs</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 06: PASSIONS & EXTRACURRICULARS (SEPARATE SECTION)           */}
      {/* ==================================================================== */}
      <section className="py-16 sm:py-24 border-t border-white/10 bg-charcoal-900/20" id="beyond-code">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Divider Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-10 font-mono text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-rose-400 font-semibold">04</span>
              <span className="text-white font-medium">BEYOND THE SCREEN — PASSIONS & EXTRACURRICULARS</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-500">ATHLETICS · LIVE PERCUSSION · MEDIA & VOLUNTEERING</span>
            </div>
            <ArrowDownRight size={14} className="text-rose-400" />
          </div>

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-rose-400">
                LIFE OFF THE KEYBOARD
              </span>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white">
                Passions & <span className="text-rose-400">Extracurriculars.</span>
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <p className="max-w-md text-sm text-slate-300 leading-relaxed font-sans">
                Some of the most valuable lessons in composure under pressure, deterministic timing, and team empathy are forged on the cricket pitch, stage drum kit, and in community outreach.
              </p>
              <button
                onClick={() => onSelectCategory && onSelectCategory('passions')}
                className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-950/40 px-3.5 py-2 font-mono text-xs text-rose-300 hover:bg-rose-900/50 transition-all cursor-pointer"
              >
                <span>View Extracurricular Stories</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Passions Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {passionsCategory?.items?.map((passion, idx) => (
              <div
                key={passion.id}
                onClick={() => onSelectItem ? onSelectItem(passion) : onSelectCategory('passions')}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-charcoal-900/70 p-7 backdrop-blur-xl transition-all duration-300 hover:border-rose-400/50 hover:shadow-[0_0_30px_-5px_rgba(244,63,94,0.3)] cursor-pointer"
                role="button"
                tabIndex={0}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-rose-500/30 bg-rose-950/40 text-rose-400">
                      <Sparkles size={22} />
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-950/40 px-2.5 py-0.5 font-mono text-[10px] text-rose-300">
                      {passion.category}
                    </span>
                  </div>

                  {/* Role */}
                  <span className="font-mono text-xs text-rose-300/80 uppercase tracking-wide block">
                    {passion.role}
                  </span>

                  {/* Title */}
                  <h3 className="mt-1 font-display text-xl font-medium text-white transition-colors group-hover:text-rose-200">
                    {passion.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-slate-300/80 leading-relaxed">
                    {passion.summary}
                  </p>

                  {/* Stats Grid */}
                  {passion.stats && Object.keys(passion.stats).length > 0 && (
                    <div className="mt-5 border-t border-white/5 pt-4 space-y-1.5">
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(passion.stats).slice(0, 2).map(([k, v]) => (
                          <div key={k} className="rounded border border-white/5 bg-charcoal-850/60 p-2 text-[10px] font-mono">
                            <span className="text-slate-500 block uppercase">{k}</span>
                            <span className="text-white font-medium">{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Link */}
                <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4 text-xs font-mono text-slate-400">
                  <span className="text-rose-400 font-medium">Off The Screen</span>
                  <div className="flex items-center gap-1.5 text-rose-300 group-hover:translate-x-1 transition-transform">
                    <span>Explore Passion Story</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 07: CONTACT & DIRECT SIGNAL DISPATCH                         */}
      {/* ==================================================================== */}
      <Contact />

    </div>
  );
}
