/* ==========================================================================
   IROSHA ENGINEERING PORTFOLIO - JAVASCRIPT APPLICATION ENGINE
   Features:
   1. Three.js 3D Cybernetic Node Network Background
   2. Real-Time SCADA Telemetry & MQTT Broker Data Stream (Chart.js)
   3. 2D Robotic Arm Forward Kinematics Simulator (Canvas API)
   4. Filterable Engineering Projects Matrix & System Spec Modal
   5. Interactive IoT CLI Terminal Shell
   6. Contact Signal Transmitter & Smooth Navigation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initThreeJSBackground();
    initSCADAChartEngine();
    initKinematicsSimulator();
    initProjectFiltersAndModal();
    initInteractiveTerminal();
    initNavigationAndEvents();
});

/* ==========================================================================
   1. THREE.JS 3D CYBERNETIC BACKGROUND CANVAS
   ========================================================================== */
function initThreeJSBackground() {
    const container = document.getElementById('canvas-container');
    if (!container || typeof Three === 'undefined' && typeof THREE === 'undefined') return;
    
    const threeEngine = window.THREE || window.Three;
    const scene = new threeEngine.Scene();

    const camera = new threeEngine.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 400;

    const renderer = new threeEngine.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create 3D Particle Grid & Node Network
    const particleCount = 200;
    const geometry = new threeEngine.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new threeEngine.Color(0x00f2fe);
    const indigoColor = new threeEngine.Color(0x5352ed);

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 800;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 800;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 800;

        const mixedColor = cyanColor.clone().lerp(indigoColor, Math.random());
        colors[i * 3] = mixedColor.r;
        colors[i * 3 + 1] = mixedColor.g;
        colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new threeEngine.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new threeEngine.BufferAttribute(colors, 3));

    const material = new threeEngine.PointsMaterial({
        size: 4,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });

    const particleSystem = new threeEngine.Points(geometry, material);
    scene.add(particleSystem);

    // Mouse Interaction
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
    });

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        particleSystem.rotation.x += 0.0008;
        particleSystem.rotation.y += 0.0012;

        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

/* ==========================================================================
   2. REAL-TIME SCADA TELEMETRY ENGINE & CHART.JS
   ========================================================================== */
let scadaInterval = null;
let scadaPlaying = true;
let scadaChart = null;

function initSCADAChartEngine() {
    const ctx = document.getElementById('telemetryChart');
    if (!ctx) return;

    // Initial dataset generator
    const labels = Array.from({ length: 15 }, (_, i) => `${i * 2}s`);
    const tempData = [38, 39, 40, 41, 40.5, 42, 42.5, 43, 42.8, 43.5, 42.1, 41.8, 42.5, 43.0, 42.5];
    const vibData = [12, 14, 15, 13, 14, 16, 15, 14, 18, 17, 15, 14, 15, 14, 14];
    const torqueData = [7.2, 7.5, 8.0, 8.1, 8.4, 8.2, 8.5, 8.3, 8.6, 8.4, 8.2, 8.3, 8.5, 8.4, 8.4];

    scadaChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Motor Temp (°C)',
                    data: tempData,
                    borderColor: '#00f2fe',
                    backgroundColor: 'rgba(0, 242, 254, 0.08)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 2
                },
                {
                    label: 'Vibration (g x100)',
                    data: vibData,
                    borderColor: '#00e676',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: false,
                    pointRadius: 2
                },
                {
                    label: 'Torque (Nm)',
                    data: torqueData,
                    borderColor: '#9b51e0',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: false,
                    pointRadius: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 400 },
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#64748b', font: { family: 'JetBrains Mono', size: 10 } }
                },
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#64748b', font: { family: 'JetBrains Mono', size: 10 } }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });

    // Start Live Feed Simulation
    startSCADAStream();

    // Controls listeners
    const btnPlayPause = document.getElementById('scada-play-pause');
    const btnAlarm = document.getElementById('scada-trigger-alarm');
    const btnReset = document.getElementById('scada-reset');

    if (btnPlayPause) {
        btnPlayPause.addEventListener('click', () => {
            scadaPlaying = !scadaPlaying;
            document.getElementById('pause-btn-text').textContent = scadaPlaying ? 'Pause Feed' : 'Resume Feed';
            btnPlayPause.classList.toggle('active', scadaPlaying);
            if (scadaPlaying) startSCADAStream();
            else clearInterval(scadaInterval);
        });
    }

    if (btnAlarm) {
        btnAlarm.addEventListener('click', () => {
            triggerThermalSpikeAlert();
        });
    }

    if (btnReset) {
        btnReset.addEventListener('click', () => {
            resetSCADATelemetry();
        });
    }
}

function startSCADAStream() {
    if (scadaInterval) clearInterval(scadaInterval);
    scadaInterval = setInterval(() => {
        if (!scadaPlaying || !scadaChart) return;

        // Generate synthetic industrial telemetry
        const temp = parseFloat((42 + (Math.random() * 2.5 - 1.2)).toFixed(1));
        const vib = parseFloat((0.14 + (Math.random() * 0.04 - 0.02)).toFixed(2));
        const torque = parseFloat((8.4 + (Math.random() * 0.6 - 0.3)).toFixed(1));
        const cycleTime = parseFloat((1.80 + (Math.random() * 0.15 - 0.07)).toFixed(2));

        // Update Gauges & Bars
        document.getElementById('val-temp').textContent = temp;
        document.getElementById('val-vib').textContent = vib;
        document.getElementById('val-torque').textContent = torque;
        document.getElementById('val-cycle').textContent = cycleTime;

        document.getElementById('bar-temp').style.width = `${Math.min(100, (temp / 80) * 100)}%`;
        document.getElementById('bar-vib').style.width = `${Math.min(100, (vib / 0.8) * 100)}%`;
        document.getElementById('bar-torque').style.width = `${Math.min(100, (torque / 15) * 100)}%`;
        document.getElementById('bar-cycle').style.width = `${Math.min(100, (cycleTime / 5) * 100)}%`;

        // Update Chart Datasets
        const labels = scadaChart.data.labels;
        labels.shift();
        const nextTime = (parseInt(labels[labels.length - 1]) + 2) + 's';
        labels.push(nextTime);

        scadaChart.data.datasets[0].data.shift();
        scadaChart.data.datasets[0].data.push(temp);

        scadaChart.data.datasets[1].data.shift();
        scadaChart.data.datasets[1].data.push(vib * 100);

        scadaChart.data.datasets[2].data.shift();
        scadaChart.data.datasets[2].data.push(torque);

        scadaChart.update();

        // Append MQTT JSON Payload
        appendMQTTLog({
            timestamp: new Date().toISOString().substring(11, 19),
            topic: 'site1/cell2/telemetry',
            payload: { motor1_temp: temp, vib_rms_g: vib, torque_nm: torque, plc_task_ms: cycleTime }
        });
    }, 1500);
}

function triggerThermalSpikeAlert() {
    if (!scadaChart) return;
    const spikeTemp = 78.4;
    const spikeVib = 0.65;
    
    document.getElementById('val-temp').textContent = spikeTemp;
    document.getElementById('val-vib').textContent = spikeVib;
    document.getElementById('bar-temp').style.width = '95%';
    document.getElementById('bar-vib').style.width = '82%';
    document.getElementById('bar-temp').style.background = 'var(--accent-red)';

    appendMQTTLog({
        timestamp: new Date().toISOString().substring(11, 19),
        topic: 'site1/cell2/alarm/critical',
        payload: { ALERT: 'HIGH_TEMPERATURE_WARNING', temp_c: spikeTemp, threshold: 75.0, action: 'SCADA_COOLING_PUMP_TRIGGERED' }
    }, true);

    setTimeout(() => {
        document.getElementById('bar-temp').style.background = 'linear-gradient(90deg, var(--accent-cyan), var(--accent-blue))';
    }, 4000);
}

function resetSCADATelemetry() {
    if (!scadaChart) return;
    document.getElementById('val-temp').textContent = '42.5';
    document.getElementById('val-vib').textContent = '0.14';
    document.getElementById('val-torque').textContent = '8.4';
    document.getElementById('val-cycle').textContent = '1.82';
    appendMQTTLog({
        timestamp: new Date().toISOString().substring(11, 19),
        topic: 'site1/cell2/system',
        payload: { status: 'SCADA_REGISTERS_RESET', mode: 'NOMINAL_OPERATION' }
    });
}

function appendMQTTLog(msgObj, isAlarm = false) {
    const logConsole = document.getElementById('mqtt-log');
    if (!logConsole) return;

    const entry = document.createElement('div');
    entry.className = 'mqtt-entry';
    const colorStyle = isAlarm ? 'color: #ff5252;' : '';
    
    entry.innerHTML = `<span class="mqtt-time">[${msgObj.timestamp}]</span> <span class="mqtt-topic">${msgObj.topic}</span><br>` +
                      `<span style="${colorStyle}">${JSON.stringify(msgObj.payload)}</span>`;

    logConsole.prepend(entry);

    if (logConsole.children.length > 25) {
        logConsole.removeChild(logConsole.lastChild);
    }
}

/* ==========================================================================
   3. 2D PLANAR ROBOTIC ARM KINEMATICS SIMULATOR
   ========================================================================== */
let animLoopId = null;
let isAnimatingPath = false;

function initKinematicsSimulator() {
    const canvas = document.getElementById('robotArmCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const sliderTheta1 = document.getElementById('slider-theta1');
    const sliderTheta2 = document.getElementById('slider-theta2');
    const sliderL1 = document.getElementById('slider-l1');
    const sliderL2 = document.getElementById('slider-l2');

    const valTheta1 = document.getElementById('val-theta1');
    const valTheta2 = document.getElementById('val-theta2');
    const valL1 = document.getElementById('val-l1');
    const valL2 = document.getElementById('val-l2');
    const effectorXY = document.getElementById('end-effector-xy');

    function drawArm() {
        const theta1Deg = parseFloat(sliderTheta1.value);
        const theta2Deg = parseFloat(sliderTheta2.value);
        const L1 = parseFloat(sliderL1.value);
        const L2 = parseFloat(sliderL2.value);

        valTheta1.textContent = `${theta1Deg}°`;
        valTheta2.textContent = `${theta2Deg}°`;
        valL1.textContent = `${L1} mm`;
        valL2.textContent = `${L2} mm`;

        // Canvas Center Base (0, 0)
        const originX = canvas.width / 2;
        const originY = canvas.height - 80;

        // Radians conversion (Canvas invert Y axis)
        const rad1 = (theta1Deg * Math.PI) / 180;
        const rad2 = ((theta1Deg + theta2Deg) * Math.PI) / 180;

        // Joint 1 (Elbow) Position
        const joint1X = originX + L1 * Math.cos(rad1);
        const joint1Y = originY - L1 * Math.sin(rad1);

        // Joint 2 (End-Effector) Position
        const endX = joint1X + L2 * Math.cos(rad2);
        const endY = joint1Y - L2 * Math.sin(rad2);

        // Physical End Effector Coordinates relative to base
        const physX = (L1 * Math.cos(rad1) + L2 * Math.cos(rad2)).toFixed(1);
        const physY = (L1 * Math.sin(rad1) + L2 * Math.sin(rad2)).toFixed(1);

        effectorXY.textContent = `X: ${physX} mm, Y: ${physY} mm`;

        // Clear Canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Grid Lines & Workspace Radius
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.08)';
        ctx.lineWidth = 1;
        for (let x = 0; x < canvas.width; x += 40) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += 40) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
        }

        // Draw Base Mount
        ctx.fillStyle = '#1e293b';
        ctx.strokeStyle = '#00f2fe';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.rect(originX - 30, originY, 60, 20);
        ctx.fill(); ctx.stroke();

        // Draw Link 1 (Base to Joint 1)
        ctx.strokeStyle = '#00f2fe';
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(originX, originY);
        ctx.lineTo(joint1X, joint1Y);
        ctx.stroke();

        // Draw Link 2 (Joint 1 to End Effector)
        ctx.strokeStyle = '#5352ed';
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.moveTo(joint1X, joint1Y);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Draw Base Joint Circle
        ctx.fillStyle = '#00f2fe';
        ctx.beginPath(); ctx.arc(originX, originY, 8, 0, 2 * Math.PI); ctx.fill();

        // Draw Elbow Joint Circle
        ctx.fillStyle = '#5352ed';
        ctx.beginPath(); ctx.arc(joint1X, joint1Y, 7, 0, 2 * Math.PI); ctx.fill();

        // Draw End-Effector Tool Gripper
        ctx.fillStyle = '#00e676';
        ctx.shadowColor = '#00e676';
        ctx.shadowBlur = 10;
        ctx.beginPath(); ctx.arc(endX, endY, 6, 0, 2 * Math.PI); ctx.fill();
        ctx.shadowBlur = 0;
    }

    [sliderTheta1, sliderTheta2, sliderL1, sliderL2].forEach(slider => {
        slider.addEventListener('input', drawArm);
    });

    drawArm();

    // Reset button
    const btnReset = document.getElementById('btn-reset-arm');
    if (btnReset) {
        btnReset.addEventListener('click', () => {
            sliderTheta1.value = 45;
            sliderTheta2.value = 30;
            sliderL1.value = 120;
            sliderL2.value = 90;
            drawArm();
        });
    }

    // Trajectory Loop Animation Button
    const btnAnimate = document.getElementById('btn-animate-path');
    if (btnAnimate) {
        btnAnimate.addEventListener('click', () => {
            if (isAnimatingPath) {
                cancelAnimationFrame(animLoopId);
                isAnimatingPath = false;
                btnAnimate.innerHTML = `<i data-lucide="play-circle"></i> Run Trajectory Loop`;
                lucide.createIcons();
                return;
            }

            isAnimatingPath = true;
            btnAnimate.innerHTML = `<i data-lucide="square"></i> Stop Trajectory`;
            lucide.createIcons();

            let step = 0;
            function loopTrajectory() {
                if (!isAnimatingPath) return;
                step += 0.05;
                sliderTheta1.value = Math.round(45 + Math.sin(step) * 40);
                sliderTheta2.value = Math.round(30 + Math.cos(step * 1.5) * 45);
                drawArm();
                animLoopId = requestAnimationFrame(loopTrajectory);
            }
            loopTrajectory();
        });
    }
}

/* ==========================================================================
   4. FILTERABLE PROJECTS SHOWCASE & SYSTEM SPECS MODAL
   ========================================================================== */
const projectSpecsData = {
    1: {
        title: "Autonomous Mobile Robot (AMR) with 2D LiDAR SLAM",
        category: "Robotics & ROS2",
        architecture: "Differential Drive Kinematics + RTOS Motor Node + ROS2 Nav2",
        hardware: ["Raspberry Pi 4 (4GB)", "STM32F401 Motor Controller", "RPLIDAR A1 360°", "24V Quadrature Encoders"],
        protocols: ["ROS2 Topic /tf", "UART DMA", "CAN Bus", "WebSockets"],
        desc: "Designed and built an industrial-grade Autonomous Mobile Robot (AMR) capable of creating occupancy grid maps using Google Cartographer SLAM. The robot features real-time dynamic obstacle avoidance using Nav2 Costmaps and DWB Local Planner.",
        codeSnippet: `// ROS2 Nav2 Goal Pose Dispatcher\nauto goal_msg = NavigateToPose::Goal();\ngoal_msg.pose.header.frame_id = "map";\ngoal_msg.pose.pose.position.x = 4.25;\ngoal_msg.pose.pose.position.y = -1.80;\nnav_action_client_->async_send_goal(goal_msg);`
    },
    2: {
        title: "Multi-Zone Conveyor & Machine Vision Sorting Line",
        category: "Industrial Automation & PLC",
        architecture: "Siemens S7-1500 PLC + OpenCV Vision Node + WinCC SCADA",
        hardware: ["Siemens S7-1500 (CPU 1512C-1 PN)", "Industrial CMOS Camera", "Pneumatic Ejector Actuators", "VFD Motor Drives"],
        protocols: ["PROFINET IO", "Modbus TCP", "OPC UA"],
        desc: "Engineered an industrial sorting conveyor line with automated vision inspection. The system processes up to 120 items/minute, identifying physical anomalies via HSV color and contour analysis, triggering pneumatic sorting gates within a strict 50ms window.",
        codeSnippet: `// Structured Text (ST) S7-1500 Conveyor Control\nIF gv_VisionResult.DefectDetected THEN\n    #Timer_PneumaticEject(IN := TRUE, PT := T#45ms);\n    IF #Timer_PneumaticEject.Q THEN\n        qv_EjectorValve := TRUE;\n    END_IF;\nEND_IF;`
    },
    3: {
        title: "Industrial Edge IoT Predictive Maintenance Node",
        category: "IoT & Edge Nodes",
        architecture: "ESP32-S3 Dual Core + FreeRTOS + Local FFT + Secure MQTT",
        hardware: ["ESP32-S3 Microcontroller", "ADXL345 3-Axis Accelerometer", "PT100 RTD Sensor", "Custom Printed Circuit Board (PCB)"],
        protocols: ["MQTT / TLS 1.3", "SPI", "I2C", "Wi-Fi 802.11 b/g/n"],
        desc: "A custom edge IoT sensor node designed for continuous vibration and thermal health monitoring of high-speed industrial motors. Performs local Fast Fourier Transform (FFT) analysis on vibration data to compute RMS g acceleration values before transmitting summaries over TLS-encrypted MQTT.",
        codeSnippet: `// FreeRTOS Vibration Sensor Processing Task\nvoid vTaskVibrationAnalysis(void * pvParameters) {\n    for(;;) {\n        read_accel_sample_buffer(sample_buf, 512);\n        dsps_fft2r_fc32(sample_buf, 256);\n        float peak_rms = calculate_rms_g(sample_buf);\n        xQueueSend(xLogQueue, &peak_rms, portMAX_DELAY);\n        vTaskDelay(pdMS_TO_TICKS(100));\n    }\n}`
    },
    4: {
        title: "6-DOF Robotic Arm Trajectory Controller & Digital Twin",
        category: "Robotics & Kinematics",
        architecture: "Inverse Kinematics (Jacobian Pseudo-Inverse) + Gazebo Physics",
        hardware: ["6-Axis Industrial Manipulator", "Absolute Optical Encoders", "EtherCAT Servo Drives"],
        protocols: ["EtherCAT CoE", "ROS2 Control", "MoveIt 2 API"],
        desc: "Developed high-precision inverse kinematics algorithms for 6-degree-of-freedom robotic articulators. Built a real-time Gazebo digital twin for path planning, singular pose detection, and joint torque feedforward optimization.",
        codeSnippet: `// Jacobian Inversion for 6-DOF Manipulator\nEigen::MatrixXd J = computeAnalyticalJacobian(current_joints);\nEigen::VectorXd joint_velocities = J.completeOrthogonalDecomposition().solve(target_cartesian_velocity);\napplyJointVelocities(joint_velocities);`
    },
    5: {
        title: "Centralized Factory SCADA & Alarm Panel",
        category: "Industrial Automation & SCADA",
        architecture: "Ignition SCADA + Multi-PLC Gateway + SQL Historian",
        hardware: ["Industrial Rack Server", "Siemens & Allen-Bradley PLCs", "Managed Industrial Ethernet Switches"],
        protocols: ["OPC UA", "EtherNet/IP", "PROFINET", "SQL"],
        desc: "Centralized factory floor visualization and monitoring system overseeing 12 automated production cells. Features live Overall Equipment Effectiveness (OEE) tracking, fault diagnostic matrix, and automatic automated reporting.",
        codeSnippet: `SELECT cell_id, AVG(oee_percentage) as avg_oee, SUM(downtime_seconds) as total_downtime\nFROM factory_historian.cell_telemetry\nWHERE timestamp >= NOW() - INTERVAL '24 HOURS'\nGROUP BY cell_id ORDER BY avg_oee DESC;`
    },
    6: {
        title: "Long-Range Smart Factory Environmental Monitoring",
        category: "IoT & LoRaWAN",
        architecture: "Low-Power LoRaWAN Nodes + ChirpStack Gateway + Grafana",
        hardware: ["STM32L4 Ultra-Low-Power MCU", "SX1276 LoRa Transceiver", "BME280 Environmental Sensor"],
        protocols: ["LoRaWAN v1.0.3", "SPI", "MQTT"],
        desc: "Designed low-power wireless sensor nodes deployed across a 50,000 sq. ft manufacturing plant for microclimate monitoring. Nodes operate off a single LiSOCl2 battery with an estimated lifespan exceeding 2.5 years.",
        codeSnippet: `// LoRaWAN Payload Compression\nuint8_t payload[4];\nint16_t temp_scaled = (int16_t)(current_temp * 100);\npayload[0] = (temp_scaled >> 8) & 0xFF;\npayload[1] = temp_scaled & 0xFF;\nlora_send_unconfirmed(1, payload, 4);`
    }
};

function initProjectFiltersAndModal() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cat = card.getAttribute('data-category');
                if (filter === 'all' || cat === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Modal Logic
    const modalOverlay = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const projId = btn.getAttribute('data-project');
            const data = projectSpecsData[projId];
            if (!data) return;

            modalContent.innerHTML = `
                <div class="modal-header">
                    <span class="card-tag green">${data.category}</span>
                    <h2 style="margin-top: 0.5rem;">${data.title}</h2>
                </div>
                <div class="modal-section" style="margin-top: 1rem;">
                    <h4 style="color: var(--text-dim);">System Architecture:</h4>
                    <p style="font-family: var(--font-code); color: var(--accent-cyan);">${data.architecture}</p>
                </div>
                <div class="modal-section" style="margin-top: 1rem;">
                    <h4 style="color: var(--text-dim);">Engineering Specifications:</h4>
                    <p style="font-size: 0.9rem; color: var(--text-muted);">${data.desc}</p>
                </div>
                <div class="modal-section" style="margin-top: 1rem;">
                    <h4 style="color: var(--text-dim);">Hardware & Embedded Components:</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.4rem;">
                        ${data.hardware.map(h => `<span class="tech-pill">${h}</span>`).join('')}
                    </div>
                </div>
                <div class="modal-section" style="margin-top: 1rem;">
                    <h4 style="color: var(--text-dim);">Control Protocols:</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.4rem;">
                        ${data.protocols.map(p => `<span class="card-tag">${p}</span>`).join('')}
                    </div>
                </div>
                <div class="modal-section" style="margin-top: 1.2rem;">
                    <h4 style="color: var(--text-dim);">Core Control Implementation Snippet:</h4>
                    <pre style="background: #04070d; padding: 0.8rem; border-radius: 6px; font-family: var(--font-code); font-size: 0.8rem; color: var(--accent-green); overflow-x: auto; border: 1px solid var(--border-color);">${data.codeSnippet}</pre>
                </div>
            `;

            modalOverlay.classList.add('active');
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });
    }
}

/* ==========================================================================
   5. INTERACTIVE IOT CLI TERMINAL SHELL
   ========================================================================== */
function initInteractiveTerminal() {
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');
    if (!input || !output) return;

    const commands = {
        'help': `Available Commands:<br>
          <span class="cmd-text">help</span>       - Show this command reference<br>
          <span class="cmd-text">telemetry</span>  - Print active SCADA sensor registers<br>
          <span class="cmd-text">ros</span>        - List simulated ROS2 topics & nodes<br>
          <span class="cmd-text">skills</span>     - Print core engineering technical matrix<br>
          <span class="cmd-text">projects</span>   - Display repository index<br>
          <span class="cmd-text">robot</span>      - Output 2-DOF manipulator kinematic status<br>
          <span class="cmd-text">ping</span>       - Test node response time<br>
          <span class="cmd-text">contact</span>    - Show developer communication links<br>
          <span class="cmd-text">clear</span>      - Clear terminal screen`,

        'telemetry': `[SCADA TELEMETRY QUERY OK]<br>
          Node: industrial.cell2.plc01<br>
          Motor01 Temp  : 42.5 °C  [NORMAL]<br>
          Vibration RMS : 0.14 g   [ISO 10816 NOMINAL]<br>
          Servo Torque  : 8.4 Nm   [DUTY CYCLE 56%]<br>
          PLC Cycle     : 1.82 ms  [OB1 SCAN TARGET OK]`,

        'ros': `[ROS2 HUMBLE NODE REPOSITORY]<br>
          /amr/cmd_vel            [geometry_msgs/msg/Twist]<br>
          /amr/odom               [nav_msgs/msg/Odometry]<br>
          /lidar/scan             [sensor_msgs/msg/LaserScan]<br>
          /tf                     [tf2_msgs/msg/TFMessage]<br>
          /joint_states           [sensor_msgs/msg/JointState]`,

        'skills': `ROBOTICS       : ROS, ROS2, Nav2, Gazebo, MoveIt2, OpenCV (90%)<br>
          AUTOMATION     : Siemens S7-1200/1500, TIA Portal, Allen-Bradley, SCADA (92%)<br>
          IoT & EMBEDDED : C/C++, ESP32, STM32, FreeRTOS, MQTT, Modbus TCP (94%)<br>
          LANGUAGES      : C++17/20, Python, Structured Text, MATLAB/Simulink (90%)`,

        'projects': `1. Autonomous Mobile Robot (AMR) with 2D LiDAR SLAM [ROS2]<br>
          2. Multi-Zone Conveyor & Machine Vision Sorting Line [PLC]<br>
          3. Industrial Edge IoT Predictive Maintenance Node [ESP32]<br>
          4. 6-DOF Robotic Arm Trajectory Controller & Digital Twin [MoveIt2]<br>
          5. Centralized Factory SCADA & Alarm Panel [Ignition]`,

        'robot': `   __..._
        /  _   \\
       |  (o)   |  [ROBOTIC MANIPULATOR LINK ACTIVE]
        \\   _  /   Base Angle: 45° | Elbow Angle: 30°
        /  / \\  \\  End-Effector Target: X:147.2mm Y:132.8mm
       /  /   \\  \\ Status: Kinematic Model Nominal`,

        'ping': `PING localhost (127.0.0.1) 56(84) bytes of data.<br>
          64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.245 ms<br>
          64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.180 ms<br>
          --- localhost ping statistics --- 2 packets transmitted, 0% packet loss`,

        'contact': `Email    : irosha.robotics@domain.com<br>
          GitHub   : github.com/irosha-robotics<br>
          LinkedIn : linkedin.com/in/irosha-automation`,

        'sudo': `<span style="color: var(--accent-red);">Permission denied: User 'visitor' is not in the sudoers file. This incident will be logged to SCADA security.</span>`
    };

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.trim().toLowerCase();
            input.value = '';
            if (!cmd) return;

            // Output command line
            const cmdLine = document.createElement('div');
            cmdLine.className = 'term-line';
            cmdLine.innerHTML = `<span class="prompt-text">irosha@robotics-node:~$</span> ${cmd}`;
            output.appendChild(cmdLine);

            if (cmd === 'clear') {
                output.innerHTML = '';
                return;
            }

            const response = document.createElement('div');
            response.className = 'term-line';
            response.style.marginBottom = '0.5rem';

            if (commands[cmd]) {
                response.innerHTML = commands[cmd];
            } else {
                response.innerHTML = `<span style="color: var(--accent-red);">Command not recognized: '${cmd}'. Type 'help' for available commands.</span>`;
            }

            output.appendChild(response);
            output.scrollTop = output.scrollHeight;
        }
    });
}

/* ==========================================================================
   6. NAVIGATION & EVENT HANDLERS
   ========================================================================== */
function initNavigationAndEvents() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
        });
    }

    // Scroll active link highlight
    const sections = document.querySelectorAll('section');
    const navLinkEls = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinkEls.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Form submit simulation
    const btnSubmit = document.getElementById('btn-submit-form');
    const formAlert = document.getElementById('form-alert');

    if (btnSubmit && formAlert) {
        btnSubmit.addEventListener('click', (e) => {
            e.preventDefault();
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;

            if (!name || !email) {
                alert('Please fill out your Name and Email address.');
                return;
            }

            btnSubmit.innerHTML = `<i data-lucide="loader"></i> Transmitting Signal...`;
            lucide.createIcons();

            setTimeout(() => {
                btnSubmit.innerHTML = `<i data-lucide="check"></i> Signal Transmitted Successfully`;
                formAlert.className = 'form-alert success';
                formAlert.textContent = `Thank you, ${name}! Your engineering message has been logged. I will respond to ${email} shortly.`;
                formAlert.classList.remove('hidden');
                lucide.createIcons();
            }, 1200);
        });
    }

    // Resume Download Simulated Trigger
    const btnDownloadCV = document.getElementById('download-cv-btn');
    if (btnDownloadCV) {
        btnDownloadCV.addEventListener('click', () => {
            alert('Resume / System Specification Brief Download Initiated!\n(Replace with link to your actual CV PDF in index.html)');
        });
    }

    // Launch CLI Terminal shortcut button in navbar
    const btnOpenTerm = document.getElementById('btn-open-terminal');
    if (btnOpenTerm) {
        btnOpenTerm.addEventListener('click', () => {
            const termSec = document.getElementById('terminal');
            if (termSec) {
                termSec.scrollIntoView({ behavior: 'smooth' });
                document.getElementById('terminal-input').focus();
            }
        });
    }
}
