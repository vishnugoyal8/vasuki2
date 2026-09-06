import React, { useState, useEffect } from 'react';
import {
  Users,
  Wrench,
  AlertTriangle,
  ShieldCheck,
} from 'lucide-react';
import { fetchInstitutes } from '../lib/api.js';

export const InstituteDashboardPage = ({ selectedDistrict, onNavigate }) => {
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInstituteId, setSelectedInstituteId] = useState('INST_PUNE_ITI_AUNDH');

  useEffect(() => {
    setLoading(true);
    fetchInstitutes(selectedDistrict)
      .then(data => {
        setInstitutes(data || []);
        if (data && data.length > 0) setSelectedInstituteId(data[0].instituteId);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [selectedDistrict]);

  const activeInstitute =
    institutes.find(i => i.instituteId === selectedInstituteId) || institutes[0];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Institutional Enablement
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Training Institute Readiness Portal &middot; {selectedDistrict}
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Constructive diagnostic metrics and capacity support for Government ITIs and Vocational Training Providers.
          </p>
        </div>

        {/* Quick select institute */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-600">Select Center:</label>
          <select
            value={selectedInstituteId}
            onChange={e => setSelectedInstituteId(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
          >
            {institutes.map(inst => (
              <option key={inst.instituteId} value={inst.instituteId}>
                {inst.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {activeInstitute && (
        <>
          {/* Institute Profile Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-900 text-white font-mono">
                  {activeInstitute.instituteId}
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {activeInstitute.type ? activeInstitute.type.replace('_', ' ') : ''}
                </span>
                <span className="text-xs text-slate-500">
                  {activeInstitute.district} &middot; Cluster: {activeInstitute.cluster}
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">{activeInstitute.name}</h2>
              <p className="text-xs text-slate-600 max-w-2xl">
                Courses Offered: {(activeInstitute.coursesOffered || []).join(', ')}
              </p>
            </div>

            <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
              <div className="text-center">
                <div className="text-2xl font-black text-slate-900">
                  {activeInstitute.activeEnrollments}
                </div>
                <div className="text-[11px] text-slate-500">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-indigo-600">
                  {activeInstitute.capacity}
                </div>
                <div className="text-[11px] text-slate-500">Total Capacity</div>
              </div>
            </div>
          </div>

          {/* 4 Core Readiness Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase mb-2">
                <span>Lab Hardware Readiness</span>
                <Wrench className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">
                {activeInstitute.labReadinessScore}%
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full"
                  style={{ width: `${activeInstitute.labReadinessScore}%` }}
                />
              </div>
              <div className="text-[11px] text-slate-500 mt-2">
                Simulators and safety interlock rigs
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase mb-2">
                <span>Trainer Readiness</span>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">
                {activeInstitute.trainerReadinessScore}%
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full"
                  style={{ width: `${activeInstitute.trainerReadinessScore}%` }}
                />
              </div>
              <div className="text-[11px] text-slate-500 mt-2">
                ARAI / DGT Master Certified Faculty
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase mb-2">
                <span>Capacity Utilization</span>
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">
                {activeInstitute.capacity ? Math.round((activeInstitute.activeEnrollments / activeInstitute.capacity) * 100) : 0}%
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full"
                  style={{
                    width: `${activeInstitute.capacity ? Math.round(
                      (activeInstitute.activeEnrollments / activeInstitute.capacity) * 100
                    ) : 0}%`,
                  }}
                />
              </div>
              <div className="text-[11px] text-slate-500 mt-2">
                Active batch seat occupancy
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase mb-2">
                <span>Trainer Deficit</span>
                <AlertTriangle className="w-4 h-4 text-rose-600" />
              </div>
              <div className="text-2xl font-black text-rose-600">
                +{activeInstitute.trainersNeeded} Faculty
              </div>
              <div className="text-xs font-semibold text-rose-700 mt-2">
                Required for full lab shifts
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Nominated for ARAI bootcamp
              </div>
            </div>
          </div>

          {/* Constructive Priority Enablement Actions (No Public Shaming) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Priority Capacity Enablement Actions &amp; Missing Equipment
                </h3>
                <p className="text-xs text-slate-500">
                  Constructive step-by-step assistance roadmap to elevate {activeInstitute.name} to Center of Excellence standards.
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold">
                State Grant Allocated
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Missing Lab Equipment to Procure:
                </div>
                {(activeInstitute.missingEquipment || []).map((eq, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs"
                  >
                    <Wrench className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span className="font-semibold text-slate-800">{eq}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Trainer Enablement Roadmaps:
                </div>
                <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-200 text-xs space-y-1.5">
                  <div className="font-bold text-indigo-900">
                    Nominate {activeInstitute.trainersNeeded} instructors to ARAI EV Safety Training
                  </div>
                  <p className="text-indigo-700 text-[11px]">
                    Fully funded 4-week residential certification sponsored under Pune District Skill Plan.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs space-y-1.5">
                  <div className="font-bold text-emerald-900">
                    Activate Apprenticeship Portal with Chakan Auto Cluster
                  </div>
                  <p className="text-emerald-700 text-[11px]">
                    Direct connection to Tata Motors and Bajaj Auto dual-training program.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InstituteDashboardPage;
