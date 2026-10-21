import { Cpu, Factory, Bot, Brain, Layers, Terminal, Sparkles } from 'lucide-react';

const skillDomains = [
  {
    icon: Cpu,
    label: 'Embedded Systems & Hardware',
    highlightColor: 'cyan',
    borderColor: 'hover:border-cyan-400/40',
    skills: [
      { name: 'ESP32 & STM32 (ARM Cortex-M)', level: 'Advanced' },
      { name: 'FreeRTOS Multitasking', level: 'Advanced' },
      { name: 'C / Embedded C++', level: 'Advanced' },
      { name: 'SPI, I2C, UART, CAN Bus', level: 'Advanced' },
      { name: 'LoRa / LoRaWAN & MQTT TLS', level: 'Intermediate' },
      { name: 'Schematic & PCB Prototyping', level: 'Intermediate' },
    ],
  },
  {
    icon: Factory,
    label: 'Industrial Automation & PLC',
    highlightColor: 'teal',
    borderColor: 'hover:border-teal-400/40',
    skills: [
      { name: 'Mitsubishi GX Works3 (iQ-R/F)', level: 'Advanced' },
      { name: 'Siemens TIA Portal & S7-1500', level: 'Intermediate' },
      { name: 'Ladder Diagram & Structured Text', level: 'Advanced' },
      { name: 'PROFINET IO & Modbus TCP', level: 'Intermediate' },
      { name: 'Ignition SCADA & WinCC HMI', level: 'Intermediate' },
      { name: 'VFD Inverters & Pneumatics', level: 'Intermediate' },
    ],
  },
  {
    icon: Bot,
    label: 'Robotics & Autonomous Systems',
    highlightColor: 'blue',
    borderColor: 'hover:border-blue-400/40',
    skills: [
      { name: 'ROS 2 Humble Architecture', level: 'Intermediate' },
      { name: 'Google Cartographer 2D SLAM', level: 'Intermediate' },
      { name: 'Nav2 Navigation & Costmaps', level: 'Intermediate' },
      { name: 'Kinematics & MoveIt 2', level: 'Intermediate' },
      { name: 'Gazebo Physics Simulation', level: 'Intermediate' },
      { name: 'LiDAR & Quadrature Encoders', level: 'Advanced' },
    ],
  },
  {
    icon: Brain,
    label: 'Software, AI & Web Architecture',
    highlightColor: 'violet',
    borderColor: 'hover:border-violet-400/40',
    skills: [
      { name: 'Python (NumPy, PyTorch, Pandas)', level: 'Advanced' },
      { name: 'OpenCV Computer Vision', level: 'Intermediate' },
      { name: 'React, Vite & Tailwind CSS', level: 'Advanced' },
      { name: 'Node.js & RESTful APIs', level: 'Intermediate' },
      { name: 'SQL & TimescaleDB Historians', level: 'Intermediate' },
      { name: 'Git, Docker & Linux Toolchain', level: 'Advanced' },
    ],
  },
];

export default function TechnicalSkills() {
  return (
    <section className="py-20 border-t border-white/10" id="skills">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-cyan-400">
              03 / TECHNICAL ARSENAL
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-medium tracking-tight text-white">
              An engineering toolkit, <span className="text-cyan-400">purpose-built.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-400 leading-relaxed font-sans">
            Spanning low-level silicon drivers, industrial automation fieldbuses, robotic perception stacks, and full-stack software.
          </p>
        </div>

        {/* 4 Domains Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillDomains.map(({ icon: Icon, label, highlightColor, borderColor, skills }, idx) => (
            <div
              key={label}
              className={`rounded-2xl border border-white/10 bg-charcoal-900/70 p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 ${borderColor}`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-charcoal-850 text-cyan-400">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-display text-base font-medium text-white">{label}</h3>
                </div>
                <span className="font-mono text-xs text-slate-600 font-semibold">0{idx + 1}</span>
              </div>

              {/* Skills Matrix */}
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.name} className="flex items-center justify-between rounded-lg border border-white/5 bg-charcoal-850/50 px-3.5 py-2.5 text-xs">
                    <span className="text-slate-200 font-medium">{skill.name}</span>
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded border ${
                      skill.level === 'Advanced' 
                        ? 'text-cyan-300 border-cyan-500/30 bg-cyan-950/40' 
                        : 'text-slate-400 border-white/10 bg-charcoal-900/60'
                    }`}>
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
