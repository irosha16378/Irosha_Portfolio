import { useState } from 'react';
import { ArrowDownRight } from 'lucide-react';
import { portfolio } from '../data/portfolioData.js';
import About from '../components/About.jsx';
import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';
import Hero from '../components/Hero.jsx';
import Navbar from '../components/Navbar.jsx';
import PassionCard from '../components/PassionCard.jsx';
import ProjectGrid from '../components/ProjectGrid.jsx';
import QualificationGrid from '../components/QualificationGrid.jsx';
import TechnicalSkills from '../components/TechnicalSkills.jsx';
import DetailViewModal from './DetailViewModal.jsx';

export default function Home() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <Navbar />
      <main>
        <Hero />
        <div className="section-divider"><span>01</span><span>SELECTED WORK</span><ArrowDownRight size={14} /></div>
        <ProjectGrid projects={portfolio.projects} onSelect={(item) => setSelected({ item, type: 'project' })} />
        <About />
        <TechnicalSkills />
        <QualificationGrid qualifications={portfolio.qualifications} onSelect={(item) => setSelected({ item, type: 'qualification' })} />
        <section className="section-wrap beyond-section" id="beyond">
          <div className="section-heading">
            <div><span className="section-kicker">OFF THE SCREEN</span><h2>More than<br /><span>just the work.</span></h2></div>
            <p>Some of the best lessons don’t come from a keyboard.</p>
          </div>
          <div className="passion-grid">
            {portfolio.passions.map((passion) => (
              <PassionCard key={passion.id} passion={passion} onSelect={(item) => setSelected({ item, type: 'passion' })} />
            ))}
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
      {selected && <DetailViewModal item={selected.item} type={selected.type} onClose={() => setSelected(null)} />}
    </div>
  );
}
