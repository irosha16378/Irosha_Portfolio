import { useMemo, useState } from 'react';
import ProjectCard from './ProjectCard.jsx';
import SectionTabs from './SectionTabs.jsx';

export default function ProjectGrid({ projects, onSelect }) {
  const categories = useMemo(() => ['All', ...new Set(projects.map(({ category }) => category))], [projects]);
  const [active, setActive] = useState('All');
  const visibleProjects = active === 'All' ? projects : projects.filter(({ category }) => category === active);
  const counts = Object.fromEntries(categories.map((category) => [
    category,
    category === 'All' ? projects.length : projects.filter((project) => project.category === category).length,
  ]));

  return (
    <section className="section-wrap projects-section" id="projects">
      <div className="section-heading">
        <div><span className="section-kicker">SELECTED EXPLORATIONS · 01—04</span><h2>Work in progress.<br /><span>Ideas in motion.</span></h2></div>
        <p>A growing collection of things I’m learning, making, and figuring out — from hardware at the edge to intelligent systems.</p>
      </div>
      <SectionTabs categories={categories} active={active} onChange={setActive} counts={counts} />
      <div className="projects-grid" key={active}>
        {visibleProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onSelect={onSelect} />)}
      </div>
      <p className="projects-note">Concept previews are illustrative. Project images, video, and write-ups can be added in each project’s media data.</p>
    </section>
  );
}
