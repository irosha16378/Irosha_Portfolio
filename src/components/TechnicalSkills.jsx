import { Blocks, Cpu, Languages, Radio } from 'lucide-react';

const groups = [
  { icon: Cpu, label: 'Embedded & hardware', skills: ['ESP32', 'Microcontrollers', 'Sensors', 'Electronics'] },
  { icon: Radio, label: 'Industrial automation', skills: ['PLC fundamentals', 'Mitsubishi GX Works', 'Control systems', 'HMI'] },
  { icon: Languages, label: 'Programming languages', skills: ['C', 'C++', 'Python', 'JavaScript'] },
  { icon: Blocks, label: 'Frameworks & tools', skills: ['React', 'Node.js', 'ROS', 'Git'] },
];

export default function TechnicalSkills() {
  return (
    <section className="section-wrap skills-section" id="skills">
      <div className="section-heading skills-heading">
        <div><span className="section-kicker">TOOLS OF THE TRADE</span><h2>A toolkit, <span>in progress.</span></h2></div>
        <p>The technologies I’m currently learning and using. The list grows with every project.</p>
      </div>
      <div className="skills-grid">
        {groups.map(({ icon: Icon, label, skills }, index) => (
          <article className="skill-card" key={label}>
            <div className="skill-card-head"><span className="skill-icon"><Icon size={19} /></span><span className="skill-number">0{index + 1}</span></div>
            <h3>{label}</h3>
            <div className="skill-tags">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
