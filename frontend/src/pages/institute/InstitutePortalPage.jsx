import React, { useState } from 'react';
import {
  Users,
  BookOpen,
  GitPullRequest,
  Award,
  Wrench,
  Plus,
  Trash2,
  Sparkles,
} from 'lucide-react';
import { DashboardLayout } from '../../layouts/DashboardLayout.jsx';
import { DataTable } from '../../components/common/DataTable.jsx';
import { StatusBadge } from '../../components/common/StatusBadge.jsx';
import { StatCard } from '../../components/common/StatCard.jsx';
import { AiJobAnalyzerWidget } from '../../components/common/AiJobAnalyzerWidget.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import {
  INITIAL_STUDENTS_ROSTER,
  INSTITUTE_CURRICULUM_ANALYSIS,
  INSTITUTE_TRAINERS_ROSTER,
  INSTITUTE_INFRASTRUCTURE_PLANS,
} from '../../data/mockData.js';

export const InstitutePortalPage = ({ onNavigate, selectedDistrict = 'Pune' }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('students');
  const [students, setStudents] = useState(INITIAL_STUDENTS_ROSTER);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    trade: 'Electrician & EV',
    batch: '2024-2026',
    attendance: '90%',
    competencyScore: 75,
    status: 'Active',
    placementReady: 'Medium',
  });

  const i18n = {
    en: {
      totalEnrolled: 'Total Enrolled Trainees',
      sessionSub: 'Academic Session 2024-2026',
      avgAttendance: 'Average Attendance',
      attendanceSub: 'Mandatory biometric threshold: 80%',
      placementCohort: 'Placement Ready Cohort',
      placementCohortVal: (n) => `${n} Trainees`,
      placementSub: 'Ready for immediate apprentice hiring',
      remediationFlagged: 'Remediation Flagged',
      remediationSub: 'Scheduled for practical lab clinics',
      enrollBtn: 'Enroll New Trainee',
      searchPlaceholder: 'Search students by name or trade...',
      enrollModalTitle: 'Enroll New ITI Trainee',
      fullName: 'Full Name',
      tradeLabel: 'Vocational Trade',
      batchLabel: 'Batch',
      attendanceLabel: 'Attendance %',
      cancelBtn: 'Cancel',
      saveRecordBtn: 'Save Trainee Record',
      currHeading: 'Departmental Trade Curriculum vs. Industrial Demand Mapping',
      currSub: 'Evaluation of taught syllabus units against live Chakan & MIDC industrial requirements.',
      demandLabel: 'Demand',
      deficitDiagnostic: 'Deficit Diagnostic',
      recommendedAction: 'Recommended Action',
      alignHeading: 'Course Alignment Directives · DVET State Skill Committee',
      alignSub: 'Mandatory syllabus adjustments approved under Maharashtra Dual System of Training (DST) framework.',
      deployToSyllabus: 'Deploy to Syllabus',
      scheduleLab: 'Schedule Lab Setup',
      trainersHeading: 'Faculty & Master Instructor Workload',
      trainersSub: 'Certified vocational trainers assigned to active batches at Model Vocational ITI.',
      batches: 'Batches',
      trainees: 'Trainees',
      rating: 'Rating',
      machinery: 'Machinery',
      estCost: 'Estimated Cost',
      fundingSource: 'Funding Source',
      target: 'Target',
      colId: 'ID',
      colName: 'Student Name',
      colTrade: 'Trade / Program',
      colBatch: 'Batch',
      colAttendance: 'Attendance',
      colCompetency: 'Competency',
      colStatus: 'Academic Status',
      colReadiness: 'Hiring Readiness',
      colActions: 'Actions',
    },
    mr: {
      totalEnrolled: 'एकूण नोंदणीकृत प्रशिक्षणार्थी',
      sessionSub: 'शैक्षणिक सत्र २०२४-२०२६',
      avgAttendance: 'सरासरी उपस्थिती',
      attendanceSub: 'बायोमेट्रिक किमान मर्यादा: ८०%',
      placementCohort: 'रोजगार सज्ज तुकडी',
      placementCohortVal: (n) => `${n} प्रशिक्षणार्थी`,
      placementSub: 'थेट शिकाऊ उमेदवारीसाठी पात्र',
      remediationFlagged: 'अतिरिक्त मार्गदर्शन आवश्यक',
      remediationSub: 'प्रात्यक्षिक प्रयोगशाळा कार्यशाळा निश्चित',
      enrollBtn: 'नवीन प्रशिक्षणार्थी नोंदणी',
      searchPlaceholder: 'नाव किंवा व्यवसायानुसार शोधा...',
      enrollModalTitle: 'नवीन ITI प्रशिक्षणार्थी नोंदणी',
      fullName: 'पूर्ण नाव',
      tradeLabel: 'व्यावसायिक ट्रेड',
      batchLabel: 'तुकडी (बॅच)',
      attendanceLabel: 'उपस्थिती %',
      cancelBtn: 'रद्द करा',
      saveRecordBtn: 'प्रशिक्षणार्थी जतन करा',
      currHeading: 'विभागीय अभ्यासक्रम वि. औद्योगिक मागणी विश्लेषण',
      currSub: 'चाकण आणि एमआयडीसी उद्योग गरजांनुसार अभ्यासक्रम घटकांचे मूल्यमापन.',
      demandLabel: 'मागणी',
      deficitDiagnostic: 'तूट विश्लेषण',
      recommendedAction: 'शिफारस केलेली कृती',
      alignHeading: 'अभ्यासक्रम संरेखन निर्देश · DVET राज्य कौशल्य समिती',
      alignSub: 'महाराष्ट्र दुहेरी प्रशिक्षण प्रणाली (DST) अंतर्गत मंजूर अभ्यासक्रम सुधारणा.',
      deployToSyllabus: 'अभ्यासक्रमात समाविष्ट करा',
      scheduleLab: 'प्रयोगशाळा नियोजन करा',
      trainersHeading: 'प्रशिक्षक व मार्गदर्शक कार्यभार व्यवस्थापन',
      trainersSub: 'मॉडेल आयटीआयमधील सक्रिय तुकड्यांसाठी नेमलेले प्रमाणित प्रशिक्षक.',
      batches: 'तुकड्या',
      trainees: 'प्रशिक्षणार्थी',
      rating: 'रेटिंग',
      machinery: 'यंत्रसामग्री',
      estCost: 'अंदाजे खर्च',
      fundingSource: 'निधी स्त्रोत',
      target: 'लक्ष्य वेळ',
      colId: 'क्रमांक',
      colName: 'विद्यार्थ्याचे नाव',
      colTrade: 'व्यवसाय / अभ्यासक्रम',
      colBatch: 'तुकडी',
      colAttendance: 'उपस्थिती',
      colCompetency: 'सक्षमता',
      colStatus: 'शैक्षणिक स्थिती',
      colReadiness: 'रोजगार सज्जता',
      colActions: 'कृती',
    },
    hi: {
      totalEnrolled: 'कुल नामांकित छात्र',
      sessionSub: 'अकादमिक सत्र 2024-2026',
      avgAttendance: 'औसत उपस्थिति',
      attendanceSub: 'अनिवार्य बायोमेट्रिक सीमा: 80%',
      placementCohort: 'प्लेसमेंट हेतु तैयार बैच',
      placementCohortVal: (n) => `${n} प्रशिक्षु`,
      placementSub: 'तत्काल शिक्षुता हेतु तैयार',
      remediationFlagged: 'उपचारात्मक मार्गदर्शन चिह्नित',
      remediationSub: 'व्यावहारिक लैब कार्यशाला निर्धारित',
      enrollBtn: 'नया प्रशिक्षु नामांकित करें',
      searchPlaceholder: 'नाम या ट्रेड के अनुसार खोजें...',
      enrollModalTitle: 'नया आईटीआई प्रशिक्षु नामांकित करें',
      fullName: 'पूरा नाम',
      tradeLabel: 'व्यावसायिक ट्रेड',
      batchLabel: 'बैच',
      attendanceLabel: 'उपस्थिति %',
      cancelBtn: 'रद्द करें',
      saveRecordBtn: 'प्रशिक्षु विवरण सहेजें',
      currHeading: 'विभागीय पाठ्यक्रम बनाम औद्योगिक मांग विश्लेषण',
      currSub: 'चाकण और एमआईडीसी उद्योग आवश्यकताओं के अनुसार पाठ्यक्रम मूल्यांकन।',
      demandLabel: 'मांग',
      deficitDiagnostic: 'कमी विश्लेषण',
      recommendedAction: 'अनुशंसित कार्रवाई',
      alignHeading: 'पाठ्यक्रम संरेखण निर्देश · DVET राज्य कौशल समिति',
      alignSub: 'महाराष्ट्र दोहरी प्रशिक्षण प्रणाली (DST) के तहत अनुमोदित पाठ्यक्रम सुधार।',
      deployToSyllabus: 'पाठ्यक्रम में लागू करें',
      scheduleLab: 'प्रयोगशाला स्थापना निर्धारित करें',
      trainersHeading: 'संकाय एवं मास्टर प्रशिक्षक कार्यभार प्रबंधन',
      trainersSub: 'मॉडल आईटीआई में सक्रिय बैचों के लिए नियुक्त प्रमाणित प्रशिक्षक।',
      batches: 'बैच',
      trainees: 'प्रशिक्षु',
      rating: 'रेटिंग',
      machinery: 'मशीनरी',
      estCost: 'अनुमानित लागत',
      fundingSource: 'वित्तपोषण स्रोत',
      target: 'लक्ष्य तिथि',
      colId: 'आईडी',
      colName: 'छात्र का नाम',
      colTrade: 'ट्रेड / पाठ्यक्रम',
      colBatch: 'बैच',
      colAttendance: 'उपस्थिति',
      colCompetency: 'क्षमता',
      colStatus: 'शैक्षणिक स्थिति',
      colReadiness: 'रोजगार तत्परता',
      colActions: 'कार्रवाई',
    },
  };
  const str = i18n[language] || i18n.en;

  const menuItems = [
    { id: 'students', label: 'Manage Students', icon: Users, badge: `${students.length}` },
    { id: 'job-analyzer', label: 'AI Job & Demand Analyzer', icon: Sparkles, badge: 'Gemini AI' },
    { id: 'curriculum', label: 'Curriculum Analysis', icon: BookOpen },
    { id: 'alignment', label: 'Course Alignment', icon: GitPullRequest },
    { id: 'trainers', label: 'Trainer Management', icon: Award },
    { id: 'infrastructure', label: 'Infrastructure Planning', icon: Wrench },
  ];

  // Student CRUD
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudent.name) return;
    const created = {
      ...newStudent,
      id: `STU-${Math.floor(100 + Math.random() * 900)}`,
    };
    setStudents(prev => [created, ...prev]);
    setIsAddModalOpen(false);
    setNewStudent({
      name: '',
      trade: 'Electrician & EV',
      batch: '2024-2026',
      attendance: '90%',
      competencyScore: 75,
      status: 'Active',
      placementReady: 'Medium',
    });
  };

  const handleDeleteStudent = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const studentColumns = [
    { key: 'id', label: str.colId, sortable: true, cellClassName: 'font-mono font-bold text-slate-700' },
    { key: 'name', label: str.colName, sortable: true, cellClassName: 'font-bold text-slate-900' },
    { key: 'trade', label: str.colTrade, sortable: true },
    { key: 'batch', label: str.colBatch, sortable: true },
    { key: 'attendance', label: str.colAttendance, sortable: true, cellClassName: 'font-semibold' },
    {
      key: 'competencyScore',
      label: str.colCompetency,
      sortable: true,
      render: (val) => (
        <div className="flex items-center gap-1.5">
          <span className="font-bold">{val}%</span>
          <div className="w-12 bg-[#F7F8FA] border border-[#DDE3E8] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#0056A6] h-full" style={{ width: `${val}%` }} />
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      label: str.colStatus,
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: 'placementReady',
      label: str.colReadiness,
      render: (val) => <StatusBadge status={val} text={val === 'Ready' ? (language === 'mr' ? 'थेट सज्ज' : language === 'hi' ? 'सीधे तैयार' : 'Direct Ready') : val} />,
    },
    {
      key: 'actions',
      label: str.colActions,
      render: (_, row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteStudent(row.id);
          }}
          className="text-[#C62828] hover:text-[#C62828]/80 p-1 cursor-pointer"
          title="Delete student"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      ),
    },
  ];

  return (
    <DashboardLayout
      role="institute"
      roleTitle="Institute Administration Suite"
      menuItems={menuItems}
      activeTab={activeTab}
      onSelectTab={setActiveTab}
      onNavigate={onNavigate}
    >
      {/* 1. MANAGE STUDENTS (CRUD) */}
      {activeTab === 'students' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title={str.totalEnrolled}
              value={students.length}
              subtext={str.sessionSub}
              badgeText="Model ITI"
              badgeColor="blue"
            />
            <StatCard
              title={str.avgAttendance}
              value="91.4%"
              subtext={str.attendanceSub}
              trend="+2.1%"
              badgeColor="emerald"
            />
            <StatCard
              title={str.placementCohort}
              value={str.placementCohortVal(4)}
              subtext={str.placementSub}
              badgeText="Evaluated"
              badgeColor="emerald"
            />
            <StatCard
              title={str.remediationFlagged}
              value={str.placementCohortVal(2)}
              subtext={str.remediationSub}
              badgeText="Action Req."
              badgeColor="rose"
            />
          </div>

          <DataTable
            columns={studentColumns}
            data={students}
            searchKey="name"
            searchPlaceholder={str.searchPlaceholder}
            pageSize={6}
            actionButton={
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-3.5 py-1.5 bg-[#F28C28] hover:bg-[#D96B1F] text-white rounded text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer border border-[#F28C28] shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5 text-white" />
                <span>{str.enrollBtn}</span>
              </button>
            }
          />

          {/* Add Student Modal */}
          {isAddModalOpen && (
            <div className="fixed inset-0 z-50 bg-[#222222]/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-lg border border-[#DDE3E8] shadow-xl max-w-md w-full p-6 space-y-4">
                <div className="border-b border-[#DDE3E8] pb-3 flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#003B70]">
                    {str.enrollModalTitle}
                  </h3>
                  <button
                    onClick={() => setIsAddModalOpen(false)}
                    className="text-slate-400 hover:text-slate-700 text-sm font-bold cursor-pointer"
                  >
                    &times;
                  </button>
                </div>

                <form onSubmit={handleAddStudent} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {str.fullName}
                    </label>
                    <input
                      type="text"
                      required
                      value={newStudent.name}
                      onChange={e => setNewStudent({ ...newStudent, name: e.target.value })}
                      placeholder="e.g. Trainee Full Name"
                      className="w-full px-3 py-2 border border-[#DDE3E8] rounded text-xs focus:border-[#0056A6] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#222222] mb-1">
                      {str.tradeLabel}
                    </label>
                    <select
                      value={newStudent.trade}
                      onChange={e => setNewStudent({ ...newStudent, trade: e.target.value })}
                      className="w-full px-3 py-2 border border-[#DDE3E8] rounded text-xs focus:border-[#0056A6] focus:outline-none"
                    >
                      <option value="Electrician & EV">Electrician &amp; EV Technician</option>
                      <option value="Machinist CNC">Machinist &amp; CNC Programming</option>
                      <option value="Solar Technician">Solar Technician</option>
                      <option value="IoT Technician">IoT Technician (Smart Mfg)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-[#222222] mb-1">
                        {str.batchLabel}
                      </label>
                      <input
                        type="text"
                        value={newStudent.batch}
                        onChange={e => setNewStudent({ ...newStudent, batch: e.target.value })}
                        className="w-full px-3 py-2 border border-[#DDE3E8] rounded text-xs focus:border-[#0056A6] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#222222] mb-1">
                        {str.attendanceLabel}
                      </label>
                      <input
                        type="text"
                        value={newStudent.attendance}
                        onChange={e => setNewStudent({ ...newStudent, attendance: e.target.value })}
                        className="w-full px-3 py-2 border border-[#DDE3E8] rounded text-xs focus:border-[#0056A6] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-3 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddModalOpen(false)}
                      className="px-3 py-1.5 border border-[#DDE3E8] rounded text-[#666666] hover:bg-[#F7F8FA] cursor-pointer"
                    >
                      {str.cancelBtn}
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#0056A6] hover:bg-[#003B70] text-white font-bold rounded cursor-pointer border border-[#0056A6] transition-colors"
                    >
                      {str.saveRecordBtn}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. AI JOB & DEMAND ANALYZER */}
      {activeTab === 'job-analyzer' && (
        <AiJobAnalyzerWidget mode="institute" selectedDistrict={selectedDistrict} />
      )}

      {/* 3. CURRICULUM ANALYSIS */}
      {activeTab === 'curriculum' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-[#DDE3E8] shadow-2xs overflow-hidden">
            <div className="p-4 bg-[#F7F8FA] border-b border-[#DDE3E8]">
              <h3 className="text-sm font-bold text-[#003B70]">
                {str.currHeading}
              </h3>
              <p className="text-xs text-[#666666]">
                {str.currSub}
              </p>
            </div>

            <div className="divide-y divide-[#DDE3E8]">
              {INSTITUTE_CURRICULUM_ANALYSIS.map((item, idx) => (
                <div key={idx} className="p-5 hover:bg-[#F7F8FA] transition-colors space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#003B70]">{item.trade}</span>
                      <span className="text-xs text-[#0056A6] font-bold">{str.demandLabel}: {item.demandScore}/100</span>
                    </div>
                    <StatusBadge status={item.urgency} />
                  </div>

                  <p className="text-xs font-semibold text-[#C62828] bg-[#C62828]/10 p-2.5 rounded border border-[#C62828]/20">
                    {str.deficitDiagnostic}: {item.marketDeficit}
                  </p>

                  <p className="text-xs text-[#222222] bg-[#E8F1F8] p-2.5 rounded border border-[#DDE3E8]">
                    {str.recommendedAction}: {item.actionRequired}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. COURSE ALIGNMENT RECOMMENDATIONS */}
      {activeTab === 'alignment' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-[#DDE3E8] shadow-2xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-[#003B70]">
                {str.alignHeading}
              </h3>
              <p className="text-xs text-[#666666]">
                {str.alignSub}
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-lg border border-[#DDE3E8] bg-[#E8F1F8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#003B70]">
                      Integrate 800V High-Voltage Safety into Electrician Trade (Sem 3)
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-white text-[#0056A6] border border-[#DDE3E8]">
                      Approved by DVET
                    </span>
                  </div>
                  <p className="text-xs text-[#666666] mt-1">
                    Adds 36 hours of simulated isolation switch drills before final trade certification.
                  </p>
                </div>
                <button className="px-3.5 py-1.5 bg-[#0056A6] hover:bg-[#003B70] text-white rounded text-xs font-bold shrink-0 cursor-pointer border border-[#0056A6] transition-colors">
                  {str.deployToSyllabus}
                </button>
              </div>

              <div className="p-4 rounded-lg border border-[#DDE3E8] bg-[#F7F8FA] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#003B70]">
                      Adopt Mastercam 2025 in Machinist &amp; Tool/Die Trades
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#E8F1F8] text-[#0056A6] border border-[#DDE3E8]">
                      Co-Funded by Tata Tech
                    </span>
                  </div>
                  <p className="text-xs text-[#666666] mt-1">
                    Transition 3-Axis manual mill teaching into 5-Axis toolpath simulation.
                  </p>
                </div>
                <button className="px-3.5 py-1.5 bg-[#F28C28] hover:bg-[#D96B1F] text-white rounded text-xs font-bold shrink-0 cursor-pointer border border-[#F28C28] transition-colors">
                  {str.scheduleLab}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. TRAINER MANAGEMENT */}
      {activeTab === 'trainers' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-[#DDE3E8] shadow-2xs overflow-hidden">
            <div className="p-4 bg-[#F7F8FA] border-b border-[#DDE3E8]">
              <h3 className="text-sm font-bold text-[#003B70]">
                {str.trainersHeading}
              </h3>
              <p className="text-xs text-[#666666]">
                {str.trainersSub}
              </p>
            </div>

            <div className="divide-y divide-[#DDE3E8]">
              {INSTITUTE_TRAINERS_ROSTER.map(trainer => (
                <div key={trainer.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F7F8FA] transition-colors">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-[#003B70]">{trainer.name}</h4>
                      <span className="text-[10px] font-mono text-[#666666]">({trainer.id})</span>
                    </div>
                    <p className="text-xs text-[#0056A6] font-semibold mt-0.5">{trainer.specialization}</p>
                    <p className="text-[11px] text-[#666666] mt-0.5">
                      Certification: {trainer.certification} &middot; Experience: {trainer.experience}
                    </p>
                  </div>

                  <div className="flex items-center gap-6 text-xs text-[#222222]">
                    <div className="text-center">
                      <div className="font-bold text-[#222222]">{trainer.activeBatches}</div>
                      <div className="text-[10px] text-[#666666]">{str.batches}</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-[#222222]">{trainer.traineesCount}</div>
                      <div className="text-[10px] text-[#666666]">{str.trainees}</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-[#198754]">{trainer.rating}/5.0</div>
                      <div className="text-[10px] text-[#666666]">{str.rating}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. INFRASTRUCTURE PLANNING */}
      {activeTab === 'infrastructure' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INSTITUTE_INFRASTRUCTURE_PLANS.map(plan => (
              <div key={plan.id} className="bg-white p-5 rounded-lg border border-[#DDE3E8] shadow-2xs space-y-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#E8F1F8] text-[#0056A6] border border-[#DDE3E8]">
                    {plan.id}
                  </span>
                  <h4 className="text-base font-bold text-[#003B70] mt-1">
                    {plan.facility}
                  </h4>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[#666666]">{str.machinery}:</span>
                    <p className="font-medium text-[#222222] mt-0.5">{plan.requiredEquipment}</p>
                  </div>
                  <div>
                    <span className="text-[#666666]">{str.estCost}:</span>
                    <p className="font-bold text-[#0056A6]">{plan.estimatedCost}</p>
                  </div>
                  <div>
                    <span className="text-[#666666]">{str.fundingSource}:</span>
                    <p className="font-medium text-[#222222]">{plan.fundingSource}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#DDE3E8] flex items-center justify-between text-xs">
                  <StatusBadge status={plan.status} />
                  <span className="text-[11px] text-[#666666]">{str.target}: {plan.deliveryTarget}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default InstitutePortalPage;
