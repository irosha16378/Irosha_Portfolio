export class Qualification {
  constructor({
    id,
    title,
    institution,
    degree = '',
    date = 'CURRENT',
    period = '',
    grade = '',
    summary,
    description = '',
    icon = 'graduation-cap',
    category = 'Formal Education',
    categoryKey = 'qualifications',
    highlights = [],
    details = [],
    coursesTaken = [],
    credentialUrl = '',
    badgeText = 'Accredited',
    media = [],
    highlightColor = 'teal',
  }) {
    if (!id || !title || !institution || !summary) {
      throw new TypeError('A qualification requires an id, title, institution, and summary.');
    }
    this.id = id;
    this.title = title;
    this.institution = institution;
    this.degree = degree;
    this.date = date;
    this.period = period || date;
    this.grade = grade;
    this.summary = summary;
    this.description = description || summary;
    this.icon = icon;
    this.category = category;
    this.categoryKey = categoryKey;
    this.highlights = Array.isArray(highlights) ? highlights : [];
    this.details = Array.isArray(details) ? details : [];
    this.coursesTaken = Array.isArray(coursesTaken) ? coursesTaken : [];
    this.credentialUrl = credentialUrl;
    this.badgeText = badgeText;
    this.media = Array.isArray(media) ? media : [];
    this.highlightColor = highlightColor;
    this.documentation = this.details.length > 0 ? this.details : this.highlights;
  }

  hasCredential() {
    return Boolean(this.credentialUrl);
  }

  matchesSearch(term) {
    if (!term) return true;
    const q = term.toLowerCase();
    return (
      this.title.toLowerCase().includes(q) ||
      this.institution.toLowerCase().includes(q) ||
      this.summary.toLowerCase().includes(q) ||
      (this.degree && this.degree.toLowerCase().includes(q))
    );
  }
}
