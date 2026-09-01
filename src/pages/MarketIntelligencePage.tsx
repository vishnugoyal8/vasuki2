import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import {
  TrendingUp,
  Award,
  AlertCircle,
  CheckCircle2,
  Building,
  Briefcase,
  Layers,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { DemandGauge } from '../components/DemandGauge.tsx';
import { EvidenceDrawer, EvidenceData } from '../components/EvidenceDrawer.tsx';
import { fetchMarketIntelligence } from '../lib/api.ts';
import { PageId } from '../components/Navbar.tsx';

interface Props {
  selectedDistrict: string;
  onNavigate: (page: PageId) => void;
}

export const MarketIntelligencePage: React.FC<Props> = ({ selectedDistrict, onNavigate }) => {
  const [activeRole, setActiveRole] = useState('EV Technician');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Evidence Drawer state
  const [evidenceData, setEvidenceData] = useState<EvidenceData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const availableRoles = [
    'EV Technician',
    'Battery Assembly & Diagnostics Specialist',
    'CNC Machine Operator & Programmer',
    'Automotive Wiring Harness Tech',
  ];

  useEffect(() => {
    setLoading(true);
    fetchMarketIntelligence(activeRole, selectedDistrict)
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [activeRole, selectedDistrict]);

  const openEvidenceDrawer = () => {
    if (!data) return;
    setEvidenceData({
      title: `${activeRole} Demand Score Evidence Audit`,
      subtitle: `${selectedDistrict} District &middot; Labour Demand Index: ${data.demandScore}/100`,
      role: activeRole,
      district: selectedDistrict,
      demandScore: data.demandScore,
      stats: {
        jobPostingCount: data.evidence.jobPostingCount,
        difficultyPercent: data.evidence.difficultyPercent,
        growthPercent: data.evidence.yoyGrowthPercent,
        currentCoveragePercent: data.evidence.curriculumCoveragePercent,
        trainerGap: 6,
        labGap: 65,
        primarySource: 'Tata Motors TPEML, Bajaj Chetak & Mahaswayam Demand Aggregator',
      },
      breakdownNotes: [
        '1,480 aggregated active job signals verified across Chakan MIDC, Bhosari & Talegaon auto clusters.',
        '78% of interviewed OEMs report extreme shortage in certified 400V/800V high-voltage technicians.',
        'Current DGT trade syllabus allocates only 25% hands-on practical lab time for isolation interlocks.',
      ],
    });
    setIsDrawerOpen(true);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Header & Role Selector Tabs */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Role Deep Dive
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Market Intelligence &middot; {activeRole}
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Empirical demand score, underlying evidence verification, and ranked competency gaps.
          </p>
        </div>

        {/* Role Switcher Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
          {availableRoles.map(role => (
            <button
              key={role}
              onClick={() => setActiveRole(role)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeRole === role
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Demand Score Radial Gauge + Evidence Summary + Wage Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Gauge + Clickable Evidence Callout */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center justify-between text-center">
          <div className="w-full text-left border-b border-slate-100 pb-3 mb-2 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Composite Demand Index
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
              Severity: Critical
            </span>
          </div>

          <div className="my-2">
            <DemandGauge
              score={data?.demandScore || 94}
              size={170}
              strokeWidth={14}
              label={`${activeRole}`}
              sublabel={`District: ${selectedDistrict}`}
              showEvidenceButton={true}
              onEvidenceClick={openEvidenceDrawer}
            />
          </div>

          <div className="w-full bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-left text-xs space-y-1.5 mt-2">
            <div className="flex items-center justify-between text-slate-600">
              <span>Active Job Postings:</span>
              <strong className="text-slate-900">1,480+ Vacancies</strong>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Employer Scarcity Rate:</span>
              <strong className="text-rose-600">78% Difficulty</strong>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>YoY Demand Surge:</span>
              <strong className="text-emerald-600">+48.5% Growth</strong>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Curriculum Practical Time:</span>
              <strong className="text-amber-600">Only 42% Covered</strong>
            </div>
          </div>
        </div>

        {/* Right: Key Labour Market Stats & Wage Trend */}
        <div className="lg:col-span-8 space-y-6">
          {/* 3 Evidence Highlights Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-1">
                <Briefcase className="w-4 h-4 text-indigo-600" />
                <span>Salary Compensation</span>
              </div>
              <div className="text-xl font-bold text-slate-900">₹3.2 - 5.0 LPA</div>
              <div className="text-[11px] text-slate-500 mt-1">Average entry-to-mid wage</div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-1">
                <Building className="w-4 h-4 text-blue-600" />
                <span>Top MIDC Clusters</span>
              </div>
              <div className="text-sm font-bold text-slate-900">Chakan Phase II (64%)</div>
              <div className="text-[11px] text-slate-500 mt-1">Followed by Bhosari (22%)</div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-1">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Primary Recruiters</span>
              </div>
              <div className="text-sm font-bold text-slate-900">Tata Motors, Bajaj, KPIT</div>
              <div className="text-[11px] text-slate-500 mt-1">Over 80% market share</div>
            </div>
          </div>

          {/* Wage & Hiring Demand Trend Over Time */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Salary Benchmark &amp; Demand Trajectory (2025-2026)
                </h3>
                <p className="text-xs text-slate-500">
                  Quarterly wage index trend reflecting high-voltage technician scarcity.
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                +35% Wage Appreciation
              </span>
            </div>

            <div className="h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data?.wageTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="quarter" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    tickFormatter={val => `₹${(val / 100000).toFixed(1)}L`}
                  />
                  <Tooltip
                    formatter={(val: any) => [`₹${Number(val).toLocaleString()} / yr`, 'Avg Salary']}
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      color: '#fff',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="avgSalary"
                    stroke="#4f46e5"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#4f46e5' }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Top Ranked Skill Gaps Table for this Role */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              Ranked Competencies &amp; Curriculum Deficit ({activeRole})
            </h3>
            <p className="text-xs text-slate-500">
              Granular breakdown of industry required skills vs ITI practical lab coverage.
            </p>
          </div>
          <button
            onClick={() => onNavigate('course-alignment')}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Open Side-by-Side Course Alignment</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">Skill / Competency</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-center">Industry Demand</th>
                <th className="py-3 px-4 text-center">ITI Practical %</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(data?.skillDemandRanked || []).map((skill: any) => (
                <tr key={skill.skillId} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{skill.skillName}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      ID: {skill.skillId}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{skill.category}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="font-black text-slate-900 text-sm">
                      {skill.demandScore}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold block">
                      +{skill.growthRate}% YoY
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="w-24 mx-auto bg-slate-200 rounded-full h-2 overflow-hidden mb-1">
                      <div
                        className={`h-full rounded-full ${
                          skill.practicalRatio < 30
                            ? 'bg-rose-500'
                            : skill.practicalRatio < 60
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                        }`}
                        style={{ width: `${skill.practicalRatio}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-700">
                      {skill.practicalRatio}% Lab Ratio
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        skill.coverageStatus === 'NOT_COVERED'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : skill.coverageStatus === 'PARTIAL'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {skill.coverageStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={openEvidenceDrawer}
                      className="text-[11px] font-bold text-indigo-600 hover:text-indigo-900 underline cursor-pointer"
                    >
                      Audit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
