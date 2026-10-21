export class Project {
  constructor({
    id,
    title,
    category,
    categoryKey,
    subcategory = '',
    tagline = '',
    summary,
    description = '',
    technologies = [],
    icon = 'cpu',
    status = 'Completed',
    period = '2024 - 2026',
    role = 'Lead Engineer',
    liveUrl = '',
    githubUrl = 'https://github.com/irosha',
    documentation = [],
    architecture = [],
    specs = {},
    hardware = [],
    protocols = [],
    codeSnippet = '',
    media = [],
    highlightColor = 'cyan',
  }) {
    if (!id || !title || !category || !summary) {
      throw new TypeError('A project requires an id, title, category, and summary.');
    }
    this.id = id;
    this.title = title;
    this.category = category;
    this.categoryKey = categoryKey || category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    this.subcategory = subcategory;
    this.tagline = tagline;
    this.summary = summary;
    this.description = description || summary;
    this.technologies = Array.isArray(technologies) ? technologies : [];
    this.icon = icon;
    this.status = status;
    this.period = period;
    this.role = role;
    this.liveUrl = liveUrl;
    this.githubUrl = githubUrl;
    this.documentation = Array.isArray(documentation) ? documentation : [];
    this.architecture = Array.isArray(architecture) ? architecture : [];
    this.specs = specs;
    this.hardware = Array.isArray(hardware) ? hardware : [];
    this.protocols = Array.isArray(protocols) ? protocols : [];
    this.codeSnippet = codeSnippet;
    this.media = Array.isArray(media) ? media : [];
    this.highlightColor = highlightColor;
  }

  getTechCount() {
    return this.technologies.length;
  }

  hasCode() {
    return Boolean(this.codeSnippet && this.codeSnippet.trim().length > 0);
  }

  hasArchitecture() {
    return this.architecture.length > 0;
  }

  getPrimaryImage() {
    return this.media[0] || null;
  }

  matchesSearch(term) {
    if (!term) return true;
    const q = term.toLowerCase();
    return (
      this.title.toLowerCase().includes(q) ||
      this.summary.toLowerCase().includes(q) ||
      this.category.toLowerCase().includes(q) ||
      this.technologies.some((t) => t.toLowerCase().includes(q)) ||
      (this.hardware && this.hardware.some((h) => h.toLowerCase().includes(q)))
    );
  }
}
