import React, { useState } from 'react';
import { Navbar, PageId } from './components/Navbar.tsx';
import { LandingPage } from './pages/LandingPage.tsx';
import { GovDashboardPage } from './pages/GovDashboardPage.tsx';
import { MarketIntelligencePage } from './pages/MarketIntelligencePage.tsx';
import { SkillGapPage } from './pages/SkillGapPage.tsx';
import { CourseAlignmentPage } from './pages/CourseAlignmentPage.tsx';
import { JobAnalyzerPage } from './pages/JobAnalyzerPage.tsx';
import { RecommendationsPage } from './pages/RecommendationsPage.tsx';
import { DistrictPlanPage } from './pages/DistrictPlanPage.tsx';
import { InstituteDashboardPage } from './pages/InstituteDashboardPage.tsx';
import { EmployerFeedbackPage } from './pages/EmployerFeedbackPage.tsx';
import { resetSeedDataset } from './lib/api.ts';
import { CheckCircle2, RefreshCw } from 'lucide-react';
import { LanguageProvider, useLanguage } from './context/LanguageContext.tsx';

function AppContent() {
  const [activePage, setActivePage] = useState<PageId>('landing');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Pune');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { t } = useLanguage();

  const handleResetData = async () => {
    try {
      await resetSeedDataset();
      setToastMessage('Demo dataset reset to fresh baseline.');
      setTimeout(() => setToastMessage(null), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] flex flex-col font-sans antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Navbar */}
      <Navbar
        activePage={activePage}
        onSelectPage={setActivePage}
        selectedDistrict={selectedDistrict}
        onSelectDistrict={setSelectedDistrict}
        onResetData={handleResetData}
      />

      {/* Page Content Container */}
      <main className="flex-1">
        {activePage === 'landing' && (
          <LandingPage onNavigate={setActivePage} selectedDistrict={selectedDistrict} />
        )}
        {activePage === 'gov-dashboard' && (
          <GovDashboardPage
            selectedDistrict={selectedDistrict}
            onSelectDistrict={setSelectedDistrict}
            onNavigate={setActivePage}
          />
        )}
        {activePage === 'market-intelligence' && (
          <MarketIntelligencePage
            selectedDistrict={selectedDistrict}
            onNavigate={setActivePage}
          />
        )}
        {activePage === 'skill-gap' && (
          <SkillGapPage
            selectedDistrict={selectedDistrict}
            onNavigate={setActivePage}
          />
        )}
        {activePage === 'course-alignment' && (
          <CourseAlignmentPage onNavigate={setActivePage} />
        )}
        {activePage === 'job-analyzer' && (
          <JobAnalyzerPage
            selectedDistrict={selectedDistrict}
            onNavigate={setActivePage}
          />
        )}
        {activePage === 'recommendations' && (
          <RecommendationsPage
            selectedDistrict={selectedDistrict}
            onNavigate={setActivePage}
          />
        )}
        {activePage === 'district-plan' && (
          <DistrictPlanPage
            selectedDistrict={selectedDistrict}
            onNavigate={setActivePage}
          />
        )}
        {activePage === 'institute-dashboard' && (
          <InstituteDashboardPage
            selectedDistrict={selectedDistrict}
            onNavigate={setActivePage}
          />
        )}
        {activePage === 'employer-feedback' && (
          <EmployerFeedbackPage
            selectedDistrict={selectedDistrict}
            onNavigate={setActivePage}
          />
        )}
      </main>

      {/* Institutional Footer */}
      <footer className="bg-white border-t border-slate-200 py-5 px-4 sm:px-6 text-center text-xs text-slate-500 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">{t.appName}</span>
            <span>&middot; Smart India Hackathon Submission</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[10px] border border-slate-200">
              Demo / Synthetic Pilot Dataset
            </span>
          </div>
          <div className="text-[11px] text-slate-400">
            Government of Maharashtra &middot; Directorate of Vocational Education and Training (DVET)
          </div>
        </div>
      </footer>
    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
