import React, { useState } from 'react';
import {
  LayoutDashboard,
  GitPullRequest,
  CheckSquare,
  Compass,
  Award,
  Briefcase,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Building,
  Sparkles,
} from 'lucide-react';
import { DashboardLayout } from '../../layouts/DashboardLayout.jsx';
import { StatCard } from '../../components/common/StatCard.jsx';
import { StatusBadge } from '../../components/common/StatusBadge.jsx';
import { GovRadarChart } from '../../components/charts/GovRadarChart.jsx';
import { GovBarChart } from '../../components/charts/GovBarChart.jsx';
import {
  STUDENT_SKILL_RADAR,
  STUDENT_COURSE_VS_INDUSTRY,
  STUDENT_LEARNING_PATH,
  STUDENT_ASSESSMENTS,
  STUDENT_PLACEMENT_INSIGHTS,
} from '../../data/mockData.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { AiJobAnalyzerWidget } from '../../components/common/AiJobAnalyzerWidget.jsx';

export const StudentPortalPage = ({ onNavigate }) => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');

  const menuItems = [
    { id: 'overview', label: 'Dashboard Home', icon: LayoutDashboard },
    { id: 'ai-job-analyzer', label: 'AI Job Match Analyzer', icon: Sparkles, badge: 'AI Match' },
    { id: 'skill-gap', label: 'Skill Gap Analysis', icon: GitPullRequest, badge: '2 Gaps' },
    { id: 'curriculum-compare', label: 'Course vs Industry', icon: CheckSquare },
    { id: 'learning-path', label: 'Learning Path', icon: Compass },
    { id: 'assessments', label: 'Assessments & Progress', icon: Award },
    { id: 'placements', label: 'Placement Insights', icon: Briefcase, badge: '3 Matches' },
  ];

  const i18n = {
    en: {
      enrollment: 'Enrollment',
      welcome: 'Welcome back',
      readyBadge: 'Placement Ready: 78% Match',
      verifiedTitle: 'Verified Competencies',
      verifiedSub: '2 skills require practical lab completion',
      stateScoreTitle: 'State Assessment Score',
      stateScoreSub: 'Semester 3 Comprehensive Examination',
      pathStatusTitle: 'Learning Path Status',
      pathStatusSub: '800V High Voltage Safety Drill in progress',
      shortlistsTitle: 'Employer Shortlists',
      shortlistsSub: 'Tata Motors, Bajaj Auto, Ather Energy',
      snapshotTitle: 'Personal Skill-Gap Snapshot',
      snapshotSub: 'Your verified diagnostic level vs. live automotive employer benchmarks.',
      fullAnalysis: 'Full Analysis',
      priorityActions: 'Priority Action Items',
      resume800v: 'Resume 800V Isolation Module',
      criticalBadge: 'Critical',
      resume800vSub: 'Required by Tata Motors assembly hiring criteria before interview.',
      bmsBenchTest: 'BMS Diagnostic Practical Bench Test',
      scheduledBadge: 'Scheduled Mar 28',
      bmsLabSub: 'Model ITI Center of Excellence Lab 2.',
      matchedApprenticeships: 'View 3 Matched Apprenticeships',
      match92Badge: '92% Match',
      matchedSub: 'Openings from Bajaj Auto & Tata Motors EV Division.',
      radarTitle: 'Radar Competency Map',
      radarSub: 'Saffron solid area represents your score; dark orange outline indicates the industry benchmark.',
      targetVsCurrentTitle: 'Target vs Current Skill Breakdown',
      targetVsCurrentSub: 'Quantitative bar comparison for each core trade competency.',
      yourScoreBar: 'Your Verified Score',
      industryBenchmarkBar: 'Industry Target Benchmark',
      detailedDiagnosticsTitle: 'Detailed Skill Gap Diagnostics',
      colCompetency: 'Competency',
      colYourScore: 'Your Score',
      colIndustryRequired: 'Industry Required',
      colDeficitGap: 'Deficit Gap',
      colStatus: 'Status',
      ptsDeficit: 'pts deficit',
      ptsSurplus: 'pts surplus',
      statusCritical: 'Critical Deficit',
      statusRemediation: 'Remediation Needed',
      statusReady: 'Industry Ready',
      syllabusRealityTitle: 'ITI Syllabus vs. Industrial Reality Check',
      syllabusRealitySub: 'Comparison between prescribed NCVT semester curriculum and actual shop-floor job expectations.',
      taughtInSyllabus: 'Currently Taught in Standard Syllabus',
      industryRequirement: 'Industry Hiring Requirement (Chakan/Pune)',
      actionPlanLabel: 'Action Plan:',
      pathwayTitle: 'Personalized Remediation & Certification Pathway',
      pathwaySub: 'Sequential progression curated to eliminate high-voltage and CAN-bus skill deficits before placements.',
      stepTypeLabel: 'Type:',
      stepDurationLabel: 'Duration:',
      stepOfferedByLabel: 'Offered by:',
      evalTranscriptsTitle: 'Evaluation Transcripts & Bench Marks',
      evalTranscriptsSub: 'Official DVET semester bench exams and practical workshop test records.',
      colEvalModule: 'Evaluation Module',
      colExamDate: 'Exam Date',
      colVerifiedScore: 'Verified Score',
      colResult: 'Result',
      colBadge: 'Badge',
      skillsMatchSuffix: 'Skills Match',
      stipendSalaryLabel: 'Stipend / Package',
      matchedCompetenciesLabel: 'Matched Competencies:',
      remainingRequirementLabel: 'Remaining Requirement:',
      applyNowBtn: 'Apply Now',
    },
    mr: {
      enrollment: 'नोंदणी क्रमांक',
      welcome: 'स्वागत आहे',
      readyBadge: 'प्लेसमेंट सज्जता: ७८% जुळणी',
      verifiedTitle: 'प्रमाणित कौशल्ये',
      verifiedSub: '२ कौशल्यांसाठी प्रत्यक्ष लॅब पूर्ण करणे आवश्यक',
      stateScoreTitle: 'राज्य परीक्षा गुण',
      stateScoreSub: 'सत्र ३ सर्वसमावेशक परीक्षा',
      pathStatusTitle: 'शिक्षण मार्ग प्रगती',
      pathStatusSub: '८००V हाय व्होल्टेज सुरक्षा सराव सुरू आहे',
      shortlistsTitle: 'उद्योजक मुलाखत शॉर्टलिस्ट',
      shortlistsSub: 'टाटा मोटर्स, बजाज ऑटो, एथर एनर्जी',
      snapshotTitle: 'वैयक्तिक कौशल्य तफावत स्नॅपशॉट',
      snapshotSub: 'आपली प्रमाणित पातळी वि. ऑटो उद्योगांचे प्रत्यक्ष निकष.',
      fullAnalysis: 'संपूर्ण विश्लेषण',
      priorityActions: 'प्राधान्य कृती बाबी',
      resume800v: '८००V आयसोलेशन मॉड्यूल पुन्हा सुरू करा',
      criticalBadge: 'अति महत्त्वाचे',
      resume800vSub: 'मुलाखतीपूर्वी टाटा मोटर्स असेंब्ली निकषांनुसार आवश्यक.',
      bmsBenchTest: 'BMS डायग्नोस्टिक प्रात्यक्षिक बेंच टेस्ट',
      scheduledBadge: '२८ मार्च नियोजित',
      bmsLabSub: 'मॉडेल आयटीआय सेंटर ऑफ एक्सलन्स लॅब २.',
      matchedApprenticeships: '३ जुळणाऱ्या शिकाऊ उमेदवारी संधी पहा',
      match92Badge: '९२% जुळणी',
      matchedSub: 'बजाज ऑटो आणि टाटा मोटर्स ईव्ही विभागातील रिक्त पदे.',
      radarTitle: 'कौशल्य सक्षमता रडार नकाशा',
      radarSub: 'केशरी भाग आपले गुण दर्शवतो; गडद नारंगी बाह्यरेषा उद्योगांचे निकष दर्शवते.',
      targetVsCurrentTitle: 'ध्येय वि. सध्याचे कौशल्य विश्लेषण',
      targetVsCurrentSub: 'प्रत्येक मुख्य ट्रेड क्षमतेसाठी संख्यात्मक बार तुलना.',
      yourScoreBar: 'आपले प्रमाणित गुण',
      industryBenchmarkBar: 'औद्योगिक उद्दिष्ट निकष',
      detailedDiagnosticsTitle: 'तपशीलवार कौशल्य तूट निदान',
      colCompetency: 'सक्षमता',
      colYourScore: 'आपले गुण',
      colIndustryRequired: 'उद्योगांची आवश्यकता',
      colDeficitGap: 'तूट अंतर',
      colStatus: 'स्थिती',
      ptsDeficit: 'गुण तूट',
      ptsSurplus: 'गुण वाढीव',
      statusCritical: 'गंभीर तूट',
      statusRemediation: 'सुधारणा आवश्यक',
      statusReady: 'उद्योग सज्ज',
      syllabusRealityTitle: 'ITI अभ्यासक्रम वि. प्रत्यक्ष औद्योगिक वास्तव',
      syllabusRealitySub: 'NCVT सेमिस्टर अभ्यासक्रम आणि थेट कारखान्यातील कामाच्या अपेक्षांची तुलना.',
      taughtInSyllabus: 'मानक अभ्यासक्रमात सध्या शिकवले जाणारे घटक',
      industryRequirement: 'उद्योग भरती आवश्यकता (चाकण/पुणे)',
      actionPlanLabel: 'कृती योजना:',
      pathwayTitle: 'वैयक्तिक सुधारणा व प्रमाणीकरण मार्ग',
      pathwaySub: 'प्लेसमेंटपूर्वी हाय-व्होल्टेज आणि CAN-bus कौशल्य त्रुटी दूर करण्यासाठी तयार केलेला क्रम.',
      stepTypeLabel: 'प्रकार:',
      stepDurationLabel: 'कालावधी:',
      stepOfferedByLabel: 'प्रदाते:',
      evalTranscriptsTitle: 'मूल्यमापन गुणपत्रिका व कार्यशाळा नोंदी',
      evalTranscriptsSub: 'अधिकृत DVET सेमिस्टर परीक्षा आणि प्रत्यक्ष कार्यशाळा चाचणी नोंदी.',
      colEvalModule: 'मूल्यमापन घटक',
      colExamDate: 'परीक्षा दिनांक',
      colVerifiedScore: 'प्रमाणित गुण',
      colResult: 'निकाल',
      colBadge: 'बॅज',
      skillsMatchSuffix: 'कौशल्य जुळणी',
      stipendSalaryLabel: 'विद्यावेतन / वेतन',
      matchedCompetenciesLabel: 'जुळलेली कौशल्ये:',
      remainingRequirementLabel: 'उर्वरित आवश्यकता:',
      applyNowBtn: 'आता अर्ज करा',
    },
    hi: {
      enrollment: 'नामांकन संख्या',
      welcome: 'वापसी पर स्वागत है',
      readyBadge: 'प्लेसमेंट तैयार: 78% मैच',
      verifiedTitle: 'सत्यापित कौशल',
      verifiedSub: '2 कौशलों के लिए व्यावहारिक लैब पूर्ण करना आवश्यक',
      stateScoreTitle: 'राज्य मूल्यांकन स्कोर',
      stateScoreSub: 'सत्र 3 व्यापक परीक्षा',
      pathStatusTitle: 'सीखने का मार्ग स्थिति',
      pathStatusSub: '800V हाई वोल्टेज सुरक्षा ड्रिल प्रगति पर है',
      shortlistsTitle: 'नियोक्ता शॉर्टलिस्ट',
      shortlistsSub: 'टाटा मोटर्स, बजाज ऑटो, एथर एनर्जी',
      snapshotTitle: 'व्यक्तिगत कौशल अंतराल स्नैपशॉट',
      snapshotSub: 'आपका सत्यापित स्तर बनाम ऑटोमोटिव उद्योग बेंचमार्क।',
      fullAnalysis: 'पूर्ण विश्लेषण',
      priorityActions: 'प्राथमिकता कार्य सूची',
      resume800v: '800V आइसोलेशन मॉड्यूल फिर से शुरू करें',
      criticalBadge: 'अति महत्वपूर्ण',
      resume800vSub: 'साक्षात्कार से पहले टाटा मोटर्स असेंबली मानदंडों के अनुसार आवश्यक।',
      bmsBenchTest: 'BMS डायग्नोस्टिक व्यावहारिक बेंच टेस्ट',
      scheduledBadge: '28 मार्च निर्धारित',
      bmsLabSub: 'मॉडल आईटीआई सेंटर ऑफ एक्सीलेंस लैब 2।',
      matchedApprenticeships: '3 सुमेलित अप्रेंटिसशिप अवसर देखें',
      match92Badge: '92% मैच',
      matchedSub: 'बजाज ऑटो एवं टाटा मोटर्स ईवी प्रभाग में रिक्तियां।',
      radarTitle: 'कौशल क्षमता रडार मानचित्र',
      radarSub: 'केसरिया क्षेत्र आपका स्कोर दर्शाता है; गहरी नारंगी रूपरेखा उद्योग बेंचमार्क दर्शाती है।',
      targetVsCurrentTitle: 'लक्ष्य बनाम वर्तमान कौशल विश्लेषण',
      targetVsCurrentSub: 'प्रत्येक मुख्य ट्रेड क्षमता के लिए मात्रात्मक बार तुलना।',
      yourScoreBar: 'आपका सत्यापित स्कोर',
      industryBenchmarkBar: 'उद्योग लक्ष्य बेंचमार्क',
      detailedDiagnosticsTitle: 'विस्तृत कौशल अंतराल निदान',
      colCompetency: 'क्षमता / कौशल',
      colYourScore: 'आपका स्कोर',
      colIndustryRequired: 'उद्योग की आवश्यकता',
      colDeficitGap: 'कमी अंतराल',
      colStatus: 'स्थिति',
      ptsDeficit: 'अंक कमी',
      ptsSurplus: 'अंक अतिरिक्त',
      statusCritical: 'गंभीर कमी',
      statusRemediation: 'उपचार आवश्यक',
      statusReady: 'उद्योग तैयार',
      syllabusRealityTitle: 'ITI पाठ्यक्रम बनाम वास्तविक औद्योगिक आवश्यकताएं',
      syllabusRealitySub: 'NCVT सेमेस्टर पाठ्यक्रम और कारखाने की वास्तविक आवश्यकताओं की तुलना।',
      taughtInSyllabus: 'मानक पाठ्यक्रम में वर्तमान में पढ़ाया जा रहा विषय',
      industryRequirement: 'उद्योग भर्ती आवश्यकता (चाकण/पुणे)',
      actionPlanLabel: 'कार्य योजना:',
      pathwayTitle: 'व्यक्तिगत सुधार एवं प्रमाणन मार्ग',
      pathwaySub: 'प्लेसमेंट से पूर्व हाई-वोल्टेज और CAN-bus कौशल अंतराल को दूर करने हेतु तैयार क्रम।',
      stepTypeLabel: 'प्रकार:',
      stepDurationLabel: 'अवधि:',
      stepOfferedByLabel: 'प्रदाता:',
      evalTranscriptsTitle: 'मूल्यांकन अंकतालिका एवं कार्यशाला रिकॉर्ड',
      evalTranscriptsSub: 'आधिकारिक DVET सेमेस्टर परीक्षा और व्यावहारिक कार्यशाला परीक्षण रिकॉर्ड।',
      colEvalModule: 'मूल्यांकन मॉड्यूल',
      colExamDate: 'परीक्षा तिथि',
      colVerifiedScore: 'सत्यापित स्कोर',
      colResult: 'परिणाम',
      colBadge: 'बैज',
      skillsMatchSuffix: 'कौशल मिलान',
      stipendSalaryLabel: 'वजीफा / वेतन',
      matchedCompetenciesLabel: 'सुमेलित क्षमताएं:',
      remainingRequirementLabel: 'शेष आवश्यकता:',
      applyNowBtn: 'अभी आवेदन करें',
    },
  };
  const str = i18n[language] || i18n.en;

  return (
    <DashboardLayout
      role="student"
      roleTitle="Vocational Trainee Portal"
      menuItems={menuItems}
      activeTab={activeTab}
      onSelectTab={setActiveTab}
      onNavigate={onNavigate}
    >
      {/* 1. OVERVIEW (DASHBOARD HOME) */}
      {activeTab === 'overview' && (
        <div className="space-y-4 sm:space-y-6 min-w-0">
          {/* Welcome Banner */}
          <div className="bg-white p-4 sm:p-6 rounded-lg border border-[#DDE3E8] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 min-w-0">
            <div className="min-w-0 flex-1">
              <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#E8F1F8] text-[#0056A6] border border-[#DDE3E8]">
                {str.enrollment}: {user?.id || 'STU-2026-MH402'}
              </span>
              <h2 className="text-lg sm:text-2xl font-black text-[#003B70] mt-1.5 break-words">
                {str.welcome}, {user?.name || 'Candidate Trainee'}
              </h2>
              <p className="text-xs text-[#666666] mt-0.5 break-words">
                {user?.trade || 'Electrician & EV Technician'} &middot; {user?.institute || 'Model Industrial Training Institute'}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="px-2.5 sm:px-3 py-1 rounded bg-[#E8F1F8] text-[#0056A6] text-xs font-bold border border-[#DDE3E8]">
                {str.readyBadge}
              </span>
            </div>
          </div>

          {/* Quick Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 min-w-0">
            <StatCard
              title={str.verifiedTitle}
              value="4 / 6 Core"
              subtext={str.verifiedSub}
              trend="+1 Verified"
              badgeText="Active"
              badgeColor="blue"
            />
            <StatCard
              title={str.stateScoreTitle}
              value="78 / 100"
              subtext={str.stateScoreSub}
              trend="+6 pts vs avg"
              badgeText="Passed"
              badgeColor="emerald"
            />
            <StatCard
              title={str.pathStatusTitle}
              value="Step 1 of 4"
              subtext={str.pathStatusSub}
              badgeText="60% Done"
              badgeColor="amber"
            />
            <StatCard
              title={str.shortlistsTitle}
              value="3 Companies"
              subtext={str.shortlistsSub}
              badgeText="Interview Ready"
              badgeColor="blue"
            />
          </div>

          {/* Skill Gap Snapshot Preview & Quick Links */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 min-w-0">
            {/* Radar Preview */}
            <div className="lg:col-span-7 bg-white p-4 sm:p-5 rounded-lg border border-[#DDE3E8] shadow-2xs space-y-4 min-w-0 overflow-hidden">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#003B70]">
                    {str.snapshotTitle}
                  </h3>
                  <p className="text-xs text-[#666666]">
                    {str.snapshotSub}
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('skill-gap')}
                  className="text-xs text-[#0056A6] font-bold hover:text-[#003B70] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {str.fullAnalysis}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <GovRadarChart data={STUDENT_SKILL_RADAR} height={280} />
            </div>

            {/* Quick Actions & Sub-Pages Navigation */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white p-5 rounded-lg border border-[#DDE3E8] shadow-2xs space-y-3">
                <h3 className="text-sm font-bold text-[#003B70]">
                  {str.priorityActions}
                </h3>

                <div
                  onClick={() => setActiveTab('learning-path')}
                  className="p-3 rounded-lg border border-[#DDE3E8] bg-[#E8F1F8] hover:bg-[#E8F1F8]/80 transition-colors cursor-pointer space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0056A6]">
                      {str.resume800v}
                    </span>
                    <span className="text-[10px] font-bold bg-[#F28C28] text-white px-1.5 py-0.2 rounded">
                      {str.criticalBadge}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#0056A6]">
                    {str.resume800vSub}
                  </p>
                </div>

                <div
                  onClick={() => setActiveTab('assessments')}
                  className="p-3 rounded-lg border border-[#DDE3E8] bg-[#F7F8FA] hover:bg-[#E8F1F8] transition-colors cursor-pointer space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#222222]">
                      {str.bmsBenchTest}
                    </span>
                    <span className="text-[10px] font-bold bg-[#DDE3E8] text-[#222222] px-1.5 py-0.2 rounded">
                      {str.scheduledBadge}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#666666]">
                    {str.bmsLabSub}
                  </p>
                </div>

                <div
                  onClick={() => setActiveTab('placements')}
                  className="p-3 rounded-lg border border-[#DDE3E8] bg-[#F7F8FA] hover:bg-[#E8F1F8] transition-colors cursor-pointer space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#222222]">
                      {str.matchedApprenticeships}
                    </span>
                    <span className="text-[10px] font-bold bg-[#0056A6] text-white px-1.5 py-0.2 rounded">
                      {str.match92Badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#666666]">
                    {str.matchedSub}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI JOB MATCH ANALYZER */}
      {activeTab === 'ai-job-analyzer' && (
        <AiJobAnalyzerWidget mode="student" selectedDistrict={user?.district || 'Pune'} />
      )}

      {/* 2. SKILL GAP ANALYSIS */}
      {activeTab === 'skill-gap' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 bg-white p-5 rounded-lg border border-[#DDE3E8] shadow-2xs space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#003B70]">
                  {str.radarTitle}
                </h3>
                <p className="text-xs text-[#666666]">
                  {str.radarSub}
                </p>
              </div>
              <GovRadarChart data={STUDENT_SKILL_RADAR} height={340} />
            </div>

            <div className="lg:col-span-6 bg-white p-5 rounded-lg border border-[#DDE3E8] shadow-2xs space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#003B70]">
                  {str.targetVsCurrentTitle}
                </h3>
                <p className="text-xs text-[#666666]">
                  {str.targetVsCurrentSub}
                </p>
              </div>
              <GovBarChart
                data={STUDENT_SKILL_RADAR}
                xKey="skill"
                height={340}
                bars={[
                  { key: 'studentScore', label: str.yourScoreBar, color: '#0056A6' },
                  { key: 'industryTarget', label: str.industryBenchmarkBar, color: '#F28C28' },
                ]}
              />
            </div>
          </div>

          {/* Diagnostic Action Recommendation Table */}
          <div className="bg-white rounded-lg border border-[#DDE3E8] shadow-2xs overflow-hidden">
            <div className="p-4 bg-[#F7F8FA] border-b border-[#DDE3E8]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#003B70]">
                {str.detailedDiagnosticsTitle}
              </h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#E8F1F8] text-[#003B70] font-bold uppercase text-[11px] border-b border-[#DDE3E8]">
                    <th className="py-3 px-4">{str.colCompetency}</th>
                    <th className="py-3 px-4">{str.colYourScore}</th>
                    <th className="py-3 px-4">{str.colIndustryRequired}</th>
                    <th className="py-3 px-4">{str.colDeficitGap}</th>
                    <th className="py-3 px-4">{str.colStatus}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDE3E8]">
                  {STUDENT_SKILL_RADAR.map((item, idx) => {
                    const gap = item.industryTarget - item.studentScore;
                    return (
                      <tr key={idx} className="hover:bg-[#F7F8FA] transition-colors">
                        <td className="py-3 px-4 font-bold text-[#222222]">{item.skill}</td>
                        <td className="py-3 px-4 font-mono font-semibold text-[#0056A6]">{item.studentScore}/100</td>
                        <td className="py-3 px-4 font-mono text-[#666666]">{item.industryTarget}/100</td>
                        <td className="py-3 px-4 font-mono font-bold">
                          {gap > 0 ? (
                            <span className="text-[#C62828]">-{gap} {str.ptsDeficit}</span>
                          ) : (
                            <span className="text-[#198754]">+{Math.abs(gap)} {str.ptsSurplus}</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <StatusBadge
                            status={gap > 25 ? str.statusCritical : gap > 0 ? str.statusRemediation : str.statusReady}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. COURSE VS INDUSTRY COMPARISON */}
      {activeTab === 'curriculum-compare' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-[#DDE3E8] shadow-2xs overflow-hidden">
            <div className="p-4 bg-[#F7F8FA] border-b border-[#DDE3E8] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#003B70]">
                  {str.syllabusRealityTitle}
                </h3>
                <p className="text-xs text-[#666666]">
                  {str.syllabusRealitySub}
                </p>
              </div>
            </div>

            <div className="divide-y divide-[#DDE3E8]">
              {STUDENT_COURSE_VS_INDUSTRY.map((item, i) => (
                <div key={i} className="p-5 hover:bg-[#F7F8FA] transition-colors space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="text-sm font-bold text-[#003B70]">
                      {item.module}
                    </h4>
                    <StatusBadge status={item.gapLevel} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-3 bg-[#F7F8FA] rounded border border-[#DDE3E8]">
                      <div className="text-[10px] font-bold text-[#666666] uppercase tracking-wider">
                        {str.taughtInSyllabus}
                      </div>
                      <div className="text-[#222222] mt-1 font-medium">
                        {item.taughtStatus}
                      </div>
                    </div>

                    <div className="p-3 bg-[#E8F1F8] rounded border border-[#DDE3E8]">
                      <div className="text-[10px] font-bold text-[#0056A6] uppercase tracking-wider">
                        {str.industryRequirement}
                      </div>
                      <div className="text-[#003B70] mt-1 font-semibold">
                        {item.industryRequirement}
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-[#666666] flex items-center gap-1.5 pt-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#0056A6]" />
                    <span><strong>{str.actionPlanLabel}</strong> {item.recommendation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. LEARNING PATH RECOMMENDATIONS */}
      {activeTab === 'learning-path' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-[#DDE3E8] shadow-2xs space-y-6">
            <div>
              <h3 className="text-sm font-bold text-[#003B70]">
                {str.pathwayTitle}
              </h3>
              <p className="text-xs text-[#666666]">
                {str.pathwaySub}
              </p>
            </div>

            <div className="space-y-4">
              {STUDENT_LEARNING_PATH.map(step => (
                <div
                  key={step.step}
                  className="flex items-start gap-4 p-4 rounded-lg border border-[#DDE3E8] bg-white hover:border-[#0056A6] transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-[#0056A6] text-white font-bold text-xs flex items-center justify-center shrink-0 border border-[#0056A6]">
                    0{step.step}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="text-sm font-bold text-[#003B70]">
                        {step.title}
                      </h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F7F8FA] text-[#222222] border border-[#DDE3E8] self-start sm:self-auto">
                        {step.status}
                      </span>
                    </div>

                    <div className="text-xs text-[#666666] flex flex-wrap items-center gap-4">
                      <span>{str.stepTypeLabel} <strong>{step.type}</strong></span>
                      <span>{str.stepDurationLabel} <strong>{step.duration}</strong></span>
                      <span>{str.stepOfferedByLabel} <strong>{step.provider}</strong></span>
                    </div>
                  </div>

                  <button className="px-3.5 py-1.5 rounded bg-[#F28C28] hover:bg-[#D96B1F] text-white text-xs font-semibold shrink-0 cursor-pointer border border-[#F28C28] transition-colors">
                    {step.actionText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. ASSESSMENTS & PROGRESS TRACKER */}
      {activeTab === 'assessments' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-[#DDE3E8] shadow-2xs overflow-hidden">
            <div className="p-4 bg-[#F7F8FA] border-b border-[#DDE3E8] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#003B70]">
                  {str.evalTranscriptsTitle}
                </h3>
                <p className="text-xs text-[#666666]">
                  {str.evalTranscriptsSub}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#E8F1F8] text-[#003B70] font-bold uppercase text-[11px] border-b border-[#DDE3E8]">
                    <th className="py-3 px-4">{str.colEvalModule}</th>
                    <th className="py-3 px-4">{str.colExamDate}</th>
                    <th className="py-3 px-4">{str.colVerifiedScore}</th>
                    <th className="py-3 px-4">{str.colResult}</th>
                    <th className="py-3 px-4">{str.colBadge}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDE3E8]">
                  {STUDENT_ASSESSMENTS.map(item => (
                    <tr key={item.id} className="hover:bg-[#F7F8FA] transition-colors">
                      <td className="py-3 px-4 font-bold text-[#222222]">{item.title}</td>
                      <td className="py-3 px-4 text-[#666666]">{item.date}</td>
                      <td className="py-3 px-4 font-mono font-bold text-[#003B70]">{item.score}</td>
                      <td className="py-3 px-4">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E8F1F8] text-[#0056A6] border border-[#DDE3E8]">
                          {item.badge}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 6. PLACEMENT INSIGHTS */}
      {activeTab === 'placements' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STUDENT_PLACEMENT_INSIGHTS.map((rec, i) => (
              <div
                key={i}
                className="bg-white rounded-lg border border-[#DDE3E8] p-5 shadow-2xs flex flex-col justify-between space-y-4 hover:border-[#0056A6] transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#198754]/10 text-[#198754] border border-[#198754]/30">
                      {rec.matchPercentage}% {str.skillsMatchSuffix}
                    </span>
                    <span className="text-[10px] text-[#666666] font-medium">{rec.plant}</span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-[#003B70]">
                      {rec.company}
                    </h4>
                    <p className="text-xs font-semibold text-[#0056A6] mt-0.5">
                      {rec.role}
                    </p>
                  </div>

                  <div className="text-xs bg-[#F7F8FA] p-2.5 rounded border border-[#DDE3E8]">
                    <div className="text-[10px] text-[#666666]">{str.stipendSalaryLabel}</div>
                    <div className="font-bold text-[#222222] mt-0.5">{rec.stipendSalary}</div>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="text-[10px] font-bold text-[#666666] uppercase tracking-wider">
                      {str.matchedCompetenciesLabel}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {rec.keySkillsMatch.map((s, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 rounded text-[10px] bg-[#198754]/10 text-[#198754] border border-[#198754]/30 font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-[#C62828] bg-[#C62828]/10 p-2 rounded border border-[#C62828]/30">
                    <span className="font-bold">{str.remainingRequirementLabel}</span> {rec.gapRequirement}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#DDE3E8] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#666666]">{rec.applicationStatus}</span>
                  <button className="px-3.5 py-1.5 rounded bg-[#F28C28] hover:bg-[#D96B1F] text-white text-xs font-bold cursor-pointer border border-[#F28C28] transition-colors">
                    {str.applyNowBtn}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default StudentPortalPage;
