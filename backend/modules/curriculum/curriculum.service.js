import { PDFParse } from 'pdf-parse';
import { analyzeCurriculumWithGemini } from '../ai/gemini.service.js';
import { dbStore } from '../../db/database.js';
import { isMongoConnected } from '../../db/connection.js';
import { CurriculumAudit } from '../../models/CurriculumAudit.js';
import { SAMPLE_SYLLABI } from '../../data/sampleSyllabi.js';

export const getSampleSyllabi = () => {
  return SAMPLE_SYLLABI.map(s => ({
    id: s.id,
    title: s.title,
    trade: s.trade,
    awardingBody: s.awardingBody,
    nsqfLevel: s.nsqfLevel,
    totalHours: s.totalHours,
    academicSession: s.academicSession,
    description: s.description,
  }));
};

export const getSampleSyllabusById = (id) => {
  return SAMPLE_SYLLABI.find(s => s.id === id);
};

export const extractTextFromPdf = async (buffer) => {
  try {
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    return result?.text || '';
  } catch (err) {
    console.warn('[PDFParse] Error parsing PDF text:', err.message);
    return '';
  }
};

export const analyzeSyllabus = async ({
  fileBuffer,
  base64Pdf,
  rawText = '',
  fileName = 'Uploaded_Syllabus.pdf',
  tradeSector = 'Electrician & EV Technician',
  district = 'Pune',
  sampleId = null,
}) => {
  let contentText = rawText;
  let pdfBase64 = base64Pdf;

  // 1. If sample selected, load predefined sample
  if (sampleId) {
    const sample = getSampleSyllabusById(sampleId);
    if (sample) {
      contentText = sample.content;
      tradeSector = sample.trade;
      fileName = `${sample.title}.pdf`;
    }
  }

  // 2. If buffer provided, extract text and prepare base64
  if (fileBuffer) {
    pdfBase64 = fileBuffer.toString('base64');
    const parsedText = await extractTextFromPdf(fileBuffer);
    if (parsedText && parsedText.trim().length > 0) {
      contentText = (contentText ? contentText + '\n\n' : '') + parsedText;
    }
  }

  // 3. Try Gemini Multimodal analysis first
  try {
    const aiResult = await analyzeCurriculumWithGemini({
      base64Pdf: pdfBase64,
      rawText: contentText,
      fileName,
      tradeSector,
      district,
    });

    if (aiResult && aiResult.overallAlignmentScore !== undefined) {
      return enrichWithInstitutionalData(aiResult, fileName, district, tradeSector);
    }
  } catch (err) {
    console.warn('[Gemini AI Curriculum] Failed, falling back to heuristic audit engine:', err.message);
  }

  // 4. Fallback Heuristic Analysis
  return fallbackCurriculumHeuristicExtraction({
    rawText: contentText,
    fileName,
    tradeSector,
    district,
  });
};

export const fallbackCurriculumHeuristicExtraction = ({
  rawText = '',
  fileName = 'Uploaded_Syllabus.pdf',
  tradeSector = 'Electrician & EV Technician',
  district = 'Pune',
}) => {
  const textLower = rawText.toLowerCase();
  const masterSkills = dbStore.getSkills();

  // Detect trade domain
  const isElectricianOrEV =
    textLower.includes('electrician') ||
    textLower.includes('battery') ||
    textLower.includes('motor') ||
    textLower.includes('voltage') ||
    tradeSector.toLowerCase().includes('electrician') ||
    tradeSector.toLowerCase().includes('ev');

  const isMachinistOrCNC =
    textLower.includes('machinist') ||
    textLower.includes('cnc') ||
    textLower.includes('lathe') ||
    textLower.includes('milling') ||
    tradeSector.toLowerCase().includes('machinist');

  const isSolarOrRenewable =
    textLower.includes('solar') ||
    textLower.includes('pv') ||
    textLower.includes('photovoltaic') ||
    textLower.includes('renewable') ||
    tradeSector.toLowerCase().includes('solar');

  // Competency benchmarks tailored to sector
  let benchmarkSkills = [];

  if (isElectricianOrEV) {
    benchmarkSkills = [
      {
        skillName: 'High Voltage Safety & Isolation Protocols (400V - 800V)',
        category: 'Safety & NFPA Compliance',
        demandScore: 97,
        keywords: ['800v', 'high voltage', 'isolation', 'lock out', 'tag out', 'nfpa', 'ppe', '400v'],
        practicalHardware: '400V/800V Safety Isolation Training Rig with Category IV PPE',
        obsoleteHint: 'Conventional knife-switch and simple fuse replacement alone is insufficient for EV battery de-energizing.',
      },
      {
        skillName: 'Battery Management System (BMS) Telemetry & Cell Balancing',
        category: 'EV Electronics & Diagnostics',
        demandScore: 95,
        keywords: ['bms', 'battery management', 'cell balancing', 'soh', 'soc', 'can-bus', 'telemetry', 'lithium'],
        practicalHardware: 'Modular Lithium BMS Test Stand with PCAN Diagnostic Hardware',
        obsoleteHint: 'Lead-acid specific gravity hydrometer checks do not cover Li-Ion active thermal runaway protocols.',
      },
      {
        skillName: 'CCS2 / Type-2 DC Fast Charging Communication Protocols',
        category: 'Charging Infrastructure',
        demandScore: 91,
        keywords: ['ccs2', 'fast charger', 'charging protocol', 'pilot pin', 'evse', 'rectifier'],
        practicalHardware: '30kW DC Fast Charger Simulator & Protocol Analyzer',
        obsoleteHint: 'Curriculum only covers standard 230V AC socket wiring without pilot wire handshaking.',
      },
      {
        skillName: 'Automotive CAN Bus & OBD-II DTC Diagnostics',
        category: 'Industrial Electronics',
        demandScore: 89,
        keywords: ['can bus', 'can-fd', 'obd', 'dtc', 'oscilloscope', 'serial communication', 'diagnostic trouble code'],
        practicalHardware: 'Digital 4-Channel Automotive Storage Oscilloscope & OBD-II Scanner',
        obsoleteHint: 'Analog voltmeter needle probes cannot debug high-frequency differential digital CAN lines.',
      },
      {
        skillName: 'Industrial Conduit Wiring & Substation Earthing',
        category: 'Electrical Infrastructure',
        demandScore: 78,
        keywords: ['earthing', 'wiring', 'conduit', 'substation', 'transformer', 'plate earthing', 'grounding'],
        practicalHardware: 'Industrial Earthing Pit and 3-Phase Busbar Training Panel',
        obsoleteHint: null,
      },
      {
        skillName: 'Single & 3-Phase AC Induction Machine Maintenance',
        category: 'Electrical Machines',
        demandScore: 74,
        keywords: ['induction motor', 'star-delta', 'motor winding', 'stator', 'rotor', 'starter'],
        practicalHardware: '3-Phase Induction Motor Test Bench with Digital Wattmeters',
        obsoleteHint: null,
      },
    ];
  } else if (isMachinistOrCNC) {
    benchmarkSkills = [
      {
        skillName: '5-Axis CNC Milling & CAM Toolpath Generation (Mastercam / NX)',
        category: 'Precision Manufacturing',
        demandScore: 96,
        keywords: ['5-axis', 'cam', 'mastercam', 'toolpath', 'siemens nx', 'multi-axis'],
        practicalHardware: '5-Axis CNC Milling Educational Cell with CAM Post-Processor',
        obsoleteHint: 'Shaper and slotter mechanical stroke setups have near-zero utilization in modern Chakan auto-components.',
      },
      {
        skillName: 'CMM Geometric Dimensioning & Tolerancing (GD&T) Inspection',
        category: 'Quality Metrology',
        demandScore: 92,
        keywords: ['cmm', 'gd&t', 'tolerance', 'coordinate measuring', 'micron', 'runout', 'position'],
        practicalHardware: 'Bridge Type Coordinate Measuring Machine (CMM) with Renishaw Probe',
        obsoleteHint: 'Vernier calipers alone cannot verify ±5 micron geometric runout required for EV motor stators.',
      },
      {
        skillName: '2-Axis / 3-Axis CNC Lathe Turning & Fanuc G-Code Optimization',
        category: 'Machining Automation',
        demandScore: 88,
        keywords: ['cnc lathe', 'fanuc', 'g-code', 'g00', 'g01', 'm-code', 'turning', 'offset'],
        practicalHardware: 'Industrial Slant-Bed CNC Turning Center with Fanuc 0i-TF Plus',
        obsoleteHint: null,
      },
      {
        skillName: 'Conventional Center Lathe Turning & Thread Cutting',
        category: 'Foundational Machining',
        demandScore: 68,
        keywords: ['lathe', 'turning', 'chuck', 'taper', 'thread', 'hss tool'],
        practicalHardware: 'Geared Head Precision Center Lathe',
        obsoleteHint: null,
      },
    ];
  } else {
    // Solar / Default
    benchmarkSkills = [
      {
        skillName: '1500V DC Central & String Inverter Synchronization',
        category: 'Power Electronics',
        demandScore: 94,
        keywords: ['1500v', 'string inverter', 'central inverter', 'mppt', 'synchronization', 'grid code'],
        practicalHardware: '1500V DC Solar String Inverter Test Lab with Grid Emulators',
        obsoleteHint: 'Low-voltage 24V PWM charge controllers are outdated for utility-scale solar farms.',
      },
      {
        skillName: 'Solar PV Array Infrared Thermography & Defect Analysis',
        category: 'Inspection & Preventive Maintenance',
        demandScore: 91,
        keywords: ['thermography', 'thermal camera', 'hotspot', 'micro-crack', 'bypass diode'],
        practicalHardware: 'Fluke Ti480 Industrial Infrared Camera & Solar Module Test Rig',
        obsoleteHint: 'Visual inspection cannot detect internal cell micro-cracks causing thermal degradation.',
      },
      {
        skillName: 'SCADA Telemetry & Modbus RTU/RS-485 Solar Communication',
        category: 'Solar SCADA & Automation',
        demandScore: 87,
        keywords: ['modbus', 'rs-485', 'scada', 'pyranometer', 'telemetry', 'data logger'],
        practicalHardware: 'Solar SCADA RTU Gateway with Modbus Sensor Array',
        obsoleteHint: null,
      },
      {
        skillName: 'Rooftop Array Mounting & DC String Cabling (MC4)',
        category: 'Electrical Installation',
        demandScore: 78,
        keywords: ['mc4', 'mounting structure', 'rooftop', 'tilt angle', 'cabling', 'azimuth'],
        practicalHardware: 'Full-Scale Roof Simulation Rig with Anodized Aluminium MMS',
        obsoleteHint: null,
      },
    ];
  }

  // Cross check syllabus content against benchmark competencies
  let coveredCount = 0;
  let partialCount = 0;
  let missingCount = 0;

  const evaluatedCompetencies = benchmarkSkills.map(b => {
    let matchedKeywords = b.keywords.filter(k => textLower.includes(k));
    let coverage = 'NOT_COVERED';
    let topicFound = 'Not identified in provided syllabus units';
    let diagnostic = '';
    let action = '';

    if (matchedKeywords.length >= 2) {
      // Check if practical lab mentioned or only theory
      const isPractical =
        textLower.includes('practical') ||
        textLower.includes('workshop') ||
        textLower.includes('drill') ||
        textLower.includes('lab exercise');

      if (isPractical && !b.obsoleteHint) {
        coverage = 'COVERED';
        topicFound = `Covered under syllabus topic addressing ${matchedKeywords.join(', ')}`;
        diagnostic = 'Syllabus includes relevant theoretical foundation and workshop exercises.';
        action = 'Maintain current instruction and update annual assessment rubrics.';
        coveredCount++;
      } else {
        coverage = 'PARTIAL';
        topicFound = `Theoretical reference noted (${matchedKeywords.join(', ')}), but practical hours/hardware deficient`;
        diagnostic = 'Classroom theory is taught, but syllabus lacks dedicated hands-on simulator hours.';
        action = `Introduce dedicated 20-hr practical lab modules utilizing ${b.practicalHardware}.`;
        partialCount++;
      }
    } else if (matchedKeywords.length === 1) {
      coverage = 'PARTIAL';
      topicFound = `Brief theoretical mention (${matchedKeywords[0]}) without structured learning outcomes`;
      diagnostic = 'Superficial coverage that does not meet Maharashtra industrial employment criteria.';
      action = `Upgrade topic to full 30-hr module and procure ${b.practicalHardware}.`;
      partialCount++;
    } else {
      coverage = 'NOT_COVERED';
      topicFound = 'Omitted from current trade syllabus';
      diagnostic = 'Complete curricular deficit vs 2026 industrial requirements in Pune/Maharashtra clusters.';
      action = `Mandate approved DVET bridge module covering ${b.skillName}.`;
      missingCount++;
    }

    return {
      skillName: b.skillName,
      category: b.category,
      demandScore: b.demandScore,
      coverageStatus: coverage,
      syllabusTopic: topicFound,
      gapDiagnostic: diagnostic,
      recommendedAction: action,
      requiredLabEquipment: b.practicalHardware,
    };
  });

  const total = evaluatedCompetencies.length;
  const alignmentScore = Math.max(
    38,
    Math.min(94, Math.round(((coveredCount * 1.0 + partialCount * 0.45) / (total || 1)) * 100))
  );

  let status = 'MODERATE_ALIGNMENT';
  if (alignmentScore >= 80) status = 'WELL_ALIGNED';
  else if (alignmentScore < 60) status = 'CRITICAL_DEFICIT';

  // Obsolete topics detected
  const obsoleteTopics = [];
  if (textLower.includes('knife switch') || textLower.includes('analog relay')) {
    obsoleteTopics.push({
      topicName: 'Knife Switches & Heavy Fuse Rewiring',
      reasonObsolete: 'Phased out in modern automotive & industrial panels in favor of intelligent MCBs/RCCBs and solid-state disconnects.',
      replacementRecommendation: 'Replace with Digital Circuit Protection & Automated Shunt Trip Relays.',
    });
  }
  if (textLower.includes('hydrometer') || textLower.includes('lead-acid')) {
    obsoleteTopics.push({
      topicName: 'Lead-Acid Chemical Specific Gravity & Acid Handling',
      reasonObsolete: 'Automotive OEM assembly lines now deploy sealed Lithium-Iron-Phosphate (LFP) and NMC high-voltage packs.',
      replacementRecommendation: 'Shift hours toward Lithium BMS Cell Balancing & CAN-bus Thermistor Diagnostics.',
    });
  }
  if (textLower.includes('shaper') || textLower.includes('slotter')) {
    obsoleteTopics.push({
      topicName: 'Mechanical Shaper & Slotter Quick Return Mechanisms',
      reasonObsolete: 'Mechanical shapers have been completely supplanted by CNC Milling and Wire-EDM machines in Tier-1 supply chains.',
      replacementRecommendation: 'Transition curriculum time to 5-Axis CNC Toolpath Simulation and CAM G-code setup.',
    });
  }

  // Missing emerging skills
  const missingSkills = evaluatedCompetencies
    .filter(c => c.coverageStatus === 'NOT_COVERED')
    .map(c => ({
      skillName: c.skillName,
      industrialNeed: `Critical hiring bottleneck reported by Chakan & MIDC manufacturers in ${district}.`,
      recommendedHours: 30,
    }));

  const courseTitle =
    rawText.split('\n')[0]?.trim().slice(0, 80) ||
    `${tradeSector} CTS Trade Syllabus`;

  return enrichWithInstitutionalData(
    {
      courseTitle: courseTitle.length > 5 ? courseTitle : `${tradeSector} Vocational Syllabus`,
      awardingBody: textLower.includes('dgt')
        ? 'Directorate General of Training (DGT CTS)'
        : textLower.includes('msbte')
        ? 'Maharashtra State Board of Technical Education (MSBTE)'
        : 'National Council for Vocational Education and Training (NCVET)',
      detectedNsqfLevel: textLower.includes('level: 5') || textLower.includes('level 5') ? 'NSQF Level 5' : 'NSQF Level 4',
      totalHours: textLower.includes('1200') ? 1200 : textLower.includes('600') ? 600 : 1000,
      practicalHoursRatio: 0.4,
      overallAlignmentScore: alignmentScore,
      alignmentStatus: status,
      executiveSummary: `Audit of ${fileName} indicates an Overall Industry Alignment Score of ${alignmentScore}% against active 2026 industrial requirements in ${district}. While foundational concepts are established, the trade curriculum exhibits a ${100 - alignmentScore}% deficit in modern high-voltage and automated digital diagnostics.`,
      competencies: evaluatedCompetencies,
      obsoleteTopics: obsoleteTopics.length > 0 ? obsoleteTopics : [
        {
          topicName: 'Analog Dial Indicator Manual Logging',
          reasonObsolete: 'Replaced by digital Bluetooth-connected micrometers with automated SPC logging.',
          replacementRecommendation: 'Adopt Digital Metrology & Statistical Process Control (SPC) drills.',
        },
      ],
      missingEmergingSkills: missingSkills.length > 0 ? missingSkills : [
        {
          skillName: 'IoT Sensor Calibration & Industrial Fieldbus Telemetry',
          industrialNeed: 'Required for Smart Factory 4.0 automation in Bhosari and Talegaon clusters.',
          recommendedHours: 25,
        },
      ],
      bridgeRecommendation: {
        moduleTitle: `Approved DVET 60-Hour Fast-Track Bridge Module: Modern ${tradeSector} Competencies`,
        recommendedHours: 60,
        targetBatch: 'Final Year ITI Trainees (Sem 3 & 4)',
        estimatedLabCost: '₹4.5 Lakhs (Eligible for CSR & State DST Matching Grant)',
        syllabusSummary: 'Hands-on practical simulator drills focused on 800V safety lockout, CAN-bus digital troubleshooting, and high-precision inspection.',
      },
    },
    fileName,
    district,
    tradeSector
  );
};

export const enrichWithInstitutionalData = (
  result,
  fileName,
  district = 'Pune',
  tradeSector = 'Electrician & EV Technician'
) => {
  const covered = (result.competencies || []).filter(c => c.coverageStatus === 'COVERED').length;
  const partial = (result.competencies || []).filter(c => c.coverageStatus === 'PARTIAL').length;
  const missing = (result.competencies || []).filter(c => c.coverageStatus === 'NOT_COVERED').length;
  const total = (result.competencies || []).length || 1;

  const score = result.overallAlignmentScore || Math.round(((covered * 1.0 + partial * 0.45) / total) * 100);

  const enriched = {
    ...result,
    fileName,
    district,
    tradeSector,
    auditedAt: new Date().toISOString(),
    auditId: `AUDIT_${Date.now().toString().slice(-6)}`,
    overallAlignmentScore: score,
    breakdownStats: {
      totalCompetencies: total,
      coveredCount: covered,
      partialCount: partial,
      missingCount: missing,
      curricularDeficitPercent: 100 - score,
      practicalHoursRatio: result.practicalHoursRatio || 0.4,
    },
  };

  // Asynchronously persist to MongoDB Atlas if connected
  if (isMongoConnected()) {
    CurriculumAudit.create(enriched).catch(err => {
      console.warn('[MongoDB Atlas] Could not persist audit record:', err.message);
    });
  }

  return enriched;
};

export default {
  getSampleSyllabi,
  getSampleSyllabusById,
  extractTextFromPdf,
  analyzeSyllabus,
  fallbackCurriculumHeuristicExtraction,
};
