export class PortfolioManager {
  constructor({ projects = [], qualifications = [], passions = [] } = {}) {
    this.projects = projects;
    this.qualifications = qualifications;
    this.passions = passions;
  }

  getAll(collection) {
    return [...(this[collection] ?? [])];
  }

  findById(collection, id) {
    return this.getAll(collection).find((entry) => entry.id === id) ?? null;
  }

  getCategories(collection = 'projects') {
    return [...new Set(this.getAll(collection).map(({ category }) => category).filter(Boolean))];
  }

  filterBy(collection, property, value) {
    return this.getAll(collection).filter((entry) => entry[property] === value);
  }
}
