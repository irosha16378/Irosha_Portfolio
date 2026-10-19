import { ArrowUpRight, Award, GraduationCap } from 'lucide-react';

const milestones = [
  { icon: GraduationCap, date: 'CURRENT', title: 'BSc (Hons) Software Engineering', place: 'Sabaragamuwa University of Sri Lanka', note: 'Building a strong foundation in software engineering and exploring the connections between software, hardware, and intelligent systems.' },
  { icon: Award, date: '2026', title: 'SLIoT Challenge · Semi-finalist', place: 'Sri Lanka', note: 'A milestone in my ongoing journey with technology and innovation.' },
  { icon: GraduationCap, date: 'ADVANCED LEVEL', title: 'Physical Science · ABC', place: 'Vidyartha College, Kandy', note: 'Advanced Level studies in the physical sciences.' },
  { icon: GraduationCap, date: 'ORDINARY LEVEL', title: 'G.C.E. Ordinary Level · 7A 2C', place: 'Sri Lanka', note: 'A strong academic foundation across nine subjects.' },
];

export default function Qualifications() {
  return (
    <section className="section-wrap qualifications-section" id="qualifications">
      <div className="section-heading">
        <div><span className="section-kicker">THE LEARNING PATH</span><h2>Small steps.<br /><span>Long way to go.</span></h2></div>
        <p>Every chapter gives me something new to bring into the next one.</p>
      </div>
      <div className="timeline">
        {milestones.map(({ icon: Icon, date, title, place, note }, index) => (
          <article className="timeline-item" key={title}>
            <div className="timeline-marker"><Icon size={17} /></div>
            <div className="timeline-date">{date}</div>
            <div className="timeline-copy"><h3>{title}{index === 1 && <ArrowUpRight size={15} />}</h3><span>{place}</span><p>{note}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}
