import { Course } from '../classes/Course.js';
import { Passion } from '../classes/Passion.js';
import { PortfolioManager } from '../classes/PortfolioManager.js';
import { Project } from '../classes/Project.js';
import { Qualification } from '../classes/Qualification.js';

// ==========================================
// 1. EMBEDDED SYSTEMS PROJECTS
// ==========================================
const embeddedProjects = [
  new Project({
    id: 'industrial-iot-vibration-node',
    title: 'Industrial Edge IoT Vibration & Thermal Node',
    category: 'Embedded Systems',
    subcategory: 'Condition Monitoring & FreeRTOS',
    tagline: 'Edge FFT computation and real-time anomaly detection for high-speed industrial spindle motors',
    summary: 'A custom edge IoT sensor node designed for continuous vibration and thermal health monitoring of high-speed industrial motors. Performs local Fast Fourier Transform (FFT) analysis on vibration data to compute RMS g acceleration values before transmitting summaries over TLS-encrypted MQTT.',
    description: 'Engineered from custom schematic to firmware: an ESP32-S3 edge node interfacing with ADXL345 high-bandwidth digital accelerometers via SPI and PT100 RTD sensors. Leverages FreeRTOS dual-core multitasking to run continuous DMA sampling on Core 1 while Core 0 handles TLS 1.3 encryption and MQTT transport with zero buffer jitter.',
    technologies: ['ESP32-S3', 'FreeRTOS', 'C / C++', 'ADXL345', 'SPI / I2C', 'MQTT / TLS', 'DSP / FFT'],
    hardware: ['ESP32-S3 8MB Octal SPI Flash', 'Analog Devices ADXL345 Accelerometer', 'MAX31865 RTD Converter', 'PT100 Platinum Sensor', 'Custom 2-layer PCB with LDO regulation'],
    protocols: ['SPI @ 5MHz', 'I2C Standard/Fast', 'MQTT v3.1.1 over TLS 1.3', 'Wi-Fi 802.11 b/g/n'],
    icon: 'cpu',
    status: 'Deployed Prototype',
    period: '2025 - 2026',
    role: 'Firmware & Edge Architecture',
    highlightColor: 'cyan',
    documentation: [
      'Dual-core FreeRTOS task partition & queue buffer sizing',
      'Radix-2 FFT vibration windowing (Hanning filter) implementation',
      'Over-the-Air (OTA) secure firmware update workflow',
      'Power budget analysis: 82mA active transmission, 12uA deep sleep'
    ],
    architecture: [
      'High-Speed Piezo/MEMS Sensors (1.6 kHz sample rate)',
      'SPI DMA Ring Buffers into ESP32 SRAM',
      'Core 1: Fast Fourier Transform & RMS Vibration Kernel',
      'Core 0: TLS 1.3 Socket & MQTT Broker Publishing',
      'Central SCADA / Grafana Telemetry Gateway'
    ],
    specs: {
      'Sampling Rate': '3200 Hz per axis',
      'FFT Resolution': '512-point Radix-2',
      'Thermal Accuracy': '±0.15°C across -40°C to +150°C',
      'MQTT Latency': '< 65ms edge-to-broker'
    },
    codeSnippet: `// FreeRTOS Vibration Sensor Processing Task on ESP32-S3
void vTaskVibrationAnalysis(void *pvParameters) {
    float sample_buf[512];
    for (;;) {
        read_accel_sample_buffer(sample_buf, 512);
        dsps_fft2r_fc32(sample_buf, 256);
        float peak_rms = calculate_rms_g(sample_buf);
        xQueueSend(xLogQueue, &peak_rms, portMAX_DELAY);
        vTaskDelay(pdMS_TO_TICKS(100));
    }
}`,
    media: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80'
    ]
  }),
  new Project({
    id: 'long-range-lorawan-factory',
    title: 'Smart Factory LoRaWAN Environmental Gateway',
    category: 'Embedded Systems',
    subcategory: 'Ultra-Low Power LPWAN',
    tagline: 'Sub-gigahertz wireless sensor mesh for microclimate tracking across a 50,000 sq. ft facility',
    summary: 'Designed ultra-low power wireless sensor nodes deployed across manufacturing plants for continuous air quality, temperature, and humidity monitoring. Operates off LiSOCl2 cells with over 2.5-year battery autonomy.',
    description: 'Built around the ultra-low-power ARM Cortex-M4 architecture and Semtech SX1276 transceiver. Implemented adaptive data rating (ADR), hardware CRC error checking, and microampere-level sleep states to achieve unprecedented endurance in harsh electrical noise environments.',
    technologies: ['STM32L4', 'SX1276 LoRa', 'C++', 'BME280', 'ChirpStack', 'Low-Power Sleep'],
    hardware: ['STM32L432KC Ultra-low-power ARM Cortex-M4', 'Semtech SX1276 Sub-GHz Transceiver', 'Bosch BME280 Environmental Sensor', 'Tadiran 3.6V LiSOCl2 Cell'],
    protocols: ['LoRaWAN 1.0.3 Class A', 'SPI', 'I2C'],
    icon: 'radio',
    status: 'Completed',
    period: '2024 - 2025',
    role: 'Embedded Systems Engineer',
    highlightColor: 'cyan',
    documentation: [
      'Duty cycle compliance & adaptive data rate (ADR) tuning',
      'Low-power stop mode consuming 1.8uA between transmissions',
      'ChirpStack application server integration with Webhooks to PostgreSQL'
    ],
    architecture: [
      'Bosch BME280 Environment Transducer',
      'STM32L4 Microcontroller with Hardware CRC',
      'Semtech SX1276 LoRa Transceiver (868/915 MHz)',
      'ChirpStack Network Server Gateway',
      'Time-Series Historian & Grafana Alert Panel'
    ],
    specs: {
      'Transmission Range': '1.8 km indoor non-line-of-sight',
      'Battery Life': '2.8 Years @ 10-minute uplink interval',
      'Deep Sleep Current': '1.8 uA in STOP2 mode',
      'Payload Size': '11-byte bit-packed binary frame'
    },
    codeSnippet: `// LoRaWAN Payload Compression & Bit-Packing
uint8_t payload[4];
int16_t temp_scaled = (int16_t)(current_temp * 100);
payload[0] = (temp_scaled >> 8) & 0xFF;
payload[1] = temp_scaled & 0xFF;
lora_send_unconfirmed(1, payload, 4);`,
    media: [
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=1200&q=80'
    ]
  })
];

// ==========================================
// 2. INDUSTRIAL AUTOMATION PROJECTS
// ==========================================
const automationProjects = [
  new Project({
    id: 'conveyor-vision-sorting',
    title: 'Multi-Zone Conveyor & Machine Vision Sorting Line',
    category: 'Industrial Automation',
    subcategory: 'PLC & Machine Vision',
    tagline: 'High-speed automated parts inspection and pneumatic sorting processing 120 items/min',
    summary: 'Engineered an industrial sorting conveyor line with automated vision inspection. The system processes up to 120 items/minute, identifying physical anomalies via HSV color and contour analysis, triggering pneumatic sorting gates within a strict 50ms window.',
    description: 'Combines deterministic Siemens S7-1500 PLC control with an industrial GigE machine vision system. Features optical encoder synchronization for exact part tracking along the belt, fail-safe dual-channel E-stops, and a live WinCC SCADA touch interface.',
    technologies: ['Siemens S7-1500', 'Mitsubishi GX Works', 'Ladder Logic', 'Structured Text', 'OpenCV', 'PROFINET', 'WinCC SCADA'],
    hardware: ['Siemens S7-1512C-1 PN CPU', 'Cognex / Industrial CMOS GigE Camera', 'Festo Pneumatic Solenoid Ejectors', 'Schneider Altivar VFD Motors', 'Keyence Retro-reflective Photoelectric Sensors'],
    protocols: ['PROFINET IO Real-Time (RT)', 'Modbus TCP', 'OPC UA', 'Industrial Ethernet'],
    icon: 'factory',
    status: 'Completed',
    period: '2024 - 2025',
    role: 'PLC Programmer & Vision Architect',
    highlightColor: 'teal',
    documentation: [
      'Functional Safety (IEC 62061 / ISO 13849) SIL 2 E-stop integration',
      'Structured Text (ST) state-machine sequencer for dual-ejector station',
      'Camera trigger optical synchronization via encoder high-speed counter (HSC)',
      'HMI recipes and operator override interface'
    ],
    architecture: [
      'Rotary Quadrature Encoder + Photoelectric Sensor Trigger',
      'Industrial GigE Camera Vision Capture Node',
      'OpenCV Anomaly & Contour Inspection Engine',
      'Siemens S7-1500 PLC Sorting State Machine',
      'High-Speed Festo Pneumatic Ejector Diverters'
    ],
    specs: {
      'Throughput': '120 parts / minute',
      'Sorting Accuracy': '99.4% on dimensional checks',
      'Pneumatic Response': '< 45ms actuation window',
      'Bus Cycle Time': '2ms PROFINET deterministic cycle'
    },
    codeSnippet: `// Structured Text (ST) S7-1500 Conveyor Control
IF gv_VisionResult.DefectDetected THEN
    #Timer_PneumaticEject(IN := TRUE, PT := T#45ms);
    IF #Timer_PneumaticEject.Q THEN
        qv_EjectorValve := TRUE;
    END_IF;
END_IF;`,
    media: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1200&q=80'
    ]
  }),
  new Project({
    id: 'scada-factory-oee',
    title: 'Centralized Factory SCADA & Live Alarm Historian',
    category: 'Industrial Automation',
    subcategory: 'SCADA & Industry 4.0',
    tagline: 'Floor-wide telemetry orchestration across 12 automated cells with automated OEE calculation',
    summary: 'Centralized factory floor visualization and monitoring system overseeing 12 automated production cells. Features live Overall Equipment Effectiveness (OEE) tracking, fault diagnostic matrix, and automated shift reporting.',
    description: 'Designed an enterprise SCADA architecture utilizing Ignition and OPC UA to bridge heterogeneous PLC islands (Siemens, Allen-Bradley, and Mitsubishi). Includes sub-second trend historian logging into TimescaleDB with instant Pareto downtime analysis.',
    technologies: ['Ignition SCADA', 'OPC UA', 'SQL Historian', 'MQTT Sparkplug B', 'Python Scripting', 'Siemens TIA Portal'],
    hardware: ['Industrial IPC Rackmount Server', 'Siemens ET200SP Remote I/O Racks', 'Moxa Managed Industrial Ethernet Switches', 'PanelView Touchscreen Terminals'],
    protocols: ['OPC UA Binary', 'EtherNet/IP', 'PROFINET', 'ODBC SQL Database'],
    icon: 'activity',
    status: 'Completed',
    period: '2025',
    role: 'SCADA & Systems Integrator',
    highlightColor: 'teal',
    documentation: [
      'Tag architecture and standard UDT (User Defined Types) hierarchy',
      'Live OEE calculation engine based on Availability, Performance, and Quality',
      'Automated email/SMS notification system on Priority 1 emergency alarms',
      'Historical trend viewer with sub-second temporal zooming'
    ],
    architecture: [
      'Distributed PLC Controllers (Siemens & Allen-Bradley)',
      'Managed Industrial Switch Fabric with VLAN Isolation',
      'Ignition SCADA Core Server & OPC UA Gateway',
      'PostgreSQL TimescaleDB Time-Series Data Lake',
      'Operator Touchscreen Terminals & Management Dashboards'
    ],
    specs: {
      'Tag Capacity': '4,500 active telemetry tags',
      'Polling Rate': '100ms on safety tags, 1s on thermal telemetry',
      'Historian Compression': 'Boxcar algorithm with 94% storage efficiency',
      'Failover Redundancy': 'Warm standby secondary server sync'
    },
    codeSnippet: `// SQL Query for Production Cell OEE Analytics
SELECT cell_id, AVG(oee_percentage) as avg_oee,
       SUM(downtime_seconds) as total_downtime
FROM factory_historian.cell_telemetry
WHERE timestamp >= NOW() - INTERVAL '24 HOURS'
GROUP BY cell_id ORDER BY avg_oee DESC;`,
    media: [
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80'
    ]
  })
];

// ==========================================
// 3. ROBOTICS PROJECTS
// ==========================================
const roboticsProjects = [
  new Project({
    id: 'autonomous-mobile-robot-amr',
    title: 'Autonomous Mobile Robot (AMR) with 2D LiDAR SLAM',
    category: 'Robotics',
    subcategory: 'Autonomous Navigation & ROS 2',
    tagline: 'Indoor warehouse navigation robot with Google Cartographer SLAM and Nav2 dynamic obstacle avoidance',
    summary: 'Designed and built an industrial-grade Autonomous Mobile Robot (AMR) capable of creating occupancy grid maps using Google Cartographer SLAM. Features real-time dynamic obstacle avoidance using Nav2 Costmaps and DWB Local Planner.',
    description: 'Engineered an end-to-end differential drive mobile base. Combines a Raspberry Pi 4 running ROS 2 Humble with an STM32F4 motor controller managing quadrature encoder PID feedback. Seamlessly maps indoor environments and navigates to designated waypoints with millimeter precision.',
    technologies: ['ROS 2 Humble', 'Google Cartographer', 'Nav2', 'Raspberry Pi 4', 'STM32F4', 'C++', 'Python', 'LiDAR'],
    hardware: ['Raspberry Pi 4 (4GB RAM) Navigation SBC', 'STM32F401 BlackPill Motor Actuation Controller', 'RPLIDAR A1 360° Laser Scanner (12m range)', '24V Planetary DC Motors with 1024-PPR Quadrature Encoders', 'BNO055 9-DOF Absolute IMU'],
    protocols: ['ROS 2 Topic /tf & /cmd_vel', 'UART DMA @ 115200 baud', 'CAN Bus', 'I2C'],
    icon: 'bot',
    status: 'Completed',
    period: '2025 - 2026',
    role: 'Robotics Systems Engineer',
    highlightColor: 'blue',
    documentation: [
      'Differential drive odometry computation with Kalman filter sensor fusion (IMU + Encoders)',
      'Cartographer submap tuning: 0.05m grid resolution, loop closure threshold 0.75',
      'Nav2 behavior tree configuration for recovery spins and backup clearance',
      'STM32 hardware PID closed-loop velocity controller'
    ],
    architecture: [
      'RPLIDAR A1 360° Laser Range Finder + BNO055 9-DOF IMU',
      'STM32F401 Hardware PID Motor Velocity Controller',
      'Raspberry Pi 4 ROS 2 Humble Navigation Stack',
      'Google Cartographer 2D SLAM Engine',
      'Nav2 Autonomous Waypoint Dispatcher & Safety Watchdog'
    ],
    specs: {
      'Mapping Accuracy': '±25 mm grid fidelity',
      'Max Velocity': '1.2 m/s forward velocity',
      'Payload Capacity': '18 kg distributed load',
      'Sensor Frequency': 'LiDAR @ 10Hz, IMU @ 100Hz'
    },
    codeSnippet: `// ROS 2 Nav2 Goal Pose Dispatcher
auto goal_msg = NavigateToPose::Goal();
goal_msg.pose.header.frame_id = "map";
goal_msg.pose.pose.position.x = 4.25;
goal_msg.pose.pose.position.y = -1.80;
goal_msg.pose.pose.orientation.w = 0.707;
goal_msg.pose.pose.orientation.z = 0.707;
nav_action_client_->async_send_goal(goal_msg);`,
    media: [
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1200&q=80'
    ]
  }),
  new Project({
    id: 'robotic-arm-kinematics-sim',
    title: '6-DOF Robotic Arm Trajectory Controller & Digital Twin',
    category: 'Robotics',
    subcategory: 'Kinematics & Digital Twin',
    tagline: 'Analytical Inverse Kinematics and Gazebo physics simulation for multi-axis pick-and-place',
    summary: 'Developed high-precision inverse kinematics algorithms for 6-degree-of-freedom robotic articulators. Built a real-time Gazebo digital twin for path planning, singular pose detection, and joint torque feedforward optimization.',
    description: 'Implements Denavit-Hartenberg (DH) forward kinematics along with Jacobian pseudo-inverse numerical solvers to steer the end-effector in 3D Cartesian space. Evaluated in a full Gazebo digital twin with realistic joint inertia, friction models, and MoveIt 2 obstacle avoidance.',
    technologies: ['C++', 'MoveIt 2', 'Eigen3', 'Gazebo Physics', 'URDF / Xacro', 'Python'],
    hardware: ['6-Axis Industrial Articulated Manipulator', 'Absolute Optical Joint Encoders', 'EtherCAT AC Servo Drives', 'Vacuum Gripper End-Effector'],
    protocols: ['EtherCAT CoE', 'ROS 2 Control Hardware Interface', 'MoveIt 2 Motion Planning API'],
    icon: 'compass',
    status: 'Completed',
    period: '2024 - 2025',
    role: 'Kinematics & Simulation Developer',
    highlightColor: 'blue',
    documentation: [
      'Denavit-Hartenberg (DH) parameterization and analytical forward kinematics',
      'Jacobian Pseudo-Inverse algorithm with singularity avoidance damping factor',
      'Gazebo physics simulation with realistic joint inertia and friction parameters',
      'MoveIt 2 Cartesian trajectory generator with jerk limiting'
    ],
    architecture: [
      'Cartesian Waypoint Trajectory Generator',
      'Analytical Inverse Kinematics & Jacobian Solver',
      'MoveIt 2 Collision Avoidance & OctoMap Pipeline',
      'Gazebo Physics Digital Twin Simulation',
      'Hardware Controller Abstraction Layer (ros2_control)'
    ],
    specs: {
      'Degrees of Freedom': '6 Revolute Joints',
      'Repeatability': '±0.05 mm simulated target error',
      'Cycle Time': '1.4 seconds per pick-and-place arc',
      'Reach Radius': '850 mm spherical workspace'
    },
    codeSnippet: `// Jacobian Inversion with Damped Least Squares for 6-DOF
Eigen::MatrixXd J = computeAnalyticalJacobian(current_joints);
double lambda = 0.01; // Damping factor for singularity robustness
Eigen::MatrixXd J_damped = J.transpose() * (J * J.transpose() + lambda * lambda * Eigen::MatrixXd::Identity(6, 6)).inverse();
Eigen::VectorXd joint_velocities = J_damped * target_cartesian_velocity;`,
    media: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=1200&q=80'
    ]
  })
];

// ==========================================
// 4. MACHINE LEARNING PROJECTS
// ==========================================
const mlProjects = [
  new Project({
    id: 'predictive-maintenance-ai',
    title: 'Motor Health Predictive Maintenance Anomaly Classifier',
    category: 'Machine Learning',
    subcategory: 'Time-Series & Anomaly Detection',
    tagline: 'Deep learning classification of bearing defects and motor health degradation from high-frequency telemetry',
    summary: 'Developed an end-to-end edge ML inference pipeline that classifies industrial motor bearing defects (inner raceway, outer raceway, ball fault) with 98.2% accuracy using 1D-CNN and spectral feature engineering.',
    description: 'Constructed an automated vibration diagnostic pipeline trained on high-speed vibration data. Preprocesses raw waveforms via Hanning FFT filtering, extracts kurtosis and crest factors, and runs quantized INT8 deep neural networks on edge microprocessors for instant maintenance warnings.',
    technologies: ['Python', 'PyTorch', 'Scikit-Learn', 'TensorFlow Lite', 'NumPy', 'Pandas'],
    hardware: ['CWRU Vibration Benchmark Dataset', 'Raspberry Pi 4 Inference Accelerator', 'Edge TPU Coral Coprocessor'],
    protocols: ['REST API', 'ONNX Runtime', 'FlatBuffers'],
    icon: 'brain',
    status: 'Completed',
    period: '2025',
    role: 'Machine Learning Engineer',
    highlightColor: 'violet',
    documentation: [
      'Dataset spectral feature extraction: Kurtosis, Skewness, Crest Factor, and FFT bands',
      '1D-Convolutional Neural Network (CNN) architecture with residual skip connections',
      'Model quantization to INT8 achieving 4x memory reduction for edge deployment',
      'Confusion matrix validation and precision-recall trade-off analysis'
    ],
    architecture: [
      'Multi-Axis Accelerometer Sensor Telemetry',
      'Temporal Sliding Window & Hanning FFT Preprocessing',
      'Quantized 1D-CNN Anomaly Classification Model',
      'Confidence Score & Degradation Trend Calculator',
      'SCADA Early Warning Alert Dispatcher'
    ],
    specs: {
      'Classification Accuracy': '98.2% on benchmark test set',
      'Inference Latency': '12ms on ARM Cortex-A72',
      'Model Size': '184 KB after INT8 quantization',
      'False Positive Rate': '< 0.5% in continuous 48-hour soak testing'
    },
    codeSnippet: `// PyTorch 1D-CNN Bearing Defect Classifier
class BearingFaultCNN(nn.Module):
    def __init__(self, num_classes=4):
        super().__init__()
        self.conv1 = nn.Conv1d(1, 32, kernel_size=15, stride=2)
        self.bn1 = nn.BatchNorm1d(32)
        self.conv2 = nn.Conv1d(32, 64, kernel_size=7, stride=2)
        self.fc = nn.Linear(64 * 60, num_classes)
        
    def forward(self, x):
        x = F.relu(self.bn1(self.conv1(x)))
        x = F.max_pool1d(F.relu(self.conv2(x)), 2)
        return self.fc(x.flatten(1))`,
    media: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=80'
    ]
  }),
  new Project({
    id: 'vision-defect-inspection-ai',
    title: 'Computer Vision Manufacturing Defect Inspector',
    category: 'Machine Learning',
    subcategory: 'Computer Vision & Inspection',
    tagline: 'Real-time surface anomaly detection and dimensional grading for fast-moving production lines',
    summary: 'An industrial computer vision pipeline running real-time defect segmentation on manufactured components. Uses OpenCV morphological filtering and fine-tuned lightweight YOLOv8 models to flag cracks, scratches, and misalignment.',
    description: 'Operates in real-time at 60 frames per second on high-resolution industrial camera feeds. Automatically isolates parts on high-speed belts, performs sub-pixel dimensional checks, and transmits reject signals directly to PLC digital inputs via optocoupled relays.',
    technologies: ['Python', 'OpenCV', 'YOLOv8', 'TorchScript', 'Camera SDK', 'C++'],
    hardware: ['Industrial Matrix CMOS Color Camera', 'Ring LED Diffuse Illumination System', 'NVIDIA Jetson Nano Edge Accelerator'],
    protocols: ['GigE Vision', 'TCP Socket', 'GPIO Trigger Output'],
    icon: 'eye',
    status: 'Completed',
    period: '2025',
    role: 'Computer Vision Engineer',
    highlightColor: 'violet',
    documentation: [
      'Lighting optimization eliminating specular glare on brushed aluminum surfaces',
      'Synthetic data augmentation pipeline with random illumination and rotation',
      'Sub-pixel edge detection for ±0.08mm dimensional verification',
      'Real-time frame pipeline processing 60 FPS without frame drops'
    ],
    architecture: [
      'Optical Ring Diffuse Illuminator & Camera Trigger',
      'GigE Stream Frame Grabber & Undistortion Matrix',
      'YOLOv8 Anomaly Bounding Box & Contour Extractor',
      'Sub-Pixel Dimensional Tolerance Checker',
      'Fast Rejection Signal to PLC via Optocoupled I/O'
    ],
    specs: {
      'Inspection Speed': '60 FPS real-time processing',
      'Detection Resolution': '0.12 mm minimum crack defect size',
      'Inference Latency': '14.2 ms on NVIDIA Jetson TensorRT',
      'False Rejection Rate': '< 0.3%'
    },
    codeSnippet: `// Real-Time Contour Analysis & Sub-Pixel Tolerance Check
cv::Mat gray, blurred, edges;
cv::cvtColor(frame, gray, cv::COLOR_BGR2GRAY);
cv::GaussianBlur(gray, blurred, cv::Size(5, 5), 1.5);
cv::Canny(blurred, edges, 50, 150);
std::vector<std::vector<cv::Point>> contours;
cv::findContours(edges, contours, cv::RETR_EXTERNAL, cv::CHAIN_APPROX_SIMPLE);`,
    media: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80'
    ]
  })
];

// Combine all projects
const allProjects = [
  ...embeddedProjects,
  ...automationProjects,
  ...roboticsProjects,
  ...mlProjects,
];

// ==========================================
// 5. FORMAL EDUCATIONAL QUALIFICATIONS
// ==========================================
const qualifications = [
  new Qualification({
    id: 'sabaragamuwa-university',
    title: 'BSc (Hons) in Software Engineering',
    institution: 'Sabaragamuwa University of Sri Lanka',
    degree: 'Bachelor of Science Honours · Faculty of Applied Sciences',
    date: 'CURRENT · 2023 - 2027',
    period: 'Undergraduate Degree',
    grade: 'Dean’s Honour List Track',
    summary: 'Pursuing a specialized Software Engineering Honours degree, with concentrated coursework in embedded firmware architectures, systems engineering, intelligent algorithms, and real-time distributed systems.',
    description: 'A comprehensive curriculum bridging pure software design patterns, concurrent architectures, microcontrollers, distributed databases, and automated cyber-physical systems. Active contributor to student research and technical society initiatives.',
    icon: 'graduation-cap',
    highlightColor: 'emerald',
    badgeText: 'Degree In Progress',
    highlights: [
      'Department of Computing and Information Systems',
      'Core Focus: Systems Architecture, Real-Time Systems, Embedded C++, Robotics & Machine Learning',
      'Academic Excellence across object-oriented programming, data structures, and computer organization'
    ],
    details: [
      'BSc (Hons) Software Engineering degree programme (SLQF Level 6)',
      'Modules: Embedded Systems Development, Data Structures & Algorithms, Object-Oriented Software Design, Distributed Computing, Database Systems, Computer Networks & Security',
      'Practical Laboratory: Microcontroller labs, industrial automation modules, and capstone engineering design'
    ],
    coursesTaken: [
      'Embedded Systems Architecture',
      'Advanced Data Structures & Algorithms',
      'Distributed Systems & Cloud Computing',
      'Object-Oriented Software Engineering',
      'Robotics & Industrial Automation',
      'Machine Learning & Artificial Intelligence'
    ],
    media: [
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80'
    ]
  }),
  new Qualification({
    id: 'vidyartha-college',
    title: 'G.C.E. Advanced Level & Ordinary Level',
    institution: 'Vidyartha College, Kandy',
    degree: 'Physical Science Stream (A/L) & High Distinction (O/L)',
    date: 'ALUMNI',
    period: 'Secondary Education',
    grade: 'A/L: Physical Science · ABC | O/L: 7A 2C',
    summary: 'Proud alumnus of Vidyartha College, Kandy. Completed G.C.E. Advanced Level in the Physical Science stream achieving ABC (Combined Mathematics, Physics, Chemistry) and Ordinary Level with 7 As.',
    description: 'Built an unshakeable analytical foundation in advanced calculus, classical mechanics, electromagnetism, and chemical thermodynamics. Active participant in college sports teams, inter-school science quizzes, and leadership councils.',
    icon: 'book-open',
    highlightColor: 'emerald',
    badgeText: 'Physical Science Alum',
    highlights: [
      'G.C.E. Advanced Level: Physical Science stream (Combined Maths, Physics, Chemistry) — ABC',
      'G.C.E. Ordinary Level: 7 As and 2 Cs with distinctions in Mathematics, Science, and English',
      'College Sports Colours & Athletic Leadership at Vidyartha College'
    ],
    details: [
      'Rigorous mathematical formulation: differential equations, linear algebra, and vector calculus',
      'Applied Physics: electromagnetic induction, wave mechanics, and electronic principles',
      'Vidyartha College sports society member & competitive collegiate athlete'
    ],
    coursesTaken: [
      'Combined Mathematics (Pure & Applied)',
      'Higher Physics (Mechanics, Waves & Electronics)',
      'Chemistry (Physical, Inorganic & Organic)',
      'Information & Communication Technology'
    ],
    media: [
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=80'
    ]
  }),
  new Qualification({
    id: 'sliot-challenge',
    title: 'SLIoT Challenge 2026 — Semi-Finalist',
    institution: 'SLT-MOBITEL & University of Moratuwa SLIoT',
    degree: 'National IoT Innovation Competition',
    date: '2026',
    period: 'National Recognition',
    grade: 'Top 15 National Teams',
    summary: 'Recognized as a Semi-Finalist in the prestigious Sri Lanka IoT (SLIoT) Challenge 2026 for designing an autonomous edge telemetry node for smart industrial health monitoring.',
    description: 'Competed among hundreds of engineering teams nationwide, demonstrating end-to-end hardware prototyping, low-power sensor integration, cloud telemetry synchronization, and practical industrial commercial viability.',
    icon: 'award',
    highlightColor: 'emerald',
    badgeText: 'National Semi-Finalist',
    highlights: [
      'National Recognition in premier Sri Lankan IoT competition',
      'Engineered hardware prototype under strict 48-hour live evaluation phases',
      'Jury commended edge signal processing accuracy and low-latency MQTT architecture'
    ],
    details: [
      'Competition organized by SLT-MOBITEL in partnership with Department of Electronic & Telecommunication Engineering',
      'Live hardware demonstration of edge vibration analysis and early warning alarms',
      'Presented business feasibility and manufacturing cost optimization model'
    ],
    coursesTaken: [
      'IoT Rapid Prototyping',
      'Hardware-to-Cloud Interfacing',
      'Commercial Product Design & Feasibility'
    ],
    media: [
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80'
    ]
  })
];

// ==========================================
// 6. ADDITIONAL TECHNICAL COURSES
// ==========================================
const courses = [
  new Course({
    id: 'course-industrial-plc',
    title: 'Industrial PLC Programming & Ladder Logic Mastery',
    provider: 'Mitsubishi Electric & Automation Academy',
    instructor: 'Certified Industrial Automation Specialist',
    completionDate: '2025',
    duration: '60 Hours · Comprehensive Lab',
    skillsAcquired: ['Mitsubishi GX Works3', 'Ladder Logic', 'Function Block Diagram', 'Structured Text', 'Industrial Timers & Counters', 'HMI GOT Interface'],
    summary: 'Intensive industrial automation certification focusing on Mitsubishi iQ-R/iQ-F series PLCs, safety interlocks, PID temperature control loops, and SCADA connectivity.',
    description: 'Mastered programming in GX Works3 using Ladder Diagram and Structured Text. Programmed real pneumatic pick-and-place stations, conveyor tracking with high-speed counters, and Modbus RTU communications with VFD inverters.',
    icon: 'factory',
    highlightColor: 'amber',
    certificateId: 'MEL-PLC-2025-8841',
    status: 'Certified Specialization',
    modules: [
      'PLC Architecture, I/O mapping, and wiring schematics',
      'Sequencing with Shift Registers and State Machines',
      'High-Speed Counter (HSC) interrupts for rotary encoder positioning',
      'Analog signal conditioning (4-20mA, 0-10V) and digital filtering'
    ],
    practicalWork: [
      'Automated batch mixing simulation with recipe management',
      'Three-axis gantry pneumatic sorter with emergency fail-safes'
    ],
    media: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80'
    ]
  }),
  new Course({
    id: 'course-ros2-robotics',
    title: 'ROS 2 Robotics Developer Specialization',
    provider: 'ROS Industrial Consortium & ConstructSim',
    instructor: 'Senior Robotics Researcher',
    completionDate: '2025',
    duration: '50 Hours · Practical Robotics',
    skillsAcquired: ['ROS 2 Humble', 'Nav2 Stack', 'C++ / Python Client Libraries (rclcpp / rclpy)', 'URDF / Xacro Robot Modeling', 'Gazebo Sim', 'TF2 Transforms'],
    summary: 'Comprehensive professional training on ROS 2 Humble for autonomous mobile robots and industrial robotic arms, covering nodes, topics, services, actions, and lifecycle management.',
    description: 'Built complete robotic software architectures from the ground up: differential drive robot modeling with URDF, writing custom C++ ros2_control hardware interfaces, configuring Costmaps in Nav2, and deploying SLAM Cartographer nodes.',
    icon: 'bot',
    highlightColor: 'amber',
    certificateId: 'ROS2-HUMBLE-2025-3419',
    status: 'Certified Specialization',
    modules: [
      'ROS 2 Architecture: DDS middleware, QoS profiles, and composable nodes',
      'Robot Kinematics and coordinate frames with TF2',
      'LaserScan and PointCloud2 sensor processing pipelines',
      'MoveIt 2 configuration and trajectory execution'
    ],
    practicalWork: [
      'Full simulation of AMR warehouse robot navigating cluttered dynamic environments',
      'Custom RViz2 telemetry dashboard plugin'
    ],
    media: [
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80'
    ]
  }),
  new Course({
    id: 'course-freertos-embedded',
    title: 'Real-Time Operating Systems (RTOS) for Embedded Systems',
    provider: 'Embedded Systems Academy',
    instructor: 'Principal Firmware Architect',
    completionDate: '2024',
    duration: '45 Hours · Hands-on Microcontroller',
    skillsAcquired: ['FreeRTOS Kernel', 'Preemptive Scheduling', 'Task Notifications', 'Semaphores & Mutexes', 'Priority Inversion Prevention', 'Queue Buffering'],
    summary: 'Advanced firmware engineering course focused on deterministic multitasking on ARM Cortex-M and ESP32 multi-core processors.',
    description: 'Detailed study of the FreeRTOS kernel source code, priority preemption, task context switching, interrupt nesting, and memory management algorithms. Implemented non-blocking hardware drivers for SPI, I2C, and UART peripherals.',
    icon: 'cpu',
    highlightColor: 'amber',
    certificateId: 'RTOS-EMB-2024-9120',
    status: 'Certified Specialization',
    modules: [
      'Scheduler Internals: Tick interrupts, ready lists, and context saving',
      'Inter-Task Communication: Binary/Counting Semaphores, Mutexes with Priority Inheritance',
      'Memory Management: Heap_4 and Heap_5 best practices against fragmentation',
      'Debugging hard faults and stack overflows with FreeRTOS trace utilities'
    ],
    practicalWork: [
      'Dual-core motor speed controller with sub-millisecond control loop determinism',
      'Thread-safe circular ring buffer logger to SPI flash'
    ],
    media: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80'
    ]
  })
];

// ==========================================
// 7. PASSIONS & EXTRACURRICULARS ("BEYOND CODE")
// ==========================================
const passions = [
  new Passion({
    id: 'cricket-athlete',
    title: 'Cricket Opening Player & Collegiate Athlete',
    category: 'Sport · Athletics & Composure',
    role: 'Opening Batsman & Top-Order Specialist',
    summary: 'Competitive opening batsman playing university and club-level cricket. Forging unwavering focus, high-pressure decision-making, and collective leadership on the pitch.',
    description: 'Opening the batting innings is one of sport’s purest tests of temperament: facing fresh fast bowlers with a new swinging ball demands immediate focus, lightning reaction times, and total mental composure. These identical qualities anchor my engineering work when tackling ambiguous system bugs or high-stakes deadlines.',
    icon: 'trophy',
    highlightColor: 'rose',
    highlights: [
      'Opening Batsman for university varsity squad and regional club divisions',
      'Leadership role in match strategy, field placements, and junior player mentoring',
      'Recognized for exceptional running between wickets and tactical situational awareness'
    ],
    details: [
      'University Cricket Squad: representing Sabaragamuwa University at collegiate tournaments',
      'Club Division Matches: intense weekend league competition maintaining high batting averages',
      'Disciplined 5:30 AM fitness drills, physical endurance conditioning, and mental resilience training'
    ],
    achievements: [
      'Match-winning half-centuries in university tournament fixtures',
      'Best Opening Partnership Award in regional inter-club tournament',
      'College Sports Colours for athletic commitment and fair-play excellence'
    ],
    stats: {
      'Role': 'Right-Hand Opening Batsman',
      'Matches Played': '75+ Fixtures',
      'Training Cadence': '12+ Hrs / Week',
      'Core Trait': 'High-Pressure Focus'
    },
    media: [
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1531415074868-836332ff4296?auto=format&fit=crop&w=1200&q=80'
    ]
  }),
  new Passion({
    id: 'musician-drummer',
    title: 'Live Stage Percussionist & Drummer',
    category: 'Music · Rhythm & Timing',
    role: 'Drummer & Rhythm Coordinator',
    summary: 'Passionate stage drummer performing in university cultural events, live acoustic ensembles, and university bands. Exploring groove, dynamic tempo, and creative synchronization.',
    description: 'Drumming is the heartbeat of any band: holding rock-solid meter while listening attentively to bass lines and vocal dynamics. This rhythmic synchronization taught me the value of deterministic timing and system harmony—traits that directly translate into designing clean real-time clock loops in firmware.',
    icon: 'drum',
    highlightColor: 'rose',
    highlights: [
      'Live stage drummer for university mega cultural concerts and band showcases',
      'Fluent in rock, funk, progressive polyrhythms, and traditional acoustic meters',
      'Sound engineering and drum mic setup for university auditorium acoustic setups'
    ],
    details: [
      'University Band: lead drummer performing for crowds exceeding 2,000 students',
      'Collaborative rehearsal sessions crafting original arrangements and dynamic transitions',
      'Deep appreciation for acoustic acoustics, tempo stability, and collective artistic flow'
    ],
    achievements: [
      'Headline performance at Sabaragamuwa University Annual Cultural Night',
      'Special Performer Recognition in inter-university musical festival',
      'Recorded percussion tracks for student creative film projects'
    ],
    stats: {
      'Instrument': 'Acoustic Drum Kit & Percussion',
      'Performances': '30+ Live Stage Concerts',
      'Genres': 'Rock, Funk, Fusion',
      'Core Trait': 'Deterministic Rhythm'
    },
    media: [
      'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80'
    ]
  }),
  new Passion({
    id: 'videography-volunteering',
    title: 'Media Production & Community Volunteering',
    category: 'Community · Visual Storytelling',
    role: 'Director of Photography & Volunteer',
    summary: 'Storytelling through cinematic camera work, post-production color grading, and active community volunteering for educational outreach programs.',
    description: 'Combining a technical eye for lighting and camera focal lengths with genuine community empathy. Leading university media teams to produce event recap documentaries, spotlight student innovators, and volunteer for regional STEM education workshops.',
    icon: 'camera',
    highlightColor: 'rose',
    highlights: [
      'Media coverage director for university flagship engineering exhibitions',
      'Cinematic video editing and color grading using DaVinci Resolve & Premiere Pro',
      'Volunteer tutor introducing robotics concepts to underprivileged school students'
    ],
    details: [
      'University Media Unit: contributing camera work and drone videography',
      'Community Outreach: organizing hands-on STEM workshops in rural secondary schools',
      'Capturing compelling human stories of resilience and community empowerment'
    ],
    achievements: [
      'Best Event Documentary Video Award at Faculty Media Festival',
      'Conducted 4 STEM outreach workshops reaching 300+ rural school students',
      'Produced viral promotional video for university innovation symposium'
    ],
    stats: {
      'Camera Gear': 'Sony Alpha, Gimbal Rigs',
      'Outreach Hours': '120+ Volunteer Hours',
      'Productions': '25+ Documentaries',
      'Core Trait': 'Empathy & Perspective'
    },
    media: [
      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80'
    ]
  })
];

// Initialize and export the single source-of-truth PortfolioManager
export const portfolio = new PortfolioManager({
  projects: allProjects,
  qualifications,
  courses,
  passions,
});
