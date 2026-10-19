import { ArrowDown, ArrowUpRight, Cpu, Radio, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero section-wrap" id="home">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-dot" /> SOFTWARE ENGINEERING UNDERGRADUATE <span className="eyebrow-year">· 2026</span></div>
        <h1>Curious by nature.<br />Building <span className="highlight-word">what’s next.</span></h1>
        <p className="hero-intro">I’m Irosha — a software engineering undergraduate drawn to the space where software meets the physical world. Exploring embedded systems, automation, robotics, and machine learning.</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#projects">Explore my work <ArrowDown size={16} /></a>
          <a className="text-link" href="#contact">Get in touch <ArrowUpRight size={16} /></a>
        </div>
        <div className="hero-availability"><span className="availability-pulse" /> Open to learning, collaboration & new ideas</div>
      </div>
      <div className="hero-art" aria-label="Abstract illustration of connected engineering systems">
        <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="art-orbit orbit-three" />
        <div className="art-center"><div className="art-center-inner"><Cpu size={33} strokeWidth={1.2} /></div></div>
        <div className="art-node node-embedded"><Cpu size={17} /><span>EMBEDDED</span></div>
        <div className="art-node node-motion"><Radio size={17} /><span>ROBOTICS</span></div>
        <div className="art-node node-intelligence"><Sparkles size={17} /><span>INTELLIGENCE</span></div>
        <div className="art-coordinates">7° 15' 00.0" N<br />80° 35' 00.0" E</div>
        <div className="art-caption"><span>FIG. 01</span> Systems in motion</div>
      </div>
      <a href="#projects" className="scroll-cue" aria-label="Scroll to selected work"><span /> Scroll to explore</a>
    </section>
  );
}
