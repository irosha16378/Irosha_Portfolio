export class Project {
  constructor({
    id, title, category, summary, technologies = [], icon = 'cpu', status = 'In progress',
    documentation = [], architecture = [], media = [],
  }) {
    if (!id || !title || !category || !summary) {
      throw new TypeError('A project requires an id, title, category, and summary.');
    }
    Object.assign(this, {
      id, title, category, summary, technologies, icon, status, documentation, architecture, media,
    });
  }
}
