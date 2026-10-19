import { PortfolioManager } from '../src/classes/ProjectManager.js';

// Add projects here; the portfolio UI derives its category filters from this data.
export const portfolio = new PortfolioManager([
  {
    id: 'embedded-monitor',
    title: 'Connected sensor monitor',
    category: 'Embedded Systems',
    summary: 'An embedded sensing concept for gathering real-world signals and presenting them as clear, useful data.',
    technologies: ['ESP32', 'C / C++', 'Sensors', 'IoT'],
    icon: 'cpu',
    status: 'Project concept',
  },
  {
    id: 'plc-control',
    title: 'PLC process control',
    category: 'Industrial Automation',
    summary: 'A control-system exploration focused on reliable sequencing, industrial I/O, and practical PLC workflows.',
    technologies: ['PLC', 'Mitsubishi GX Works', 'Ladder Logic', 'HMI'],
    icon: 'factory',
    status: 'Project concept',
  },
  {
    id: 'robotics-platform',
    title: 'Sensor-guided robotics',
    category: 'Robotics',
    summary: 'A robotics project concept connecting sensor inputs, microcontroller logic, and responsive movement.',
    technologies: ['ROS', 'ESP32', 'Sensors', 'C++'],
    icon: 'bot',
    status: 'Project concept',
  },
  {
    id: 'ml-exploration',
    title: 'Applied machine learning',
    category: 'Machine Learning',
    summary: 'An applied ML exploration: turning data into a useful prediction through careful experimentation.',
    technologies: ['Python', 'Machine Learning', 'Data'],
    icon: 'brain',
    status: 'Project concept',
  },
]);
