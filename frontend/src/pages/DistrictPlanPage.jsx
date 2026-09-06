import React, { useState, useEffect } from 'react';
import {
  Printer,
} from 'lucide-react';
import { fetchDistrictPlan } from '../lib/api.js';

export const DistrictPlanPage = ({ selectedDistrict, onNavigate }) => {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchDistrictPlan(selectedDistrict)
      .then(res => {
        setPlan(res);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [selectedDistrict]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 print:p-0 print:space-y-4">
      {/* Header & Print Action */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 print:border-none print:shadow-none">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Official State Plan
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {plan?.district || selectedDistrict} District Skill Development Plan (2026-2027)
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Formulated by District Skill Committee &middot; Directorate of Vocational Education &amp; Training (DVET)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer print:hidden"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Official Plan</span>
          </button>
        </div>
      </div>

      {/* Institutional Overview Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400" />
            <span className="font-bold text-xs uppercase tracking-wider text-slate-300">
              Executive Cabinet Approval &middot; FY 2026-27 Allocation
            </span>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Plan ID: MH-DSC-PUN-2026-08
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 max-w-4xl leading-relaxed">
          {plan?.summary ||
            'Comprehensive strategic intervention to bridge the 58% high-voltage and BMS talent deficit across Pune Automotive & EV clusters by modernizing 3 Government ITIs, establishing ARAI instructor certification, and deploying ₹14.80 Cr in state and CSR matching funds.'}
        </p>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Total Budget Outlay</div>
            <div className="text-xl font-black text-white mt-1">₹{plan?.totalBudgetCr || '14.80'} Cr</div>
            <div className="text-[10px] text-emerald-400 mt-0.5">Approved DVET matching funds</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Target Upskilling Quota</div>
            <div className="text-xl font-black text-white mt-1">{plan?.targetTraineesCount || '2,800'}</div>
            <div className="text-[10px] text-indigo-400 mt-0.5">Technicians across 3 quarters</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Modernized ITI Hubs</div>
            <div className="text-xl font-black text-white mt-1">{plan?.modernizedItiCount || 3} Hubs</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Aundh, Pimpri &amp; Ghole Road</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Certified Master Trainers</div>
            <div className="text-xl font-black text-white mt-1">{plan?.trainerUpskillCount || 24} Faculty</div>
            <div className="text-[10px] text-amber-400 mt-0.5">ARAI &amp; DGT Accredited</div>
          </div>
        </div>
      </div>

      {/* Strategic Initiatives & Quarter Milestones */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Strategic Milestones &amp; Implementation Timeline
          </h2>
          <p className="text-xs text-slate-500">
            Phased rollout roadmap synchronized with OEM production ramp-ups in Chakan &amp; Talegaon.
          </p>
        </div>

        <div className="space-y-4">
          {(plan?.initiatives || [
            {
              quarter: 'Q3 2026',
              title: 'Phase I: 400V/800V High Voltage Safety Simulator Procurement',
              desc: 'Tendering and installation of interactive battery teardown simulators and LOTO isolation test benches at ITI Aundh and ITI Pimpri-Chinchwad.',
              budget: '₹5.40 Cr',
              status: 'IN_PROGRESS',
            },
            {
              quarter: 'Q4 2026',
              title: 'Phase II: ARAI Master Trainer EV Certification Bootcamp',
              desc: 'Mandatory 4-week residential training program for 24 vocational instructors covering CAN-bus packet sniffing, active battery thermal management, and emergency disconnect protocols.',
              budget: '₹2.10 Cr',
              status: 'APPROVED',
            },
            {
              quarter: 'Q1 2027',
              title: 'Phase III: 60-Hour Add-on Micro-Credential Rollout',
              desc: 'Introduction of mandatory evening and weekend short-term bridge programs for existing 3rd-semester ITI electrician and mechanic trainees.',
              budget: '₹4.30 Cr',
              status: 'PENDING_APPROVAL',
            },
            {
              quarter: 'Q2 2027',
              title: 'Phase IV: Industry Dual-Apprenticeship & Placement Drive',
              desc: 'Formal placement consortium with Tata Motors TPEML, Bajaj Chetak, Ather Energy, and Kinetic Green with pre-agreed entry salary benchmarks of ₹3.6 LPA.',
              budget: '₹3.00 Cr',
              status: 'PENDING_APPROVAL',
            },
          ]).map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800 font-mono">
                    {item.quarter}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0">
                <span className="text-xs font-bold text-slate-900">{item.budget}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-700">
                  {item.status ? item.status.replace('_', ' ') : ''}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Target Institutes Allocation Breakdown */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 mb-1">
          Nodal Vocational Institutes &middot; Capacity Expansion
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          Allocated seats, equipment grants, and industry anchor partners for each designated center.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">Govt ITI Aundh (Lead Hub)</h3>
            <div className="text-xs text-slate-600 space-y-1">
              <div>Capacity: <strong>120 Annual Seats</strong></div>
              <div>Grant: <strong>₹6.80 Cr (HV Lab + Simulators)</strong></div>
              <div>Anchor: <strong>Tata Motors EV &amp; ARAI</strong></div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">Govt ITI Pimpri-Chinchwad</h3>
            <div className="text-xs text-slate-600 space-y-1">
              <div>Capacity: <strong>100 Annual Seats</strong></div>
              <div>Grant: <strong>₹4.80 Cr (BMS Lab &amp; Cells)</strong></div>
              <div>Anchor: <strong>Bajaj Auto &amp; Kinetic</strong></div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">Govt ITI Ghole Road (Pune City)</h3>
            <div className="text-xs text-slate-600 space-y-1">
              <div>Capacity: <strong>80 Annual Seats</strong></div>
              <div>Grant: <strong>₹3.20 Cr (Diagnostic Scanners)</strong></div>
              <div>Anchor: <strong>KPIT Technologies &amp; BOSCH</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistrictPlanPage;
