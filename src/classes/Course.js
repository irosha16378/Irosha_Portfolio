export class Course {
  constructor({
    id,
    title,
    provider,
    instructor = '',
    completionDate = '2024',
    duration = '40 Hours',
    skillsAcquired = [],
    summary,
    description = '',
    icon = 'award',
    category = 'Technical Certifications',
    categoryKey = 'courses',
    certificateId = '',
    certificateUrl = '',
    modules = [],
    practicalWork = [],
    status = 'Completed',
    highlightColor = 'violet',
    media = [],
  }) {
    if (!id || !title || !provider || !summary) {
      throw new TypeError('A course requires an id, title, provider, and summary.');
    }
    this.id = id;
    this.title = title;
    this.provider = provider;
    this.instructor = instructor;
    this.completionDate = completionDate;
    this.duration = duration;
    this.skillsAcquired = Array.isArray(skillsAcquired) ? skillsAcquired : [];
    this.summary = summary;
    this.description = description || summary;
    this.icon = icon;
    this.category = category;
    this.categoryKey = categoryKey;
    this.certificateId = certificateId;
    this.certificateUrl = certificateUrl;
    this.modules = Array.isArray(modules) ? modules : [];
    this.practicalWork = Array.isArray(practicalWork) ? practicalWork : [];
    this.status = status;
    this.highlightColor = highlightColor;
    this.media = Array.isArray(media) ? media : [];
  }

  hasCertificate() {
    return Boolean(this.certificateUrl || this.certificateId);
  }

  matchesSearch(term) {
    if (!term) return true;
    const q = term.toLowerCase();
    return (
      this.title.toLowerCase().includes(q) ||
      this.provider.toLowerCase().includes(q) ||
      this.summary.toLowerCase().includes(q) ||
      this.skillsAcquired.some((s) => s.toLowerCase().includes(q))
    );
  }
}
