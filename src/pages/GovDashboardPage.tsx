import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import {
  AlertTriangle,
  BookOpen,
  Users,
  Wrench,
  TrendingUp,
  Award,
  Filter,
  ArrowUpRight,
  Sparkles,
  Info,
} from 'lucide-react';
import { MaharashtraMap } from '../components/MaharashtraMap.tsx';
import { EvidenceDrawer, EvidenceData } from '../components/EvidenceDrawer.tsx';
import { fetchStats } from '../lib/api.ts';
import { PageId } from '../components/Navbar.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';

interface Props {
  selectedDistrict: string;
  onSelectDistrict: (district: string) => void;
  onNavigate: (page: PageId) => void;
}

export const GovDashboardPage: React.FC<Props> = ({
  selectedDistrict,
  onSelectDistrict,
  onNavigate,
}) => {
  const { t } = useLanguage();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedIndustry, setSelectedIndustry] = useState('Automotive / EV');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [selectedTimeframe, setSelectedTimeframe] = useState('Q3 2026');

  // Evidence Drawer state
  const [evidenceData, setEvidenceData] = useState<EvidenceData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchStats(selectedDistrict)
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [selectedDistrict]);

  const demandTrendsData = [
    { month: 'Apr 26', hvSafety: 68, bmsDiag: 60, cnc5Axis: 55, canBus: 50 },
    { month: 'May 26', hvSafety: 74, bmsDiag: 68, cnc5Axis: 58, canBus: 55 },
    { month: 'Jun 26', hvSafety: 82, bmsDiag: 76, cnc5Axis: 62, canBus: 60 },
    { month: 'Jul 26', hvSafety: 88, bmsDiag: 84, cnc5Axis: 68, canBus: 65 },
    { month: 'Aug 26', hvSafety: 94, bmsDiag: 91, cnc5Axis: 72, canBus: 70 },
  ];

  const supplyDemandData = [
    { role: 'EV Technician', industryDemand: 1480, itiPassouts: 620, deficit: 860 },
    { role: 'Battery Specialist', industryDemand: 890, itiPassouts: 240, deficit: 650 },
    { role: '5-Axis CNC Operator', industryDemand: 650, itiPassouts: 380, deficit: 270 },
    { role: 'Wiring Harness Tech', industryDemand: 520, itiPassouts: 310, deficit: 210 },
    { role: 'EV Charger Tech', industryDemand: 410, itiPassouts: 190, deficit: 220 },
  ];

  const openEvidence = (title: string, customStats: any) => {
    setEvidenceData({
      title,
      subtitle: `${selectedDistrict} District &middot; ${selectedIndustry}`,
      stats: customStats,
      breakdownNotes: [
        'Aggregated from Mahaswayam portal, NCS, and direct quarterly Chakan MIDC employer feedback surveys.',
        'Verified against 2022 DGT syllabus inventory and vocational instructor readiness audits.',
        'Traceable directly to SIH Maharashtra Labour Market Pilot database.',
      ],
    });
    setIsDrawerOpen(true);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {t.govDashboardTitle} &middot; {selectedDistrict}
            </h1>
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              {t.liveSignals}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t.govDashboardSubtitle}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-600">{t.filterSector}:</span>
            <select
              value={selectedIndustry}
              onChange={e => setSelectedIndustry(e.target.value)}
              className="bg-transparent font-semibold text-slate-900 focus:outline-none cursor-pointer"
            >
              <option value="Automotive / EV">Automotive &amp; EV</option>
              <option value="Precision Engineering">Precision Engineering</option>
              <option value="Electronics & Power">Electronics &amp; Power</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs">
            <span className="font-semibold text-slate-600">{t.filterTimeframe}:</span>
            <select
              value={selectedTimeframe}
              onChange={e => setSelectedTimeframe(e.target.value)}
              className="bg-transparent font-semibold text-slate-900 focus:outline-none cursor-pointer"
            >
              <option value="Q3 2026">Q3 2026</option>
              <option value="Q2 2026">Q2 2026</option>
              <option value="Annual 2025-26">Annual 2025-26</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid with Evidence Traces */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Critical Skill Gaps */}
        <div
          onClick={() =>
            openEvidence('Critical Skill Gaps Audit', {
              jobPostingCount: stats?.totalActiveJobSignals || 1480,
              difficultyPercent: 78,
              growthPercent: 48.5,
              currentCoveragePercent: 42,
              trainerGap: stats?.trainersDeficitCount || 8,
              labGap: 70,
              primarySource: 'Chakan MIDC Employer Feedback & Mahaswayam Postings',
            })
          }
          className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-red-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {t.criticalSkillGaps}
            </span>
            <div className="p-2 rounded-lg bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">
              {loading ? '...' : stats?.criticalSkillGaps || 8}
            </span>
            <span className="text-xs font-semibold text-red-600">{t.urgentIntervention}</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center justify-between border-t border-slate-100 pt-2">
            <span>High Voltage &amp; BMS</span>
            <span className="text-blue-600 font-semibold flex items-center gap-0.5 group-hover:underline">
              {t.viewEvidence} <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Card 2: Courses Needing Syllabus Update */}
        <div
          onClick={() =>
            openEvidence('Curriculum Update Deficit Audit', {
              currentCoveragePercent: 42,
              growthPercent: 52.0,
              difficultyPercent: 72,
              primarySource: 'DGT 2022 Mechanic EV Syllabus vs 800V Architecture Requirements',
            })
          }
          className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-amber-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {t.coursesNeedingUpdate}
            </span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">
              {loading ? '...' : stats?.coursesNeedingUpdate || 3}
            </span>
            <span className="text-xs font-semibold text-amber-600">Trade Curricula</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center justify-between border-t border-slate-100 pt-2">
            <span>Last revised &gt; 2 years ago</span>
            <span className="text-blue-600 font-semibold flex items-center gap-0.5 group-hover:underline">
              {t.viewEvidence} <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Card 3: Trainer Shortage */}
        <div
          onClick={() =>
            openEvidence('Vocational Instructor Shortage Audit', {
              trainerGap: stats?.trainersDeficitCount || 8,
              difficultyPercent: 82,
              currentCoveragePercent: 55,
              primarySource: 'Maharashtra Directorate of Vocational Education & Training (DVET)',
            })
          }
          className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {t.trainerShortage}
            </span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">
              {loading ? '...' : `${stats?.avgTrainerShortagePercent || 34.5}%`}
            </span>
            <span className="text-xs font-semibold text-blue-600">
              +{stats?.trainersDeficitCount || 8} Needed
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center justify-between border-t border-slate-100 pt-2">
            <span>Requires ARAI certification</span>
            <span className="text-blue-600 font-semibold flex items-center gap-0.5 group-hover:underline">
              {t.viewEvidence} <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Card 4: Equipment & Lab Deficit */}
        <div
          onClick={() =>
            openEvidence('Lab Equipment Modernization Gap Audit', {
              labGap: 75,
              difficultyPercent: 78,
              primarySource: 'Govt ITI Aundh, Pimpri & Ghole Road Lab Inspection',
            })
          }
          className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {t.labEquipmentReadiness}
            </span>
            <div className="p-2 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Wrench className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">
              {loading ? '...' : `${stats?.avgLabReadinessScore || 68}%`}
            </span>
            <span className="text-xs font-semibold text-blue-600">32% Deficit</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center justify-between border-t border-slate-100 pt-2">
            <span>Simulators &amp; PPE required</span>
            <span className="text-blue-600 font-semibold flex items-center gap-0.5 group-hover:underline">
              {t.viewEvidence} <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      {/* Main Interactive Map & Demand Trends Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Maharashtra Map */}
        <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-bold text-slate-900 text-sm sm:text-base">
                {t.interactiveMapTitle}
              </h2>
              <p className="text-xs text-slate-500">
                {t.interactiveMapSubtitle}
              </p>
            </div>
            <span className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-700 rounded">
              {t.activeFilter}: {selectedDistrict}
            </span>
          </div>

          <MaharashtraMap
            selectedDistrict={selectedDistrict}
            onSelectDistrict={onSelectDistrict}
          />
        </div>

        {/* Skill Demand Trend Chart (Recharts) */}
        <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-slate-900 text-sm sm:text-base">
                {t.skillDemandTrendTitle}
              </h2>
              <p className="text-xs text-slate-500">
                {t.skillDemandTrendSubtitle}
              </p>
            </div>
            <button
              onClick={() => onNavigate('market-intelligence')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              <span>{t.viewRoleDrillDown}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={demandTrendsData}>
                <defs>
                  <linearGradient id="colorHv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorBms" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorCnc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} domain={[40, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    color: '#fff',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Area
                  type="monotone"
                  dataKey="hvSafety"
                  name="High Voltage Isolation (400V/800V)"
                  stroke="#ef4444"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorHv)"
                />
                <Area
                  type="monotone"
                  dataKey="bmsDiag"
                  name="BMS & Battery Testing"
                  stroke="#f59e0b"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorBms)"
                />
                <Area
                  type="monotone"
                  dataKey="cnc5Axis"
                  name="5-Axis CNC Precision"
                  stroke="#2563eb"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorCnc)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Supply vs Demand Deficit Bar Chart */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="font-bold text-slate-900 text-sm sm:text-base">
              {t.supplyVsDemandTitle}
            </h2>
            <p className="text-xs text-slate-500">
              {t.supplyVsDemandSubtitle}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('district-plan')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              {t.navDistrictPlan}
            </button>
            <button
              onClick={() => onNavigate('recommendations')}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-sm"
            >
              {t.viewPolicyInterventions}
            </button>
          </div>
        </div>

        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={supplyDemandData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="role" tick={{ fontSize: 11, fill: '#334155' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  color: '#fff',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              <Bar dataKey="industryDemand" name="Industry Demand Postings" fill="#0f172a" radius={[4, 4, 0, 0]} />
              <Bar dataKey="itiPassouts" name="Current ITI Annual Supply" fill="#2563eb" radius={[4, 4, 0, 0]} />
              <Bar dataKey="deficit" name="Net Supply Deficit" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
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
