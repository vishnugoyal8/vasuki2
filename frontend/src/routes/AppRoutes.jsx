import React from 'react';
import { LandingPage } from '../pages/LandingPage.jsx';
import { PublicPortalPage } from '../pages/PublicPortalPage.jsx';
import { StudentPortalPage } from '../pages/student/StudentPortalPage.jsx';
import { InstitutePortalPage } from '../pages/institute/InstitutePortalPage.jsx';
import { TrainerPortalPage } from '../pages/trainer/TrainerPortalPage.jsx';
import { EmployerPortalPage } from '../pages/employer/EmployerPortalPage.jsx';
import { GovDashboardPage } from '../pages/government/GovDashboardPage.jsx';
import { JobAnalyzerPage } from '../pages/JobAnalyzerPage.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { Lock, ShieldAlert, ArrowRight } from 'lucide-react';

export const AppRoutes = ({
  activePage,
  onNavigate,
  selectedDistrict,
  onSelectDistrict,
}) => {
  const { isAuthenticated, openLoginModal } = useAuth();

  switch (activePage) {
    case 'landing':
      return <LandingPage onNavigate={onNavigate} selectedDistrict={selectedDistrict} />;

    case 'public-portal':
    case 'public':
      return <PublicPortalPage onNavigate={onNavigate} />;

    case 'student':
    case 'student-portal':
      return <StudentPortalPage onNavigate={onNavigate} />;

    case 'institute':
    case 'institute-dashboard':
      return (
        <InstitutePortalPage
          selectedDistrict={selectedDistrict}
          onNavigate={onNavigate}
        />
      );

    case 'trainer':
    case 'trainer-dashboard':
      return <TrainerPortalPage onNavigate={onNavigate} />;

    case 'employer':
    case 'employer-dashboard':
      return (
        <EmployerPortalPage
          selectedDistrict={selectedDistrict}
          onNavigate={onNavigate}
        />
      );

    case 'government':
    case 'gov-dashboard':
      return (
        <GovDashboardPage
          selectedDistrict={selectedDistrict}
          onSelectDistrict={onSelectDistrict}
          onNavigate={onNavigate}
        />
      );

    case 'job-analyzer':
    case 'analyzer':
    case 'ai-job-analyzer':
      // RESTRICT ACCESS: AI Job Analyzer is NOT accessible to public users
      if (!isAuthenticated) {
        return (
          <div className="max-w-2xl mx-auto my-16 px-4">
            <div className="bg-white rounded-lg border border-[#DDE3E8] p-8 text-center shadow-xs space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#E8F1F8] text-[#003B70] flex items-center justify-center mx-auto border border-[#0056A6]/20">
                <Lock className="w-6 h-6 text-[#003B70]" />
              </div>
              <span className="inline-block px-3 py-1 rounded text-[10px] font-bold bg-[#E8F1F8] text-[#0056A6] border border-[#0056A6]/30 uppercase tracking-wider">
                Restricted Institutional Access
              </span>
              <h2 className="text-xl font-bold text-[#003B70]">
                Authentication Required for AI Job &amp; Demand Analyzer
              </h2>
              <p className="text-xs text-[#666666] leading-relaxed max-w-lg mx-auto">
                Access to the AI Industrial Job &amp; Trade Curriculum Deficit Engine is strictly reserved for verified vocational trainees, accredited ITI administration, instructors, and registered employers under the Directorate of Vocational Education &amp; Training (DVET), Maharashtra.
              </p>
              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => openLoginModal('student')}
                  className="px-6 py-2.5 rounded bg-[#F28C28] hover:bg-[#D96B1F] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs flex items-center gap-2"
                >
                  <span>Portal Sign-In to Access</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onNavigate('landing')}
                  className="px-6 py-2.5 rounded bg-white hover:bg-[#F7F8FA] text-[#0056A6] border border-[#DDE3E8] text-xs font-bold transition-colors cursor-pointer"
                >
                  Return to Home
                </button>
              </div>
            </div>
          </div>
        );
      }
      return (
        <JobAnalyzerPage
          selectedDistrict={selectedDistrict}
          onNavigate={onNavigate}
        />
      );

    default:
      return <LandingPage onNavigate={onNavigate} selectedDistrict={selectedDistrict} />;
  }
};

export default AppRoutes;
