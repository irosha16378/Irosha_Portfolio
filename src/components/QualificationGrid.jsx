import QualificationCard from './QualificationCard.jsx';

export default function QualificationGrid({ qualifications, onSelect }) {
  return (
    <section className="section-wrap qualifications-section" id="qualifications">
      <div className="section-heading">
        <div><span className="section-kicker">THE LEARNING PATH</span><h2>Educational qualifications<br /><span>& achievements.</span></h2></div>
        <p>Every chapter gives me something new to bring into the next one. Select a card to explore its details.</p>
      </div>
      <div className="qualification-grid">
        {qualifications.map((qualification) => (
          <QualificationCard key={qualification.id} qualification={qualification} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}
