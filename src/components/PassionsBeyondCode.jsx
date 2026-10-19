import { ArrowUpRight, Camera, Drum, Trophy } from 'lucide-react';

const passions = [
  { icon: Trophy, number: '01', title: 'Cricket athlete', text: 'An opening player at university and club level. Cricket keeps me grounded in teamwork, discipline, and showing up when it matters.' },
  { icon: Drum, number: '02', title: 'Musician & drummer', text: 'Finding the rhythm, practising the details, and sharing the energy of live music at university events.' },
  { icon: Camera, number: '03', title: 'Stories & service', text: 'Exploring videography and giving time to community service — two ways I stay connected to the people and stories around me.' },
];

export default function PassionsBeyondCode() {
  return (
    <section className="section-wrap beyond-section" id="beyond">
      <div className="section-heading">
        <div><span className="section-kicker">OFF THE SCREEN</span><h2>More than<br /><span>just the work.</span></h2></div>
        <p>Some of the best lessons don’t come from a keyboard.</p>
      </div>
      <div className="passion-grid">
        {passions.map(({ icon: Icon, number, title, text }) => (
          <article className="passion-card" key={number}>
            <div className="passion-top"><span>{number} / 03</span><Icon size={22} strokeWidth={1.5} /></div>
            <h3>{title}</h3><p>{text}</p>
            <span className="passion-accent"><ArrowUpRight size={16} /></span>
          </article>
        ))}
      </div>
    </section>
  );
}
