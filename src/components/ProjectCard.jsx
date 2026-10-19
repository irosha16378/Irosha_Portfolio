import { useEffect, useState } from 'react';
import { ArrowUpRight, Bot, Brain, Cpu, Factory } from 'lucide-react';

const icons = { cpu: Cpu, factory: Factory, bot: Bot, brain: Brain };
const accents = {
  'Embedded Systems': '#b8f56a',
  'Industrial Automation': '#7dd3fc',
  Robotics: '#c4a1ff',
  'Machine Learning': '#ffbe76',
};

function previewImage(project, slide) {
  const accent = accents[project.category] ?? '#b8f56a';
  const scenes = [
    `<circle cx="160" cy="95" r="40" fill="${accent}" fill-opacity=".08" stroke="${accent}" stroke-opacity=".65"/><rect x="139" y="74" width="42" height="42" rx="9" fill="#111719" stroke="${accent}" stroke-opacity=".7"/><path d="M147 88h26m-26 7h18m-18 7h22" stroke="${accent}" stroke-opacity=".78" stroke-width="2"/><path d="M92 95h37m62 0h37M160 48v20m0 55v19" stroke="${accent}" stroke-opacity=".55" stroke-dasharray="3 5"/><circle cx="89" cy="95" r="4" fill="${accent}"/><circle cx="231" cy="95" r="4" fill="${accent}"/>`,
    `<rect x="64" y="42" width="192" height="106" rx="7" fill="#101516" stroke="${accent}" stroke-opacity=".32"/><path d="M64 65h192M88 53h28" stroke="${accent}" stroke-opacity=".45"/><path d="M90 82v18h29V82h29v18h29V82h29v18h23" fill="none" stroke="${accent}" stroke-width="2" stroke-opacity=".78"/><circle cx="91" cy="82" r="3" fill="${accent}"/><circle cx="207" cy="82" r="3" fill="${accent}"/><rect x="88" y="119" width="34" height="13" rx="3" fill="${accent}" fill-opacity=".1"/><rect x="130" y="119" width="52" height="13" rx="3" fill="${accent}" fill-opacity=".18"/><rect x="190" y="119" width="38" height="13" rx="3" fill="${accent}" fill-opacity=".1"/>`,
    `<path d="M77 143h166M88 135V98m31 37V82m31 53v-27m31 27V68m31 67V91" stroke="${accent}" stroke-width="11" stroke-linecap="round" stroke-opacity=".48"/><path d="m82 91 34-17 31 14 34-29 30 18 31-22" fill="none" stroke="${accent}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="82" cy="91" r="3" fill="${accent}"/><circle cx="116" cy="74" r="3" fill="${accent}"/><circle cx="147" cy="88" r="3" fill="${accent}"/><circle cx="181" cy="59" r="3" fill="${accent}"/><circle cx="211" cy="77" r="3" fill="${accent}"/><circle cx="242" cy="55" r="3" fill="${accent}"/>`,
  ];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 190"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#17201c"/><stop offset="1" stop-color="#101315"/></linearGradient><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0v20" fill="none" stroke="#fff" stroke-opacity=".035"/></pattern></defs><rect width="320" height="190" fill="url(#bg)"/><rect width="320" height="190" fill="url(#grid)"/>${scenes[slide]}<text x="18" y="176" fill="#a6b2a7" font-family="monospace" font-size="8" letter-spacing="2">CONCEPT PREVIEW · 0${slide + 1}/03</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export default function ProjectCard({ project, index, onSelect }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const Icon = icons[project.icon] ?? Cpu;

  useEffect(() => {
    const interval = window.setInterval(() => setActiveSlide((slide) => (slide + 1) % 3), 3600 + index * 250);
    return () => window.clearInterval(interval);
  }, [index]);

  return (
    <article className={`project-card project-card-${index % 4}`}>
      <div className="project-preview">
        <img src={previewImage(project, activeSlide)} alt={`${project.category} concept preview, frame ${activeSlide + 1} of 3`} />
        <span className="preview-label"><span /> CONCEPT PREVIEW</span>
        <div className="preview-dots" aria-hidden="true">{[0, 1, 2].map((slide) => <span className={activeSlide === slide ? 'active' : ''} key={slide} />)}</div>
      </div>
      <div className="project-card-content">
        <div className="project-card-top">
          <div className="project-icon"><Icon size={21} strokeWidth={1.5} /></div>
          <span className="project-status"><span />{project.status}</span>
        </div>
        <span className="project-category">{project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="project-tags">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
        <div className="project-card-footer">
          <span>Open detailed view <ArrowUpRight size={15} /></span>
          <span className="demo-placeholder">Details & media soon</span>
        </div>
      </div>
      <button className="project-card-hitarea" type="button" onClick={() => onSelect(project)} aria-label={`View details for ${project.title}`} />
    </article>
  );
}
