import React from 'react';
import { LandingPage } from '../pages/LandingPage.jsx';
import { GovDashboardPage } from '../pages/GovDashboardPage.jsx';
import { MarketIntelligencePage } from '../pages/MarketIntelligencePage.jsx';
import { SkillGapPage } from '../pages/SkillGapPage.jsx';
import { CourseAlignmentPage } from '../pages/CourseAlignmentPage.jsx';
import { JobAnalyzerPage } from '../pages/JobAnalyzerPage.jsx';
import { RecommendationsPage } from '../pages/RecommendationsPage.jsx';
import { DistrictPlanPage } from '../pages/DistrictPlanPage.jsx';
import { InstituteDashboardPage } from '../pages/InstituteDashboardPage.jsx';
import { EmployerFeedbackPage } from '../pages/EmployerFeedbackPage.jsx';

export const AppRoutes = ({ activePage, onNavigate, selectedDistrict, onSelectDistrict }) => {
  switch (activePage) {
    case 'landing':
      return <LandingPage onNavigate={onNavigate} selectedDistrict={selectedDistrict} />;
    case 'gov-dashboard':
      return (
        <GovDashboardPage
          selectedDistrict={selectedDistrict}
          onSelectDistrict={onSelectDistrict}
          onNavigate={onNavigate}
        />
      );
    case 'market-intelligence':
      return (
        <MarketIntelligencePage
          selectedDistrict={selectedDistrict}
          onNavigate={onNavigate}
        />
      );
    case 'skill-gap':
      return (
        <SkillGapPage
          selectedDistrict={selectedDistrict}
          onNavigate={onNavigate}
        />
      );
    case 'course-alignment':
      return <CourseAlignmentPage onNavigate={onNavigate} />;
    case 'job-analyzer':
      return (
        <JobAnalyzerPage
          selectedDistrict={selectedDistrict}
          onNavigate={onNavigate}
        />
      );
    case 'recommendations':
      return (
        <RecommendationsPage
          selectedDistrict={selectedDistrict}
          onNavigate={onNavigate}
        />
      );
    case 'district-plan':
      return (
        <DistrictPlanPage
          selectedDistrict={selectedDistrict}
          onNavigate={onNavigate}
        />
      );
    case 'institute-dashboard':
      return (
        <InstituteDashboardPage
          selectedDistrict={selectedDistrict}
          onNavigate={onNavigate}
        />
      );
    case 'employer-feedback':
      return (
        <EmployerFeedbackPage
          selectedDistrict={selectedDistrict}
          onNavigate={onNavigate}
        />
      );
    default:
      return <LandingPage onNavigate={onNavigate} selectedDistrict={selectedDistrict} />;
  }
};

export default AppRoutes;
