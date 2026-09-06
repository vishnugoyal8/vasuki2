import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
} from 'lucide-react';
import { fetchRecommendations, updateRecommendationStatus } from '../lib/api.js';
import EvidenceDrawer from '../components/EvidenceDrawer.jsx';

export const RecommendationsPage = ({ selectedDistrict, onNavigate }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Evidence Drawer
  const [evidenceData, setEvidenceData] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    loadRecommendations();
  }, [selectedDistrict, priorityFilter, statusFilter]);

  const loadRecommendations = () => {
    setLoading(true);
    fetchRecommendations({
      district: selectedDistrict,
      priority: priorityFilter === 'ALL' ? undefined : priorityFilter,
      status: statusFilter === 'ALL' ? undefined : statusFilter,
    })
      .then(data => {
        setRecommendations(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateRecommendationStatus(id, newStatus);
      setRecommendations(prev =>
        prev.map(r => (r.recommendationId === id ? { ...r, status: newStatus } : r))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const openWhyDrawer = (rec) => {
    setEvidenceData({
      title: rec.title,
      subtitle: `Target Role: ${rec.role} · Sector: ${rec.sector}`,
      district: rec.district,
      stats: {
        jobPostingCount: rec.evidence?.jobPostingCount,
        difficultyPercent: rec.evidence?.difficultyPercent,
        growthPercent: rec.evidence?.growthPercent,
        currentCoveragePercent: rec.evidence?.currentCoveragePercent,
        trainerGap: rec.evidence?.trainerGap,
        labGap: rec.evidence?.labGap,
        primarySource: rec.evidence?.primarySource,
      },
      breakdownNotes: [
        rec.reason,
        ...(rec.suggestedActions || []).map(a => `Suggested Action: ${a}`),
        `Targeted Vocational Institutes: ${(rec.targetInstitutes || []).join(', ')}`,
      ],
    });
    setIsDrawerOpen(true);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Policy &amp; Action Plan
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Actionable Policy Interventions &middot; {selectedDistrict}
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Data-driven training recommendations, lab equipment allocations, and status workflows for the District Committee.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs">
            <span className="font-semibold text-slate-600">Priority:</span>
            <select
              value={priorityFilter}
              onChange={e => setPriorityFilter(e.target.value)}
              className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Priorities</option>
              <option value="CRITICAL">Critical Only</option>
              <option value="HIGH">High Only</option>
              <option value="MEDIUM">Medium</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs">
            <span className="font-semibold text-slate-600">Status:</span>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING_APPROVAL">Pending Approval</option>
              <option value="APPROVED">Approved</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {recommendations.map(rec => {
          const isCritical = rec.priority === 'CRITICAL';
          const isHigh = rec.priority === 'HIGH';

          return (
            <div
              key={rec.recommendationId}
              className={`p-6 rounded-2xl bg-white border shadow-xs flex flex-col justify-between hover:shadow-md transition-all ${
                isCritical
                  ? 'border-rose-200'
                  : isHigh
                  ? 'border-amber-200'
                  : 'border-slate-200'
              }`}
            >
              <div>
                {/* Priority & Sector Badges */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                        isCritical
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : isHigh
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}
                    >
                      {rec.priority} PRIORITY
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 font-mono">
                      {rec.sector}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {rec.confidenceScore}% Model Confidence
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug mb-2">
                  {rec.title}
                </h3>

                {/* Evidence Callout */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 mb-4">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-slate-700">Root Cause &amp; Evidence:</span>
                    <button
                      onClick={() => openWhyDrawer(rec)}
                      className="text-[11px] font-bold text-indigo-600 hover:text-indigo-900 underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Why this recommendation?</span>
                      <HelpCircle className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-normal">{rec.reason}</p>
                </div>

                {/* Target Institutes & Suggested Actions */}
                <div className="space-y-2 mb-4 text-xs">
                  <div className="font-semibold text-slate-700">Suggested Action Steps:</div>
                  <ul className="space-y-1 text-slate-600 text-[11px]">
                    {(rec.suggestedActions || []).map((action, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs mb-4">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Target Centers</div>
                  <div className="text-xs font-semibold text-slate-800 mt-0.5">
                    {(rec.targetInstitutes || []).join(', ')}
                  </div>
                </div>
              </div>

              {/* Status Workflow Action Toolbar */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-slate-500">Current Status:</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                      rec.status === 'COMPLETED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : rec.status === 'IN_PROGRESS'
                        ? 'bg-blue-100 text-blue-800'
                        : rec.status === 'APPROVED'
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {rec.status ? rec.status.replace('_', ' ') : ''}
                  </span>
                </div>

                {/* Status Switch Buttons */}
                <div className="flex items-center gap-1">
                  {rec.status === 'PENDING_APPROVAL' && (
                    <button
                      onClick={() => handleStatusChange(rec.recommendationId, 'APPROVED')}
                      className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[11px] font-bold transition-colors cursor-pointer"
                    >
                      Approve Policy
                    </button>
                  )}
                  {rec.status === 'APPROVED' && (
                    <button
                      onClick={() => handleStatusChange(rec.recommendationId, 'IN_PROGRESS')}
                      className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-[11px] font-bold transition-colors cursor-pointer"
                    >
                      Mark In Progress
                    </button>
                  )}
                  {rec.status === 'IN_PROGRESS' && (
                    <button
                      onClick={() => handleStatusChange(rec.recommendationId, 'COMPLETED')}
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-bold transition-colors cursor-pointer"
                    >
                      Mark Completed
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Evidence Drawer */}
      <EvidenceDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        data={evidenceData}
      />
    </div>
  );
};

export default RecommendationsPage;
