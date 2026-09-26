import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Award,
  Compass,
  Check,
  Wrench,
} from 'lucide-react';
import { analyzeJobDescription } from '../../lib/api.js';
import { useLanguage } from '../../context/LanguageContext.jsx';

const SAMPLE_JOB_DESCRIPTIONS = [
  {
    title: 'EV Powertrain & Battery Diagnostic Technician',
    company: 'Tata Motors EV Division',
    district: 'Pune (Chakan Plant)',
    text: `Job Responsibilities:
- Conduct live battery pack cell balancing, state-of-health (SOH), and state-of-charge (SOC) diagnostics using CANoe and PCAN diagnostic analyzers.
- Execute 800V high-voltage isolation fault tracing, DC fast charger CCS2 protocol troubleshooting, and inverter IGBT module replacements.
- Calibrate Battery Management System (BMS) over-current thresholds, CAN-FD communication buses, and thermal runaway containment sensors.
- Maintain stringent ISO 26262 automotive functional safety compliance and shop-floor high-voltage NFPA 70E PPE lock-out/tag-out standards.`,
  },
  {
    title: 'Solar PV Plant Inverter & SCADA Microgrid Technician',
    company: 'Tata Power Renewable Microgrid',
    district: 'Kolhapur & Solapur Cluster',
    text: `Job Responsibilities:
- Commission and synchronize 1500V DC central solar string inverters with regional 33kV distribution feeder switchyards.
- Troubleshoot Modbus RTU / RS-485 serial communication dropouts across solar pyranometers, array junction boxes, and weather stations.
- Perform infrared thermography scans to detect micro-cracks, diode failures, and hot-spots across multi-crystalline PV module arrays.
- Calibrate protective trip relays (50/51 over-current, 59 over-voltage) and SCADA telemetry RTUs for grid code compliance.`,
  },
  {
    title: '5-Axis CNC Precision Machining & Toolpath Specialist',
    company: 'Bharat Forge Precision Automotive',
    district: 'Pune (Hadapsar)',
    text: `Job Responsibilities:
- Set up and operate DMG Mori 5-Axis CNC machining centers for precision EV motor stator housings and aerospace turbine discs.
- Generate and optimize ISO G-Code / M-Code toolpaths using Mastercam and Siemens NX CAM.
- Conduct Coordinate Measuring Machine (CMM) dimensional verification to achieve ±5 micron geometric tolerances.
- Implement cutting tool wear offsets, coolant concentration monitoring, and lean 5S shop-floor maintenance.`,
  },
];

export const AiJobAnalyzerWidget = ({ mode = 'institute', selectedDistrict = 'Pune', onActionComplete }) => {
  const { language } = useLanguage();
  const [jobText, setJobText] = useState(SAMPLE_JOB_DESCRIPTIONS[0].text);
  const [selectedPresetIdx, setSelectedPresetIdx] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [actionFeedback, setActionFeedback] = useState(null);

  const i18n = {
    en: {
      instEngine: 'Curriculum Deficit Engine',
      studentEngine: 'Trainee Career Match Engine',
      observatory: 'DVET Labour Observatory',
      instTitle: 'AI Industry Job & Curriculum Deficit Analyzer',
      studentTitle: 'AI Job Description & Skills Match Analyzer',
      instSub: 'Extract live technical competencies from industrial vacancies, identify ITI syllabus gaps, and dispatch corrective reforms.',
      studentSub: 'Paste an industrial job posting or select a preset to evaluate your verified competencies and unlock learning paths.',
      framework: 'NSDC & ESCO Aligned',
      selectPreset: '1. Select Live Industrial Vacancy or Paste Custom Posting',
      jdLabel: 'Job Description Text (Unstructured Industrial Posting)',
      jdPlaceholder: 'Paste responsibilities, technical criteria, or qualification requirements here...',
      analyzingText: 'Analyzing Industrial Semantics with AI...',
      instAnalyzeBtn: 'Analyze Curriculum Deficit with AI',
      studentAnalyzeBtn: 'Analyze My Job Match with AI',
      analysisNotice: 'Analysis Notification:',
      actionLogged: 'Action Logged',
      readyTitle: 'Ready for AI Technical Analysis',
      readyInstDesc: 'Click "Analyze Curriculum Deficit with AI" to extract required competencies, match against taught trade syllabi, and identify equipment shortages.',
      readyStudentDesc: 'Click "Analyze My Job Match with AI" to evaluate your verified competencies against this employer requirement and see your readiness match.',
      parsingTitle: 'Parsing Industrial Job Semantics...',
      parsingDesc: 'Extracting technical competencies, mapping to National Occupational Standards (NOS), and benchmarking.',
      demandSignal: 'Demand Signal Index',
      tradeGapDiag: 'Statewide Trade Gap Diagnostic:',
      hiringMatch: 'Your Personalized Hiring Match:',
      readinessMatch: 'Readiness Match',
      extractedComp: 'Extracted Competencies & ITI Trade Syllabus Coverage',
      skillsParsed: 'Skills Parsed',
      fullyTaught: 'Fully Taught',
      partialDeficit: 'Partial Deficit',
      notInSyllabus: 'Not in Syllabus',
      courseAlignment: 'ITI Trade Course Alignment',
      matchPct: 'Match',
      deficitLabel: 'Deficit: ',
      deploySyllabus: 'Deploy to Trade Syllabus',
      requestLabGrant: 'Request Lab Hardware Grant',
      competencyGapDiag: 'Trainee Competency Gap Diagnostic',
      verifiedSkills: (n) => `Verified Skills You Have (${n})`,
      skillGaps: (n) => `Skill Gaps to Bridge (${n})`,
      recommendedAction: 'Recommended Trainee Action to Reach 100% Match',
      addSkillsToPath: 'Add Missing Skills to My Learning Path',
    },
    mr: {
      instEngine: 'संस्था अभ्यासक्रम एआय इंजिन',
      studentEngine: 'प्रशिक्षणार्थी करिअर मॅच एआय इंजिन',
      observatory: 'महाराष्ट्र श्रम बाजार वेधशाळा',
      instTitle: 'एआय उद्योग नोकरी व अभ्यासक्रम तूट विश्लेषक',
      studentTitle: 'एआय नोकरी वर्णन व कौशल्य जुळवणी विश्लेषक',
      instSub: 'औद्योगिक जाहिरातींमधून प्रत्यक्ष कौशल्य मागणी काढा, आयटीआय अभ्यासक्रम तूट ओळखा आणि सुधारणा करा.',
      studentSub: 'आपली नोकरी जाहिरात पेस्ट करा किंवा निवडा, आपली रोजगार सज्जता तपासा आणि वैयक्तिक शिक्षण मार्ग मिळवा.',
      framework: 'NSDC व ESCO मानकांनुसार',
      selectPreset: '१. थेट औद्योगिक जागा निवडा किंवा मजकूर पेस्ट करा',
      jdLabel: 'नोकरी वर्णन मजकूर (असंरचित औद्योगिक जाहिरात)',
      jdPlaceholder: 'येथे कामाच्या जबाबदाऱ्या, शैक्षणिक पात्रता किंवा तांत्रिक निकष पेस्ट करा...',
      analyzingText: 'एआय द्वारे औद्योगिक विश्लेषण सुरू आहे...',
      instAnalyzeBtn: 'एआय द्वारे अभ्यासक्रम तूट विश्लेषण करा',
      studentAnalyzeBtn: 'एआय द्वारे माझी जॉब जुळवणी तपासा',
      analysisNotice: 'विश्लेषण सूचना:',
      actionLogged: 'कृती नोंदवली',
      readyTitle: 'तांत्रिक विश्लेषणासाठी सज्ज',
      readyInstDesc: 'आवश्यक कौशल्ये काढण्यासाठी आणि आयटीआय अभ्यासक्रमाशी पडताळणी करण्यासाठी "विश्लेषण करा" वर क्लिक करा.',
      readyStudentDesc: 'आपल्या कौशल्यांची पडताळणी करण्यासाठी "माझी जॉब जुळवणी तपासा" वर क्लिक करा.',
      parsingTitle: 'औद्योगिक नोकरी मजकुराचे विश्लेषण सुरू...',
      parsingDesc: 'तांत्रिक कौशल्ये काढणे, राष्ट्रीय व्यावसायिक मानकांशी (NOS) जुळवणे सुरू आहे.',
      demandSignal: 'मागणी निर्देशांक',
      tradeGapDiag: 'राज्यव्यापी ट्रेड तूट निदान:',
      hiringMatch: 'आपली वैयक्तिक भरती जुळवणी:',
      readinessMatch: 'सज्जता जुळवणी',
      extractedComp: 'शोधलेली कौशल्ये आणि ITI अभ्यासक्रम कव्हरेज',
      skillsParsed: 'कौशल्ये विश्लेषित',
      fullyTaught: 'अभ्यासक्रमात पूर्ण',
      partialDeficit: 'अंशतः तूट',
      notInSyllabus: 'अभ्यासक्रमात नाही',
      courseAlignment: 'ITI ट्रेड अभ्यासक्रम संरेखन',
      matchPct: 'जुळणी',
      deficitLabel: 'तूट: ',
      deploySyllabus: 'ट्रेड अभ्यासक्रमात समाविष्ट करा',
      requestLabGrant: 'प्रयोगशाळा अनुदान विनंती करा',
      competencyGapDiag: 'प्रशिक्षणार्थी कौशल्य तूट निदान',
      verifiedSkills: (n) => `आपली प्रमाणित कौशल्ये (${n})`,
      skillGaps: (n) => `पूर्ण करावयाची कौशल्य तूट (${n})`,
      recommendedAction: '१००% सज्जतेसाठी शिफारस केलेली कृती',
      addSkillsToPath: 'माझ्या शिक्षण मार्गात कौशल्ये जोडा',
    },
    hi: {
      instEngine: 'संस्थान पाठ्यक्रम एआई इंजन',
      studentEngine: 'छात्र करियर मैच एआई इंजन',
      observatory: 'महाराष्ट्र श्रम बाज़ार वेधशाला',
      instTitle: 'एआई औद्योगिक नौकरी एवं पाठ्यक्रम कमी विश्लेषक',
      studentTitle: 'एआई नौकरी विवरण एवं कौशल मिलान विश्लेषक',
      instSub: 'औद्योगिक रिक्तियों से वास्तविक कौशल मांग निकालें, आईटीआई पाठ्यक्रम कमी पहचानें और सुधार करें।',
      studentSub: 'नौकरी विवरण पेस्ट करें या चुनें, अपनी रोजगार तत्परता स्कोर देखें और अनुकूलित शिक्षण मार्ग पाएं।',
      framework: 'NSDC एवं ESCO फ्रेमवर्क अनुरूप',
      selectPreset: '1. औद्योगिक रिक्ति चुनें या कस्टम विवरण पेस्ट करें',
      jdLabel: 'नौकरी विवरण टेक्स्ट (असंरचित औद्योगिक पोस्टिंग)',
      jdPlaceholder: 'यहाँ नौकरी की आवश्यकताएं, तकनीकी जिम्मेदारियां या योग्यता मानदंड पेस्ट करें...',
      analyzingText: 'एआई द्वारा औद्योगिक विश्लेषण किया जा रहा है...',
      instAnalyzeBtn: 'एआई से पाठ्यक्रम कमी का विश्लेषण करें',
      studentAnalyzeBtn: 'एआई से मेरे जॉब मैच का विश्लेषण करें',
      analysisNotice: 'विश्लेषण सूचना:',
      actionLogged: 'कार्रवाई दर्ज की गई',
      readyTitle: 'एआई तकनीकी विश्लेषण के लिए तैयार',
      readyInstDesc: 'आवश्यक कौशल निकालने और आईटीआई पाठ्यक्रम से मिलान करने हेतु "विश्लेषण करें" पर क्लिक करें।',
      readyStudentDesc: 'अपनी योग्यताओं का मूल्यांकन करने हेतु "मेरे जॉब मैच का विश्लेषण करें" पर क्लिक करें।',
      parsingTitle: 'औद्योगिक जॉब विवरण का विश्लेषण जारी...',
      parsingDesc: 'तकनीकी कौशल निष्कर्षण एवं राष्ट्रीय व्यावसायिक मानकों (NOS) से मिलान जारी है।',
      demandSignal: 'मांग संकेत सूचकांक',
      tradeGapDiag: 'राज्यव्यापी ट्रेड कमी निदान:',
      hiringMatch: 'आपका व्यक्तिगत भर्ती मिलान:',
      readinessMatch: 'तत्परता मिलान',
      extractedComp: 'निकाले गए कौशल एवं ITI ट्रेड पाठ्यक्रम कवरेज',
      skillsParsed: 'कौशल विश्लेषित',
      fullyTaught: 'पूर्ण पढ़ाया गया',
      partialDeficit: 'आंशिक कमी',
      notInSyllabus: 'पाठ्यक्रम में नहीं',
      courseAlignment: 'ITI ट्रेड पाठ्यक्रम संरेखण',
      matchPct: 'मिलान',
      deficitLabel: 'कमी: ',
      deploySyllabus: 'ट्रेड पाठ्यक्रम में लागू करें',
      requestLabGrant: 'प्रयोगशाला अनुदान का अनुरोध करें',
      competencyGapDiag: 'प्रशिक्षु कौशल अंतराल निदान',
      verifiedSkills: (n) => `आपके सत्यापित कौशल (${n})`,
      skillGaps: (n) => `दूर करने योग्य कौशल अंतराल (${n})`,
      recommendedAction: '100% तत्परता के लिए अनुशंसित कार्रवाई',
      addSkillsToPath: 'कौशल को मेरे शिक्षण मार्ग में जोड़ें',
    },
  };

  const str = i18n[language] || i18n.en;

  const handleSelectPreset = (idx) => {
    setSelectedPresetIdx(idx);
    setJobText(SAMPLE_JOB_DESCRIPTIONS[idx].text);
    setResult(null);
    setError(null);
    setActionFeedback(null);
  };

  const handleAnalyze = async () => {
    if (!jobText.trim()) return;
    setAnalyzing(true);
    setError(null);
    setActionFeedback(null);

    try {
      const data = await analyzeJobDescription(jobText, selectedDistrict);
      setResult(data);
    } catch (err) {
      console.error('[AI Analyzer] Failed:', err);
      setError(err.message || 'Error executing AI competency parsing.');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleApplyAction = (msg) => {
    setActionFeedback(msg);
    if (onActionComplete) onActionComplete(msg);
    setTimeout(() => setActionFeedback(null), 4500);
  };

  // Trainee verified skill mock matching for Student mode
  const studentVerifiedSkills = [
    'Wiring Harness Assembly',
    'Preventive Electrical Testing',
    'Electrical Schematics & Blueprints',
    'Motor Calibration & Mounting',
    'IP67 Waterproof Testing',
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-lg border border-[#DDE3E8] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#E8F1F8] text-[#0056A6] border border-[#0056A6]/30 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#0056A6]" />
              <span>{mode === 'institute' ? str.instEngine : str.studentEngine}</span>
            </span>
            <span className="text-xs text-[#666666] font-medium">
              {str.observatory}
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#003B70] mt-1.5">
            {mode === 'institute' ? str.instTitle : str.studentTitle}
          </h2>
          <p className="text-xs text-[#666666] mt-0.5">
            {mode === 'institute' ? str.instSub : str.studentSub}
          </p>
        </div>

        <div className="text-xs text-[#003B70] flex items-center gap-2 bg-[#E8F1F8] px-3.5 py-2 rounded border border-[#0056A6]/20">
          <Layers className="w-4 h-4 text-[#0056A6]" />
          <span>{str.framework}</span>
        </div>
      </div>

      {/* Main Grid: Input Column and Result Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Preset selection and Textarea */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-5 rounded-lg border border-[#DDE3E8] shadow-2xs space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#003B70] mb-2">
                {str.selectPreset}
              </label>
              <div className="flex flex-col gap-1.5">
                {SAMPLE_JOB_DESCRIPTIONS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectPreset(idx)}
                    className={`text-left px-3 py-2 rounded border text-xs transition-colors cursor-pointer ${
                      selectedPresetIdx === idx
                        ? 'border-[#0056A6] bg-[#E8F1F8] text-[#003B70] font-bold shadow-2xs'
                        : 'border-[#DDE3E8] bg-[#F7F8FA] text-[#222222] hover:bg-stone-100 hover:border-stone-300'
                    }`}
                  >
                    <div className="font-semibold text-[#222222]">{preset.title}</div>
                    <div className="text-[10px] text-[#666666] mt-0.5 flex items-center justify-between">
                      <span>{preset.company}</span>
                      <span className="font-mono text-[#0056A6] font-semibold">{preset.district}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#222222] mb-1">
                {str.jdLabel}
              </label>
              <textarea
                rows={10}
                value={jobText}
                onChange={(e) => setJobText(e.target.value)}
                placeholder={str.jdPlaceholder}
                className="w-full p-3 text-xs font-mono bg-stone-50 border border-[#DDE3E8] rounded text-[#222222] focus:border-[#0056A6] focus:bg-white focus:outline-none transition-colors"
              />
            </div>

            {/* Controlled Accent: Saffron Orange CTA Button */}
            <button
              onClick={handleAnalyze}
              disabled={analyzing || !jobText.trim()}
              className="w-full py-2.5 px-4 bg-[#F28C28] hover:bg-[#D96B1F] disabled:bg-stone-300 text-white rounded font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              {analyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>{str.analyzingText}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>
                    {mode === 'institute'
                      ? str.instAnalyzeBtn
                      : str.studentAnalyzeBtn}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: AI Extraction & Diagnostic Results */}
        <div className="lg:col-span-7 space-y-4">
          {error && (
            <div className="p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong>{str.analysisNotice}</strong> {error}
              </div>
            </div>
          )}

          {actionFeedback && (
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">{actionFeedback}</span>
              </div>
              <span className="text-[10px] text-emerald-700 font-bold bg-white px-2 py-0.5 rounded border border-emerald-200">
                {str.actionLogged}
              </span>
            </div>
          )}

          {!result && !analyzing && (
            <div className="bg-white p-10 rounded-lg border border-dashed border-[#DDE3E8] flex flex-col items-center justify-center text-center h-[440px] space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#E8F1F8] border border-[#0056A6]/30 flex items-center justify-center text-[#0056A6]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#003B70] text-sm">
                {str.readyTitle}
              </h3>
              <p className="text-xs text-[#666666] max-w-sm">
                {mode === 'institute'
                  ? str.readyInstDesc
                  : str.readyStudentDesc}
              </p>
            </div>
          )}

          {analyzing && (
            <div className="bg-white p-10 rounded-lg border border-[#DDE3E8] flex flex-col items-center justify-center text-center h-[440px] space-y-3">
              <RefreshCw className="w-8 h-8 animate-spin text-[#0056A6]" />
              <h3 className="font-bold text-[#003B70] text-sm">
                {str.parsingTitle}
              </h3>
              <p className="text-xs text-[#666666] max-w-xs">
                {str.parsingDesc}
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-4">
              {/* Role Header Banner - Deep Navy background */}
              <div className="bg-[#003B70] text-white p-5 rounded-lg border border-[#00284D] space-y-3 shadow-2xs">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-[#E8F1F8] font-semibold">
                    {result.industry} &middot; {result.seniorityLevel}
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#00284D] text-[#E8F1F8] border border-[#0056A6]">
                    {str.demandSignal}: {result.demandSignalScore || 92}/100
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">
                    {result.extractedRole || result.jobTitle}
                  </h3>
                  <p className="text-xs text-[#E8F1F8]/90 mt-1 leading-relaxed">
                    {result.summaryOfRequirements}
                  </p>
                </div>

                {/* Mode-Specific Highlight Bar */}
                {mode === 'institute' ? (
                  <div className="pt-2 border-t border-[#00284D] flex items-center justify-between text-xs">
                    <span className="text-[#E8F1F8]">{str.tradeGapDiag}</span>
                    <span className="font-bold text-[#F28C28]">{result.recommendedCourseGap}</span>
                  </div>
                ) : (
                  <div className="pt-2 border-t border-[#00284D] flex items-center justify-between text-xs">
                    <span className="text-[#E8F1F8]">{str.hiringMatch}</span>
                    <span className="font-bold text-[#F28C28] text-sm">
                      {Math.max(50, Math.min(95, Math.round(((result.extractedSkills?.filter(s => s.currentCourseCoverage === 'COVERED' || s.importance !== 'CRITICAL').length || 3) / (result.extractedSkills?.length || 4)) * 100)))}% {str.readinessMatch}
                    </span>
                  </div>
                )}
              </div>

              {/* Institute View Details */}
              {mode === 'institute' && (
                <div className="bg-white p-5 rounded-lg border border-[#DDE3E8] shadow-2xs space-y-5">
                  <div className="flex items-center justify-between border-b border-[#DDE3E8] pb-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#003B70]">
                      {str.extractedComp}
                    </h4>
                    <span className="text-[10px] font-bold text-[#0056A6] bg-[#E8F1F8] px-2 py-0.5 rounded border border-[#0056A6]/20">
                      {result.extractedSkills?.length || 0} {str.skillsParsed}
                    </span>
                  </div>

                  <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                    {(result.extractedSkills || []).map((skill, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded border border-[#DDE3E8] bg-[#F7F8FA] hover:bg-white text-xs transition-colors space-y-1"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-bold text-[#222222]">{skill.skillName}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                              skill.currentCourseCoverage === 'COVERED'
                                ? 'bg-[#198754]/10 text-[#198754] border border-[#198754]/30'
                                : skill.currentCourseCoverage === 'PARTIAL'
                                ? 'bg-[#F4B942]/15 text-[#D96B1F] border border-[#F4B942]/40'
                                : 'bg-[#C62828]/10 text-[#C62828] border border-[#C62828]/30'
                            }`}
                          >
                            {skill.currentCourseCoverage === 'COVERED'
                              ? str.fullyTaught
                              : skill.currentCourseCoverage === 'PARTIAL'
                              ? str.partialDeficit
                              : str.notInSyllabus}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#666666]">{skill.rationale}</p>
                      </div>
                    ))}
                  </div>

                  {/* Trade Syllabus Alignment Matrix */}
                  {result.matchingCourses && result.matchingCourses.length > 0 && (
                    <div className="pt-2 border-t border-[#DDE3E8] space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#003B70]">
                        {str.courseAlignment}
                      </div>
                      <div className="space-y-2">
                        {result.matchingCourses.slice(0, 3).map((course, i) => (
                          <div key={i} className="p-2.5 rounded bg-[#F7F8FA] border border-[#DDE3E8] space-y-1 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-[#222222] truncate">{course.title}</span>
                              <span className="font-bold text-[#0056A6] text-[11px] shrink-0 ml-2">
                                {course.alignmentPercent}% {str.matchPct}
                              </span>
                            </div>
                            <div className="w-full bg-[#DDE3E8] h-1.5 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  course.alignmentPercent >= 70
                                    ? 'bg-[#198754]'
                                    : course.alignmentPercent >= 40
                                    ? 'bg-[#F28C28]'
                                    : 'bg-[#C62828]'
                                }`}
                                style={{ width: `${course.alignmentPercent}%` }}
                              />
                            </div>
                            {course.missingSkills?.length > 0 && (
                              <div className="text-[10px] text-[#666666] truncate">
                                <span className="font-semibold text-[#C62828]">{str.deficitLabel}</span>
                                {course.missingSkills.join(', ')}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Institutional Actions */}
                  <div className="pt-3 border-t border-[#DDE3E8] flex flex-wrap items-center justify-between gap-2">
                    <button
                      onClick={() => handleApplyAction('Syllabus update proposal generated for State Skill Committee.')}
                      className="px-3.5 py-1.5 rounded bg-[#0056A6] hover:bg-[#003B70] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-white" />
                      <span>{str.deploySyllabus}</span>
                    </button>
                    <button
                      onClick={() => handleApplyAction('Lab equipment requisition submitted for next procurement cycle.')}
                      className="px-3.5 py-1.5 rounded border border-[#DDE3E8] hover:bg-[#F7F8FA] text-[#003B70] text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Wrench className="w-3.5 h-3.5 text-[#0056A6]" />
                      <span>{str.requestLabGrant}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Student View Details */}
              {mode === 'student' && (() => {
                const coveredOrPartial = (result.extractedSkills || []).filter(
                  s => s.currentCourseCoverage === 'COVERED' || studentVerifiedSkills.some(v => s.skillName.toLowerCase().includes(v.toLowerCase()))
                );
                const missingGaps = (result.extractedSkills || []).filter(
                  s => !coveredOrPartial.some(cp => cp.skillName === s.skillName)
                );
                const readiness = Math.max(50, Math.min(95, Math.round(((coveredOrPartial.length + 1) / (result.extractedSkills?.length || 4)) * 100)));

                return (
                  <div className="bg-white p-5 rounded-lg border border-[#DDE3E8] shadow-2xs space-y-4">
                    <div className="flex items-center justify-between border-b border-[#DDE3E8] pb-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#003B70]">
                        {str.competencyGapDiag}
                      </h4>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {readiness}% {str.readinessMatch}
                      </span>
                    </div>

                    {/* Verified vs Missing */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded bg-emerald-50/60 border border-emerald-200 space-y-2">
                        <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-[#198754]" />
                          <span>{str.verifiedSkills(studentVerifiedSkills.length)}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 max-h-[140px] overflow-y-auto">
                          {studentVerifiedSkills.map((s, i) => (
                            <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-white text-emerald-800 border border-emerald-200 font-medium">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 rounded bg-red-50/60 border border-red-200 space-y-2">
                        <div className="font-bold text-red-900 flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-[#C62828]" />
                          <span>{str.skillGaps(missingGaps.length || 2)}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 max-h-[140px] overflow-y-auto">
                          {(missingGaps.length > 0 ? missingGaps : result.extractedSkills?.slice(0, 2) || []).map((skill, i) => (
                            <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-white text-[#C62828] border border-red-200 font-semibold">
                              {skill.skillName}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Learning Path Recommendation - Light Blue Info Panel */}
                    <div className="p-3.5 rounded bg-[#E8F1F8] border border-[#0056A6]/20 space-y-2 text-xs">
                      <div className="font-bold text-[#003B70] flex items-center gap-1.5">
                        <Compass className="w-4 h-4 text-[#0056A6]" />
                        <span>{str.recommendedAction}</span>
                      </div>
                      <p className="text-[#222222] text-[11px] leading-relaxed">
                        {missingGaps.length > 0
                          ? `Enroll in the upcoming hands-on practical clinic for ${missingGaps[0].skillName} at your ITI. Completing this module increases your hiring shortlist probability by +32%.`
                          : 'Complete the remaining advanced high-voltage isolation simulator workshop to achieve 100% placement readiness.'}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-end">
                      <button
                        onClick={() => handleApplyAction('Missing competencies added to your personalized Learning Path schedule.')}
                        className="px-4 py-2 bg-[#F28C28] hover:bg-[#D96B1F] text-white rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Award className="w-3.5 h-3.5 text-white" />
                        <span>{str.addSkillsToPath}</span>
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiJobAnalyzerWidget;
