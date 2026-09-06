import React, { useState, useEffect } from 'react';
import {
  Send,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
} from 'lucide-react';
import { fetchEmployerFeedback, submitEmployerFeedback } from '../lib/api.js';

export const EmployerFeedbackPage = ({ selectedDistrict, onNavigate }) => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successCelebration, setSuccessCelebration] = useState(null);

  // Form State
  const [companyName, setCompanyName] = useState('Tata Motors Passenger Electric Mobility');
  const [industry, setIndustry] = useState('Automotive / EV');
  const [district, setDistrict] = useState(selectedDistrict || 'Pune');
  const [role, setRole] = useState('EV High-Voltage Diagnostics Specialist');
  const [requiredSkills, setRequiredSkills] = useState('800V High-Voltage Safety, BMS CAN-bus Diagnostics, Battery Pack Teardown');
  const [hiringDifficultyScore, setHiringDifficultyScore] = useState(8);
  const [candidateVolumeNeeded, setCandidateVolumeNeeded] = useState(120);
  const [reportedShortages, setReportedShortages] = useState(
    'Candidates lack hands-on experience in 400V/800V electrical isolation interlocks and high-voltage DC bus testing.'
  );
  const [quarter, setQuarter] = useState('Q3 2026');

  useEffect(() => {
    loadFeedback();
  }, []);

  const loadFeedback = () => {
    setLoading(true);
    fetchEmployerFeedback()
      .then(data => {
        setFeedbackList(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const skillsArray = requiredSkills.split(',').map(s => s.trim()).filter(Boolean);
      const shortagesArray = reportedShortages.split('.').map(s => s.trim()).filter(Boolean);

      const res = await submitEmployerFeedback({
        companyName,
        district,
        industry,
        role,
        requiredSkills: skillsArray,
        hiringDifficultyScore,
        reportedShortages: shortagesArray,
        candidateVolumeNeeded,
        quarter,
      });

      setSuccessCelebration(res);
      loadFeedback();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1">
              <RefreshCw className="w-3.5 h-3.5" />
              Continuous Feedback Loop
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Employer Hiring Intelligence &amp; Deficit Feedback Portal
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Industry partners directly feed real-time hiring scarcity data into the Maharashtra State Skill Planning Engine.
          </p>
        </div>

        <button
          onClick={() => onNavigate('gov-dashboard')}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
        >
          <span>View Recalibrated Dashboards</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Success Celebration Alert Modal */}
      {successCelebration && (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white border border-indigo-500/40 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">
                  Continuous Feedback Loop Recalibrated!
                </h3>
                <p className="text-xs text-emerald-400 font-semibold">
                  Feedback from {successCelebration.signal?.companyName} processed and state demand index updated.
                </p>
              </div>
            </div>
            <button
              onClick={() => setSuccessCelebration(null)}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 bg-slate-800 rounded-lg"
            >
              Dismiss
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <div className="text-slate-400">Registered Role</div>
              <div className="font-bold text-white mt-0.5">{successCelebration.signal?.role}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <div className="text-slate-400">Recalibrated District Score</div>
              <div className="font-bold text-rose-400 mt-0.5">{successCelebration.recalculatedDemandScore}/100</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <div className="text-slate-400">Action Plan Status</div>
              <div className="font-bold text-emerald-400 mt-0.5">Policy Alert Queued</div>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Form + Live Feedback Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Form */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">
              Submit Employer Hiring &amp; Skill Gap Signal
            </h2>
            <p className="text-xs text-slate-500">
              Empirical input used to calibrate ITI batch quotas and lab allocations.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Industry Sector</label>
                <select
                  value={industry}
                  onChange={e => setIndustry(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                >
                  <option value="Automotive / EV">Automotive / EV</option>
                  <option value="Precision Engineering">Precision Engineering</option>
                  <option value="Electronics & Power">Electronics &amp; Power</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">District / Hub</label>
                <input
                  type="text"
                  required
                  value={district}
                  onChange={e => setDistrict(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Quarter</label>
                <select
                  value={quarter}
                  onChange={e => setQuarter(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                >
                  <option value="Q3 2026">Q3 2026</option>
                  <option value="Q4 2026">Q4 2026</option>
                  <option value="Q1 2027">Q1 2027</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Job Role In Scarcity</label>
              <input
                type="text"
                required
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Required Competencies (Comma-separated)
              </label>
              <input
                type="text"
                required
                value={requiredSkills}
                onChange={e => setRequiredSkills(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-slate-700">Hiring Difficulty (1-10)</label>
                  <span className="font-bold text-rose-600">{hiringDifficultyScore} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={hiringDifficultyScore}
                  onChange={e => setHiringDifficultyScore(Number(e.target.value))}
                  className="w-full accent-rose-600 cursor-pointer"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Quarterly Hiring Target (Openings)
                </label>
                <input
                  type="number"
                  min="5"
                  max="5000"
                  value={candidateVolumeNeeded}
                  onChange={e => setCandidateVolumeNeeded(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Qualitative Deficits Observed in ITI / Diploma Candidates
              </label>
              <textarea
                rows={3}
                required
                value={reportedShortages}
                onChange={e => setReportedShortages(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
            >
              {submitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-indigo-300" />
                  <span>Submitting to State Planning Engine...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-indigo-300" />
                  <span>Submit Signal &amp; Recalibrate Decision Models</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right: Live Employer Signals Audit Stream */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Live Employer Intelligence Feed ({feedbackList.length})
              </h2>
              <p className="text-xs text-slate-500">
                Audited hiring signals received from Maharashtra industrial zones.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Active Feedback Loop
            </span>
          </div>

          <div className="space-y-3 max-h-[560px] overflow-y-auto pr-1">
            {feedbackList.map(item => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 hover:bg-white transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-bold text-slate-900">{item.companyName}</div>
                    <div className="text-[11px] text-slate-500">
                      {item.role} &middot; {item.district} ({item.quarter})
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 shrink-0">
                    Difficulty: {item.hiringDifficultyScore}/10
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {(item.requiredSkills || []).map((sk, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-white text-slate-700 text-[10px] font-semibold border border-slate-200"
                    >
                      {sk}
                    </span>
                  ))}
                </div>

                <p className="text-[11px] text-slate-600 border-t border-slate-200/60 pt-1.5 italic">
                  &ldquo;{(item.reportedShortages || []).join('. ')}&rdquo;
                </p>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span>Hiring Openings: {item.candidateVolumeNeeded} Vacancies</span>
                  <span className="text-indigo-600 font-semibold">Signal Processed</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerFeedbackPage;
