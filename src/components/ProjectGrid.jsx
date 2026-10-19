import { useMemo, useState } from 'react';
import { portfolio } from '../../data/projectsData.js';
import ProjectCard from './ProjectCard.jsx';
import SectionTabs from './SectionTabs.jsx';

export default function ProjectGrid() {
  const categories = useMemo(() => ['All', ...portfolio.getCategories()], []);
  const [active, setActive] = useState('All');
  const projects = portfolio.getProjects(active);
  const counts = Object.fromEntries(categories.map((category) => [category, portfolio.getProjectCount(category)]));

  return (
    <section className="section-wrap projects-section" id="projects">
      <div className="section-heading">
        <div><span className="section-kicker">SELECTED EXPLORATIONS · 01—04</span><h2>Work in progress.<br /><span>Ideas in motion.</span></h2></div>
        <p>A growing collection of things I’m learning, making, and figuring out — from hardware at the edge to intelligent systems.</p>
      </div>
      <SectionTabs categories={categories} active={active} onChange={setActive} counts={counts} />
      <div className="projects-grid" key={active}>
        {projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
      </div>
      <p className="projects-note">A few starting points — more projects and write-ups are on the way.</p>
    </section>
  );
}
