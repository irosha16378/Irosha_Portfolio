import { ArrowDownRight } from 'lucide-react';
import Navbar from './src/components/Navbar.jsx';
import Hero from './src/components/Hero.jsx';
import ProjectGrid from './src/components/ProjectGrid.jsx';
import About from './src/components/About.jsx';
import TechnicalSkills from './src/components/TechnicalSkills.jsx';
import Qualifications from './src/components/Qualifications.jsx';
import PassionsBeyondCode from './src/components/PassionsBeyondCode.jsx';
import Contact from './src/components/Contact.jsx';
import Footer from './Footer.jsx';

export default function App() {
  return (
    <div className="app-shell">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <Navbar />
      <main>
        <Hero />
        <div className="section-divider"><span>01</span><span>SELECTED WORK</span><ArrowDownRight size={14} /></div>
        <ProjectGrid />
        <About />
        <TechnicalSkills />
        <Qualifications />
        <PassionsBeyondCode />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
