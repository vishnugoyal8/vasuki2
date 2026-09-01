import React from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  GitPullRequest,
  CheckSquare,
  Sparkles,
  Award,
  MapPin,
  Building2,
  MessageSquarePlus,
  Home,
  RefreshCw,
  SlidersHorizontal,
} from 'lucide-react';
import { MAHARASHTRA_DISTRICTS_DATA } from '../../backend/data/seedData.ts';

export type PageId =
  | 'landing'
  | 'gov-dashboard'
  | 'market-intelligence'
  | 'skill-gap'
  | 'course-alignment'
  | 'job-analyzer'
  | 'recommendations'
  | 'district-plan'
  | 'institute-dashboard'
  | 'employer-feedback';

interface Props {
  activePage: PageId;
  onSelectPage: (page: PageId) => void;
  selectedDistrict: string;
  onSelectDistrict: (district: string) => void;
  onResetData: () => void;
}

export const Navbar: React.FC<Props> = ({
  activePage,
  onSelectPage,
  selectedDistrict,
  onSelectDistrict,
  onResetData,
}) => {
  const navItems: { id: PageId; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'gov-dashboard', label: 'Gov Dashboard', icon: LayoutDashboard },
    { id: 'market-intelligence', label: 'Market Intelligence', icon: TrendingUp },
    { id: 'skill-gap', label: 'Skill Gap Matrix', icon: GitPullRequest },
    { id: 'course-alignment', label: 'Course Alignment', icon: CheckSquare },
    { id: 'job-analyzer', label: 'AI Job Analyzer', icon: Sparkles },
    { id: 'recommendations', label: 'Action Plans', icon: Award },
    { id: 'district-plan', label: 'District Plan', icon: MapPin },
    { id: 'institute-dashboard', label: 'Institute Portal', icon: Building2 },
    { id: 'employer-feedback', label: 'Employer Loop', icon: MessageSquarePlus },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0F172A] text-white shadow-md border-b border-white/10">
      {/* Top Professional Polish Institutional Header */}
      <div className="px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div
          onClick={() => onSelectPage('landing')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-lg text-white shadow-sm group-hover:bg-blue-500 transition-colors">
            M
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold leading-tight tracking-tight text-white">
                SkillIntel Maharashtra
              </h1>
              <span className="px-1.5 py-0.2 rounded bg-blue-900/60 text-blue-300 text-[10px] font-semibold border border-blue-700/50 hidden sm:inline">
                Decision Support
              </span>
            </div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">
              Labour Market Intelligence System &middot; SIH Pilot
            </p>
          </div>
        </div>

        {/* Status Indicators & Filter Pills */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* District selector pill */}
          <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded border border-slate-700">
            <span className="text-[11px] text-slate-400">District:</span>
            <select
              value={selectedDistrict}
              onChange={e => onSelectDistrict(e.target.value)}
              className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer pr-1"
            >
              {MAHARASHTRA_DISTRICTS_DATA.map(d => (
                <option key={d.id} value={d.name} className="bg-slate-900 text-white">
                  {d.name} {d.name === 'Pune' ? '(Pilot Hub)' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Sector indicator */}
          <div className="hidden md:flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded border border-slate-700">
            <span className="text-[11px] text-slate-400">Sector:</span>
            <span className="text-xs font-semibold text-slate-100">Automotive/EV</span>
          </div>

          {/* Reset Demo Data Button */}
          <button
            onClick={onResetData}
            title="Reset dataset back to fresh demo baseline"
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-medium border border-slate-700 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Baseline</span>
          </button>

          {/* Profile / Gov Avatar */}
          <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-xs font-bold text-white shadow-xs" title="Directorate of Vocational Education (DVET)">
            MH
          </div>
        </div>
      </div>

      {/* Subnavigation Bar */}
      <div className="bg-slate-900/90 border-t border-slate-800/80 px-4 sm:px-6 overflow-x-auto flex items-center gap-1 py-1.5 no-scrollbar">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectPage(item.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{item.label}</span>
              {item.id === 'job-analyzer' && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
};
