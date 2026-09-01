import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Building,
  Layers,
  Cpu,
  RefreshCw,
  Zap,
} from 'lucide-react';
import { analyzeJobDescription } from '../lib/api.ts';
import { PageId } from '../components/Navbar.tsx';

interface Props {
  selectedDistrict: string;
  onNavigate: (page: PageId) => void;
}

const SAMPLE_JOB_DESCRIPTIONS = [
  {
    title: 'Tata Motors EV Powertrain Diagnostics (Chakan)',
    company: 'Tata Passenger Electric Mobility Ltd',
    text: `Job Title: Senior EV Powertrain & High-Voltage Diagnostics Specialist
Location: Tata Motors Plant, Chakan MIDC, Pune, Maharashtra
Experience: 2-4 Years | Education: ITI / Diploma in Automobile / Electrical Engineering

Key Responsibilities:
- Perform hands-on safety disconnection, lock-out/tag-out (LOTO), and insulation resistance testing on 400V and 800V high-voltage permanent magnet synchronous motor (PMSM) drive systems.
- Conduct live battery pack cell balancing, state-of-health (SOH), and state-of-charge (SOC) diagnostics using CANoe and PCAN diagnostic analyzers.
- Trace CAN-FD and LIN communication bus glitches, interlock failure codes, and thermal runaway precursor signals.
- Execute preventative testing on onboard charger (OBC) AC/DC rectifiers and DC-DC 12V buck converter modules under simulated load.

Required Qualifications & Competencies:
1. Mandatory hands-on certification in High-Voltage EV Safety (NFPA 70E / ISO 6469 / AIS 038).
2. Proven proficiency in Battery Management System (BMS) parameter analysis and fault diagnosis.
3. Expertise with digital storage oscilloscopes, insulation testers (>1000V Fluke), and thermal imaging cameras.`,
  },
  {
    title: 'Bajaj Auto BMS & Battery Assembly Specialist (Akurdi)',
    company: 'Bajaj Auto Ltd (Chetak EV Hub)',
    text: `Job Title: Battery Assembly & Pack Quality Inspector
Location: Akurdi, Pune, Maharashtra
Shift: General | Qualification: ITI Motor Mechanic / Electrician

Roles & Responsibilities:
- Assemble NMC and LFP cylindrical lithium-ion battery modules adhering to precision laser spot welding tolerances.
- Validate contact resistance, cell voltage consistency, and active liquid cooling tube hermetic seal testing.
- Program and flash BMS microcontrollers with firmware updates and calibrate current shunt sensors.
- Ensure strict compliance with Maharashtra State Fire & Electrical Safety norms during pack teardown.`,
  },
  {
    title: 'Bharat Forge 5-Axis CNC Precision Machinist (Mundhwa)',
    company: 'Bharat Forge Ltd',
    text: `Job Title: 5-Axis CNC Machine Setter & CAM Programmer
Location: Mundhwa, Pune
Experience: 2-5 Years | Trade: ITI Machinist / Turner / CNC

Job Profile:
- Set up and operate DMG Mori 5-Axis CNC machining centers for precision EV motor stator housings and aerospace turbine discs.
- Generate and optimize ISO G-Code / M-Code toolpaths using Mastercam and Siemens NX CAM.
- Conduct Coordinate Measuring Machine (CMM) dimensional verification to achieve ±5 micron geometric tolerances.
- Implement cutting tool wear offsets, coolant concentration monitoring, and lean 5S shop-floor maintenance.`,
  },
];

export const JobAnalyzerPage: React.FC<Props> = ({ selectedDistrict, onNavigate }) => {
  const [jobText, setJobText] = useState(SAMPLE_JOB_DESCRIPTIONS[0].text);
  const [selectedSampleIdx, setSelectedSampleIdx] = useState<number>(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSelectSample = (index: number) => {
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
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to extract competencies from job description.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Gemini 3.7 Flash Engine
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              AI Job Description Skill Extractor &amp; Course Gap Engine
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Extracts industry competencies from unstructured employer job postings and matches against Maharashtra trade curricula.
          </p>
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
          <Cpu className="w-4 h-4 text-indigo-600" />
          <span>Server-Side @google/genai &middot; Secure Architecture</span>
        </div>
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Textarea & Sample Presets */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                1. Select a Sample Industrial Post or Paste Any Job Description
              </span>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap gap-2">
              {SAMPLE_JOB_DESCRIPTIONS.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectSample(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left ${
                    selectedSampleIdx === idx
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {sample.title}
                </button>
              ))}
            </div>

            {/* Textarea */}
            <div>
              <textarea
                rows={12}
                value={jobText}
                onChange={e => setJobText(e.target.value)}
                placeholder="Paste any job description, requirement document, or employer RFQ here..."
                className="w-full p-4 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
              />
            </div>

            {/* Analyze Button */}
            <button
              onClick={handleAnalyze}
              disabled={analyzing || !jobText.trim()}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              {analyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-indigo-300" />
                  <span>Analyzing with Gemini 3.7 Flash...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>Extract Skills &amp; Calculate Course Gap</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Structured AI Extraction & Gap Results */}
        <div className="lg:col-span-6 space-y-4">
          {error && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong>Analysis Warning:</strong> {error}
              </div>
            </div>
          )}

          {!result && !analyzing && (
            <div className="bg-slate-50 p-10 rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center h-[480px]">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm">Awaiting Job Description</h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                Click &ldquo;Extract Skills &amp; Calculate Course Gap&rdquo; to parse competencies, proficiency levels, and course alignment with Gemini.
              </p>
            </div>
          )}

          {analyzing && (
            <div className="bg-white p-10 rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-center h-[480px]">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <RefreshCw className="w-6 h-6 animate-spin" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                Parsing Industrial Semantics...
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mt-1">
                Mapping unstructured requirements to ESCO/NSDC vocational standards and estimating ITI trade deficits.
              </p>
            </div>
          )}

          {result && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-5">
              {/* Summary Card */}
              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-indigo-300 font-semibold">
                    {result.industry} &middot; {result.seniorityLevel} Level
                  </span>
                  <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold">
                    Demand Index: {result.demandSignalScore}/100
                  </span>
                </div>
                <h2 className="text-lg font-bold text-white">{result.extractedRole}</h2>
                <p className="text-xs text-slate-300">{result.summaryOfRequirements}</p>
                <div className="text-[11px] text-amber-400 font-semibold pt-1 border-t border-slate-800">
                  Calculated Curricular Gap: {result.recommendedCourseGap}
                </div>
              </div>

              {/* Extracted Skills List */}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                  <span>Extracted Competencies ({result.extractedSkills?.length || 0})</span>
                  <span className="text-indigo-600 font-semibold">Normalized to NSDC QP</span>
                </div>

                <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
                  {(result.extractedSkills || []).map((skill: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex flex-col justify-between gap-1.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-bold text-slate-900">{skill.skillName}</div>
                          <div className="text-[10px] text-slate-400">{skill.category}</div>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${
                            skill.importance === 'CRITICAL'
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                          }`}
                        >
                          {skill.importance}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-200/60 pt-1.5">
                        <span>Proficiency: <strong className="text-slate-700">{skill.proficiencyLevel}</strong></span>
                        <span className="font-mono text-slate-400">{skill.mappingCode}</span>
                        <span className="text-emerald-600 font-semibold">
                          Confidence: {skill.confidenceScore}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action trigger */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Ready to link this extraction to Pune training institutes?
                </span>
                <button
                  onClick={() => onNavigate('course-alignment')}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Compare Course Syllabi</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
