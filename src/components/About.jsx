import { ArrowUpRight, Compass, Lightbulb, Waypoints } from 'lucide-react';

const principles = [
  { icon: Compass, title: 'Stay curious', text: 'Ask better questions, explore new tools, keep learning.' },
  { icon: Waypoints, title: 'Think in systems', text: 'Connect the small details to the bigger picture.' },
  { icon: Lightbulb, title: 'Make it useful', text: 'Build with people, purpose, and real-world context in mind.' },
];

export default function About() {
  return (
    <section className="section-wrap about-section" id="about">
      <div className="about-main">
        <span className="section-kicker">A LITTLE ABOUT ME</span>
        <h2>Between lines<br />of code and <span>real life.</span></h2>
        <p>I’m studying Software Engineering at Sabaragamuwa University of Sri Lanka, and I love discovering how software can interact with the world around us.</p>
        <p>My interests range from embedded devices and industrial automation to robotics and machine learning. I’m still learning, experimenting, and looking for opportunities to turn good questions into thoughtful projects.</p>
        <a className="text-link" href="#qualifications">A bit more about my journey <ArrowUpRight size={16} /></a>
      </div>
      <div className="principles-card">
        <div className="principles-top"><span>HOW I APPROACH THINGS</span><span className="principles-index">01 / 03</span></div>
        {principles.map(({ icon: Icon, title, text }, index) => (
          <div className="principle" key={title}>
            <span className="principle-index">0{index + 1}</span><span className="principle-icon"><Icon size={19} /></span>
            <div><h3>{title}</h3><p>{text}</p></div>
          </div>
        ))}
        <div className="principles-foot">ALWAYS IN BETA <span>✳</span></div>
      </div>
    </section>
  );
}
