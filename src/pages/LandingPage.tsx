import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import {
  ArrowRight,
  TrendingUp,
  Award,
  Zap,
  Activity,
  Layers,
  Sparkles,
  GitPullRequest,
  CheckCircle2,
  RefreshCw,
  FileSpreadsheet,
} from 'lucide-react';
import { PageId } from '../components/Navbar.tsx';

interface Props {
  onNavigate: (page: PageId) => void;
  selectedDistrict: string;
}

export const LandingPage: React.FC<Props> = ({ onNavigate, selectedDistrict }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const coreLoopSteps = [
    {
      step: '01',
      title: 'Industry Demand',
      desc: '1,480+ live EV & manufacturing postings aggregated across Chakan & MIDC clusters.',
      icon: TrendingUp,
      color: 'border-blue-500 text-blue-600 bg-blue-50',
    },
    {
      step: '02',
      title: 'AI Skill Extraction',
      desc: 'Gemini 3.7 Flash maps raw industrial specs to ESCO & NSDC vocational competencies.',
      icon: Sparkles,
      color: 'border-indigo-500 text-indigo-600 bg-indigo-50',
    },
    {
      step: '03',
      title: 'Curriculum Skill Gap',
      desc: 'Identifies 58% deficit in 800V High Voltage safety and BMS CAN-bus practical lab time.',
      icon: GitPullRequest,
      color: 'border-rose-500 text-rose-600 bg-rose-50',
    },
    {
      step: '04',
      title: 'Actionable Planning',
      desc: 'District Skill Committee allocates ₹14.8Cr to modernize 3 Govt ITIs & upskill 24 trainers.',
      icon: Award,
      color: 'border-emerald-500 text-emerald-600 bg-emerald-50',
    },
    {
      step: '05',
      title: 'Employer Feedback Loop',
      desc: 'Continuous quarterly signals from Tata Motors, Bajaj & Ather close the training loop.',
      icon: RefreshCw,
      color: 'border-amber-500 text-amber-600 bg-amber-50',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden">
      {/* Eye-catching Hero Section with Anti-Gravity Floating Visuals */}
      <section
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center"
      >
        {/* Institutional Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold mb-6 shadow-xs"
        >
          <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
          <span>Government of Maharashtra Labour Intelligence</span>
        </motion.div>

        {/* Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 max-w-4xl leading-[1.12]"
        >
          From Industry Demand to{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-blue-700 to-indigo-900">
            Actionable Skill Planning.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed"
        >
          Understand what industries need, identify where training is falling behind, and turn
          labour-market signals into actionable decisions for vocational institutes across Maharashtra.
        </motion.p>

        {/* Single Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => onNavigate('gov-dashboard')}
            className="px-6 py-3.5 bg-slate-950 hover:bg-slate-800 text-white rounded-xl font-bold text-sm shadow-xl hover:shadow-2xl transition-all flex items-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
          >
            <span>Explore Dashboard</span>
            <ArrowRight className="w-4 h-4 text-indigo-300" />
          </button>

          <button
            onClick={() => onNavigate('job-analyzer')}
            className="px-5 py-3.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-xl font-bold text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Try AI Job Analyzer</span>
          </button>
        </motion.div>

        {/* Floating Anti-Gravity Cards Canvas (Subtle Parallax & Mouse Tilt) */}
        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="relative w-full max-w-5xl h-[340px] mt-14 flex items-center justify-center pointer-events-none"
        >
          {/* Card 1: Demand Score Radial Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
            transition={{
              opacity: { duration: 0.8, delay: 0.2 },
              y: { repeat: Infinity, duration: 4.5, ease: 'easeInOut' },
            }}
            className="absolute -top-4 left-4 sm:left-12 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl pointer-events-auto text-left w-64"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Pilot Demand Surge
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">
                Critical
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center font-black text-rose-700 text-xl">
                94
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">EV Technician Demand</div>
                <div className="text-[11px] text-slate-500">Pune &middot; Chakan MIDC</div>
              </div>
            </div>
            <div className="mt-2 text-[11px] text-slate-500 border-t border-slate-100 pt-1.5 flex items-center justify-between">
              <span>Postings: 1,480+</span>
              <span className="text-emerald-600 font-semibold">+48.5% YoY</span>
            </div>
          </motion.div>

          {/* Card 2: Extracted Skill Tag Cluster */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: [0, 8, 0] }}
            transition={{
              opacity: { duration: 0.8, delay: 0.4 },
              y: { repeat: Infinity, duration: 5.2, ease: 'easeInOut', delay: 0.5 },
            }}
            className="absolute top-2 sm:top-6 right-4 sm:right-12 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl pointer-events-auto text-left w-72"
          >
            <div className="flex items-center gap-2 mb-2 text-indigo-700 font-bold text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Extracted Competencies</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-1 rounded-md text-[11px] font-semibold bg-rose-50 text-rose-800 border border-rose-200">
                800V High Voltage Safety
              </span>
              <span className="px-2 py-1 rounded-md text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                BMS Diagnostics
              </span>
              <span className="px-2 py-1 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700">
                CAN Bus Probing
              </span>
              <span className="px-2 py-1 rounded-md text-[11px] font-semibold bg-indigo-50 text-indigo-800">
                5-Axis CNC Milling
              </span>
            </div>
            <div className="mt-2 text-[10px] text-slate-400">Normalized to NSDC QP ASC/Q1402</div>
          </motion.div>

          {/* Card 3: Central Mini Graph / Alignment Gauge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
            transition={{
              opacity: { duration: 0.8, delay: 0.3 },
              y: { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1 },
            }}
            className="bg-slate-900 text-white p-5 rounded-2xl shadow-2xl border border-slate-800 pointer-events-auto w-80 text-left"
          >
            <div className="flex items-center justify-between text-xs mb-3 text-slate-400 font-medium">
              <span>Curriculum Alignment Deficit</span>
              <span className="text-amber-400 font-bold">42% Covered</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden mb-3">
              <div className="bg-amber-400 h-full rounded-full w-[42%]" />
            </div>
            <div className="text-xs text-slate-300 leading-snug">
              DGT Mechanic EV trade syllabus needs immediate 60-hr high-voltage simulation module.
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>Target: ITI Aundh &amp; Pimpri</span>
              <span className="text-emerald-400 font-semibold">₹6.8 Cr Allocated</span>
            </div>
          </motion.div>

          {/* Card 4: Employer Feedback Signal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: [0, 7, 0] }}
            transition={{
              opacity: { duration: 0.8, delay: 0.5 },
              y: { repeat: Infinity, duration: 4.8, ease: 'easeInOut', delay: 1.5 },
            }}
            className="absolute -bottom-6 left-12 sm:left-24 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200 shadow-xl pointer-events-auto text-left w-64 hidden sm:block"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-1">
              <Activity className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tata Motors TPEML Signal</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              &ldquo;78% hiring difficulty in 400V isolation interlock verification.&rdquo;
            </p>
            <div className="mt-1.5 text-[10px] font-semibold text-emerald-700">
              Loop Closed: Policy Alert Generated
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Core Continuous Loop Infographic (Below the Fold) */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-1">
              Continuous Intelligence Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              The Closed-Loop Decision Framework
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Unlike static job boards, CareerSync continuously links raw industry hiring signals
              to institute curriculum modernization, trainer upskilling, and verifiable employer feedback.
            </p>
          </div>

          {/* Staggered Loop Flow Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {coreLoopSteps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow relative group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-black text-slate-400 font-mono">
                        STEP {item.step}
                      </span>
                      <div className={`p-2 rounded-xl border ${item.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1.5">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-semibold text-indigo-700">
                    <span>Evidence-Linked</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Quick Access Action Bar */}
          <div className="mt-12 p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-base text-white">
                Explore the {selectedDistrict} District Action Plan
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Review ₹14.80 Cr allocated ITI equipment upgrades, instructor upskilling, and NSDC QP mappings.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('district-plan')}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                View District Plan
              </button>
              <button
                onClick={() => onNavigate('employer-feedback')}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Submit Employer Signal
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
