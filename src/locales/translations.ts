export type Language = 'en' | 'mr' | 'hi';

export interface Translations {
  // Navigation
  appName: string;
  appSubtitle: string;
  decisionSupport: string;
  districtLabel: string;
  sectorLabel: string;
  resetDemoData: string;
  pilotTag: string;

  // Tabs
  navGovDashboard: string;
  navMarketIntel: string;
  navSkillGap: string;
  navCourseAlignment: string;
  navJobAnalyzer: string;
  navRecommendations: string;
  navDistrictPlan: string;
  navInstitutes: string;
  navEmployerFeedback: string;

  // Executive Dashboard
  govDashboardTitle: string;
  govDashboardSubtitle: string;
  liveSignals: string;
  filterSector: string;
  filterTimeframe: string;
  criticalSkillGaps: string;
  coursesNeedingUpdate: string;
  trainerShortage: string;
  labEquipmentReadiness: string;
  urgentIntervention: string;
  viewEvidence: string;
  interactiveMapTitle: string;
  interactiveMapSubtitle: string;
  skillDemandTrendTitle: string;
  skillDemandTrendSubtitle: string;
  supplyVsDemandTitle: string;
  supplyVsDemandSubtitle: string;
  viewRoleDrillDown: string;
  viewPolicyInterventions: string;
  downloadDistrictPlan: string;

  // Skill Gap & Market Intel
  demandScore: string;
  hiringScarcity: string;
  syllabusCoverage: string;
  gapSeverity: string;
  critical: string;
  high: string;
  medium: string;
  balanced: string;
  severityThresholdTitle: string;
  adjustThresholds: string;

  // Common UI
  selectDistrict: string;
  allDistricts: string;
  activeFilter: string;
  searchPlaceholder: string;
  close: string;
  executeNow: string;
  approved: string;
  pendingApproval: string;
  inProgress: string;
  completed: string;
  whyThisRecommendation: string;
  source: string;
  aiConnected: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'SkillIntel Maharashtra',
    appSubtitle: 'Labour Market Intelligence System',
    decisionSupport: 'Decision Support',
    districtLabel: 'District',
    sectorLabel: 'Sector',
    resetDemoData: 'Reset Baseline',
    pilotTag: 'SIH Pilot &middot; Pune EV Cluster',

    navGovDashboard: 'Gov Dashboard',
    navMarketIntel: 'Market Intel',
    navSkillGap: 'Skill Gap Matrix',
    navCourseAlignment: 'Course Alignment',
    navJobAnalyzer: 'AI Job Analyzer',
    navRecommendations: 'Action Plans',
    navDistrictPlan: 'District Plan',
    navInstitutes: 'ITI Institutes',
    navEmployerFeedback: 'Employer Feedback',

    govDashboardTitle: 'State Labour Market Intelligence',
    govDashboardSubtitle: 'Empirical skill deficit analytics and actionable resource planning across Maharashtra industrial zones.',
    liveSignals: 'Live Signals',
    filterSector: 'Sector',
    filterTimeframe: 'Timeframe',
    criticalSkillGaps: 'Critical Skill Gaps',
    coursesNeedingUpdate: 'Courses Needing Update',
    trainerShortage: 'Trainer Shortage',
    labEquipmentReadiness: 'Lab Equipment Readiness',
    urgentIntervention: 'Urgent Intervention',
    viewEvidence: 'View Evidence',
    interactiveMapTitle: 'Maharashtra Regional Industrial Map',
    interactiveMapSubtitle: 'Click any district to switch active labour-market filters.',
    skillDemandTrendTitle: 'Quarterly Competency Demand Trajectory',
    skillDemandTrendSubtitle: 'Net demand scores across high-voltage, BMS, and CNC competencies.',
    supplyVsDemandTitle: 'District ITI Annual Output vs. Industry Demand Gap',
    supplyVsDemandSubtitle: 'Demonstrating supply-demand mismatch in Pune EV Corridor.',
    viewRoleDrillDown: 'Role Drill-Down',
    viewPolicyInterventions: 'View Policy Interventions',
    downloadDistrictPlan: 'Download District Plan (PDF)',

    demandScore: 'Net Demand Score',
    hiringScarcity: 'Hiring Scarcity',
    syllabusCoverage: 'Course Syllabus Coverage',
    gapSeverity: 'Gap Severity',
    critical: 'Critical',
    high: 'High',
    medium: 'Medium',
    balanced: 'Balanced',
    severityThresholdTitle: 'Dynamic Policy Gap Thresholds',
    adjustThresholds: 'Adjust sliders to simulate emergency policy resource allocation.',

    selectDistrict: 'Select District',
    allDistricts: 'All Districts',
    activeFilter: 'Active',
    searchPlaceholder: 'Search skills, roles or tools...',
    close: 'Close',
    executeNow: 'Approve & Execute Plan',
    approved: 'Approved',
    pendingApproval: 'Pending Approval',
    inProgress: 'In Progress',
    completed: 'Completed',
    whyThisRecommendation: 'Why this recommendation?',
    source: 'Primary Empirical Source',
    aiConnected: 'Gemini AI Extractor Connected',
  },

  mr: {
    appName: 'कौशल्य-इंटेलीजन्स महाराष्ट्र',
    appSubtitle: 'कामगार बाजार बुद्धिमत्ता व निर्णय प्रणाली',
    decisionSupport: 'निर्णय सहाय्य',
    districtLabel: 'जिल्हा',
    sectorLabel: 'क्षेत्र',
    resetDemoData: 'डेमो रीसेट करा',
    pilotTag: 'महाराष्ट्र शासन &middot; पुणे ईव्ही क्लस्टर पायलट',

    navGovDashboard: 'शासन डॅशबोर्ड',
    navMarketIntel: 'बाजार बुद्धिमत्ता',
    navSkillGap: 'कौशल्य तफावत',
    navCourseAlignment: 'अभ्यासक्रम जुळवणी',
    navJobAnalyzer: 'एआय जॉब विश्लेषक',
    navRecommendations: 'कृती योजना',
    navDistrictPlan: 'जिल्हा कौशल्य योजना',
    navInstitutes: 'आयटीआय संस्था',
    navEmployerFeedback: 'उद्योजक अभिप्राय',

    govDashboardTitle: 'महाराष्ट्र राज्य कौशल्य व कामगार बाजार बुद्धिमत्ता',
    govDashboardSubtitle: 'महाराष्ट्रातील औद्योगिक पट्ट्यांमधील कौशल्य तफावतीचे वस्तुनिष्ठ विश्लेषण आणि कृती आराखडा.',
    liveSignals: 'थेट संकेत',
    filterSector: 'क्षेत्र निवडा',
    filterTimeframe: 'कालावधी',
    criticalSkillGaps: 'गंभीर कौशल्य तफावत',
    coursesNeedingUpdate: 'अपडेट आवश्यक अभ्यासक्रम',
    trainerShortage: 'प्रशिक्षक कमतरता',
    labEquipmentReadiness: 'प्रयोगशाळा सज्जता',
    urgentIntervention: 'तातडीची आवश्यकता',
    viewEvidence: 'पुरावा पहा',
    interactiveMapTitle: 'महाराष्ट्र प्रादेशिक औद्योगिक नकाशा',
    interactiveMapSubtitle: 'जिल्ह्यावर क्लिक करून त्या भागातील कौशल्य आकडेवारी पहा.',
    skillDemandTrendTitle: 'त्रैमासिक कौशल्य मागणी कल',
    skillDemandTrendSubtitle: 'हाय-व्होल्टेज, बीएमएस आणि सीएनसी कौशल्यांची वाढती मागणी.',
    supplyVsDemandTitle: 'आयटीआय वार्षिक पुरवठा वि. उद्योगांची प्रत्यक्ष मागणी',
    supplyVsDemandSubtitle: 'पुणे चाकण ऑटो पट्ट्यातील कुशल मनुष्यबळाची तूट दर्शवणारे विश्लेषण.',
    viewRoleDrillDown: 'सविस्तर पदनिहाय माहिती',
    viewPolicyInterventions: 'धोरणात्मक उपाययोजना पहा',
    downloadDistrictPlan: 'जिल्हा कौशल्य आराखडा डाउनलोड करा',

    demandScore: 'मागणी निर्देशांक',
    hiringScarcity: 'भरतीतील दुर्मिळता',
    syllabusCoverage: 'अभ्यासक्रम व्याप्ती',
    gapSeverity: 'तफावत तीव्रता',
    critical: 'गंभीर',
    high: 'उच्च',
    medium: 'मध्यम',
    balanced: 'संतुलित',
    severityThresholdTitle: 'गतिमान धोरण मर्यादा निकष',
    adjustThresholds: 'कौशल्य विकास निधी वाटपासाठी निकष बदला.',

    selectDistrict: 'जिल्हा निवडा',
    allDistricts: 'सर्व जिल्हे',
    activeFilter: 'सक्रिय',
    searchPlaceholder: 'कौशल्ये, पदे किंवा साधने शोधा...',
    close: 'बंद करा',
    executeNow: 'मंजूर करा व अंमलबजावणी करा',
    approved: 'मंजूर',
    pendingApproval: 'मंजुरी प्रलंबित',
    inProgress: 'प्रगतीपथावर',
    completed: 'पूर्ण',
    whyThisRecommendation: 'ही शिफारस का करण्यात आली?',
    source: 'प्राथमिक डेटा स्रोत',
    aiConnected: 'जेमिनी एआय विश्लेषक सक्रिय',
  },

  hi: {
    appName: 'कौशल-इंटेल महाराष्ट्र',
    appSubtitle: 'श्रम बाज़ार आसूचना एवं निर्णय प्रणाली',
    decisionSupport: 'निर्णय समर्थन',
    districtLabel: 'ज़िला',
    sectorLabel: 'क्षेत्र',
    resetDemoData: 'डेटा रीसेट करें',
    pilotTag: 'महाराष्ट्र शासन &middot; पुणे ईवी क्लस्टर पायलट',

    navGovDashboard: 'शासकीय डैशबोर्ड',
    navMarketIntel: 'बाज़ार आसूचना',
    navSkillGap: 'कौशल अंतराल',
    navCourseAlignment: 'पाठ्यक्रम संरेखण',
    navJobAnalyzer: 'एआई जॉब विश्लेषक',
    navRecommendations: 'कार्य योजनाएं',
    navDistrictPlan: 'ज़िला कौशल योजना',
    navInstitutes: 'आईटीआई संस्थान',
    navEmployerFeedback: 'नियोक्ता प्रतिक्रिया',

    govDashboardTitle: 'राज्य श्रम बाज़ार आसूचना एवं कौशल विश्लेषण',
    govDashboardSubtitle: 'महाराष्ट्र के औद्योगिक क्षेत्रों में कौशल अंतराल का प्रत्यक्ष डेटा विश्लेषण और संसाधन आवंटन।',
    liveSignals: 'लाइव संकेत',
    filterSector: 'क्षेत्र चुनें',
    filterTimeframe: 'समय सीमा',
    criticalSkillGaps: 'गंभीर कौशल अंतराल',
    coursesNeedingUpdate: 'अपडेट योग्य पाठ्यक्रम',
    trainerShortage: 'प्रशिक्षक कमी',
    labEquipmentReadiness: 'प्रयोगशाला तत्परता',
    urgentIntervention: 'अति आवश्यक',
    viewEvidence: 'साक्ष्य देखें',
    interactiveMapTitle: 'महाराष्ट्र क्षेत्रीय औद्योगिक मानचित्र',
    interactiveMapSubtitle: 'सक्रिय श्रम बाज़ार विश्लेषण देखने के लिए किसी भी ज़िले पर क्लिक करें।',
    skillDemandTrendTitle: 'तिमाही कौशल मांग प्रक्षेपवक्र',
    skillDemandTrendSubtitle: 'हाई-वोल्टेज, बीएमएस और सीएनसी कौशलों की मांग में वृद्धि।',
    supplyVsDemandTitle: 'आईटीआई वार्षिक आपूर्ति बनाम उद्योग मांग अंतराल',
    supplyVsDemandSubtitle: 'पुणे चाकण ऑटो क्लस्टर में कुशल जनशक्ति की कमी का विश्लेषण।',
    viewRoleDrillDown: 'पद अनुसार विस्तृत विवरण',
    viewPolicyInterventions: 'नीतिगत हस्तक्षेप देखें',
    downloadDistrictPlan: 'ज़िला कार्य योजना डाउनलोड करें',

    demandScore: 'मांग स्कोर',
    hiringScarcity: 'भर्ती में कमी',
    syllabusCoverage: 'पाठ्यक्रम कवरेज',
    gapSeverity: 'अंतराल गंभीरता',
    critical: 'गंभीर',
    high: 'उच्च',
    medium: 'मध्यम',
    balanced: 'संतुलित',
    severityThresholdTitle: 'गतिशील नीतिगत अंतराल सीमाएं',
    adjustThresholds: 'संसाधन आवंटन का अनुकरण करने के लिए स्लाइडर समायोजित करें।',

    selectDistrict: 'ज़िला चुनें',
    allDistricts: 'सभी ज़िले',
    activeFilter: 'सक्रिय',
    searchPlaceholder: 'कौशल, पद या उपकरण खोजें...',
    close: 'बंद करें',
    executeNow: 'स्वीकृत करें और लागू करें',
    approved: 'स्वीकृत',
    pendingApproval: 'स्वीकृति लंबित',
    inProgress: 'प्रगति पर',
    completed: 'पूर्ण',
    whyThisRecommendation: 'यह अनुशंसा क्यों की गई?',
    source: 'प्राथमिक साक्ष्य स्रोत',
    aiConnected: 'जेमिनी एआई विश्लेषक कनेक्टेड',
  },
};
