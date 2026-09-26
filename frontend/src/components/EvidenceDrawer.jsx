import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, CheckCircle2, TrendingUp, AlertTriangle, Building2, Users } from 'lucide-react';

export const EvidenceDrawer = ({ isOpen, onClose, data }) => {
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
            className="w-screen max-w-md md:max-w-lg bg-white shadow-2xl border-l border-[#DDE3E8] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#DDE3E8] bg-[#F7F8FA] flex items-start justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-[#E8F1F8] text-[#0056A6] border border-[#DDE3E8] mb-2">
                  <FileText className="w-3.5 h-3.5 text-[#0056A6]" />
                  Labour Market Evidence Audit
                </div>
                <h3 className="text-lg font-bold text-[#003B70] leading-snug">{data.title}</h3>
                {data.subtitle && (
                  <p className="text-xs text-[#666666] mt-0.5">{data.subtitle}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded text-[#666666] hover:text-[#222222] hover:bg-[#F7F8FA] transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Evidence Metrics Grid */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#666666] mb-3">
                  Underlying Labour Signals & Gap Metrics
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {data.stats.jobPostingCount !== undefined && (
                    <div className="p-3.5 rounded-lg bg-[#F7F8FA] border border-[#DDE3E8]">
                      <div className="flex items-center gap-1.5 text-[#666666] text-xs mb-1">
                        <Users className="w-3.5 h-3.5 text-[#0056A6]" />
                        <span>Active Job Demand</span>
                      </div>
                      <div className="text-xl font-bold text-[#003B70]">
                        {data.stats.jobPostingCount.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-[#666666] mt-0.5">Aggregated Job Postings</div>
                    </div>
                  )}

                  {data.stats.difficultyPercent !== undefined && (
                    <div className="p-3.5 rounded-lg bg-red-50/60 border border-red-200">
                      <div className="flex items-center gap-1.5 text-[#C62828] text-xs mb-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-[#C62828]" />
                        <span>Hiring Difficulty</span>
                      </div>
                      <div className="text-xl font-bold text-[#C62828]">
                        {data.stats.difficultyPercent}%
                      </div>
                      <div className="text-[11px] text-[#C62828] mt-0.5">Employers reporting scarcity</div>
                    </div>
                  )}

                  {data.stats.growthPercent !== undefined && (
                    <div className="p-3.5 rounded-lg bg-emerald-50/60 border border-emerald-200">
                      <div className="flex items-center gap-1.5 text-[#198754] text-xs mb-1">
                        <TrendingUp className="w-3.5 h-3.5 text-[#198754]" />
                        <span>YoY Demand Growth</span>
                      </div>
                      <div className="text-xl font-bold text-[#198754]">
                        +{data.stats.growthPercent}%
                      </div>
                      <div className="text-[11px] text-[#198754] mt-0.5">Annualized hiring surge</div>
                    </div>
                  )}

                  {data.stats.currentCoveragePercent !== undefined && (
                    <div className="p-3.5 rounded-lg bg-[#E8F1F8] border border-[#DDE3E8]">
                      <div className="flex items-center gap-1.5 text-[#0056A6] text-xs mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0056A6]" />
                        <span>Curriculum Coverage</span>
                      </div>
                      <div className="text-xl font-bold text-[#003B70]">
                        {data.stats.currentCoveragePercent}%
                      </div>
                      <div className="text-[11px] text-[#666666] mt-0.5">Practical lab time in ITIs</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Resource Gaps */}
              {(data.stats.trainerGap !== undefined || data.stats.labGap !== undefined) && (
                <div className="p-4 rounded-lg bg-[#003B70] text-white space-y-3 border border-[#00284D]">
                  <div className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                    Institutional Deficit Breakdown
                  </div>
                  <div className="flex items-center justify-between text-sm py-1 border-b border-blue-900/60">
                    <span className="text-blue-100">Certified Trainers Needed:</span>
                    <span className="font-semibold text-[#F28C28]">+{data.stats.trainerGap} Master Instructors</span>
                  </div>
                  <div className="flex items-center justify-between text-sm py-1">
                    <span className="text-blue-100">Lab Equipment Modernization Gap:</span>
                    <span className="font-semibold text-[#F28C28]">{data.stats.labGap}% Infrastructure Deficit</span>
                  </div>
                </div>
              )}

              {/* Verification Context & Breakdown Notes */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#666666] mb-2">
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
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#666666]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F28C28] mt-1.5 shrink-0" />
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Source Systems */}
              <div className="p-3.5 rounded-lg bg-[#F7F8FA] border border-[#DDE3E8]">
                <div className="text-xs font-semibold text-[#222222] mb-1.5 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#0056A6]" />
                  Primary Verifiable Signal Source
                </div>
                <p className="text-xs text-[#666666]">
                  {data.stats.primarySource || 'Tata Motors EV Chakan, Bajaj Auto & Government ITI Training Audit (Q3 2026)'}
                </p>
                <div className="mt-3 flex items-center gap-2 text-[11px] text-[#666666]">
                  <span className="px-2 py-0.5 rounded bg-stone-200/80 text-[#222222] font-mono">
                    NSDC QP: ASC/Q1402
                  </span>
                  <span className="px-2 py-0.5 rounded bg-stone-200/80 text-[#222222] font-mono">
                    ESCO: 3115.7.2
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#DDE3E8] bg-[#F7F8FA] flex items-center justify-between">
              <span className="text-[11px] text-[#666666]">
                Traceable Labour Market Intelligence Record
              </span>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#0056A6] hover:bg-[#003B70] text-white text-xs font-semibold rounded transition-colors cursor-pointer shadow-2xs"
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

export default EvidenceDrawer;
