import { Award, BookOpen, GraduationCap, ArrowUpRight } from 'lucide-react';

const icons = { 'graduation-cap': GraduationCap, 'book-open': BookOpen, award: Award };

export default function QualificationCard({ qualification, onSelect }) {
  const Icon = icons[qualification.icon] ?? GraduationCap;
  return (
    <button className="qualification-card" type="button" onClick={() => onSelect(qualification)} aria-label={`View details for ${qualification.title}`}>
      <div className="qualification-card-top"><span className="qualification-icon"><Icon size={20} /></span><span className="qualification-date">{qualification.date}</span></div>
      <h3>{qualification.title}</h3>
      <span className="qualification-institution">{qualification.institution}</span>
      <p>{qualification.summary}</p>
      <span className="qualification-open">Explore details <ArrowUpRight size={15} /></span>
    </button>
  );
}
