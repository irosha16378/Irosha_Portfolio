import { Passion } from '../classes/Passion.js';
import { PortfolioManager } from '../classes/PortfolioManager.js';
import { Project } from '../classes/Project.js';
import { Qualification } from '../classes/Qualification.js';

const projects = [
  new Project({
    id: 'embedded-monitor',
    title: 'Connected sensor monitor',
    category: 'Embedded Systems',
    summary: 'An embedded sensing concept for gathering real-world signals and presenting them as clear, useful data.',
    technologies: ['ESP32', 'C / C++', 'Sensors', 'IoT'],
    icon: 'cpu',
    status: 'Project concept',
    documentation: ['Project brief and use case', 'Hardware selection and sensor notes', 'Firmware behavior and test plan'],
    architecture: ['Sensor inputs', 'ESP32 firmware', 'Wireless data transport', 'Monitoring interface'],
    media: [],
  }),
  new Project({
    id: 'plc-control',
    title: 'PLC process control',
    category: 'Industrial Automation',
    summary: 'A control-system exploration focused on reliable sequencing, industrial I/O, and practical PLC workflows.',
    technologies: ['PLC', 'Mitsubishi GX Works', 'Ladder Logic', 'HMI'],
    icon: 'factory',
    status: 'Project concept',
    documentation: ['Process overview and sequence', 'I/O list and controller notes', 'Safety and verification checklist'],
    architecture: ['Field sensors and actuators', 'PLC sequence logic', 'Operator HMI', 'Process feedback'],
    media: [],
  }),
  new Project({
    id: 'robotics-platform',
    title: 'Sensor-guided robotics',
    category: 'Robotics',
    summary: 'A robotics project concept connecting sensor inputs, microcontroller logic, and responsive movement.',
    technologies: ['ROS', 'ESP32', 'Sensors', 'C++'],
    icon: 'bot',
    status: 'Project concept',
    documentation: ['Robot goals and operating assumptions', 'Sensor and control-loop notes', 'Simulation and test plan'],
    architecture: ['Sensors', 'ROS nodes and control logic', 'ESP32 interface', 'Robot motion'],
    media: [],
  }),
  new Project({
    id: 'ml-exploration',
    title: 'Applied machine learning',
    category: 'Machine Learning',
    summary: 'An applied ML exploration: turning data into a useful prediction through careful experimentation.',
    technologies: ['Python', 'Machine Learning', 'Data'],
    icon: 'brain',
    status: 'Project concept',
    documentation: ['Problem statement and data notes', 'Baseline model and evaluation', 'Experiment tracking and next steps'],
    architecture: ['Data collection', 'Cleaning and feature preparation', 'Model training', 'Evaluation and results'],
    media: [],
  }),
];

const qualifications = [
  new Qualification({
    id: 'sabaragamuwa-university',
    title: 'BSc (Hons) Software Engineering',
    institution: 'Sabaragamuwa University of Sri Lanka',
    date: 'CURRENT',
    summary: 'Studying software engineering and exploring connections between software, hardware, and intelligent systems.',
    icon: 'graduation-cap',
    details: ['Academic programme: BSc (Hons) Software Engineering', 'Current focus: software development, engineering practice, and emerging technologies', 'Semester modules and project breakdowns can be added as the programme progresses'],
  }),
  new Qualification({
    id: 'vidyartha-college',
    title: 'G.C.E. O/L · 7A 2C & A/L Physical Science · ABC',
    institution: 'Vidyartha College, Kandy',
    date: 'SCHOOL',
    summary: 'Ordinary Level results of 7A 2C and Advanced Level studies in the Physical Science stream, achieving ABC.',
    icon: 'book-open',
    details: ['G.C.E. Ordinary Level: 7A 2C', 'G.C.E. Advanced Level: Physical Science stream, ABC', 'School: Vidyartha College, Kandy'],
  }),
  new Qualification({
    id: 'sliot-challenge',
    title: 'SLIoT Challenge · Semi-finalist',
    institution: 'SLIoT Challenge 2026',
    date: '2026',
    summary: 'Recognized as a semi-finalist in the 2026 SLIoT Challenge.',
    icon: 'award',
    details: ['Achievement: Semi-finalist', 'Competition: SLIoT Challenge 2026', 'Project details and competition stages can be added here'],
  }),
];

const passions = [
  new Passion({
    id: 'cricket',
    title: 'Cricket athlete',
    category: 'Sport · Opening player',
    summary: 'An active university and club-level opening player, learning teamwork, leadership, and discipline under pressure.',
    icon: 'trophy',
    details: ['University and club-level cricket', 'Opening player', 'Teamwork, leadership, focus, and discipline'],
  }),
  new Passion({
    id: 'drumming',
    title: 'Musician & drummer',
    category: 'Music · Live performance',
    summary: 'A passionate drummer participating in university musical events and live performances.',
    icon: 'drum',
    details: ['Drums and rhythm', 'University musical events', 'Live performances and creative collaboration'],
  }),
  new Passion({
    id: 'videography-volunteering',
    title: 'Videography & volunteering',
    category: 'Community · Media',
    summary: 'Combining community service with media production and videography.',
    icon: 'camera',
    details: ['Community service and volunteering', 'Videography and media production', 'Capturing and sharing community stories'],
  }),
];

export const portfolio = new PortfolioManager({ projects, qualifications, passions });
