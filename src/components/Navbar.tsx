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
  Globe,
  SlidersHorizontal,
} from 'lucide-react';
import { MAHARASHTRA_DISTRICTS_DATA } from '../../backend/data/seedData.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { Language } from '../locales/translations.ts';

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
  const { language, setLanguage, t } = useLanguage();

  const navItems: { id: PageId; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'landing', label: language === 'mr' ? 'मुख्यपृष्ठ' : language === 'hi' ? 'मुख्य पृष्ठ' : 'Home', icon: Home },
    { id: 'gov-dashboard', label: t.navGovDashboard, icon: LayoutDashboard },
    { id: 'market-intelligence', label: t.navMarketIntel, icon: TrendingUp },
    { id: 'skill-gap', label: t.navSkillGap, icon: GitPullRequest },
    { id: 'course-alignment', label: t.navCourseAlignment, icon: CheckSquare },
    { id: 'job-analyzer', label: t.navJobAnalyzer, icon: Sparkles },
    { id: 'recommendations', label: t.navRecommendations, icon: Award },
    { id: 'district-plan', label: t.navDistrictPlan, icon: MapPin },
    { id: 'institute-dashboard', label: t.navInstitutes, icon: Building2 },
    { id: 'employer-feedback', label: t.navEmployerFeedback, icon: MessageSquarePlus },
  ];

  const languages: { code: Language; label: string; short: string }[] = [
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'mr', label: 'मराठी', short: 'मराठी' },
    { code: 'hi', label: 'हिन्दी', short: 'हिन्दी' },
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
            {language === 'mr' ? 'क' : 'C'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold leading-tight tracking-tight text-white">
                {t.appName}
              </h1>
              <span className="px-1.5 py-0.2 rounded bg-blue-900/60 text-blue-300 text-[10px] font-semibold border border-blue-700/50 hidden sm:inline">
                {t.decisionSupport}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Status Indicators, District & Language Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher Pill */}
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded border border-slate-700">
            <Globe className="w-3.5 h-3.5 text-blue-400 ml-1.5 mr-0.5" />
            <div className="flex items-center gap-0.5">
              {languages.map(l => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                    language === l.code
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {l.short}
                </button>
              ))}
            </div>
          </div>

          {/* District selector pill */}
          <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded border border-slate-700">
            <span className="text-[11px] text-slate-400">{t.districtLabel}:</span>
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
            <span className="text-[11px] text-slate-400">{t.sectorLabel}:</span>
            <span className="text-xs font-semibold text-slate-100">Automotive/EV</span>
          </div>

          {/* Reset Demo Data Button */}
          <button
            onClick={onResetData}
            title={t.resetDemoData}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-medium border border-slate-700 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>{t.resetDemoData}</span>
          </button>

          {/* Profile / Gov Avatar */}
          <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-xs font-bold text-white shadow-xs" title="Directorate of Vocational Education (DVET)">
            {language === 'mr' ? 'शा' : 'MH'}
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
