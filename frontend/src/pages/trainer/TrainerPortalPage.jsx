import React, { useState } from 'react';
import {
  BookOpen,
  Users,
  Award,
  Rss,
  Lightbulb,
  Clock,
  Download,
} from 'lucide-react';
import { DashboardLayout } from '../../layouts/DashboardLayout.jsx';
import { StatCard } from '../../components/common/StatCard.jsx';
import { StatusBadge } from '../../components/common/StatusBadge.jsx';
import {
  TRAINER_ASSIGNED_COURSES,
  TRAINER_STUDENT_GAPS,
  TRAINER_UPSKILLING_RECS,
  TRAINER_INDUSTRY_FEED,
} from '../../data/mockData.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';

export const TrainerPortalPage = ({ onNavigate }) => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('courses');

  const menuItems = [
    { id: 'courses', label: 'Assigned Courses', icon: BookOpen, badge: '3 Batches' },
    { id: 'student-gaps', label: 'Student Skill Gaps', icon: Users, badge: 'Cohort' },
    { id: 'upskilling', label: 'Faculty Upskilling', icon: Award },
    { id: 'industry-feed', label: 'Industry Feed', icon: Rss, badge: 'Live' },
    { id: 'improvements', label: 'Teaching Insights', icon: Lightbulb },
  ];

  const i18n = {
    en: {
      activeBatches: 'Active Batches',
      batchesSub: '92 Total Enrolled Trainees',
      avgCompletion: 'Avg Syllabus Completion',
      completionSub: 'Semester 4 targets on track',
      labSessions: 'Practical Lab Sessions',
      labSub: 'Center of Excellence High Voltage Lab',
      credits: 'Faculty Credits (CPD)',
      creditsSub: 'State Vocational Education Council',
      upcoming: 'Upcoming:',
      lessonPlan: 'Lesson Plan',
      syllabusProgress: 'Syllabus Completion',
      gapsHeading: 'Cohort Competency Weakness Diagnostics',
      gapsSub: 'Aggregated student performance across your active trade practical modules.',
      remediationStrategy: 'Remediation Strategy:',
      scheduleClinic: 'Schedule Clinic',
      totHeading: 'Continuous Professional Development · Faculty ToT',
      totSub: 'Industry-sponsored Training of Trainers programs recognized under DVET Career Advancement Scheme.',
      feedHeading: 'Shop-Floor Observational Feed · Regional Plants',
      feedSub: 'Direct feedback from plant managers in Chakan, Talegaon, and Bhosari automotive clusters.',
    },
    mr: {
      activeBatches: 'सक्रिय तुकड्या',
      batchesSub: '९२ एकूण नोंदणीकृत प्रशिक्षणार्थी',
      avgCompletion: 'सरासरी अभ्यासक्रम पूर्णता',
      completionSub: 'सत्र ४ चे उद्दिष्ट नियोजनानुसार',
      labSessions: 'प्रात्यक्षिक प्रयोगशाळा सत्रे',
      labSub: 'हाय व्होल्टेज सेंटर ऑफ एक्सलन्स लॅब',
      credits: 'प्रशिक्षक गुणवत्ता क्रेडिट्स',
      creditsSub: 'राज्य व्यवसाय शिक्षण परिषद',
      upcoming: 'पुढील सत्र:',
      lessonPlan: 'पाठ नियोजन',
      syllabusProgress: 'अभ्यासक्रम पूर्णता',
      gapsHeading: 'तुकडीनिहाय सक्षमता तूट विश्लेषण',
      gapsSub: 'आपल्या सक्रिय ट्रेड प्रात्यक्षिक मॉड्यूल्समधील विद्यार्थ्यांची एकत्रित कामगिरी.',
      remediationStrategy: 'सुधारणा रणनीती:',
      scheduleClinic: 'कार्यशाळा आयोजित करा',
      totHeading: 'सतत व्यावसायिक विकास · प्राध्यापक ToT',
      totSub: 'DVET करिअर प्रगती योजनेअंतर्गत मान्यताप्राप्त उद्योग-प्रायोजित प्रशिक्षण कार्यक्रम.',
      feedHeading: 'थेट औद्योगिक निरीक्षण फीड · प्रादेशिक प्लांट्स',
      feedSub: 'चाकण, तळेगाव आणि भोसरी वाहन उद्योगांतील प्लांट व्यवस्थापकांचा थेट अभिप्राय.',
    },
    hi: {
      activeBatches: 'सक्रिय बैच',
      batchesSub: '92 कुल नामांकित छात्र',
      avgCompletion: 'औसत पाठ्यक्रम पूर्णता',
      completionSub: 'सत्र 4 लक्ष्य समय पर',
      labSessions: 'व्यावहारिक लैब सत्र',
      labSub: 'उच्च वोल्टेज उत्कृष्टता केंद्र लैब',
      credits: 'प्रशिक्षक क्रेडिट (CPD)',
      creditsSub: 'राज्य व्यावसायिक शिक्षा परिषद',
      upcoming: 'आगामी सत्र:',
      lessonPlan: 'पाठ योजना',
      syllabusProgress: 'पाठ्यक्रम पूर्णता',
      gapsHeading: 'बैच क्षमता कमी विश्लेषण',
      gapsSub: 'आपके सक्रिय ट्रेड प्रायोगिक मॉड्यूल में छात्रों का समग्र प्रदर्शन।',
      remediationStrategy: 'उपचारात्मक रणनीति:',
      scheduleClinic: 'कार्यशाला निर्धारित करें',
      totHeading: 'सतत व्यावसायिक विकास · संकाय ToT',
      totSub: 'DVET कैरियर प्रगति योजना के तहत मान्यता प्राप्त उद्योग-प्रायोजित प्रशिक्षण कार्यक्रम।',
      feedHeading: 'दुकान तल अवलोकन फीड · क्षेत्रीय संयंत्र',
      feedSub: 'चाकण, तालेगांव और भोसरी वाहन उद्योगों से सीधे संयंत्र प्रबंधकों की प्रतिक्रिया।',
    },
  };
  const str = i18n[language] || i18n.en;

  return (
    <DashboardLayout
      role="trainer"
      roleTitle="Instructor &amp; Master Trainer Console"
      menuItems={menuItems}
      activeTab={activeTab}
      onSelectTab={setActiveTab}
      onNavigate={onNavigate}
    >
      {/* 1. ASSIGNED COURSES LIST */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title={str.activeBatches}
              value="3 Cohorts"
              subtext={str.batchesSub}
              badgeText="Aundh &amp; Girls ITI"
              badgeColor="blue"
            />
            <StatCard
              title={str.avgCompletion}
              value="75%"
              subtext={str.completionSub}
              trend="+8% this month"
              badgeColor="emerald"
            />
            <StatCard
              title={str.labSessions}
              value="18 / 24"
              subtext={str.labSub}
              badgeText="In Progress"
              badgeColor="blue"
            />
            <StatCard
              title={str.credits}
              value="64 / 80"
              subtext={str.creditsSub}
              badgeText="Level 2 Certified"
              badgeColor="emerald"
            />
          </div>

          <div className="space-y-4">
            {TRAINER_ASSIGNED_COURSES.map((course, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-lg border border-[#DDE3E8] shadow-2xs space-y-4 hover:border-[#0056A6] transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#E8F1F8] text-[#0056A6] border border-[#DDE3E8]">
                      {course.code}
                    </span>
                    <h3 className="text-base font-bold text-[#003B70] mt-1">
                      {course.name}
                    </h3>
                    <p className="text-xs text-[#666666]">{course.batch} &middot; {course.students} Trainees</p>
                  </div>
                  <StatusBadge status={course.status} />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#666666] font-medium">{str.syllabusProgress}</span>
                    <span className="font-bold text-[#0056A6]">{course.syllabusProgress}%</span>
                  </div>
                  <div className="w-full bg-[#F7F8FA] border border-[#DDE3E8] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#0056A6] h-full rounded-full" style={{ width: `${course.syllabusProgress}%` }} />
                  </div>
                </div>

                <div className="p-3 bg-[#F7F8FA] rounded border border-[#DDE3E8] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-[#222222]">
                    <Clock className="w-4 h-4 text-[#0056A6] shrink-0" />
                    <span><strong>{str.upcoming}</strong> {course.nextSession}</span>
                  </div>
                  <button className="px-3.5 py-1 bg-white border border-[#DDE3E8] rounded text-[#0056A6] font-bold hover:bg-[#E8F1F8] transition-colors shrink-0 cursor-pointer">
                    {str.lessonPlan}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. SKILL GAPS ACROSS ASSIGNED STUDENTS */}
      {activeTab === 'student-gaps' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-[#DDE3E8] shadow-2xs overflow-hidden">
            <div className="p-4 bg-[#F7F8FA] border-b border-[#DDE3E8]">
              <h3 className="text-sm font-bold text-[#003B70]">
                {str.gapsHeading}
              </h3>
              <p className="text-xs text-[#666666]">
                {str.gapsSub}
              </p>
            </div>

            <div className="divide-y divide-[#DDE3E8]">
              {TRAINER_STUDENT_GAPS.map((gap, i) => (
                <div key={i} className="p-5 hover:bg-[#F7F8FA] transition-colors space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-[#003B70]">
                        {gap.competency}
                      </h4>
                      <p className="text-xs text-[#C62828] font-semibold mt-0.5">
                        {gap.batchWeakness}
                      </p>
                    </div>
                    <StatusBadge status={gap.priority} />
                  </div>

                  <div className="p-3 bg-[#E8F1F8] rounded border border-[#DDE3E8] flex items-center justify-between text-xs">
                    <span className="text-[#222222]">
                      <strong className="text-[#0056A6]">{str.remediationStrategy}</strong> {gap.action}
                    </span>
                    <button className="px-3.5 py-1 bg-[#F28C28] hover:bg-[#D96B1F] text-white rounded font-bold shrink-0 cursor-pointer shadow-2xs transition-colors border border-[#F28C28]">
                      {str.scheduleClinic}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. UPSKILLING RECOMMENDATIONS (FOR TRAINER) */}
      {activeTab === 'upskilling' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-[#DDE3E8] shadow-2xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-[#003B70]">
                {str.totHeading}
              </h3>
              <p className="text-xs text-[#666666]">
                {str.totSub}
              </p>
            </div>

            <div className="space-y-4">
              {TRAINER_UPSKILLING_RECS.map((rec, i) => (
                <div
                  key={i}
                  className="p-5 rounded-lg border border-[#DDE3E8] bg-white hover:border-[#0056A6] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-[#003B70]">
                        {rec.title}
                      </h4>
                      <span className="px-2.5 py-0.2 rounded text-[10px] font-bold bg-[#E8F1F8] text-[#0056A6] border border-[#DDE3E8]">
                        {rec.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#666666]">Partner: <strong>{rec.partner}</strong></p>
                    <p className="text-[11px] text-[#666666]">{rec.duration} &middot; {rec.credits}</p>
                  </div>

                  <button className="px-4 py-2 bg-[#F28C28] hover:bg-[#D96B1F] text-white text-xs font-bold rounded transition-colors shrink-0 cursor-pointer border border-[#F28C28] shadow-2xs">
                    {rec.actionText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. INDUSTRY REQUIREMENTS FEED */}
      {activeTab === 'industry-feed' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-[#DDE3E8] shadow-2xs overflow-hidden">
            <div className="p-4 bg-[#F7F8FA] border-b border-[#DDE3E8]">
              <h3 className="text-sm font-bold text-[#003B70]">
                {str.feedHeading}
              </h3>
              <p className="text-xs text-[#666666]">
                {str.feedSub}
              </p>
            </div>

            <div className="divide-y divide-[#DDE3E8]">
              {TRAINER_INDUSTRY_FEED.map((feed, i) => (
                <div key={i} className="p-5 space-y-2 hover:bg-[#F7F8FA] transition-colors">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#0056A6]">{feed.source}</span>
                    <span className="text-[#666666] text-[11px]">{feed.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#003B70]">
                    {feed.title}
                  </h4>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    {feed.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. TRAINING IMPROVEMENT INSIGHTS */}
      {activeTab === 'improvements' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-lg border border-[#DDE3E8] shadow-2xs space-y-3">
              <h4 className="text-sm font-bold text-[#003B70] flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-[#0056A6]" />
                <span>Pedagogical Recommendation: Fault-Insertion Drills</span>
              </h4>
              <p className="text-xs text-[#666666] leading-relaxed">
                Trainees perform 40% better on employer tests when instructors introduce deliberately blown fuses or loose CAN terminator resistors before testing diagnostic speed.
              </p>
              <div className="pt-2">
                <button className="text-xs text-[#0056A6] font-bold hover:text-[#003B70] flex items-center gap-1.5 cursor-pointer transition-colors">
                  <Download className="w-3.5 h-3.5" />
                  Download 12 Fault Injection Scenarios (.PDF)
                </button>
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg border border-[#DDE3E8] shadow-2xs space-y-3">
              <h4 className="text-sm font-bold text-[#003B70] flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-[#0056A6]" />
                <span>Bilingual Marathi-English Technical Glossaries</span>
              </h4>
              <p className="text-xs text-[#666666] leading-relaxed">
                Provide bilingual terminology sheets for terms like &ldquo;Insulation Resistance&rdquo; (विद्युत रोधन रोध) and &ldquo;Torque Specification&rdquo; (टॉर्क मर्यादा) to ease comprehension for rural passouts.
              </p>
              <div className="pt-2">
                <button className="text-xs text-[#0056A6] font-bold hover:text-[#003B70] flex items-center gap-1.5 cursor-pointer transition-colors">
                  <Download className="w-3.5 h-3.5" />
                  Download Marathi EV Technical Glossary (.PDF)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default TrainerPortalPage;
