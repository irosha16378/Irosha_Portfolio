export class Qualification {
  constructor({ id, title, institution, date, summary, icon = 'graduation-cap', details = [] }) {
    if (!id || !title || !institution || !summary) {
      throw new TypeError('A qualification requires an id, title, institution, and summary.');
    }
    Object.assign(this, { id, title, institution, date, summary, icon, details });
  }
}
