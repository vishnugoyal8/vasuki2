import React, { useState } from 'react';
import {
  Menu,
  X,
  LogOut,
  ChevronRight,
  Globe,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

const DASHBOARD_I18N = {
  roles: {
    student: {
      title: { en: 'Vocational Trainee Portal', mr: 'व्यावसायिक प्रशिक्षणार्थी पोर्टल', hi: 'व्यावसायिक प्रशिक्षु पोर्टल' },
      badge: { en: 'Vocational Trainee', mr: 'प्रशिक्षणार्थी', hi: 'प्रशिक्षु' },
    },
    trainer: {
      title: { en: 'Instructor & Master Trainer Console', mr: 'प्रशिक्षक व मार्गदर्शक कक्ष', hi: 'प्रशिक्षक एवं मास्टर ट्रेनर कंसोल' },
      badge: { en: 'Master Trainer', mr: 'मास्टर प्रशिक्षक', hi: 'मास्टर ट्रेनर' },
    },
    institute: {
      title: { en: 'Institute Administration Suite', mr: 'संस्था प्रशासन कक्ष', hi: 'संस्थान प्रशासन सुइट' },
      badge: { en: 'ITI Administration', mr: 'आयटीआय प्रशासन', hi: 'आईटीआई प्रशासन' },
    },
    employer: {
      title: { en: 'Industrial Employer Console', mr: 'औद्योगिक उद्योजक कक्ष', hi: 'औद्योगिक नियोक्ता कंसोल' },
      badge: { en: 'Industrial Employer', mr: 'औद्योगिक उद्योजक', hi: 'औद्योगिक नियोक्ता' },
    },
    government: {
      title: { en: 'DVET State Intelligence Command', mr: 'DVET राज्य बुद्धिमत्ता कक्ष', hi: 'DVET राज्य आसूचना कमांड' },
      badge: { en: 'State Officer', mr: 'शासकीय अधिकारी', hi: 'शासकीय अधिकारी' },
    },
  },
  tabs: {
    overview: { en: 'Dashboard Home', mr: 'डॅशबोर्ड मुख्यपृष्ठ', hi: 'डैशबोर्ड होम' },
    'ai-job-analyzer': { en: 'AI Job Match Analyzer', mr: 'एआय जॉब मॅच विश्लेषक', hi: 'एआई जॉब मैच विश्लेषक' },
    'job-analyzer': { en: 'AI Job & Demand Analyzer', mr: 'एआय जॉब व मागणी विश्लेषक', hi: 'एआई जॉब एवं मांग विश्लेषक' },
    'skill-gap': { en: 'Skill Gap Analysis', mr: 'कौशल्य तफावत विश्लेषण', hi: 'कौशल अंतराल विश्लेषण' },
    'curriculum-compare': { en: 'Course vs Industry', mr: 'अभ्यासक्रम वि. उद्योग', hi: 'पाठ्यक्रम बनाम उद्योग' },
    'learning-path': { en: 'Learning Path', mr: 'वैयक्तिक शिक्षण मार्ग', hi: 'व्यक्तिगत शिक्षण मार्ग' },
    assessments: { en: 'Assessments & Progress', mr: 'मूल्यमापन व प्रगती', hi: 'मूल्यांकन एवं प्रगति' },
    placements: { en: 'Placement Insights', mr: 'रोजगार संधी व प्लेसमेंट', hi: 'प्लेसमेंट अवसर' },
    courses: { en: 'Assigned Courses', mr: 'नेमून दिलेले अभ्यासक्रम', hi: 'आवंटित पाठ्यक्रम' },
    'student-gaps': { en: 'Student Skill Gaps', mr: 'प्रशिक्षणार्थी कौशल्य त्रुटी', hi: 'छात्र कौशल अंतराल' },
    upskilling: { en: 'Faculty Upskilling', mr: 'प्रशिक्षक सक्षमीकरण (ToT)', hi: 'प्रशिक्षक उन्नयन (ToT)' },
    'industry-feed': { en: 'Industry Feed', mr: 'थेट औद्योगिक फीड', hi: 'लाइव उद्योग फीड' },
    improvements: { en: 'Teaching Insights', mr: 'अध्यापन विश्लेषण व सुधारणा', hi: 'शिक्षण अंतर्दृष्टि' },
    jobs: { en: 'Post / Validate Jobs', mr: 'नोकरी पदे / पडताळणी', hi: 'नौकरी पद / सत्यापन' },
    'demand-analysis': { en: 'District Demand Analysis', mr: 'जिल्हा मागणी विश्लेषण', hi: 'ज़िला मांग विश्लेषण' },
    students: { en: 'Manage Students', mr: 'प्रशिक्षणार्थी व्यवस्थापन', hi: 'प्रशिक्षु प्रबंधन' },
    curriculum: { en: 'Curriculum Deficits', mr: 'अभ्यासक्रम तूट विश्लेषण', hi: 'पाठ्यक्रम कमी विश्लेषण' },
    alignment: { en: 'Course Alignment Directives', mr: 'अभ्यासक्रम संरेखन निर्देश', hi: 'पाठ्यक्रम संरेखण निर्देश' },
    trainers: { en: 'Trainer Management', mr: 'प्रशिक्षक कार्यभार', hi: 'प्रशिक्षक कार्यभार' },
    infrastructure: { en: 'Lab Infrastructure', mr: 'लॅब पायाभूत नियोजन', hi: 'प्रयोगशाला योजना' },
    openings: { en: 'Industrial Vacancies', mr: 'औद्योगिक रिक्त पदे', hi: 'औद्योगिक रिक्तियां' },
    postings: { en: 'Job Openings', mr: 'औद्योगिक रिक्त पदे', hi: 'औद्योगिक रिक्तियां' },
    'skills-tagging': { en: 'Competency Tagging', mr: 'कौशल्य सक्षमता टॅगिंग', hi: 'कौशल क्षमता टैगिंग' },
    feedback: { en: 'Curriculum Feedback', mr: 'अभ्यासक्रम अभिप्राय', hi: 'पाठ्यक्रम प्रतिक्रिया' },
    talent: { en: 'Discover ITI Talent', mr: 'प्रमाणित उमेदवार शोध', hi: 'प्रमाणित प्रतिभा खोज' },
    'market-intel': { en: 'Demand Intelligence', mr: 'मागणी बुद्धिमत्ता व विश्लेषण', hi: 'मांग विश्लेषण एवं आसूचना' },
    'training-planning': { en: 'DSDP Plans & Grants', mr: 'जिल्हा कौशल्य योजना (DSDP)', hi: 'ज़िला कौशल योजना (DSDP)' },
    'policy-insights': { en: 'Policy Directives', mr: 'धोरणात्मक अहवाल', hi: 'नीतिगत निर्देश' },
    'ecosystem-monitoring': { en: 'Ecosystem Health', mr: 'संस्थात्मक प्रणाली स्थिती', hi: 'पारिस्थितिकी तंत्र स्थिति' },
  },
  badges: {
    'AI Match': { en: 'AI Match', mr: 'एआय मॅच', hi: 'एआई मैच' },
    '2 Gaps': { en: '2 Gaps', mr: '२ तूट', hi: '2 अंतराल' },
    '3 Matches': { en: '3 Matches', mr: '३ संधी', hi: '3 अवसर' },
    '3 Batches': { en: '3 Batches', mr: '३ तुकड्या', hi: '3 बैच' },
    'Cohort': { en: 'Cohort', mr: 'तुकडी', hi: 'बैच' },
    'Live': { en: 'Live', mr: 'थेट', hi: 'लाइव' },
    'High Priority': { en: 'High Priority', mr: 'उच्च प्राधान्य', hi: 'उच्च प्राथमिकता' },
    'DVET': { en: 'DVET', mr: 'DVET', hi: 'DVET' },
    '3 Capital Plans': { en: '3 Capital Plans', mr: '३ योजना', hi: '3 योजनाएं' },
    'Pre-Assessed': { en: 'Pre-Assessed', mr: 'प्रमाणित', hi: 'प्रमाणित' },
    'Gazetted': { en: 'Gazetted', mr: 'राजपत्रित', hi: 'राजपत्रित' },
    'Active': { en: 'Active', mr: 'सक्रिय', hi: 'सक्रिय' },
    'Direct Feedback': { en: 'Direct Feedback', mr: 'थेट अभिप्राय', hi: 'सीधा फीडबैक' },
    'Gemini AI': { en: 'Gemini AI', mr: 'जेमिनी एआय', hi: 'जेमिनी एआई' },
    'All Operational': { en: 'All Operational', mr: 'सर्व कार्यरत', hi: 'सभी कार्यरत' },
    'Action Needed': { en: 'Action Needed', mr: 'कृती आवश्यक', hi: 'कार्रवाई आवश्यक' },
  },
};

export const DashboardLayout = ({
  role,
  roleTitle,
  menuItems = [],
  activeTab,
  onSelectTab,
  onNavigate,
  children,
}) => {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getTabLabel = (item) => {
    return DASHBOARD_I18N.tabs[item.id]?.[language] || item.label;
  };

  const getBadgeLabel = (badge) => {
    if (!badge) return null;
    return DASHBOARD_I18N.badges[badge]?.[language] || badge;
  };

  const currentRoleTitle = DASHBOARD_I18N.roles[role]?.title?.[language] || roleTitle || `${role} Portal`;
  const currentRoleBadge = DASHBOARD_I18N.roles[role]?.badge?.[language] || user?.roleLabel || role;
  const currentActiveTabLabel = DASHBOARD_I18N.tabs[activeTab]?.[language] || menuItems.find(m => m.id === activeTab)?.label || 'Overview';

  const handleLogout = () => {
    logout();
    if (onNavigate) {
      onNavigate('landing');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#222222] flex font-sans antialiased w-full max-w-full overflow-x-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-[#222222]/60 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar - Executive Deep Navy (#003B70) with Government Blue (#0056A6) & Saffron accents */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#003B70] text-white border-r border-[#00284D] flex flex-col transition-all duration-200 lg:translate-x-0 ${
          isSidebarOpen
            ? 'translate-x-0 opacity-100 visible'
            : '-translate-x-full opacity-0 invisible lg:opacity-100 lg:visible'
        }`}
      >
        {/* Sidebar Header with Emblem */}
        <div className="p-4 border-b border-[#00284D] bg-[#00284D]">
          <div className="flex items-center justify-between">
            <div
              onClick={() => onNavigate && onNavigate('landing')}
              className="flex items-center gap-2.5 cursor-pointer select-none"
            >
              <div className="w-8 h-8 rounded bg-[#003B70] border border-[#0056A6] flex items-center justify-center text-white font-bold text-xs shadow-xs">
                MH
              </div>
              <div>
                <span className="text-base font-black text-white tracking-tight">
                  Skill<span className="text-[#F28C28]">Scan</span>
                </span>
                <div className="text-[10px] text-[#E8F1F8] font-medium">
                  {language === 'mr' ? 'DVET महाराष्ट्र शासन' : language === 'hi' ? 'DVET महाराष्ट्र शासन' : 'DVET Maharashtra'}
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1 text-white/80 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Role Pill */}
          <div className="mt-3">
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-[#003B70] text-[#E8F1F8] border border-[#0056A6]">
              {currentRoleTitle}
            </span>
          </div>
        </div>


        {/* User Card inside Sidebar */}
        {user && (
          <div className="p-3 mx-3 mt-3 rounded bg-[#00284D] border border-[#0056A6]/40">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#0056A6] text-white font-bold text-xs flex items-center justify-center shrink-0 border border-[#003B70]">
                {user.avatar || 'U'}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-white truncate">{user.name}</div>
                <div className="text-[10px] text-[#E8F1F8] truncate">
                  {currentRoleBadge}
                </div>
              </div>
            </div>
            {user.id && (
              <div className="mt-2 pt-2 border-t border-white/10 text-[10px] font-mono text-[#E8F1F8]/80 truncate">
                ID: {user.id}
              </div>
            )}
          </div>
        )}

        {/* Nav Items - Government Blue Active State with Saffron Accent indicator */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-white/60">
            {t.portalMenu || 'Portal Menu'}
          </div>
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const labelText = getTabLabel(item);
            const badgeText = getBadgeLabel(item.badge);

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelectTab(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#0056A6] text-white font-bold shadow-xs border-l-3 border-[#F28C28]'
                    : 'text-white/90 hover:text-white hover:bg-[#00284D]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#E8F1F8]'}`} />
                  <span>{labelText}</span>
                </div>
                {badgeText && (
                  <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                    isActive ? 'bg-[#F28C28] text-white' : 'bg-[#00284D] text-[#E8F1F8] border border-[#0056A6]/40'
                  }`}>
                    {badgeText}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-[#00284D] bg-[#00284D] space-y-1">
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('public-portal')}
            className="w-full flex items-center justify-between px-3 py-1.5 rounded text-xs text-[#E8F1F8] hover:text-white hover:bg-[#003B70] transition-colors cursor-pointer"
          >
            <span>{t.navPublicPortal || 'Public Intelligence'}</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#0056A6]" />
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-1.5 rounded text-xs font-semibold text-[#E8F1F8] hover:text-white hover:bg-[#C62828] transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>{t.logoutFromPortal || 'Logout from Portal'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0 w-full max-w-full overflow-x-hidden">
        {/* Official Government Top Bar */}
        <div className="bg-[#00284D] text-white text-[10px] sm:text-[11px] px-3 sm:px-6 py-1.5 flex items-center justify-between border-b border-[#001F3D] min-w-0 w-full overflow-hidden">
          <div className="flex items-center gap-2 min-w-0 flex-1 truncate">
            <span className="font-bold text-white tracking-wide truncate">
              {t.govtOfMaharashtra || 'GOVT. OF MAHARASHTRA'}
            </span>
            <span className="text-[#0056A6] hidden sm:inline">|</span>
            <span className="hidden sm:inline text-[#E8F1F8] truncate">
              {t.deptTitle || 'Dept. of Skills, Employment, Entrepreneurship & Innovation'} · DVET
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 shrink-0 text-[11px] text-[#E8F1F8] font-medium">
            <span>{t.officialStatePortal || 'Official State Skill Portal'}</span>
          </div>
        </div>

        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-[#DDE3E8] h-14 sm:h-16 flex items-center justify-between px-3 sm:px-6 shadow-2xs gap-2 min-w-0 w-full">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-1.5 sm:p-2 rounded text-[#003B70] hover:bg-[#F7F8FA] cursor-pointer shrink-0"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb & Title */}
            <div className="min-w-0 flex-1">
              <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-[#666666] truncate">
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('landing')}
                  className="hover:text-[#0056A6] cursor-pointer shrink-0 font-medium"
                >
                  SkillScan
                </button>
                <ChevronRight className="w-3 h-3 text-[#DDE3E8] shrink-0" />
                <span className="capitalize shrink-0 text-[#666666]">{currentRoleBadge}</span>
                <ChevronRight className="w-3 h-3 text-[#DDE3E8] shrink-0" />
                <span className="font-semibold text-[#003B70] truncate">
                  {currentActiveTabLabel}
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-bold text-[#003B70] leading-tight truncate">
                {currentActiveTabLabel}
              </h1>
            </div>
          </div>

          {/* Right Header Section: Language Switcher, Role Badge, District, Avatar */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* 3-Language Switcher */}
            <div className="flex items-center gap-0.5 bg-[#F7F8FA] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border border-[#DDE3E8] text-xs">
              <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#0056A6] mr-0.5 shrink-0" />
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-1 sm:px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] font-bold transition-colors cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#0056A6] text-white shadow-2xs'
                    : 'text-[#666666] hover:text-[#003B70]'
                }`}
                title="English"
              >
                EN
              </button>
              <span className="text-[#DDE3E8] text-[10px]">|</span>
              <button
                type="button"
                onClick={() => setLanguage('mr')}
                className={`px-1 sm:px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] font-bold transition-colors cursor-pointer ${
                  language === 'mr'
                    ? 'bg-[#0056A6] text-white shadow-2xs'
                    : 'text-[#666666] hover:text-[#003B70]'
                }`}
                title="मराठी (Marathi)"
              >
                मराठी
              </button>
              <span className="text-[#DDE3E8] text-[10px]">|</span>
              <button
                type="button"
                onClick={() => setLanguage('hi')}
                className={`px-1 sm:px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] font-bold transition-colors cursor-pointer ${
                  language === 'hi'
                    ? 'bg-[#0056A6] text-white shadow-2xs'
                    : 'text-[#666666] hover:text-[#003B70]'
                }`}
                title="हिन्दी (Hindi)"
              >
                हिन्दी
              </button>
            </div>

            {user?.district && (
              <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#E8F1F8] border border-[#0056A6]/20 text-xs text-[#003B70] font-semibold">
                <MapPin className="w-3.5 h-3.5 text-[#0056A6]" />
                <span>{user.district}</span>
              </div>
            )}

            {/* Role Badge */}
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#E8F1F8] text-[#003B70] border border-[#0056A6]/30 hidden md:inline-block">
              {currentRoleBadge}
            </span>

            {/* User Avatar */}
            <div className="flex items-center pl-1.5 sm:pl-2 border-l border-[#DDE3E8]">
              <div
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#003B70] text-white font-bold text-xs flex items-center justify-center shadow-2xs border border-[#0056A6]"
                title={user?.name || 'User'}
              >
                {user?.avatar || 'U'}
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-4 sm:space-y-6 min-w-0 overflow-x-hidden">
          {children}
        </main>

        {/* Minimal Institutional Footer */}
        <footer className="bg-white border-t border-[#DDE3E8] py-3 sm:py-4 px-3 sm:px-6 text-center text-xs text-[#666666]">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2">
            <span>{t.dvetTitle || 'Directorate of Vocational Education & Training (DVET)'}, {t.govtOfMaharashtra || 'Government of Maharashtra'}</span>
            <span className="text-[#8A8A8A] text-[10px] sm:text-[11px]">{t.authorizedSession || 'Authorized Portal Session · Secure & Audited'}</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
