export class Passion {
  constructor({ id, title, category, summary, icon, details = [] }) {
    if (!id || !title || !category || !summary) {
      throw new TypeError('A passion requires an id, title, category, and summary.');
    }
    Object.assign(this, { id, title, category, summary, icon, details });
  }
}
