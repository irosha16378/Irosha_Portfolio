import { ArrowUpRight, Camera, Drum, Trophy } from 'lucide-react';

const icons = { trophy: Trophy, drum: Drum, camera: Camera };

export default function PassionCard({ passion, onSelect }) {
  const Icon = icons[passion.icon] ?? Camera;
  return (
    <button className="passion-card" type="button" onClick={() => onSelect(passion)} aria-label={`View details for ${passion.title}`}>
      <span className="passion-top"><span>{passion.category}</span><Icon size={22} strokeWidth={1.5} /></span>
      <h3>{passion.title}</h3><p>{passion.summary}</p>
      <span className="passion-accent">Explore story <ArrowUpRight size={16} /></span>
    </button>
  );
}
