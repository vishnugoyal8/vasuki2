import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, FileText, CheckCircle2, TrendingUp, AlertTriangle, Building2, Users } from 'lucide-react';

export interface EvidenceData {
  title: string;
  subtitle?: string;
  role?: string;
  district?: string;
  demandScore?: number;
  stats: {
    jobPostingCount?: number;
    difficultyPercent?: number;
    growthPercent?: number;
    currentCoveragePercent?: number;
    trainerGap?: number;
    labGap?: number;
    primarySource?: string;
  };
  breakdownNotes?: string[];
  sources?: string[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: EvidenceData | null;
}

export const EvidenceDrawer: React.FC<Props> = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="w-screen max-w-md md:max-w-lg bg-white shadow-2xl border-l border-slate-200 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-start justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
                  <FileText className="w-3.5 h-3.5" />
                  Labour Market Evidence Audit
                </div>
                <h3 className="text-lg font-bold text-slate-900 leading-snug">{data.title}</h3>
                {data.subtitle && (
                  <p className="text-xs text-slate-500 mt-0.5">{data.subtitle}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Evidence Metrics Grid */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Underlying Labour Signals & Gap Metrics
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {data.stats.jobPostingCount !== undefined && (
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                        <Users className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Active Job Demand</span>
                      </div>
                      <div className="text-xl font-bold text-slate-900">
                        {data.stats.jobPostingCount.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Aggregated Job Postings</div>
                    </div>
                  )}

                  {data.stats.difficultyPercent !== undefined && (
                    <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200">
                      <div className="flex items-center gap-1.5 text-rose-700 text-xs mb-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                        <span>Hiring Difficulty</span>
                      </div>
                      <div className="text-xl font-bold text-rose-800">
                        {data.stats.difficultyPercent}%
                      </div>
                      <div className="text-[11px] text-rose-600 mt-0.5">Employers reporting scarcity</div>
                    </div>
                  )}

                  {data.stats.growthPercent !== undefined && (
                    <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200">
                      <div className="flex items-center gap-1.5 text-emerald-700 text-xs mb-1">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                        <span>YoY Demand Growth</span>
                      </div>
                      <div className="text-xl font-bold text-emerald-800">
                        +{data.stats.growthPercent}%
                      </div>
                      <div className="text-[11px] text-emerald-600 mt-0.5">Annualized hiring surge</div>
                    </div>
                  )}

                  {data.stats.currentCoveragePercent !== undefined && (
                    <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200">
                      <div className="flex items-center gap-1.5 text-amber-700 text-xs mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                        <span>Curriculum Coverage</span>
                      </div>
                      <div className="text-xl font-bold text-amber-800">
                        {data.stats.currentCoveragePercent}%
                      </div>
                      <div className="text-[11px] text-amber-700 mt-0.5">Practical lab time in ITIs</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Resource Gaps */}
              {(data.stats.trainerGap !== undefined || data.stats.labGap !== undefined) && (
                <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Institutional Deficit Breakdown
                  </div>
                  <div className="flex items-center justify-between text-sm py-1 border-b border-slate-800">
                    <span className="text-slate-300">Certified Trainers Needed:</span>
                    <span className="font-semibold text-rose-400">+{data.stats.trainerGap} Master Instructors</span>
                  </div>
                  <div className="flex items-center justify-between text-sm py-1">
                    <span className="text-slate-300">Lab Equipment Modernization Gap:</span>
                    <span className="font-semibold text-amber-400">{data.stats.labGap}% Infrastructure Deficit</span>
                  </div>
                </div>
              )}

              {/* Verification Context & Breakdown Notes */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Evidence Notes & Observations
                </h4>
                <div className="space-y-2.5">
                  {(data.breakdownNotes && data.breakdownNotes.length > 0
                    ? data.breakdownNotes
                    : [
                        'Primary data sourced from Mahaswayam Employment Exchange, NCS, and direct Chakan MIDC employer feedback surveys.',
                        'Industry demands practical hands-on proficiency in 400V/800V safety protocols and lithium BMS diagnostics.',
                        'Syllabus gap traced to DGT 2022 curriculum standard which lacks active liquid cooling test benches.',
                      ]
                  ).map((note, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Source Systems */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  Primary Verifiable Signal Source
                </div>
                <p className="text-xs text-slate-600">
                  {data.stats.primarySource || 'Tata Motors EV Chakan, Bajaj Auto & Government ITI Training Audit (Q3 2026)'}
                </p>
                <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-slate-200/80 text-slate-700 font-mono">
                    NSDC QP: ASC/Q1402
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-200/80 text-slate-700 font-mono">
                    ESCO: 3115.7.2
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Traceable SIH Labour Intelligence Record
              </span>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Close Audit View
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
