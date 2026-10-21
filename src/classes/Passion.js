export class Passion {
  constructor({
    id,
    title,
    category,
    categoryKey = 'passions',
    role = '',
    summary,
    description = '',
    icon = 'trophy',
    highlights = [],
    details = [],
    achievements = [],
    stats = {},
    media = [],
    highlightColor = 'amber',
  }) {
    if (!id || !title || !category || !summary) {
      throw new TypeError('A passion requires an id, title, category, and summary.');
    }
    this.id = id;
    this.title = title;
    this.category = category;
    this.categoryKey = categoryKey;
    this.role = role;
    this.summary = summary;
    this.description = description || summary;
    this.icon = icon;
    this.highlights = Array.isArray(highlights) ? highlights : [];
    this.details = Array.isArray(details) ? details : [];
    this.achievements = Array.isArray(achievements) ? achievements : [];
    this.stats = stats;
    this.media = Array.isArray(media) ? media : [];
    this.highlightColor = highlightColor;
  }

  matchesSearch(term) {
    if (!term) return true;
    const q = term.toLowerCase();
    return (
      this.title.toLowerCase().includes(q) ||
      this.category.toLowerCase().includes(q) ||
      this.summary.toLowerCase().includes(q)
    );
  }
}
