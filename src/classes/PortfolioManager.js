export class PortfolioManager {
  constructor({
    projects = [],
    qualifications = [],
    courses = [],
    passions = [],
  } = {}) {
    this.projects = projects;
    this.qualifications = qualifications;
    this.courses = courses;
    this.passions = passions;

    // Define canonical main category registry
    this.categoryRegistry = [
      {
        id: 'embedded-systems',
        section: 'engineering',
        title: 'Embedded Systems Projects',
        shortTitle: 'Embedded Systems',
        subtitle: 'Firmware, Sensors, RTOS & IoT Edge Nodes',
        description: 'Low-level C/C++ firmware, ESP32 and STM32 architectures, FreeRTOS task scheduling, custom sensor interfacing, and robust IoT telemetry transmitters.',
        icon: 'cpu',
        highlightColor: 'cyan',
        glowClass: 'hover:border-cyan-400/50 hover:shadow-[0_0_35px_-5px_rgba(0,242,254,0.35)]',
        textGradient: 'from-cyan-400 to-blue-400',
        accentBadge: 'Firmware & Hardware',
        getItems: () => this.projects.filter((p) => p.category === 'Embedded Systems'),
      },
      {
        id: 'industrial-automation',
        section: 'engineering',
        title: 'Industrial Automation Projects',
        shortTitle: 'Industrial Automation',
        subtitle: 'PLC Systems, Conveyor Lines & SCADA Historians',
        description: 'Deterministic industrial control loops, Siemens S7-1500 & Mitsubishi GX Works ladder logic, PROFINET & Modbus TCP protocols, and high-speed sorting cells.',
        icon: 'factory',
        highlightColor: 'teal',
        glowClass: 'hover:border-teal-400/50 hover:shadow-[0_0_35px_-5px_rgba(0,229,185,0.35)]',
        textGradient: 'from-teal-400 to-emerald-400',
        accentBadge: 'Industry 4.0 & PLC',
        getItems: () => this.projects.filter((p) => p.category === 'Industrial Automation'),
      },
      {
        id: 'robotics',
        section: 'engineering',
        title: 'Robotics Projects',
        shortTitle: 'Robotics Engineering',
        subtitle: 'Autonomous Mobile Robots, SLAM & 6-DOF Kinematics',
        description: 'Differential-drive AMRs using Google Cartographer 2D LiDAR SLAM, ROS 2 Nav2 costmaps, analytical inverse kinematics for 6-DOF manipulators, and Gazebo physics digital twins.',
        icon: 'bot',
        highlightColor: 'blue',
        glowClass: 'hover:border-blue-400/50 hover:shadow-[0_0_35px_-5px_rgba(59,130,246,0.35)]',
        textGradient: 'from-blue-400 to-indigo-400',
        accentBadge: 'ROS 2 & Kinematics',
        getItems: () => this.projects.filter((p) => p.category === 'Robotics'),
      },
      {
        id: 'machine-learning',
        section: 'engineering',
        title: 'Machine Learning Projects',
        shortTitle: 'Machine Learning',
        subtitle: 'Industrial Predictive Analytics & Vision Inspection',
        description: 'Applied machine learning pipelines: edge vibration FFT classification, automated computer vision defect sorting, predictive maintenance models, and real-time telemetry processing.',
        icon: 'brain',
        highlightColor: 'violet',
        glowClass: 'hover:border-violet-400/50 hover:shadow-[0_0_35px_-5px_rgba(139,92,246,0.35)]',
        textGradient: 'from-violet-400 to-purple-400',
        accentBadge: 'Predictive AI & Vision',
        getItems: () => this.projects.filter((p) => p.category === 'Machine Learning'),
      },
      {
        id: 'qualifications',
        section: 'education',
        title: 'Formal Educational Qualifications',
        shortTitle: 'Formal Qualifications',
        subtitle: 'BSc Software Engineering, Schooling & SLIoT Challenge',
        description: 'Academic foundation at Sabaragamuwa University of Sri Lanka, high-distinction Physical Science schooling at Vidyartha College Kandy, and national SLIoT Challenge semi-finalist recognition.',
        icon: 'graduation-cap',
        highlightColor: 'emerald',
        glowClass: 'hover:border-emerald-500/50 hover:shadow-[0_0_35px_-5px_rgba(16,185,129,0.35)]',
        textGradient: 'from-emerald-400 to-teal-300',
        accentBadge: 'Academic & National',
        getItems: () => this.qualifications,
      },
      {
        id: 'courses',
        section: 'courses',
        title: 'Additional Technical Courses',
        shortTitle: 'Technical Courses',
        subtitle: 'Certified Industrial PLC, ROS 2 & RTOS Specializations',
        description: 'Continuous hands-on specialization across Mitsubishi GX Works3 programming, ROS 2 robotics navigation, FreeRTOS real-time embedded systems, and modern full-stack web architectures.',
        icon: 'award',
        highlightColor: 'amber',
        glowClass: 'hover:border-amber-400/50 hover:shadow-[0_0_35px_-5px_rgba(245,158,11,0.35)]',
        textGradient: 'from-amber-400 to-orange-400',
        accentBadge: 'Verified Specializations',
        getItems: () => this.courses,
      },
      {
        id: 'passions',
        section: 'passions',
        title: 'Passions & Extracurriculars',
        shortTitle: 'Beyond Code',
        subtitle: 'Cricket Opening Athlete, Drummer & Community Media',
        description: 'Discipline, timing, and high-pressure team execution forged through club & university opening batsman cricket, live stage percussion drumming, and videography volunteering.',
        icon: 'sparkles',
        highlightColor: 'rose',
        glowClass: 'hover:border-rose-500/50 hover:shadow-[0_0_35px_-5px_rgba(244,63,94,0.35)]',
        textGradient: 'from-rose-400 to-pink-400',
        accentBadge: 'Athletics & Artistry',
        getItems: () => this.passions,
      },
    ];
  }

  getAll(collection) {
    return [...(this[collection] ?? [])];
  }

  findById(collection, id) {
    return this.getAll(collection).find((entry) => entry.id === id) ?? null;
  }

  getMainCategories() {
    return this.categoryRegistry.map((cat) => {
      const items = cat.getItems();
      return {
        ...cat,
        count: items.length,
        items,
      };
    });
  }

  getEngineeringCategories() {
    return this.getMainCategories().filter((cat) => cat.section === 'engineering');
  }

  getFormalEducationCategory() {
    return this.getCategoryMeta('qualifications');
  }

  getTechnicalCoursesCategory() {
    return this.getCategoryMeta('courses');
  }

  getPassionsCategory() {
    return this.getCategoryMeta('passions');
  }

  getCategoryMeta(categoryId) {
    const found = this.categoryRegistry.find((cat) => cat.id === categoryId);
    if (!found) return null;
    const items = found.getItems();
    return {
      ...found,
      count: items.length,
      items,
    };
  }

  getItemsByCategory(categoryId) {
    const meta = this.categoryRegistry.find((cat) => cat.id === categoryId);
    if (!meta) return [];
    return meta.getItems();
  }

  getItem(categoryId, itemId) {
    if (categoryId) {
      const items = this.getItemsByCategory(categoryId);
      const found = items.find((item) => item.id === itemId);
      if (found) return { item: found, categoryMeta: this.getCategoryMeta(categoryId) };
    }

    // Fallback: search across all collections
    for (const cat of this.categoryRegistry) {
      const items = cat.getItems();
      const found = items.find((item) => item.id === itemId);
      if (found) {
        return { item: found, categoryMeta: this.getCategoryMeta(cat.id) };
      }
    }
    return { item: null, categoryMeta: null };
  }

  getAdjacentItem(categoryId, itemId) {
    const items = this.getItemsByCategory(categoryId);
    const index = items.findIndex((i) => i.id === itemId);
    if (index === -1) return { prev: null, next: null };

    const prev = index > 0 ? items[index - 1] : null;
    const next = index < items.length - 1 ? items[index + 1] : null;
    return { prev, next };
  }

  searchAll(query) {
    if (!query) return [];
    const q = query.trim().toLowerCase();
    const results = [];

    this.categoryRegistry.forEach((cat) => {
      const items = cat.getItems().filter((item) => {
        if (typeof item.matchesSearch === 'function') {
          return item.matchesSearch(q);
        }
        return (
          item.title?.toLowerCase().includes(q) ||
          item.summary?.toLowerCase().includes(q)
        );
      });

      items.forEach((item) => {
        results.push({ item, category: cat });
      });
    });

    return results;
  }

  getOverviewStats() {
    return {
      totalProjects: this.projects.length,
      totalQualifications: this.qualifications.length,
      totalCourses: this.courses.length,
      totalPassions: this.passions.length,
      disciplinesCount: 4, // Embedded, Automation, Robotics, ML
    };
  }
}
