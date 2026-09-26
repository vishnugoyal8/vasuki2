/**
 * Comprehensive Mock Data for SkillScan Platform
 * Directorate of Vocational Education & Training (DVET), Maharashtra
 */

export const PUBLIC_JOB_ROLES = [
  {
    id: 'JOB-EV-01',
    title: 'Electric Vehicle Powertrain Specialist',
    sector: 'Automotive & Clean Mobility',
    district: 'Pune / Chakan MIDC',
    salaryRange: '₹3.8L - ₹6.5L / year',
    nsqfLevel: 'Level 5',
    vacancies: 640,
    growth: '+38% YoY',
    experience: 'Fresher to 2 yrs',
    description: 'Specializes in high-voltage EV battery integration, motor controller calibration, and battery thermal management protocols.',
    keySkills: ['800V High Voltage Safety', 'BMS CAN-Bus Diagnostics', 'Motor Controller Tuning', 'Thermal Runaway Prevention'],
  },
  {
    id: 'JOB-CNC-02',
    title: '5-Axis CNC Precision Machinist',
    sector: 'Precision Engineering & Aerospace',
    district: 'Aurangabad / Pune',
    salaryRange: '₹3.2L - ₹5.4L / year',
    nsqfLevel: 'Level 4',
    vacancies: 480,
    growth: '+22% YoY',
    experience: '1 to 3 yrs',
    description: 'Operates multi-axis CNC machines for aerospace, defense, and precision automotive components using Mastercam and Siemens 840D.',
    keySkills: ['G-Code / M-Code Programming', 'Siemens Sinumerik', 'Geometric Dimensioning & Tolerancing (GD&T)', 'CMM Inspection'],
  },
  {
    id: 'JOB-SOLAR-03',
    title: 'Solar Microgrid & Storage Technician',
    sector: 'Renewable Energy',
    district: 'Nagpur / Nashik',
    salaryRange: '₹2.8L - ₹4.5L / year',
    nsqfLevel: 'Level 4',
    vacancies: 520,
    growth: '+45% YoY',
    experience: 'Fresher to 1 yr',
    description: 'Installs and maintains commercial rooftop solar PV systems, hybrid inverters, and battery energy storage systems (BESS).',
    keySkills: ['Solar Inverter Troubleshooting', 'BESS Installation', 'Grid Synchronization', 'PV Array Wiring'],
  },
  {
    id: 'JOB-AUTO-04',
    title: 'Industrial Automation & PLC Technician',
    sector: 'Smart Manufacturing & Industry 4.0',
    district: 'Thane / Pune / Waluj',
    salaryRange: '₹3.6L - ₹6.0L / year',
    nsqfLevel: 'Level 5',
    vacancies: 390,
    growth: '+29% YoY',
    experience: '1 to 2 yrs',
    description: 'Programs and maintains programmable logic controllers (PLCs), SCADA monitoring, and pneumatic actuator loops on assembly lines.',
    keySkills: ['Allen-Bradley & Siemens PLC', 'SCADA Interfaces', 'Pneumatics & Hydraulics', 'Industrial Sensors'],
  },
  {
    id: 'JOB-DRONE-05',
    title: 'Agricultural Drone Maintenance Engineer',
    sector: 'Agri-Tech & Aerospace',
    district: 'Kolhapur / Nashik / Amravati',
    salaryRange: '₹3.0L - ₹5.0L / year',
    nsqfLevel: 'Level 4',
    vacancies: 310,
    growth: '+52% YoY',
    experience: 'Fresher to 1 yr',
    description: 'Performs avionics diagnostics, motor maintenance, spraying nozzle calibration, and DGCA-compliant flight maintenance checks.',
    keySkills: ['Brushless Motor Rewinding', 'ESC Calibration', 'Battery Pack Maintenance', 'DGCA Safety Checks'],
  },
  {
    id: 'JOB-WELD-06',
    title: 'Robotic Welding Cell Operator',
    sector: 'Heavy Fabrication & Automobile',
    district: 'Pune / Nashik',
    salaryRange: '₹3.0L - ₹4.8L / year',
    nsqfLevel: 'Level 4',
    vacancies: 275,
    growth: '+18% YoY',
    experience: 'Fresher to 2 yrs',
    description: 'Operates FANUC and KUKA robotic welding arms, ensures weld seam integrity, and adjusts gas mixture parameters for automotive chassis.',
    keySkills: ['TIG / MIG Advanced Welding', 'Robot Teach Pendant', 'Weld Quality Testing', 'Safety Interlocks'],
  },
];

export const IN_DEMAND_SKILLS = [
  { id: 'SK-01', name: '800V High-Voltage Safety', category: 'Safety & Compliance', demandScore: 96, growthRate: '+44%', priority: 'Critical Deficit', sector: 'EV / Automotive' },
  { id: 'SK-02', name: 'BMS CAN-Bus Protocol Diagnostics', category: 'Diagnostics', demandScore: 93, growthRate: '+38%', priority: 'Critical Deficit', sector: 'EV / Automotive' },
  { id: 'SK-03', name: '5-Axis CNC CAM Programming', category: 'Machining', demandScore: 88, growthRate: '+26%', priority: 'High Demand', sector: 'Precision Eng.' },
  { id: 'SK-04', name: 'Siemens S7-1200 / TIA Portal PLC', category: 'Automation', demandScore: 87, growthRate: '+31%', priority: 'High Demand', sector: 'Industry 4.0' },
  { id: 'SK-05', name: 'Solar Hybrid Inverter Synchronization', category: 'Renewables', demandScore: 84, growthRate: '+35%', priority: 'High Demand', sector: 'Green Energy' },
  { id: 'SK-06', name: 'Robotic Arm Teach-Pendant Calibration', category: 'Robotics', demandScore: 81, growthRate: '+29%', priority: 'Medium', sector: 'Manufacturing' },
  { id: 'SK-07', name: 'Geometric Dimensioning & Tolerancing (GD&T)', category: 'Quality Control', demandScore: 79, growthRate: '+15%', priority: 'Medium', sector: 'Aerospace' },
  { id: 'SK-08', name: 'Lithium Cell Thermal Runaway Testing', category: 'Battery Technology', demandScore: 91, growthRate: '+42%', priority: 'Critical Deficit', sector: 'EV / Energy' },
];

export const VOCATIONAL_COURSES = [
  {
    id: 'CRS-EV-101',
    code: 'CTS-EV-402',
    name: 'Technician Electric Vehicle (Dual System Training)',
    duration: '2 Years (4 Semesters)',
    tradeType: 'Engineering Trade',
    affiliatedITIs: 48,
    nsqfLevel: 'Level 5',
    employmentRate: '94%',
    seatsStatewide: 2400,
    curriculumStatus: 'Updated 2025',
    sectors: ['Automotive', 'Clean Mobility'],
  },
  {
    id: 'CRS-CNC-102',
    code: 'CTS-MAC-301',
    name: 'Machinist & CNC Programmer',
    duration: '2 Years',
    tradeType: 'Engineering Trade',
    affiliatedITIs: 182,
    nsqfLevel: 'Level 4',
    employmentRate: '88%',
    seatsStatewide: 7200,
    curriculumStatus: 'Revision Due',
    sectors: ['Precision Eng.', 'Aerospace'],
  },
  {
    id: 'CRS-SOL-103',
    code: 'CTS-SOL-201',
    name: 'Solar Technician (Electrical)',
    duration: '1 Year',
    tradeType: 'Engineering Trade',
    affiliatedITIs: 94,
    nsqfLevel: 'Level 4',
    employmentRate: '82%',
    seatsStatewide: 3800,
    curriculumStatus: 'Aligned 2024',
    sectors: ['Renewables', 'Power'],
  },
  {
    id: 'CRS-IOT-104',
    code: 'CTS-IOT-501',
    name: 'IoT Technician (Smart Agriculture & Industry)',
    duration: '1 Year',
    tradeType: 'New Age Technology',
    affiliatedITIs: 36,
    nsqfLevel: 'Level 4',
    employmentRate: '85%',
    seatsStatewide: 1450,
    curriculumStatus: 'Pilot Scheme',
    sectors: ['Smart Agriculture', 'Industry 4.0'],
  },
];

export const INDUSTRY_SECTOR_TRENDS = [
  { quarter: 'Q1 2025', evAutomotive: 3400, precisionEng: 2800, renewables: 1900, industry4: 1400 },
  { quarter: 'Q2 2025', evAutomotive: 4100, precisionEng: 2950, renewables: 2300, industry4: 1750 },
  { quarter: 'Q3 2025', evAutomotive: 5200, precisionEng: 3100, renewables: 2850, industry4: 2100 },
  { quarter: 'Q4 2025', evAutomotive: 6400, precisionEng: 3300, renewables: 3400, industry4: 2600 },
  { quarter: 'Q1 2026', evAutomotive: 7800, precisionEng: 3550, renewables: 4100, industry4: 3150 },
  { quarter: 'Q2 2026', evAutomotive: 9200, precisionEng: 3800, renewables: 4900, industry4: 3800 },
];

export const DISTRICT_DEMAND_OVERVIEW = [
  { district: 'Pune', demandIndex: 94, activeJobs: 3840, itis: 28, enrolled: 11400, primarySector: 'Automotive & EV' },
  { district: 'Aurangabad', demandIndex: 86, activeJobs: 2150, itis: 22, enrolled: 8200, primarySector: 'Auto Components & Pharma' },
  { district: 'Nagpur', demandIndex: 82, activeJobs: 1890, itis: 26, enrolled: 9100, primarySector: 'Logistics & Power' },
  { district: 'Nashik', demandIndex: 81, activeJobs: 1740, itis: 20, enrolled: 7600, primarySector: 'Aerospace & Fabrication' },
  { district: 'Thane', demandIndex: 88, activeJobs: 2640, itis: 24, enrolled: 8900, primarySector: 'Chemicals & Smart Mfg' },
  { district: 'Kolhapur', demandIndex: 78, activeJobs: 1320, itis: 19, enrolled: 6400, primarySector: 'Foundry & Agri-Machinery' },
];

/* STUDENT DATA */
export const STUDENT_SKILL_RADAR = [
  { skill: 'High-Voltage Safety', studentScore: 48, industryTarget: 90, fullMark: 100 },
  { skill: 'BMS Diagnostics', studentScore: 55, industryTarget: 88, fullMark: 100 },
  { skill: 'CAN-Bus Protocol', studentScore: 40, industryTarget: 85, fullMark: 100 },
  { skill: 'Wiring Harness', studentScore: 86, industryTarget: 80, fullMark: 100 },
  { skill: 'Motor Calibration', studentScore: 62, industryTarget: 82, fullMark: 100 },
  { skill: 'Preventive Testing', studentScore: 78, industryTarget: 75, fullMark: 100 },
];

export const STUDENT_COURSE_VS_INDUSTRY = [
  {
    module: 'High Voltage Safety (800V DC Systems)',
    taughtStatus: 'Basic Theory (4 hrs)',
    industryRequirement: 'Hands-on isolation switch & arc-flash lockout protocol (18 hrs)',
    gapLevel: 'Critical',
    recommendation: 'Complete CoE High Voltage Practical Lab Simulator',
  },
  {
    module: 'BMS & Telematics Interface',
    taughtStatus: 'Lead-Acid Battery Maintenance',
    industryRequirement: 'Lithium-ion active cell balancing & CAN-bus sniffing',
    gapLevel: 'High',
    recommendation: 'Enroll in Module 3.2: CANalyzer & BMS Diagnostic Tooling',
  },
  {
    module: 'Inverter & Motor Control Loops',
    taughtStatus: 'AC/DC Motor Starters & Rewinding',
    industryRequirement: 'Permanent Magnet Synchronous Motor (PMSM) vector control',
    gapLevel: 'High',
    recommendation: 'Complete Virtual Lab on Motor Drive Inverters',
  },
  {
    module: 'Automotive Wiring Harness Inspection',
    taughtStatus: 'Comprehensive wiring and soldering',
    industryRequirement: 'IP67 waterproof connector crimping & continuity testing',
    gapLevel: 'Adequate',
    recommendation: 'On track with industrial quality standards',
  },
];

export const STUDENT_LEARNING_PATH = [
  {
    step: 1,
    title: '800V EV Isolation & Safety Lockout (NFPA 70E Aligned)',
    type: 'Self-Paced Module + Virtual Lab',
    duration: '12 Hours',
    status: 'In Progress (60%)',
    provider: 'DVET Virtual Simulators',
    actionText: 'Resume Module',
  },
  {
    step: 2,
    title: 'CAN-Bus Protocol Sniffing with Vector CANoe Simulator',
    type: 'Hands-on Center Lab',
    duration: '16 Hours',
    status: 'Upcoming',
    provider: 'Govt ITI Aundh CoE Lab',
    actionText: 'Book Lab Slot',
  },
  {
    step: 3,
    title: 'Lithium Cell Thermal Management & Pyrometer Testing',
    type: 'Industry Workshop',
    duration: '8 Hours',
    status: 'Locked',
    provider: 'Tata Motors Apprenticeship Cell',
    actionText: 'Prerequisites Needed',
  },
  {
    step: 4,
    title: 'Final Practical Certification Bench Assessment',
    type: 'State Skill Examination',
    duration: '4 Hours',
    status: 'Locked',
    provider: 'DVET Maharashtra Assessment Board',
    actionText: 'Final Stage',
  },
];

export const STUDENT_ASSESSMENTS = [
  { id: 'ASM-01', title: 'Electrical Fundamentals & Schematics', score: '88/100', status: 'Passed', date: 'Jan 18, 2026', badge: 'Verified' },
  { id: 'ASM-02', title: 'Industrial Wiring & IP67 Connectors', score: '82/100', status: 'Passed', date: 'Feb 10, 2026', badge: 'Verified' },
  { id: 'ASM-03', title: 'High Voltage Isolation Diagnostic Practical', score: '52/100', status: 'Needs Retest', date: 'Mar 05, 2026', badge: 'Remediation' },
  { id: 'ASM-04', title: 'BMS Error Code Clearing & Telematics', score: 'Pending', status: 'Scheduled', date: 'Mar 28, 2026', badge: 'Upcoming' },
];

export const STUDENT_PLACEMENT_INSIGHTS = [
  {
    company: 'Tata Motors Passenger Vehicles Ltd',
    plant: 'Pimpri-Chinchwad, Pune',
    role: 'Trainee EV Assembly Technician',
    matchPercentage: 92,
    stipendSalary: '₹22,500 / month + Subsidized Canteen',
    keySkillsMatch: ['Wiring Harness', 'Preventive Testing', 'Motor Mounting'],
    gapRequirement: 'Needs 800V Safety Certification completion',
    applicationStatus: 'Shortlisted for Interview',
  },
  {
    company: 'Bajaj Auto Ltd (Chetak EV Tech)',
    plant: 'Akurdi, Pune',
    role: 'Battery Pack Testing Technician',
    matchPercentage: 86,
    stipendSalary: '₹24,000 / month + Transport',
    keySkillsMatch: ['Cell Balancing', 'Electrical Schematics'],
    gapRequirement: 'Needs CAN-bus diagnostics lab',
    applicationStatus: 'Ready to Apply',
  },
  {
    company: 'Ather Energy Manufacturing',
    plant: 'Hosur / Chakan Plant 2',
    role: 'Quality Assurance Inspector (Powertrain)',
    matchPercentage: 78,
    stipendSalary: '₹21,000 / month',
    keySkillsMatch: ['IP67 Testing', 'Assembly Quality'],
    gapRequirement: 'Requires 6 months industrial apprenticeship',
    applicationStatus: 'Explore Requirements',
  },
];

/* INSTITUTE DATA */
export const INITIAL_STUDENTS_ROSTER = [
  { id: 'STU-101', name: 'Trainee Candidate 101', trade: 'Electrician & EV', batch: '2024-2026', attendance: '94%', competencyScore: 78, status: 'Active', placementReady: 'High' },
  { id: 'STU-102', name: 'Trainee Candidate 102', trade: 'Electrician & EV', batch: '2024-2026', attendance: '98%', competencyScore: 89, status: 'Active', placementReady: 'Ready' },
  { id: 'STU-103', name: 'Trainee Candidate 103', trade: 'Machinist CNC', batch: '2024-2026', attendance: '88%', competencyScore: 68, status: 'Remediation', placementReady: 'Medium' },
  { id: 'STU-104', name: 'Trainee Candidate 104', trade: 'Solar Technician', batch: '2025-2026', attendance: '92%', competencyScore: 84, status: 'Active', placementReady: 'Ready' },
  { id: 'STU-105', name: 'Trainee Candidate 105', trade: 'IoT Technician', batch: '2025-2026', attendance: '81%', competencyScore: 62, status: 'Needs Lab', placementReady: 'Low' },
  { id: 'STU-106', name: 'Trainee Candidate 106', trade: 'Machinist CNC', batch: '2024-2026', attendance: '96%', competencyScore: 91, status: 'Active', placementReady: 'Ready' },
  { id: 'STU-107', name: 'Trainee Candidate 107', trade: 'Electrician & EV', batch: '2024-2026', attendance: '76%', competencyScore: 58, status: 'Remediation', placementReady: 'Low' },
];

export const INSTITUTE_CURRICULUM_ANALYSIS = [
  {
    trade: 'Electrician & EV Tech',
    demandScore: 94,
    marketDeficit: '54% Gap in High Voltage Safety & CAN-Bus diagnostics',
    actionRequired: 'Integrate 800V test benches & Vector CANoe software modules',
    urgency: 'Critical',
  },
  {
    trade: 'Machinist Trade',
    demandScore: 88,
    marketDeficit: '42% Deficit in 5-Axis CAM Programming vs 3-Axis conventional',
    actionRequired: 'Upgrade CNC simulators to Siemens 840D and Mastercam 2025',
    urgency: 'High',
  },
  {
    trade: 'Welder Trade',
    demandScore: 76,
    marketDeficit: '35% Deficit in Robotic Teach Pendant operation',
    actionRequired: 'Establish shared robotic welding cell with Chakan MIDC association',
    urgency: 'Medium',
  },
  {
    trade: 'Solar Technician',
    demandScore: 82,
    marketDeficit: '28% Gap in Commercial Inverter grid synchronization',
    actionRequired: 'Install 15kW rooftop solar educational bench',
    urgency: 'Medium',
  },
];

export const INSTITUTE_TRAINERS_ROSTER = [
  { id: 'TR-01', name: 'Instructor TR-01 (EV Systems)', specialization: 'EV Powertrain & Batteries', experience: '8 Years', activeBatches: 2, traineesCount: 48, rating: 4.8, certification: 'Master Trainer (ARAI Certified)' },
  { id: 'TR-02', name: 'Instructor TR-02 (CNC & CAM)', specialization: '5-Axis CNC & CAM', experience: '14 Years', activeBatches: 3, traineesCount: 65, rating: 4.6, certification: 'Siemens Sinumerik Master' },
  { id: 'TR-03', name: 'Instructor TR-03 (Automation & PLC)', specialization: 'Industrial Automation & PLC', experience: '6 Years', activeBatches: 2, traineesCount: 42, rating: 4.4, certification: 'Rockwell Automation Associate' },
  { id: 'TR-04', name: 'Instructor TR-04 (Solar & BESS)', specialization: 'Solar PV & BESS Microgrid', experience: '9 Years', activeBatches: 2, traineesCount: 50, rating: 4.7, certification: 'Skill Council for Green Jobs (SCGJ)' },
];

export const INSTITUTE_INFRASTRUCTURE_PLANS = [
  {
    id: 'INF-01',
    facility: 'Centre of Excellence (CoE) EV High Voltage Lab',
    requiredEquipment: '800V Battery Disconnect Simulator, Safety Glove Test Bench, CAN Analyzers',
    estimatedCost: '₹42.5 Lakhs',
    fundingSource: 'DVET Modernization Grant 2026',
    status: 'Approved & Budget Disbursed',
    deliveryTarget: 'Q2 2026',
  },
  {
    id: 'INF-02',
    facility: 'Advanced CNC 5-Axis Machining Center',
    requiredEquipment: 'Haas VF-2 with 5-Axis Trunnion & Tool Presetter',
    estimatedCost: '₹68.0 Lakhs',
    fundingSource: 'CSR Co-funding (Tata Technologies)',
    status: 'Technical Review Pending',
    deliveryTarget: 'Q3 2026',
  },
  {
    id: 'INF-03',
    facility: 'Solar Rooftop & Inverter Synchronization Lab',
    requiredEquipment: '15kW On-Grid/Off-Grid Dual Inverter Bench, Solar Pyranometer',
    estimatedCost: '₹18.2 Lakhs',
    fundingSource: 'State Clean Energy Fund',
    status: 'Procurement Underway',
    deliveryTarget: 'Q2 2026',
  },
];

/* TRAINER DATA */
export const TRAINER_ASSIGNED_COURSES = [
  {
    code: 'EV-BAT-401',
    name: 'Electric Vehicle Battery Systems & Maintenance',
    batch: 'Batch 2024-A (Model ITI)',
    students: 24,
    syllabusProgress: 72,
    nextSession: 'Thursday, 10:30 AM — High Voltage Safety Isolation Drill',
    status: 'On Schedule',
  },
  {
    code: 'EV-PWR-402',
    name: 'Electric Traction Motor Drives & Inverters',
    batch: 'Batch 2024-B (Model ITI Training Wing)',
    students: 22,
    syllabusProgress: 58,
    nextSession: 'Friday, 02:00 PM — Resolver and Hall Sensor Calibration',
    status: 'Needs Practical Acceleration',
  },
  {
    code: 'EV-SAF-101',
    name: 'Industrial Workshop Safety & Arc Flash Prevention',
    batch: 'Foundational Batch (Combined)',
    students: 46,
    syllabusProgress: 95,
    nextSession: 'Practical Exam Prep & Tooling Check',
    status: 'Exam Ready',
  },
];

export const TRAINER_STUDENT_GAPS = [
  { competency: '800V Live High-Voltage Isolation', batchWeakness: '64% struggle with zero-voltage verification procedure', priority: 'Critical', action: 'Schedule extra 4-hour isolation simulator workshop' },
  { competency: 'CAN-Bus Diagnostic Oscilloscope Reading', batchWeakness: '48% unable to identify bus-off error frames', priority: 'High', action: 'Assign simulated fault injection modules' },
  { competency: 'Battery Cell Internal Resistance Measurement', batchWeakness: '32% miscalculate milliohm variances across strings', priority: 'Medium', action: 'Provide digital milliohmmeter practice bench' },
  { competency: 'IP67 Connector Pin Extraction & Crimping', batchWeakness: '18% damaged seal clips during insertion', priority: 'Low', action: 'Quick 30-minute demonstration recap' },
];

export const TRAINER_UPSKILLING_RECS = [
  {
    title: 'Training of Trainers (ToT): Advanced EV BMS Architecture & Safety',
    partner: 'ARAI (Automotive Research Association of India) & DVET',
    duration: '5 Days (Residential at Chakan Hub)',
    credits: '40 Continuous Professional Dev. Credits',
    status: 'Nominated by DVET',
    actionText: 'Confirm Attendance',
  },
  {
    title: 'Modern Automotive Telematics & Vector Tools Training',
    partner: 'Vector Informatik India',
    duration: '3 Days (Virtual Hands-On)',
    credits: '24 Credits',
    status: 'Open for Registration',
    actionText: 'Register Free',
  },
  {
    title: 'High Voltage Safety Instructor Master Badge (NFPA 70E Level 3)',
    partner: 'National Skill Development Corporation (NSDC)',
    duration: '2 Weeks (Blended)',
    credits: '60 Credits',
    status: 'Recommended for Next Cycle',
    actionText: 'View Details',
  },
];

export const TRAINER_INDUSTRY_FEED = [
  {
    source: 'Bajaj Auto Ltd (Plant Engineering)',
    date: 'March 18, 2026',
    title: 'Requirement Shift: Fast Charging CCS2 Inlets & Thermal Runaway Sensors',
    detail: 'Starting Q3 2026, factory assembly requires incoming technicians to demonstrate zero-error fast charging connector latch alignment and temperature sensor calibration.',
  },
  {
    source: 'Tata Motors EV Powertrain Quality',
    date: 'March 14, 2026',
    title: 'Observation from Recent ITI Graduate Apprentices',
    detail: 'Candidates possess strong theoretical knowledge of battery cells, but require immediate remedial instruction on torque wrench calibrations for busbar bolt fastening.',
  },
];

/* EMPLOYER DATA */
export const INITIAL_EMPLOYER_JOBS = [
  {
    id: 'POST-01',
    title: 'EV Powertrain Integration Technician',
    department: 'Manufacturing - EV Line 2',
    district: 'Pune (Chakan Plant)',
    vacancies: 45,
    applicants: 128,
    postedDate: '02 Mar 2026',
    status: 'Active Hiring',
    salary: '₹22,000 - ₹26,000 / mo',
    requiredSkills: ['800V High Voltage Safety', 'BMS CAN-Bus Diagnostics', 'IP67 Waterproofing', 'Torque Fastening'],
  },
  {
    id: 'POST-02',
    title: 'Lithium Battery Pack Assembly Operator',
    department: 'Battery Gigafactory Line',
    district: 'Pune (Talegaon MIDC)',
    vacancies: 60,
    applicants: 215,
    postedDate: '15 Feb 2026',
    status: 'Active Hiring',
    salary: '₹20,000 - ₹24,000 / mo',
    requiredSkills: ['Cell Internal Resistance', 'Thermal Pad Application', 'Busbar Laser Welder Assist'],
  },
  {
    id: 'POST-03',
    title: 'Automotive Wiring Harness Quality Auditor',
    department: 'Quality Assurance & Inspection',
    district: 'Pune (Akurdi)',
    vacancies: 20,
    applicants: 84,
    postedDate: '28 Jan 2026',
    status: 'Under Review',
    salary: '₹21,500 - ₹25,000 / mo',
    requiredSkills: ['Wire Harness Pinout', 'Continuity Testers', 'Electrical Schematics'],
  },
];

export const EMPLOYER_TALENT_CANDIDATES = [
  {
    id: 'CAN-01',
    name: 'Candidate CAN-01',
    trade: 'Electrician & EV Technician',
    iti: 'Model Vocational ITI',
    district: 'Pune',
    score: 86,
    verifiedSkills: ['Wiring Harness', 'Preventive Testing', 'Electrical Schematics', 'Motor Calibration'],
    availability: 'Immediate (Batch 2026 Passout)',
    status: 'Available',
  },
  {
    id: 'CAN-02',
    name: 'Candidate CAN-02',
    trade: 'Electrician & EV Technician',
    iti: 'Model Training Centre',
    district: 'Pune',
    score: 94,
    verifiedSkills: ['High Voltage Safety', 'BMS Diagnostics', 'CAN-Bus Protocol', 'Torque Fastening'],
    availability: 'Immediate (Top Ranker)',
    status: 'Interviewed',
  },
  {
    id: 'CAN-03',
    name: 'Candidate CAN-03',
    trade: 'Machinist & CNC Operator',
    iti: 'Model Vocational ITI',
    district: 'Pune',
    score: 92,
    verifiedSkills: ['5-Axis CNC', 'Siemens Sinumerik', 'Mastercam', 'GD&T'],
    availability: 'Within 15 Days',
    status: 'Available',
  },
  {
    id: 'CAN-04',
    name: 'Candidate CAN-04',
    trade: 'Industrial Automation PLC',
    iti: 'Regional Vocational ITI',
    district: 'Thane',
    score: 88,
    verifiedSkills: ['Siemens S7 PLC', 'SCADA', 'Pneumatics', 'Sensor Calibration'],
    availability: 'Immediate',
    status: 'Available',
  },
];

/* GOVERNMENT DATA */
export const GOV_DISTRICT_PLANS = [
  {
    district: 'Pune',
    sanctionedBudget: '₹18.40 Cr',
    itiModernizationTarget: '6 ITIs (Aundh, Haveli, Shirur, Khed, Baramati, Bhor)',
    allocatedSeats: '4,200 New EV & Automation Seats',
    funderAllocation: '70% State Plan + 30% STRIVE / World Bank',
    status: 'On Track (68% Disbursed)',
  },
  {
    district: 'Aurangabad (Chhatrapati Sambhajinagar)',
    sanctionedBudget: '₹14.20 Cr',
    itiModernizationTarget: '4 ITIs (Waluj, Paithan, CIDCO, Gangapur)',
    allocatedSeats: '2,800 CNC Machining & Pharma Tech Seats',
    funderAllocation: '65% State + 35% Industry CSR',
    status: 'On Track (52% Disbursed)',
  },
  {
    district: 'Nagpur',
    sanctionedBudget: '₹12.80 Cr',
    itiModernizationTarget: '5 ITIs (Hingna, Kamptee, Umred, Saoner, Katol)',
    allocatedSeats: '3,100 Logistics, Solar & Drone Seats',
    funderAllocation: '80% State Plan',
    status: 'Planning Phase (30% Disbursed)',
  },
];

export const GOV_POLICY_BRIEFS = [
  {
    id: 'POL-01',
    title: 'Maharashtra EV Workforce Readiness Whitepaper 2026',
    date: 'February 2026',
    category: 'Workforce Transformation',
    summary: 'Identifies immediate necessity to upskill 25,000 legacy two-stroke and internal combustion mechanics into EV battery & motor technicians over 24 months across Chakan, Aurangabad, and Nagpur automotive clusters.',
    actionBadge: 'Gazetted Policy',
  },
  {
    id: 'POL-02',
    title: 'Empowering Women in Non-Traditional Engineering Trades (DVET Prerna)',
    date: 'January 2026',
    category: 'Diversity & Inclusion',
    summary: 'Sanctions 30% reservation and dedicated hostel infrastructure in 5-Axis CNC Machining and EV Powertrain Trades at Govt ITI Girls centres in Pune, Nashik, and Amravati.',
    actionBadge: 'Active Incentive',
  },
  {
    id: 'POL-03',
    title: 'National Apprenticeship Promotion Scheme (NAPS) 2.0 Integration',
    date: 'December 2025',
    category: 'Industry Apprenticeship',
    summary: 'Mandates direct stipend co-funding of ₹4,500/month per ITI apprentice in manufacturing MSMEs, increasing state formal hiring rate from 62% to 79%.',
    actionBadge: 'State Directive',
  },
];

export const GOV_ECOSYSTEM_HEALTH = {
  totalITIs: 418,
  govtITIs: 362,
  privateITIs: 56,
  totalEnrolledTrainees: 126480,
  certifiedThisYear: 88400,
  overallPlacementRate: '81.6%',
  industrialPartners: 940,
  activeDeficitAreas: 148,
  activeModernizationGrants: '₹94.50 Cr',
};
