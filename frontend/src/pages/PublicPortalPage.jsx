import React, { useState } from 'react';
import {
  Compass,
  Briefcase,
  Layers,
  GraduationCap,
  TrendingUp,
  MapPin,
  Lock,
  ArrowRight,
  Search,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import {
  PUBLIC_JOB_ROLES,
  IN_DEMAND_SKILLS,
  VOCATIONAL_COURSES,
  INDUSTRY_SECTOR_TRENDS,
  DISTRICT_DEMAND_OVERVIEW,
} from '../data/mockData.js';
import { GovAreaChart } from '../components/charts/GovAreaChart.jsx';
import { GovBarChart } from '../components/charts/GovBarChart.jsx';
import { StatusBadge } from '../components/common/StatusBadge.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export const PublicPortalPage = ({ onNavigate }) => {
  const { openLoginModal } = useAuth();
  const [activeTab, setActiveTab] = useState('jobs');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');

  const tabs = [
    { id: 'jobs', label: 'High-Demand Job Roles', icon: Briefcase, count: PUBLIC_JOB_ROLES.length },
    { id: 'skills', label: 'In-Demand Skills Taxonomy', icon: Layers, count: IN_DEMAND_SKILLS.length },
    { id: 'courses', label: 'Course & Career Pathways', icon: GraduationCap, count: VOCATIONAL_COURSES.length },
    { id: 'trends', label: 'Industry Sector Trends', icon: TrendingUp },
    { id: 'districts', label: 'District-Wise Demand', icon: MapPin, count: DISTRICT_DEMAND_OVERVIEW.length },
  ];

  const filteredJobs = PUBLIC_JOB_ROLES.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.keySkills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSector = selectedSector === 'All' || job.sector.includes(selectedSector);
    return matchesSearch && matchesSector;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-lg border border-[#DDE3E8] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#E8F1F8] text-[#0056A6] border border-[#DDE3E8]">
              Open Public Access
            </span>
            <span className="text-xs text-[#666666] font-medium">
              Directorate of Vocational Education &amp; Training
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#003B70] mt-1 tracking-tight">
            Maharashtra Vocational &amp; Labour Intelligence
          </h1>
          <p className="text-xs text-[#666666] mt-0.5">
            Official browsable repository of high-demand industrial careers, technical skill benchmarks, and regional demand.
          </p>
        </div>

        <button
          onClick={() => openLoginModal('student')}
          className="self-start md:self-auto px-4 py-2 bg-[#F28C28] hover:bg-[#D96B1F] text-white rounded text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer border border-[#F28C28]"
        >
          <Lock className="w-3.5 h-3.5 text-white" />
          <span>Login for Trainee Insights</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-[#DDE3E8] bg-white px-2 rounded-t-lg border-x border-t gap-1 overflow-x-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSearchTerm('');
              }}
              className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'border-[#0056A6] text-[#0056A6] font-bold bg-[#E8F1F8]'
                  : 'border-transparent text-[#666666] hover:text-[#003B70] hover:bg-[#F7F8FA]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#0056A6]' : 'text-[#8A8A8A]'}`} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-1.5 py-0.2 text-[10px] rounded font-mono ${
                  isActive ? 'bg-[#0056A6] text-white font-bold' : 'bg-[#F7F8FA] text-[#666666] border border-[#DDE3E8]'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab 1: High-Demand Job Roles */}
      {activeTab === 'jobs' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-lg border border-[#DDE3E8] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[#8A8A8A] absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search job roles or required skills..."
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-white border border-[#DDE3E8] rounded text-[#222222] focus:border-[#0056A6] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-[#666666]">
              <label className="font-semibold text-[#222222]">Sector:</label>
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="bg-[#F7F8FA] border border-[#DDE3E8] px-2.5 py-1 rounded text-xs text-[#222222] focus:outline-none"
              >
                <option value="All">All Priority Sectors</option>
                <option value="Automotive">Automotive &amp; EV</option>
                <option value="Precision">Precision Engineering</option>
                <option value="Renewable">Renewable Energy</option>
                <option value="Smart">Smart Manufacturing</option>
              </select>
            </div>
          </div>

          {/* Job Role Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
              <div
                key={job.id}
                className="bg-white rounded-lg border border-[#DDE3E8] p-5 shadow-2xs flex flex-col justify-between hover:border-[#0056A6] transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E8F1F8] text-[#0056A6] border border-[#DDE3E8]">
                      {job.nsqfLevel}
                    </span>
                    <span className="text-[11px] font-bold text-[#198754] flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {job.growth}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#003B70] leading-snug">
                      {job.title}
                    </h3>
                    <p className="text-xs text-[#0056A6] font-semibold mt-0.5">
                      {job.sector}
                    </p>
                    <p className="text-[11px] text-[#666666] mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#8A8A8A]" />
                      {job.district}
                    </p>
                  </div>

                  <p className="text-xs text-[#666666] line-clamp-3 leading-relaxed">
                    {job.description}
                  </p>

                  {/* Key Skills */}
                  <div className="pt-2 border-t border-[#DDE3E8]">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#666666] mb-1.5">
                      Key Competencies Required
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {job.keySkills.map((s, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#F7F8FA] text-[#222222] border border-[#DDE3E8]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Salary & Vacancies Footer */}
                <div className="mt-4 pt-3 border-t border-[#DDE3E8] flex items-center justify-between text-xs">
                  <div>
                    <div className="text-[10px] text-[#8A8A8A]">Est. Salary</div>
                    <div className="font-bold text-[#222222]">{job.salaryRange}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-[#8A8A8A]">Live Postings</div>
                    <div className="font-bold text-[#0056A6]">{job.vacancies} Openings</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contextual Login Prompt */}
          <div className="bg-[#E8F1F8] border border-[#DDE3E8] rounded-lg p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-[#0056A6] text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#003B70]">
                  Are you an enrolled ITI student or graduate?
                </h4>
                <p className="text-xs text-[#666666] mt-0.5">
                  Sign in with your Student ID to run an automated skill-gap analysis and see which roles match your verified competencies.
                </p>
              </div>
            </div>
            <button
              onClick={() => openLoginModal('student')}
              className="px-4 py-2 bg-[#F28C28] hover:bg-[#D96B1F] text-white rounded text-xs font-bold transition-colors shrink-0 cursor-pointer shadow-2xs border border-[#F28C28]"
            >
              Check My Match Score
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: In-Demand Skills Taxonomy */}
      {activeTab === 'skills' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-[#DDE3E8] shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-[#DDE3E8] bg-[#F7F8FA] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#003B70]">
                  Vocational Technical Skills Demand Index
                </h3>
                <p className="text-xs text-[#666666]">
                  Ranked by industrial vacancy volume and regional employer deficit signals across Maharashtra.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#E8F1F8] text-[#003B70] font-bold uppercase tracking-wider text-[11px] border-b border-[#DDE3E8]">
                    <th className="py-3 px-4">Skill / Competency</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Sector</th>
                    <th className="py-3 px-4">Demand Score</th>
                    <th className="py-3 px-4">Growth Rate</th>
                    <th className="py-3 px-4">Deficit Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDE3E8]">
                  {IN_DEMAND_SKILLS.map(skill => (
                    <tr key={skill.id} className="hover:bg-[#F7F8FA]">
                      <td className="py-3 px-4 font-bold text-[#222222]">
                        {skill.name}
                      </td>
                      <td className="py-3 px-4 text-[#666666]">
                        {skill.category}
                      </td>
                      <td className="py-3 px-4 text-[#666666]">
                        {skill.sector}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#003B70]">{skill.demandScore}/100</span>
                          <div className="w-16 bg-[#DDE3E8] h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-[#0056A6] h-full rounded-full"
                              style={{ width: `${skill.demandScore}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-semibold text-[#198754]">
                        {skill.growthRate}
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge status={skill.priority} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Course & Career Pathways */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VOCATIONAL_COURSES.map(course => (
            <div
              key={course.id}
              className="bg-white rounded-lg border border-[#DDE3E8] p-5 shadow-2xs space-y-4 hover:border-[#0056A6] transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#E8F1F8] text-[#0056A6] border border-[#DDE3E8]">
                    {course.code}
                  </span>
                  <h3 className="text-base font-bold text-[#003B70] mt-1">
                    {course.name}
                  </h3>
                  <p className="text-xs text-[#666666]">{course.tradeType} &middot; {course.duration}</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-[#198754] border border-emerald-200">
                  {course.employmentRate} Placement Rate
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-[#F7F8FA] p-3 rounded border border-[#DDE3E8] text-center text-xs">
                <div>
                  <div className="text-[10px] text-[#666666]">NSQF Level</div>
                  <div className="font-bold text-[#222222] mt-0.5">{course.nsqfLevel}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#666666]">Affiliated ITIs</div>
                  <div className="font-bold text-[#222222] mt-0.5">{course.affiliatedITIs} ITIs</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#666666]">Seats in State</div>
                  <div className="font-bold text-[#222222] mt-0.5">{course.seatsStatewide}</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-[#DDE3E8]">
                <span className="text-[11px] text-[#666666]">Status: <strong>{course.curriculumStatus}</strong></span>
                <span className="text-[#0056A6] font-bold flex items-center gap-1 cursor-pointer hover:underline">
                  View Syllabus Outline
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Industry Trends */}
      {activeTab === 'trends' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-[#DDE3E8] shadow-2xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-[#003B70]">
                Quarterly Hiring Growth Across Industrial Clusters (2025–2026)
              </h3>
              <p className="text-xs text-[#666666]">
                Cumulative job requirements aggregated from Chakan, Talegaon, Waluj, Butibori, and Thane MIDC zones.
              </p>
            </div>

            <GovAreaChart
              data={INDUSTRY_SECTOR_TRENDS}
              xKey="quarter"
              height={320}
              areas={[
                { key: 'evAutomotive', label: 'EV & Clean Mobility', stroke: '#003B70', fill: '#003B70' },
                { key: 'precisionEng', label: 'Precision Engineering & CNC', stroke: '#0056A6', fill: '#0056A6' },
                { key: 'renewables', label: 'Solar & Renewable Tech', stroke: '#F28C28', fill: '#F28C28' },
                { key: 'industry4', label: 'Smart Manufacturing / PLC', stroke: '#198754', fill: '#198754' },
              ]}
            />
          </div>
        </div>
      )}

      {/* Tab 5: District-Wise Demand */}
      {activeTab === 'districts' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DISTRICT_DEMAND_OVERVIEW.map((dist, i) => (
              <div
                key={i}
                className="bg-white rounded-lg border border-[#DDE3E8] p-5 shadow-2xs space-y-3 hover:border-[#0056A6] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#003B70]">
                    {dist.district}
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E8F1F8] text-[#0056A6] border border-[#DDE3E8]">
                    Index: {dist.demandIndex}/100
                  </span>
                </div>

                <div className="text-xs text-[#666666]">
                  Primary Sector: <strong className="text-[#222222]">{dist.primarySector}</strong>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-[#F7F8FA] p-2.5 rounded border border-[#DDE3E8] text-center text-xs">
                  <div>
                    <div className="text-[10px] text-[#8A8A8A]">Openings</div>
                    <div className="font-bold text-[#222222]">{dist.activeJobs}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#8A8A8A]">Govt ITIs</div>
                    <div className="font-bold text-[#222222]">{dist.itis}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#8A8A8A]">Trainees</div>
                    <div className="font-bold text-[#222222]">{dist.enrolled}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicPortalPage;
