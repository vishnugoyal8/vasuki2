import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import {
  ArrowRight,
  TrendingUp,
  Award,
  Users,
  Building2,
  Briefcase,
  ShieldCheck,
  GraduationCap,
  Compass,
  CheckCircle2,
  FileCheck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

export const LandingPage = ({ onNavigate }) => {
  const { openLoginModal } = useAuth();
  const { t, language } = useLanguage();

  // Subtle interactive elevation for the hero card
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 24, stiffness: 160 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ['-5deg', '5deg']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const roleTiles = [
    {
      id: 'public',
      title: t.rolePublicTitle || 'General Public & Aspirants',
      roleKey: 'guest',
      icon: Compass,
      oneLiner: t.rolePublicDesc || 'Explore high-growth careers, vocational trades, in-demand technical skills, and district demand trends without signing in.',
      cta: t.explorePublicData || 'Explore Public Data',
      action: () => onNavigate('public-portal'),
    },
    {
      id: 'student',
      title: t.roleStudentTitle || 'Vocational Trainees & Students',
      roleKey: 'student',
      icon: GraduationCap,
      oneLiner: t.roleStudentDesc || 'Analyze personal skill gaps against live employer requirements, unlock personalized learning paths, and discover placements.',
      cta: t.accessStudentPortal || 'Access Student Portal',
      action: () => openLoginModal('student'),
    },
    {
      id: 'institute',
      title: t.roleInstituteTitle || 'Training Institutes & ITIs',
      roleKey: 'institute',
      icon: Building2,
      oneLiner: t.roleInstituteDesc || 'Manage enrolled student cohorts, evaluate trade curriculum alignment, oversee instructor workload, and plan lab infrastructure.',
      cta: t.launchInstituteSuite || 'Launch Institute Suite',
      action: () => openLoginModal('institute'),
    },
    {
      id: 'trainer',
      title: t.roleTrainerTitle || 'Instructors & Master Trainers',
      roleKey: 'trainer',
      icon: Award,
      oneLiner: t.roleTrainerDesc || 'Identify practical competency gaps across assigned batches, discover Training of Trainers (ToT) upskilling, and access lesson plans.',
      cta: t.openTrainerWorkspace || 'Open Trainer Workspace',
      action: () => openLoginModal('trainer'),
    },
    {
      id: 'employer',
      title: t.roleEmployerTitle || 'Industrial Employers & HRs',
      roleKey: 'employer',
      icon: Briefcase,
      oneLiner: t.roleEmployerDesc || 'Post live manufacturing vacancies, tag mandatory skill competencies, provide curriculum feedback, and discover pre-assessed talent.',
      cta: t.enterEmployerConsole || 'Enter Employer Console',
      action: () => openLoginModal('employer'),
    },
    {
      id: 'government',
      title: t.roleGovTitle || 'DVET & Government Officers',
      roleKey: 'government',
      icon: ShieldCheck,
      oneLiner: t.roleGovDesc || 'Statewide supply-demand deficit intelligence, GIS heatmaps, modernization budget allocation tools, and policy briefings.',
      cta: t.viewGovIntelligence || 'View Gov Intelligence',
      action: () => openLoginModal('government'),
    },
  ];

  const trustStats = [
    { label: t.districtsCovered || 'Districts Covered', value: '36', detail: t.allDivisions || 'Across all Maharashtra divisions' },
    { label: t.itisAndCenters || 'ITIs & Centers', value: '418+', detail: t.govtPrivateAccredited || 'Govt & Private accredited' },
    { label: t.prioritySectors || 'Priority Sectors', value: '18', detail: t.evCncSolar || 'EV, CNC, Solar, Green Tech' },
    { label: t.enrolledTrainees || 'Enrolled Trainees', value: '125,000+', detail: t.annualCapacity || 'Annual vocational capacity' },
  ];

  return (
    <div className="space-y-16 pb-16 bg-[#FFFFFF]">
      {/* 1. HERO SECTION - Clean, high whitespace, Deep Navy brand, Government Blue highlights */}
      <section className="relative pt-12 pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#003B70] tracking-tight leading-tight">
                Career<span className="text-[#0056A6]">Sync</span>
              </h1>
              <p className="text-lg sm:text-xl font-bold text-[#0056A6]">
                &ldquo;{t.heroTagline || t.tagline || 'A Smarter, Skilled Tomorrow'}&rdquo;
              </p>
              <p className="text-sm sm:text-base text-[#666666] font-normal leading-relaxed max-w-2xl">
                {t.heroDescription || 'Bridging Education, Industry and Opportunities. The official vocational intelligence and skilling governance portal of the Government of Maharashtra, connecting curricula with real-time labor market demands.'}
              </p>
            </div>

            {/* Action Buttons: Controlled Saffron Orange CTA & Government Blue Secondary */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('public-portal')}
                className="px-6 py-3 rounded bg-[#F28C28] hover:bg-[#D96B1F] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-white" />
                <span>{t.explorePublicData || 'Explore Public Data'}</span>
              </button>

              <button
                onClick={() => openLoginModal('student')}
                className="px-6 py-3 rounded bg-white hover:bg-[#E8F1F8] text-[#0056A6] border border-[#DDE3E8] text-xs sm:text-sm font-bold shadow-2xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Users className="w-4 h-4 text-[#0056A6]" />
                <span>{t.portalLoginBtn || 'Portal Login'}</span>
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#666666] font-medium border-t border-[#DDE3E8]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#198754]" />
                <span>{t.dualSystemTraining || 'Dual System Training (DST)'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#198754]" />
                <span>{t.nsqfAligned || 'NSQF Level 4 & 5 Aligned'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#198754]" />
                <span>{t.realTimeIndustrialDemand || 'Real-Time Industrial Demand'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Telemetry Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-md perspective-1000 select-none"
            >
              <motion.div
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
                className="bg-white rounded-lg border border-[#DDE3E8] p-6 shadow-xs space-y-5"
              >
                {/* Government Header */}
                <div className="flex items-center justify-between border-b border-[#DDE3E8] pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded bg-[#003B70] text-white font-bold text-xs flex items-center justify-center border border-[#0056A6]">
                      MH
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#003B70]">{t.dvetSkillIntel || 'DVET Skill Intelligence'}</div>
                      <div className="text-[10px] text-[#666666]">{t.labourObservatory || 'Maharashtra Labour Observatory'}</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E8F1F8] text-[#0056A6] border border-[#0056A6]/20">
                    {t.liveTelemetry || 'Live Telemetry'}
                  </span>
                </div>

                {/* Primary Metric Preview: Light Blue subtle panel with Saffron progress accent */}
                <div className="bg-[#E8F1F8] rounded p-4 border border-[#0056A6]/20 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#003B70] font-semibold">{t.statewideMatch || 'Statewide Curriculum Match'}</span>
                    <span className="font-extrabold text-[#003B70] text-sm">87.4%</span>
                  </div>
                  <div className="w-full bg-[#DDE3E8] h-2 rounded-full overflow-hidden">
                    {/* Controlled Accent: Saffron Orange indicator bar */}
                    <div className="bg-[#F28C28] h-full rounded-full" style={{ width: '87.4%' }} />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#666666] pt-1">
                    <span>{t.targetQ4 || 'Target: 95% by Q4 2026'}</span>
                    <span className="text-[#198754] font-bold">+6.2% vs last cycle</span>
                  </div>
                </div>

                {/* Key Metric Highlights */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded border border-[#DDE3E8] bg-white">
                    <div className="text-[11px] text-[#666666] font-medium">{t.activeVacancies || 'Active Vacancies'}</div>
                    <div className="text-xl font-black text-[#003B70] mt-0.5">14,280+</div>
                    <div className="text-[10px] text-[#0056A6] font-semibold mt-0.5">Automotive &amp; Mfg</div>
                  </div>
                  <div className="p-3.5 rounded border border-[#DDE3E8] bg-white">
                    <div className="text-[11px] text-[#666666] font-medium">{t.mappedTrades || 'Mapped ITI Trades'}</div>
                    <div className="text-xl font-black text-[#003B70] mt-0.5">84 Trades</div>
                    <div className="text-[10px] text-[#0056A6] font-semibold mt-0.5">{t.nsqfCertified || 'NSQF Certified'}</div>
                  </div>
                </div>

                {/* Live Signal Feed */}
                <div className="pt-2 border-t border-[#DDE3E8] text-xs flex items-center justify-between text-[#666666]">
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-2 h-2 rounded-full bg-[#198754] shrink-0" />
                    <span className="text-[11px] truncate">{t.demandSyncActive || 'Tata Motors, Bajaj & Ather demand telemetry active'}</span>
                  </div>
                  <span className="text-[10px] text-[#8A8A8A] shrink-0">{t.updatedAgo || 'Updated 10m ago'}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST STRIP - Clean official trust metrics */}
      <section className="bg-[#F7F8FA] border-y border-[#DDE3E8] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {trustStats.map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-[#003B70] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#222222]">
                  {stat.label}
                </div>
                <div className="text-[11px] text-[#666666]">
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>

          {/* Affiliation Badges */}
          <div className="mt-8 pt-8 border-t border-[#DDE3E8] flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-[#666666] text-xs font-semibold">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0056A6]" />
              <span>Government of Maharashtra</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#0056A6]" />
              <span>Directorate General of Training (DGT)</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#0056A6]" />
              <span>Skill India Mission</span>
            </div>
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-[#0056A6]" />
              <span>National Council for Vocational Education (NCVET)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. "WHO IS CAREERSYNC FOR?" - SIX ROLE TILES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0056A6]">
            {t.targetAudience || 'Target Audience & Access Levels'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#003B70] tracking-tight">
            {t.whoIsThisFor || 'Who is CareerSync for?'}
          </h2>
          <p className="text-xs sm:text-sm text-[#666666]">
            {t.targetAudienceDesc || 'A unified vocational ecosystem connecting citizens, candidates, educators, industry leaders, and policy authorities under one roof.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roleTiles.map((tile) => {
            const Icon = tile.icon;
            return (
              <div
                key={tile.id}
                className="bg-white rounded-lg border border-[#DDE3E8] p-6 flex flex-col justify-between shadow-2xs hover:border-[#0056A6] transition-all"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded bg-[#E8F1F8] flex items-center justify-center text-[#003B70] shrink-0 border border-[#0056A6]/20">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-[#003B70]">
                      {tile.title}
                    </h3>
                    <p className="text-xs text-[#666666] leading-relaxed">
                      {tile.oneLiner}
                    </p>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={tile.action}
                    className="w-full py-2.5 px-4 rounded border border-[#DDE3E8] hover:border-[#0056A6] text-[#0056A6] hover:bg-[#0056A6] hover:text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                  >
                    <span>{tile.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. HOW IT WORKS WORKFLOW - Soft Gray separation */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F7F8FA] rounded-lg p-8 sm:p-10 border border-[#DDE3E8]">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0056A6]">
              {t.operationalMechanism || 'Operational Mechanism'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#003B70]">
              {t.howItWorksTitle || 'How the DVET Skill Pipeline Works'}
            </h2>
            <p className="text-xs text-[#666666]">
              {t.howItWorksDesc || 'Transforming live industrial job data into actionable vocational curriculum reforms.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded border border-[#DDE3E8] space-y-2">
              <span className="text-xs font-bold font-mono text-[#0056A6]">01 &middot; AGGREGATE</span>
              <h4 className="text-sm font-bold text-[#003B70]">{t.step1Title || 'Industrial Signals'}</h4>
              <p className="text-xs text-[#666666] leading-relaxed">
                {t.step1Desc || 'Live job requirements collected across Chakan, Waluj, Butibori, and Thane industrial manufacturing belts.'}
              </p>
            </div>

            <div className="bg-white p-5 rounded border border-[#DDE3E8] space-y-2">
              <span className="text-xs font-bold font-mono text-[#0056A6]">02 &middot; EXTRACT</span>
              <h4 className="text-sm font-bold text-[#003B70]">{t.step2Title || 'Skill Competencies'}</h4>
              <p className="text-xs text-[#666666] leading-relaxed">
                {t.step2Desc || 'Raw requirements mapped to NSQF vocational levels and National Occupational Standards (NOS).'}
              </p>
            </div>

            <div className="bg-white p-5 rounded border border-[#DDE3E8] space-y-2">
              <span className="text-xs font-bold font-mono text-[#0056A6]">03 &middot; DIAGNOSE</span>
              <h4 className="text-sm font-bold text-[#003B70]">{t.step3Title || 'Curriculum Gaps'}</h4>
              <p className="text-xs text-[#666666] leading-relaxed">
                {t.step3Desc || 'Identifies deficits in high-voltage EV safety, 5-axis CNC machining, and automated PLC programming.'}
              </p>
            </div>

            <div className="bg-white p-5 rounded border border-[#DDE3E8] space-y-2">
              <span className="text-xs font-bold font-mono text-[#0056A6]">04 &middot; EMPOWER</span>
              <h4 className="text-sm font-bold text-[#003B70]">{t.step4Title || 'Targeted Upgrades'}</h4>
              <p className="text-xs text-[#666666] leading-relaxed">
                {t.step4Desc || 'State Skill Committees allocate equipment grants, upskill master trainers, and verify candidate readiness.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ABOUT DVET SECTION */}
      <section id="about-dvet" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg border border-[#DDE3E8] p-8 sm:p-10 shadow-2xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0056A6]">
              {t.institutionalMandate || 'Institutional Mandate'}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#003B70]">
              {t.aboutDvetHeading || 'Directorate of Vocational Education & Training (DVET)'}
            </h3>
            <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
              {t.aboutDvetDescription || 'DVET Maharashtra oversees 418+ Industrial Training Institutes (ITIs) across 36 districts. Under the Department of Skills, Employment, Entrepreneurship and Innovation, DVET is dedicated to modernizing vocational education, empowering rural and urban youth with industry-relevant skills, and supplying high-precision workforce for Maharashtra’s economic roadmap.'}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#0056A6]">
              <span>&bull; {t.hqMumbai || 'Headquarters: Mumbai'}</span>
              <span>&bull; {t.jointDirectorOffices || '6 Regional Joint Director Offices'}</span>
              <span>&bull; {t.districtSkillCommittees || '36 District Skill Committees'}</span>
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#E8F1F8] p-6 rounded border border-[#0056A6]/20 space-y-3 text-center">
            <ShieldCheck className="w-8 h-8 text-[#003B70] mx-auto" />
            <h4 className="text-xs font-bold text-[#003B70] uppercase tracking-wider">
              {t.stateSkillGovernance || 'State Skill Governance'}
            </h4>
            <p className="text-[11px] text-[#666666]">
              {t.govCompliance || 'All intelligence datasets comply with statutory guidelines established by NCVET & MSDE.'}
            </p>
            <button
              onClick={() => onNavigate('public-portal')}
              className="w-full py-2 rounded bg-white hover:bg-[#F7F8FA] text-[#003B70] border border-[#DDE3E8] text-xs font-bold transition-colors cursor-pointer shadow-2xs"
            >
              {t.accessPublicDatasets || 'Access Public Datasets'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
