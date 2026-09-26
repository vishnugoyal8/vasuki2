import React, { useState } from 'react';
import {
  Briefcase,
  Tag,
  MessageSquarePlus,
  Search,
  Plus,
  CheckCircle2,
  MapPin,
  Send,
} from 'lucide-react';
import { DashboardLayout } from '../../layouts/DashboardLayout.jsx';
import { StatCard } from '../../components/common/StatCard.jsx';
import { StatusBadge } from '../../components/common/StatusBadge.jsx';
import {
  INITIAL_EMPLOYER_JOBS,
  EMPLOYER_TALENT_CANDIDATES,
} from '../../data/mockData.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';

export const EmployerPortalPage = ({ onNavigate }) => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('jobs');
  const [jobs, setJobs] = useState(INITIAL_EMPLOYER_JOBS);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const [newJob, setNewJob] = useState({
    title: '',
    department: 'EV Manufacturing Line',
    district: 'Pune (Chakan MIDC)',
    vacancies: 25,
    salary: '₹22,000 - ₹25,000 / mo',
    requiredSkills: '800V Safety, CAN-bus, Wiring',
  });

  const [taggedSkills, setTaggedSkills] = useState([
    { id: '1', name: '800V High Voltage Safety', level: 'Mandatory', priority: 'High' },
    { id: '2', name: 'CAN-Bus Protocol Diagnostics', level: 'Mandatory', priority: 'High' },
    { id: '3', name: 'Torque Wrench Calibration (35Nm)', level: 'Desirable', priority: 'Medium' },
    { id: '4', name: 'IP67 Waterproof Connector Testing', level: 'Mandatory', priority: 'High' },
  ]);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('Mandatory');

  const [feedbackSuccess, setFeedbackSuccess] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({
    trade: 'Electrician & EV Technician',
    satisfaction: 'Satisfactory (7/10)',
    primaryGap: 'Candidates need more practical hours on torque wrench calibration and high-voltage busbar connections.',
    recommendation: 'Incorporate 15 hours of practical lab time with digital torque guns.',
  });

  const i18n = {
    en: {
      postingsTitle: 'Active Job Postings',
      postingsSub: 'Automotive / EV Assembly',
      vacanciesTitle: 'Total Vacancies',
      vacanciesSub: 'Open apprentice & tech slots',
      applicantsTitle: 'Verified Applicants',
      applicantsSub: 'Govt ITI Passouts',
      alignmentTitle: 'Hiring Alignment',
      alignmentSub: 'Syllabus standards validated',
      heading: 'Active Job Postings · Manufacturing Openings',
      subheading: 'Job vacancies directly visible to certified ITI trainees across Pune & Maharashtra.',
      postRoleBtn: 'Post New Role',
      seats: 'Seats',
      trainees: 'Trainees',
      vacanciesLabel: 'Vacancies',
      applicantsLabel: 'Applicants',
      requiredSkillsLabel: 'Required Skills',
      postedDateLabel: 'Posted',
      postModalTitle: 'Post Industrial Opening',
      jobTitle: 'Job Title',
      department: 'Department / Unit',
      district: 'Industrial District / Plant',
      salary: 'Monthly Stipend / Salary',
      cancelBtn: 'Cancel',
      publishRoleBtn: 'Publish Job Opportunity',
      taggingHeading: 'Competency Tagging for ITI Trades',
      taggingSub: 'Define industry-mandated skill requirements that trigger alerts in DVET curriculum councils.',
      addCompetencyBtn: 'Add Competency',
      feedbackHeading: 'Industrial Curriculum Feedback Direct Line',
      feedbackSub: 'Submit empirical feedback directly to DVET State Technical Curriculum Committees.',
      submitFeedbackBtn: 'Submit Official Feedback to DVET',
      talentHeading: 'Discover Pre-Assessed ITI Talent',
      talentSub: 'Candidates with verified NSQF competencies ready for immediate apprenticeship hiring.',
    },
    mr: {
      postingsTitle: 'सक्रिय नोकरी पदे',
      postingsSub: 'ऑटोमोटिव्ह / ईव्ही असेंब्ली',
      vacanciesTitle: 'एकूण रिक्त जागा',
      vacanciesSub: 'शिकाऊ व तंत्रज्ञ पदे',
      applicantsTitle: 'प्रमाणित अर्जदार',
      applicantsSub: 'शासकीय ITI उत्तीर्ण उमेदवार',
      alignmentTitle: 'भरती संरेखन',
      alignmentSub: 'अभ्यासक्रम मानके प्रमाणित',
      heading: 'सक्रिय नोकरी पदे · उत्पादन क्षेत्रातील संधी',
      subheading: 'पुणे व महाराष्ट्रातील प्रमाणित ITI प्रशिक्षणार्थींसाठी थेट उपलब्ध रिक्त पदे.',
      postRoleBtn: 'नवीन पद पोस्ट करा',
      seats: 'जागा',
      trainees: 'प्रशिक्षणार्थी',
      vacanciesLabel: 'रिक्त पदे',
      applicantsLabel: 'अर्जदार',
      requiredSkillsLabel: 'आवश्यक कौशल्ये',
      postedDateLabel: 'दिनांक',
      postModalTitle: 'नवीन औद्योगिक पद नोंदणी',
      jobTitle: 'पदाचे नाव',
      department: 'विभाग / युनिट',
      district: 'औद्योगिक जिल्हा / प्लांट',
      salary: 'मासिक वेतन / विद्यावेतन',
      cancelBtn: 'रद्द करा',
      publishRoleBtn: 'नोकरी संधी प्रसिद्ध करा',
      taggingHeading: 'ITI व्यवसायांसाठी कौशल्य सक्षमता टॅगिंग',
      taggingSub: 'DVET अभ्यासक्रम समित्यांना अलर्ट पाठवणारी उद्योग-आवश्यक कौशल्ये निश्चित करा.',
      addCompetencyBtn: 'कौशल्य जोडा',
      feedbackHeading: 'औद्योगिक अभ्यासक्रम थेट अभिप्राय मंच',
      feedbackSub: 'DVET राज्य तांत्रिक अभ्यासक्रम समितीकडे थेट अभिप्राय नोंदवा.',
      submitFeedbackBtn: 'अधिकृत अभिप्राय सादर करा',
      talentHeading: 'प्रमाणित ITI गुणवत्ता शोध',
      talentSub: 'थेट शिकाऊ उमेदवारीसाठी सज्ज असलेले NSQF प्रमाणित उमेदवार.',
    },
    hi: {
      postingsTitle: 'सक्रिय नौकरी पोस्टिंग',
      postingsSub: 'ऑटोमोटिव / ईवी असेंबली',
      vacanciesTitle: 'कुल रिक्तियां',
      vacanciesSub: 'ओपन अप्रेंटिस एवं तकनीकी पद',
      applicantsTitle: 'सत्यापित आवेदक',
      applicantsSub: 'सरकारी आईटीआई उत्तीर्ण छात्र',
      alignmentTitle: 'भर्ती संरेखण',
      alignmentSub: 'पाठ्यक्रम मानक सत्यापित',
      heading: 'सक्रिय नौकरी पोस्टिंग · विनिर्माण अवसर',
      subheading: 'पुणे और महाराष्ट्र के प्रमाणित आईटीआई छात्रों के लिए सीधे दृश्यमान रिक्तियां।',
      postRoleBtn: 'नया पद पोस्ट करें',
      seats: 'सीटें',
      trainees: 'प्रशिक्षु',
      vacanciesLabel: 'रिक्तियां',
      applicantsLabel: 'आवेदक',
      requiredSkillsLabel: 'आवश्यक कौशल',
      postedDateLabel: 'दिनांक',
      postModalTitle: 'नया औद्योगिक पद पोस्ट करें',
      jobTitle: 'पद का नाम',
      department: 'विभाग / इकाई',
      district: 'औद्योगिक ज़िला / संयंत्र',
      salary: 'मासिक वेतन / वजीफा',
      cancelBtn: 'रद्द करें',
      publishRoleBtn: 'नौकरी अवसर प्रकाशित करें',
      taggingHeading: 'आईटीआई ट्रेड्स हेतु सक्षमता टैगिंग',
      taggingSub: 'उद्योग-अनिवार्य कौशल आवश्यकताएं परिभाषित करें जो DVET को अलर्ट करती हैं।',
      addCompetencyBtn: 'कौशल जोड़ें',
      feedbackHeading: 'औद्योगिक पाठ्यक्रम सीधा फीडबैक',
      feedbackSub: 'DVET राज्य तकनीकी पाठ्यक्रम समिति को सीधे फीडबैक भेजें।',
      submitFeedbackBtn: 'आधिकारिक फीडबैक सबमिट करें',
      talentHeading: 'सत्यापित आईटीआई प्रतिभा खोज',
      talentSub: 'तत्काल शिक्षुता हेतु तैयार NSQF प्रमाणित उम्मीदवार।',
    },
  };
  const str = i18n[language] || i18n.en;

  const menuItems = [
    { id: 'jobs', label: 'Post / Validate Jobs', icon: Briefcase, badge: `${jobs.length} Active` },
    { id: 'skills-tagging', label: 'Required Skills Tagging', icon: Tag },
    { id: 'feedback', label: 'Industry Feedback', icon: MessageSquarePlus },
    { id: 'talent', label: 'Talent Discovery', icon: Search, badge: 'Pre-Assessed' },
  ];

  const handlePostJob = (e) => {
    e.preventDefault();
    if (!newJob.title) return;
    const created = {
      id: `POST-${Math.floor(10 + Math.random() * 90)}`,
      title: newJob.title,
      department: newJob.department,
      district: newJob.district,
      vacancies: Number(newJob.vacancies),
      applicants: 0,
      postedDate: 'Today',
      status: 'Active Hiring',
      salary: newJob.salary,
      requiredSkills: newJob.requiredSkills.split(',').map(s => s.trim()),
    };
    setJobs(prev => [created, ...prev]);
    setIsPostModalOpen(false);
    setNewJob({
      title: '',
      department: 'EV Manufacturing Line',
      district: 'Pune (Chakan MIDC)',
      vacancies: 25,
      salary: '₹22,000 - ₹25,000 / mo',
      requiredSkills: '800V Safety, CAN-bus, Wiring',
    });
  };

  const handleAddSkillTag = (e) => {
    e.preventDefault();
    if (!newSkillInput.trim()) return;
    setTaggedSkills(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        name: newSkillInput.trim(),
        level: newSkillLevel,
        priority: newSkillLevel === 'Mandatory' ? 'High' : 'Medium',
      },
    ]);
    setNewSkillInput('');
  };

  const handleRemoveSkillTag = (id) => {
    setTaggedSkills(prev => prev.filter(s => s.id !== id));
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setFeedbackSuccess(true);
    setTimeout(() => setFeedbackSuccess(false), 4000);
  };

  return (
    <DashboardLayout
      role="employer"
      roleTitle="Industry &amp; Recruiter Console"
      menuItems={menuItems}
      activeTab={activeTab}
      onSelectTab={setActiveTab}
      onNavigate={onNavigate}
    >
      {/* 1. POST / VALIDATE JOBS */}
      {activeTab === 'jobs' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title={str.postingsTitle}
              value={jobs.length}
              subtext={str.postingsSub}
              badgeText={user?.company || 'Bajaj Auto'}
              badgeColor="amber"
            />
            <StatCard
              title={str.vacanciesTitle}
              value={jobs.reduce((acc, j) => acc + j.vacancies, 0)}
              subtext={str.vacanciesSub}
              trend="Chakan Plant"
              badgeColor="blue"
            />
            <StatCard
              title={str.applicantsTitle}
              value="427"
              subtext={str.applicantsSub}
              trend="+38 new today"
              badgeColor="emerald"
            />
            <StatCard
              title={str.alignmentTitle}
              value="94%"
              subtext={str.alignmentSub}
              badgeText="DVET Partner"
              badgeColor="emerald"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#222222]">
                {str.heading}
              </h3>
              <p className="text-xs text-[#666666]">
                {str.subheading}
              </p>
            </div>
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="px-4 py-2 bg-[#F28C28] hover:bg-[#D96B1F] text-white rounded text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer border border-[#F28C28] shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5 text-white" />
              <span>{str.postRoleBtn}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map(job => (
              <div
                key={job.id}
                className="bg-white p-5 rounded-lg border border-[#DDE3E8] shadow-2xs flex flex-col justify-between space-y-4 hover:border-[#0056A6] transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#E8F1F8] text-[#0056A6] border border-[#DDE3E8]">
                      {job.id}
                    </span>
                    <StatusBadge status={job.status} />
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-[#003B70]">
                      {job.title}
                    </h4>
                    <p className="text-xs text-[#0056A6] font-semibold mt-0.5">
                      {job.department}
                    </p>
                    <p className="text-[11px] text-[#666666] mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#666666]" />
                      {job.district}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-[#F7F8FA] p-2.5 rounded border border-[#DDE3E8] text-xs">
                    <div>
                      <div className="text-[10px] text-[#666666]">{str.vacanciesLabel}</div>
                      <div className="font-bold text-[#222222]">{job.vacancies} {str.seats}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#666666]">{str.applicantsLabel}</div>
                      <div className="font-bold text-[#0056A6]">{job.applicants} {str.trainees}</div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#666666]">
                      {str.requiredSkillsLabel}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {job.requiredSkills.map((s, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-[#F7F8FA] text-[#666666] border border-[#DDE3E8]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#DDE3E8] flex items-center justify-between text-xs">
                  <span className="font-bold text-[#222222]">{job.salary}</span>
                  <span className="text-[11px] text-[#666666]">{str.postedDateLabel}: {job.postedDate}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Post Job Modal */}
          {isPostModalOpen && (
            <div className="fixed inset-0 z-50 bg-[#222222]/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-lg border border-[#DDE3E8] shadow-xl max-w-md w-full p-6 space-y-4">
                <div className="border-b border-[#DDE3E8] pb-3 flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#222222]">
                    {str.postModalTitle}
                  </h3>
                  <button
                    onClick={() => setIsPostModalOpen(false)}
                    className="text-slate-400 hover:text-slate-700 text-sm font-bold cursor-pointer"
                  >
                    &times;
                  </button>
                </div>

                <form onSubmit={handlePostJob} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-[#222222] mb-1">
                      {str.jobTitle}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. EV Battery Pack Assembler"
                      value={newJob.title}
                      onChange={e => setNewJob({ ...newJob, title: e.target.value })}
                      className="w-full px-3 py-2 border border-[#DDE3E8] rounded text-xs focus:border-[#0056A6] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#222222] mb-1">
                      {str.department}
                    </label>
                    <input
                      type="text"
                      value={newJob.department}
                      onChange={e => setNewJob({ ...newJob, department: e.target.value })}
                      className="w-full px-3 py-2 border border-[#DDE3E8] rounded text-xs focus:border-[#0056A6] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-[#222222] mb-1">
                        {str.vacanciesLabel}
                      </label>
                      <input
                        type="number"
                        value={newJob.vacancies}
                        onChange={e => setNewJob({ ...newJob, vacancies: e.target.value })}
                        className="w-full px-3 py-2 border border-[#DDE3E8] rounded text-xs focus:border-[#0056A6] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#222222] mb-1">
                        {str.salary}
                      </label>
                      <input
                        type="text"
                        value={newJob.salary}
                        onChange={e => setNewJob({ ...newJob, salary: e.target.value })}
                        className="w-full px-3 py-2 border border-[#DDE3E8] rounded text-xs focus:border-[#0056A6] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#222222] mb-1">
                      {str.requiredSkillsLabel} (comma separated)
                    </label>
                    <input
                      type="text"
                      value={newJob.requiredSkills}
                      onChange={e => setNewJob({ ...newJob, requiredSkills: e.target.value })}
                      className="w-full px-3 py-2 border border-[#DDE3E8] rounded text-xs focus:border-[#0056A6] focus:outline-none"
                    />
                  </div>

                  <div className="pt-3 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsPostModalOpen(false)}
                      className="px-3 py-1.5 border border-[#DDE3E8] rounded text-[#666666] hover:bg-[#F7F8FA] cursor-pointer"
                    >
                      {str.cancelBtn}
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#F28C28] hover:bg-[#D96B1F] text-white font-bold rounded cursor-pointer border border-[#F28C28] transition-colors"
                    >
                      {str.publishRoleBtn}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. REQUIRED SKILLS TAGGING */}
      {activeTab === 'skills-tagging' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-[#DDE3E8] shadow-2xs space-y-6">
            <div>
              <h3 className="text-sm font-bold text-[#003B70]">
                {str.taggingHeading}
              </h3>
              <p className="text-xs text-[#666666]">
                {str.taggingSub}
              </p>
            </div>

            {/* Tagging Input Bar */}
            <form onSubmit={handleAddSkillTag} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder={language === 'mr' ? "तांत्रिक कौशल्य टाईप करा (उदा. 5-Axis Toolpath, Battery Swapping)..." : language === 'hi' ? "तकनीकी कौशल टाइप करें (उदा. 5-Axis Toolpath, Battery Swapping)..." : "Type technical competency (e.g. Mastercam 5-Axis Toolpath, Battery Swapping)..."}
                value={newSkillInput}
                onChange={e => setNewSkillInput(e.target.value)}
                className="flex-1 px-3 py-2 text-xs border border-[#DDE3E8] rounded focus:border-[#0056A6] focus:outline-none"
              />
              <select
                value={newSkillLevel}
                onChange={e => setNewSkillLevel(e.target.value)}
                className="px-3 py-2 text-xs border border-[#DDE3E8] rounded bg-[#F7F8FA] text-[#222222] focus:outline-none"
              >
                <option value="Mandatory">{language === 'mr' ? 'अनिवार्य कौशल्य' : language === 'hi' ? 'अनिवार्य कौशल' : 'Mandatory Competency'}</option>
                <option value="Desirable">{language === 'mr' ? 'इच्छित / अतिरिक्त' : language === 'hi' ? 'वांछनीय / अतिरिक्त' : 'Desirable / Good to Have'}</option>
              </select>
              <button
                type="submit"
                className="px-4 py-2 bg-[#F28C28] hover:bg-[#D96B1F] text-white text-xs font-bold rounded flex items-center justify-center gap-1 cursor-pointer shrink-0 border border-[#F28C28] transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-white" />
                <span>{str.addCompetencyBtn}</span>
              </button>
            </form>

            {/* Active Tags Display */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                {language === 'mr' ? 'ईव्ही तंत्रज्ञ पदांसाठी सद्य टॅग केलेली मानके' : language === 'hi' ? 'ईवी तकनीशियन पदों के लिए वर्तमान टैग किए गए मानक' : 'Current Tagged Standards for EV Technician Roles'}
              </div>
              <div className="flex flex-wrap gap-2">
                {taggedSkills.map(skill => (
                  <div
                    key={skill.id}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#DDE3E8] bg-[#F7F8FA] text-xs font-medium text-[#222222]"
                  >
                    <span>{skill.name}</span>
                    <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                      skill.level === 'Mandatory' ? 'bg-[#C62828]/10 text-[#C62828] border border-[#C62828]/30' : 'bg-[#E8F1F8] text-[#0056A6] border border-[#DDE3E8]'
                    }`}>
                      {skill.level}
                    </span>
                    <button
                      onClick={() => handleRemoveSkillTag(skill.id)}
                      className="text-[#666666] hover:text-[#C62828] text-sm font-bold leading-none cursor-pointer"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#DDE3E8] flex items-center justify-between text-xs text-[#666666]">
              <span>{language === 'mr' ? 'सर्व बदल आपोआप DVET राज्य कौशल्य समितीशी समक्रमित होतात' : language === 'hi' ? 'सभी परिवर्तन स्वचालित रूप से DVET राज्य कौशल समिति के साथ समन्वयित होते हैं' : 'All changes automatically sync with DVET State Skill Committee'}</span>
              <button className="px-4 py-2 bg-[#0056A6] hover:bg-[#003B70] text-white font-bold rounded cursor-pointer border border-[#0056A6] transition-colors">
                {language === 'mr' ? 'DVET कडे प्रोफाईल जतन करा' : language === 'hi' ? 'DVET में प्रोफाइल सहेजें' : 'Save Tagged Profile to DVET'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. INDUSTRY FEEDBACK SUBMISSION */}
      {activeTab === 'feedback' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-[#DDE3E8] shadow-2xs space-y-6">
            <div>
              <h3 className="text-sm font-bold text-[#003B70]">
                {str.feedbackHeading}
              </h3>
              <p className="text-xs text-[#666666]">
                {str.feedbackSub}
              </p>
            </div>

            {feedbackSuccess && (
              <div className="p-4 bg-[#198754]/10 border border-[#198754]/30 rounded-lg text-xs text-[#198754] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#198754] shrink-0" />
                <span className="font-semibold">{language === 'mr' ? 'धन्यवाद! आपला अभिप्राय DVET अभ्यासक्रम आढावा नोंदवहीत अधिकृतपणे नोंदवला गेला आहे.' : language === 'hi' ? 'धन्यवाद! आपकी प्रतिक्रिया आधिकारिक रूप से DVET पाठ्यक्रम समीक्षा रजिस्टर में दर्ज हो गई है।' : 'Thank you! Your feedback has been officially logged in the DVET Curriculum Review Register.'}</span>
              </div>
            )}

            <form onSubmit={handleFeedbackSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#222222] mb-1">
                    {language === 'mr' ? 'मूल्यांकन केलेला व्यवसाय अभ्यासक्रम' : language === 'hi' ? 'मूल्यांकित ट्रेड पाठ्यक्रम' : 'Evaluated Trade Program'}
                  </label>
                  <select
                    value={feedbackForm.trade}
                    onChange={e => setFeedbackForm({ ...feedbackForm, trade: e.target.value })}
                    className="w-full px-3 py-2 border border-[#DDE3E8] rounded text-xs focus:border-[#0056A6] focus:outline-none"
                  >
                    <option value="Electrician & EV Technician">Electrician &amp; EV Technician</option>
                    <option value="Machinist & CNC Programming">Machinist &amp; CNC Programming</option>
                    <option value="Solar Technician">Solar Technician</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#222222] mb-1">
                    {language === 'mr' ? 'पदवीधरांची एकूण सज्जता' : language === 'hi' ? 'उत्तीर्ण छात्रों की कुल तत्परता' : 'Overall Graduate Preparedness'}
                  </label>
                  <select
                    value={feedbackForm.satisfaction}
                    onChange={e => setFeedbackForm({ ...feedbackForm, satisfaction: e.target.value })}
                    className="w-full px-3 py-2 border border-[#DDE3E8] rounded text-xs focus:border-[#0056A6] focus:outline-none"
                  >
                    <option value="Excellent (9-10/10)">Excellent (9-10/10)</option>
                    <option value="Good (8/10)">Good (8/10)</option>
                    <option value="Satisfactory (7/10)">Satisfactory (7/10)</option>
                    <option value="Needs Immediate Curriculum Update (<6/10)">Needs Immediate Curriculum Update (&lt;6/10)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#222222] mb-1">
                  {language === 'mr' ? 'उत्पादन लाईनवर आढळलेली मुख्य प्रात्यक्षिक कौशल्य तूट' : language === 'hi' ? 'असेंबली लाइन पर देखी गई मुख्य व्यावहारिक कौशल कमी' : 'Primary Practical Skill Deficit Observed on Assembly Line'}
                </label>
                <textarea
                  rows={3}
                  value={feedbackForm.primaryGap}
                  onChange={e => setFeedbackForm({ ...feedbackForm, primaryGap: e.target.value })}
                  className="w-full px-3 py-2 border border-[#DDE3E8] rounded text-xs focus:border-[#0056A6] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#222222] mb-1">
                  {language === 'mr' ? 'विशिष्ट शिफारस केलेली लॅब उपकरणे किंवा अध्यापन कृती' : language === 'hi' ? 'विशिष्ट अनुशंसित लैब उपकरण या शैक्षणिक कार्रवाई' : 'Specific Recommended Lab Tooling / Pedagogical Action'}
                </label>
                <textarea
                  rows={2}
                  value={feedbackForm.recommendation}
                  onChange={e => setFeedbackForm({ ...feedbackForm, recommendation: e.target.value })}
                  className="w-full px-3 py-2 border border-[#DDE3E8] rounded text-xs focus:border-[#0056A6] focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#F28C28] hover:bg-[#D96B1F] text-white rounded font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-2xs border border-[#F28C28] transition-colors"
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                  <span>{str.submitFeedbackBtn}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. TALENT DISCOVERY */}
      {activeTab === 'talent' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-[#DDE3E8] shadow-2xs overflow-hidden">
            <div className="p-4 bg-[#F7F8FA] border-b border-[#DDE3E8] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#003B70]">
                  {str.talentHeading}
                </h3>
                <p className="text-xs text-[#666666]">
                  {str.talentSub}
                </p>
              </div>
            </div>

            <div className="divide-y divide-[#DDE3E8]">
              {EMPLOYER_TALENT_CANDIDATES.map(candidate => (
                <div key={candidate.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F7F8FA] transition-colors">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-[#003B70]">
                        {candidate.name}
                      </h4>
                      <span className="px-2.5 py-0.2 rounded text-[10px] font-bold bg-[#E8F1F8] text-[#0056A6] border border-[#DDE3E8]">
                        {candidate.score}% {language === 'mr' ? 'प्रमाणित' : language === 'hi' ? 'सत्यापित' : 'Verified'}
                      </span>
                    </div>

                    <div className="text-xs text-[#666666]">
                      {candidate.trade} &middot; <strong className="text-[#222222]">{candidate.iti}</strong> ({candidate.district})
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {candidate.verifiedSkills.map((s, i) => (
                        <span key={i} className="px-2 py-0.2 rounded text-[10px] bg-[#F7F8FA] text-[#666666] border border-[#DDE3E8]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-2">
                    <span className="text-[11px] text-[#666666]">{candidate.availability}</span>
                    <button className="px-4 py-1.5 bg-[#F28C28] hover:bg-[#D96B1F] text-white rounded text-xs font-bold transition-colors cursor-pointer border border-[#F28C28]">
                      {language === 'mr' ? 'मुलाखतीसाठी शॉर्टलिस्ट' : language === 'hi' ? 'साक्षात्कार हेतु शॉर्टलिस्ट' : 'Shortlist for Interview'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default EmployerPortalPage;
