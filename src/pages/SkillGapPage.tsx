import React, { useState, useEffect } from 'react';
import {
  GitPullRequest,
  Sliders,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Wrench,
  Users,
  Search,
  Filter,
  ArrowRight,
} from 'lucide-react';
import { fetchSkillGaps } from '../lib/api.ts';
import { EvidenceDrawer, EvidenceData } from '../components/EvidenceDrawer.tsx';
import { PageId } from '../components/Navbar.tsx';

interface Props {
  selectedDistrict: string;
  onNavigate: (page: PageId) => void;
}

export const SkillGapPage: React.FC<Props> = ({ selectedDistrict, onNavigate }) => {
  const [thresholds, setThresholds] = useState({
    critical: 80,
    high: 65,
    medium: 45,
  });
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Evidence Drawer state
  const [evidenceData, setEvidenceData] = useState<EvidenceData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchSkillGaps(selectedDistrict, 'Automotive / EV', thresholds)
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [selectedDistrict, thresholds]);

  const categories = [
    'ALL',
    'Safety & Compliance',
    'Diagnostics & Software',
    'Powertrain',
    'Thermal & Mechanical',
    'Precision Manufacturing',
    'Assembly & Wiring',
    'Charging Infrastructure',
  ];

  const filteredGaps = (data?.gaps || []).filter((g: any) => {
    const matchesSearch =
      g.skillName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || g.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openEvidence = (skill: any) => {
    setEvidenceData({
      title: `${skill.skillName} — Skill Gap Analysis`,
      subtitle: `Category: ${skill.category} &middot; Severity: ${skill.severity}`,
      district: selectedDistrict,
      demandScore: skill.demandScore,
      stats: {
        jobPostingCount: Math.round(skill.demandScore * 14.5),
        difficultyPercent: Math.round(skill.gapScore * 0.9),
        growthPercent: skill.growthRate,
        currentCoveragePercent: skill.availableCoveragePercent,
        trainerGap: skill.trainerGap,
        labGap: skill.labReadinessGap,
        primarySource: 'Industry Survey & Vocational Training Readiness Audit',
      },
      breakdownNotes: [
        `Net Calculated Skill Gap: ${skill.gapScore} points (Demand ${skill.demandScore} vs Available ITI Coverage ${skill.availableCoveragePercent}%).`,
        `Trainer Deficit: ${skill.trainerGap} certified master instructors required in ${selectedDistrict} ITIs.`,
        `Lab Infrastructure Readiness Gap: ${skill.labReadinessGap}% equipment deficit identified.`,
      ],
    });
    setIsDrawerOpen(true);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header & Configurable Thresholds Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Gap Matrix
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Skill Gap &amp; Severity Analysis &middot; {selectedDistrict}
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Empirical calculation comparing employer demand requirements vs. vocational training coverage.
          </p>
        </div>

        {/* Action button */}
        <button
          onClick={() => onNavigate('recommendations')}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
        >
          <span>View Recommended Policy Interventions</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Interactive Threshold Configuration Panel */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-lg">
        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Configurable Gap Severity Thresholds
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            Adjusting thresholds dynamically recalculates policy urgency flags across all 10 views
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          {/* Critical Slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-rose-400">CRITICAL Gap Threshold:</span>
              <span className="font-mono font-bold bg-rose-950/80 text-rose-300 px-2 py-0.5 rounded">
                &ge; {thresholds.critical} pts
              </span>
            </div>
            <input
              type="range"
              min="70"
              max="95"
              value={thresholds.critical}
              onChange={e => setThresholds({ ...thresholds, critical: Number(e.target.value) })}
              className="w-full accent-rose-500 cursor-pointer"
            />
            <div className="text-[10px] text-slate-400">Triggers mandatory cabinet budget allocation</div>
          </div>

          {/* High Slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-amber-400">HIGH Gap Threshold:</span>
              <span className="font-mono font-bold bg-amber-950/80 text-amber-300 px-2 py-0.5 rounded">
                &ge; {thresholds.high} pts
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="75"
              value={thresholds.high}
              onChange={e => setThresholds({ ...thresholds, high: Number(e.target.value) })}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="text-[10px] text-slate-400">Queues vocational trainer upskilling &amp; syllabus update</div>
          </div>

          {/* Medium Slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-blue-400">MEDIUM Gap Threshold:</span>
              <span className="font-mono font-bold bg-blue-950/80 text-blue-300 px-2 py-0.5 rounded">
                &ge; {thresholds.medium} pts
              </span>
            </div>
            <input
              type="range"
              min="30"
              max="55"
              value={thresholds.medium}
              onChange={e => setThresholds({ ...thresholds, medium: Number(e.target.value) })}
              className="w-full accent-blue-500 cursor-pointer"
            />
            <div className="text-[10px] text-slate-400">Monitored for future batch curriculum adjustments</div>
          </div>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search competencies (e.g., BMS, 800V, CNC, CAN)..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 bg-slate-50"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skill Gaps Matrix Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGaps.map((skill: any) => {
          const isCritical = skill.severity === 'CRITICAL';
          const isHigh = skill.severity === 'HIGH';
          const isMedium = skill.severity === 'MEDIUM';

          return (
            <div
              key={skill.skillId}
              className={`p-5 rounded-2xl bg-white border shadow-xs flex flex-col justify-between hover:shadow-md transition-all ${
                isCritical
                  ? 'border-rose-200 hover:border-rose-400'
                  : isHigh
                  ? 'border-amber-200 hover:border-amber-400'
                  : 'border-slate-200 hover:border-indigo-300'
              }`}
            >
              <div>
                {/* Badge Header */}
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    {skill.category}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                      isCritical
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : isHigh
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : isMedium
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}
                  >
                    {skill.severity} GAP
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm leading-snug mb-3">
                  {skill.skillName}
                </h3>

                {/* Progress bar comparison */}
                <div className="space-y-2 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-600 mb-1">
                      <span>Employer Demand Index:</span>
                      <strong className="text-slate-900">{skill.demandScore}/100</strong>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-slate-900 h-full rounded-full" style={{ width: `${skill.demandScore}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-600 mb-1">
                      <span>Available ITI Lab Coverage:</span>
                      <strong className="text-amber-700">{skill.availableCoveragePercent}%</strong>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          skill.availableCoveragePercent < 30 ? 'bg-rose-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${skill.availableCoveragePercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Deficit metrics */}
                <div className="grid grid-cols-2 gap-2 text-[11px] mb-4">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <div>
                      <div className="text-slate-400 text-[10px]">Trainer Deficit</div>
                      <div className="font-bold text-slate-800">+{skill.trainerGap} Certified</div>
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <div>
                      <div className="text-slate-400 text-[10px]">Lab Deficit</div>
                      <div className="font-bold text-slate-800">{skill.labReadinessGap}% Gap</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-mono">
                  {skill.nsdcQpCode || 'NSDC: ASC/Q1402'}
                </span>
                <button
                  onClick={() => openEvidence(skill)}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-900 underline cursor-pointer"
                >
                  Inspect Evidence &rarr;
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Evidence Drawer Component */}
      <EvidenceDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        data={evidenceData}
      />
    </div>
  );
};
