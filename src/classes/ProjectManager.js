export class Project {
  constructor({ id, title, category, summary, technologies, icon, status = 'In progress', githubUrl = '', demoUrl = '' }) {
    if (!id || !title || !category || !summary || !Array.isArray(technologies)) {
      throw new TypeError('A project requires an id, title, category, summary, and technologies array.');
    }

    Object.assign(this, { id, title, category, summary, technologies, icon, status, githubUrl, demoUrl });
  }
}

export class PortfolioManager {
  constructor(projects = []) {
    this.projects = projects.map((project) => project instanceof Project ? project : new Project(project));
  }

  getCategories() {
    return [...new Set(this.projects.map(({ category }) => category))];
  }

  getProjects(category = 'All') {
    return category === 'All'
      ? [...this.projects]
      : this.projects.filter((project) => project.category === category);
  }

  getProjectCount(category = 'All') {
    return this.getProjects(category).length;
  }
}
