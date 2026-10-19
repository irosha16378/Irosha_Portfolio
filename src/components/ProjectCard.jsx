import { ArrowUpRight, Bot, Brain, Cpu, Factory } from 'lucide-react';

const icons = { cpu: Cpu, factory: Factory, bot: Bot, brain: Brain };

export default function ProjectCard({ project, index }) {
  const Icon = icons[project.icon] ?? Cpu;

  return (
    <article className={`project-card project-card-${index % 4}`} role="tabpanel" aria-labelledby={`tab-${project.category.toLowerCase().replaceAll(' ', '-')}`}>
      <div className="project-card-top">
        <div className="project-icon"><Icon size={21} strokeWidth={1.5} /></div>
        <span className="project-status"><span />{project.status}</span>
      </div>
      <span className="project-category">{project.category}</span>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      <div className="project-tags">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
      <div className="project-card-footer">
        {project.githubUrl
          ? <a href={project.githubUrl} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} /></a>
          : <span className="project-placeholder">Repository coming soon</span>}
        {project.demoUrl
          ? <a href={project.demoUrl} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={15} /></a>
          : <span className="demo-placeholder">Demo soon</span>}
      </div>
    </article>
  );
}
