import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  RefreshCw,
  AlertTriangle,
  Compass,
  ArrowRight,
  Lock,
} from 'lucide-react';
import { analyzeJobDescription } from '../lib/api.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

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

export const JobAnalyzerPage = ({ selectedDistrict = 'Pune', onNavigate }) => {
  const { t } = useLanguage();
  const { isAuthenticated, openLoginModal } = useAuth();
  const [jobText, setJobText] = useState(SAMPLE_JOB_DESCRIPTIONS[0].text);
  const [selectedSampleIdx, setSelectedSampleIdx] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // If user is not authenticated, restrict access
  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto my-16 px-4">
        <div className="bg-white rounded-lg border border-[#DDE3E8] p-8 text-center shadow-xs space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#E8F1F8] text-[#003B70] flex items-center justify-center mx-auto border border-[#0056A6]/20">
            <Lock className="w-6 h-6 text-[#003B70]" />
          </div>
          <span className="inline-block px-3 py-1 rounded text-[10px] font-bold bg-[#E8F1F8] text-[#0056A6] border border-[#0056A6]/30 uppercase tracking-wider">
            Restricted Institutional Access
          </span>
          <h2 className="text-xl font-bold text-[#003B70]">
            Authentication Required for AI Job &amp; Demand Analyzer
          </h2>
          <p className="text-xs text-[#666666] leading-relaxed max-w-lg mx-auto">
            Access to the AI Industrial Job &amp; Trade Curriculum Deficit Engine is strictly reserved for verified vocational trainees, accredited ITI administration, instructors, and registered employers under the Directorate of Vocational Education &amp; Training (DVET), Maharashtra.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => openLoginModal && openLoginModal('student')}
              className="px-6 py-2.5 rounded bg-[#F28C28] hover:bg-[#D96B1F] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs flex items-center gap-2"
            >
              <span>Portal Sign-In to Access</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            {onNavigate && (
              <button
                onClick={() => onNavigate('landing')}
                className="px-6 py-2.5 rounded bg-white hover:bg-[#F7F8FA] text-[#0056A6] border border-[#DDE3E8] text-xs font-bold transition-colors cursor-pointer"
              >
                Return to Home
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const handleSelectSample = (index) => {
    setSelectedSampleIdx(index);
    setJobText(SAMPLE_JOB_DESCRIPTIONS[index].text);
    setResult(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!jobText.trim()) return;
    setAnalyzing(true);
    setError(null);

    try {
      const data = await analyzeJobDescription(jobText, selectedDistrict);
      setResult(data);
    } catch (err) {
      console.error('[Job Analyzer] Analysis error:', err);
      setError(err.message || 'Failed to extract competencies from job description.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-lg border border-[#DDE3E8] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#E8F1F8] text-[#0056A6] border border-[#0056A6]/30 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#0056A6]" />
              {t.navJobAnalyzer || 'AI Job & Demand Analyzer'}
            </span>
            <span className="text-xs text-[#666666] font-medium">
              DVET Maharashtra Labour Observatory
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#003B70] tracking-tight mt-1">
            AI Industrial Job &amp; Trade Curriculum Gap Engine
          </h1>
          <p className="text-xs text-[#666666] mt-0.5">
            Extracts industry competencies from unstructured employer job postings, maps to NSQF standards, and identifies ITI curriculum deficits.
          </p>
        </div>

        <div className="text-xs text-[#003B70] flex items-center gap-2 bg-[#E8F1F8] px-3.5 py-2 rounded border border-[#0056A6]/20">
          <Layers className="w-4 h-4 text-[#0056A6]" />
          <span>NSDC &amp; ESCO Framework Aligned</span>
        </div>
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Input Textarea & Sample Presets */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-5 rounded-lg border border-[#DDE3E8] shadow-2xs space-y-4">
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-[#003B70] mb-2">
                1. Select Live Industrial Vacancy or Paste Custom Posting
              </span>
              <div className="flex flex-col gap-1.5">
                {SAMPLE_JOB_DESCRIPTIONS.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectSample(idx)}
                    className={`text-left px-3 py-2 rounded border text-xs transition-colors cursor-pointer ${
                      selectedSampleIdx === idx
                        ? 'border-[#0056A6] bg-[#E8F1F8] text-[#003B70] font-bold shadow-2xs'
                        : 'border-[#DDE3E8] bg-[#F7F8FA] text-[#222222] hover:bg-stone-100 hover:border-stone-300'
                    }`}
                  >
                    <div className="font-semibold text-[#222222]">{sample.title}</div>
                    <div className="text-[10px] text-[#666666] mt-0.5 flex items-center justify-between">
                      <span>{sample.company}</span>
                      <span className="font-mono text-[#0056A6] font-semibold">{sample.district}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Textarea */}
            <div>
              <label className="block text-xs font-bold text-[#222222] mb-1">
                Raw Industrial Job Description
              </label>
              <textarea
                rows={11}
                value={jobText}
                onChange={e => setJobText(e.target.value)}
                placeholder="Paste any job requirement text, qualification criteria, or technical responsibilities here..."
                className="w-full p-3 text-xs font-mono bg-stone-50 border border-[#DDE3E8] rounded text-[#222222] focus:border-[#0056A6] focus:bg-white focus:outline-none transition-colors"
              />
            </div>

            {/* Controlled Accent: Saffron Orange Analyze Button */}
            <button
              onClick={handleAnalyze}
              disabled={analyzing || !jobText.trim()}
              className="w-full py-2.5 px-4 bg-[#F28C28] hover:bg-[#D96B1F] disabled:bg-stone-300 text-white rounded font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              {analyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Extracting Competencies with AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Extract Skills &amp; Calculate Course Gap</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Structured AI Extraction & Gap Results */}
        <div className="lg:col-span-7 space-y-4">
          {error && (
            <div className="p-4 rounded bg-red-50 border border-red-200 text-[#C62828] text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-[#C62828] shrink-0 mt-0.5" />
              <div>
                <strong>Analysis Notification:</strong> {error}
              </div>
            </div>
          )}

          {!result && !analyzing && (
            <div className="bg-white p-10 rounded-lg border border-dashed border-[#DDE3E8] flex flex-col items-center justify-center text-center h-[460px] space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#E8F1F8] border border-[#0056A6]/30 flex items-center justify-center text-[#0056A6]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#003B70] text-sm">Awaiting Industrial Job Text</h3>
              <p className="text-xs text-[#666666] max-w-sm">
                Click &ldquo;Extract Skills &amp; Calculate Course Gap&rdquo; to parse competencies, proficiency requirements, and calculate ITI trade alignment.
              </p>
            </div>
          )}

          {analyzing && (
            <div className="bg-white p-10 rounded-lg border border-[#DDE3E8] flex flex-col items-center justify-center text-center h-[460px] space-y-3">
              <RefreshCw className="w-8 h-8 animate-spin text-[#0056A6]" />
              <h3 className="font-bold text-[#003B70] text-sm">
                Parsing Industrial Job Semantics...
              </h3>
              <p className="text-xs text-[#666666] max-w-xs">
                Extracting technical competencies, mapping to National Occupational Standards (NOS), and benchmarking.
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-4">
              {/* Summary Card - Deep Navy Banner */}
              <div className="p-5 rounded-lg bg-[#003B70] text-white space-y-3 shadow-2xs border border-[#00284D]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[#E8F1F8] font-semibold">
                    {result.industry} &middot; {result.seniorityLevel}
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-[#00284D] text-white text-[10px] font-bold border border-[#0056A6]">
                    Demand Index: {result.demandSignalScore || 94}/100
                  </span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    {result.extractedRole || result.jobTitle}
                  </h2>
                  <p className="text-xs text-[#E8F1F8]/90 mt-1 leading-relaxed">
                    {result.summaryOfRequirements || result.summary}
                  </p>
                </div>
                <div className="text-xs text-[#F28C28] font-semibold pt-2 border-t border-[#00284D] flex items-center justify-between">
                  <span>Statewide Trade Gap Diagnostic:</span>
                  <span>{result.recommendedCourseGap}</span>
                </div>
              </div>

              {/* Extracted Skills List */}
              <div className="bg-white p-5 rounded-lg border border-[#DDE3E8] shadow-2xs space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-[#003B70] flex items-center justify-between border-b border-[#DDE3E8] pb-2">
                  <span>Extracted Competencies ({result.extractedSkills?.length || 0})</span>
                  <span className="text-[#0056A6] font-semibold">Normalized to NSDC QP</span>
                </div>

                <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                  {(result.extractedSkills || []).map((skill, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded border border-[#DDE3E8] bg-[#F7F8FA] hover:bg-white text-xs transition-colors space-y-1.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-bold text-[#222222]">{skill.skillName}</div>
                          <div className="text-[10px] text-[#666666]">{skill.category}</div>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                            skill.importance === 'CRITICAL'
                              ? 'bg-red-50 text-[#C62828] border border-red-200'
                              : 'bg-[#E8F1F8] text-[#0056A6] border border-[#0056A6]/30'
                          }`}
                        >
                          {skill.importance}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-[#666666] border-t border-[#DDE3E8]/60 pt-1.5">
                        <span>Proficiency: <strong className="text-[#222222]">{skill.proficiencyLevel || skill.proficiency}</strong></span>
                        <span className="font-mono text-stone-400">{skill.mappingCode || skill.matchedMasterSkillId}</span>
                        <span className="text-[#198754] font-semibold">
                          Confidence: {skill.confidenceScore}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Trade Course Alignment Section */}
                {result.matchingCourses && result.matchingCourses.length > 0 && (
                  <div className="pt-3 border-t border-[#DDE3E8] space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#003B70]">
                      Trade Curriculum Alignment Matrix
                    </div>
                    <div className="space-y-2">
                      {result.matchingCourses.slice(0, 3).map((c, i) => (
                        <div key={i} className="p-2.5 rounded bg-[#F7F8FA] border border-[#DDE3E8] text-xs space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-[#222222] truncate">{c.title}</span>
                            <span className={`font-bold px-2 py-0.5 rounded text-[11px] shrink-0 ml-2 ${
                              c.alignmentPercent >= 75
                                ? 'bg-emerald-100 text-[#198754]'
                                : c.alignmentPercent >= 45
                                ? 'bg-amber-100 text-[#D96B1F]'
                                : 'bg-red-100 text-[#C62828]'
                            }`}>
                              {c.alignmentPercent}% Match
                            </span>
                          </div>
                          <div className="w-full bg-[#DDE3E8] h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                c.alignmentPercent >= 75
                                  ? 'bg-[#198754]'
                                  : c.alignmentPercent >= 45
                                  ? 'bg-[#F28C28]'
                                  : 'bg-[#C62828]'
                              }`}
                              style={{ width: `${c.alignmentPercent}%` }}
                            />
                          </div>
                          {c.missingSkills?.length > 0 && (
                            <div className="text-[10px] text-[#666666] truncate">
                              <span className="font-semibold text-[#C62828]">Syllabus Deficit: </span>
                              {c.missingSkills.join(', ')}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Trigger */}
                <div className="pt-3 border-t border-[#DDE3E8] flex items-center justify-between gap-2">
                  <span className="text-[11px] text-[#666666]">
                    Direct access to state curriculum reform tools
                  </span>
                  {onNavigate && (
                    <button
                      onClick={() => onNavigate('public-portal')}
                      className="px-3.5 py-1.5 bg-[#0056A6] hover:bg-[#003B70] text-white rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <Compass className="w-3.5 h-3.5 text-white" />
                      <span>Compare in Public Intelligence</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobAnalyzerPage;
