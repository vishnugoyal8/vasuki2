import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  XCircle,
  CheckCircle2,
  Sparkles,
  Wrench,
  Clock,
  Building2,
} from 'lucide-react';
import { fetchCourses, fetchCourseAlignment } from '../lib/api.js';

export const CourseAlignmentPage = ({ onNavigate }) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('COURSE_ITI_EV_TECH');
  const [alignmentData, setAlignmentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses()
      .then(data => {
        setCourses(data || []);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchCourseAlignment(selectedCourseId)
      .then(res => {
        setAlignmentData(res);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [selectedCourseId]);

  const course = alignmentData?.course;
  const alignmentPercent = alignmentData?.alignmentScore || 62;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header & Course Switcher */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Curriculum Audit
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Course &amp; Trade Curriculum Alignment
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Side-by-side gap audit comparing real-world industry demands against prescribed DGT trade syllabi.
          </p>
        </div>

        {/* Course Select Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-600">Select Trade / Course:</label>
          <select
            value={selectedCourseId}
            onChange={e => setSelectedCourseId(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            {courses.map(c => (
              <option key={c.courseId} value={c.courseId}>
                {c.title} ({c.courseCode})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Course Overview & Alignment Score Card */}
      {course && (
        <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono">
                {course.courseCode}
              </span>
              <span className="text-xs text-slate-400">Awarding Body: {course.awardingBody}</span>
              <span className="text-xs text-slate-400">&middot; NSQF Level {course.nsqfLevel}</span>
              <span className="text-xs text-slate-400">&middot; Target: {course.targetRole}</span>
            </div>

            <h2 className="text-xl font-bold text-white">{course.title}</h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Sector: {course.sector} &middot; Annual Intake Capacity: {course.annualIntakeCapacity} seats across {course.activeBatches} active batches.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Total Duration: {course.durationHours} hrs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Last Updated: {course.lastUpdated}</span>
              </div>
            </div>
          </div>

          {/* Alignment % Ring / Gauge */}
          <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 text-center">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Overall Industry Alignment
            </div>
            <div className="text-4xl font-black text-amber-400 tracking-tight">
              {alignmentPercent}%
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 mt-2 overflow-hidden max-w-[180px]">
              <div className="bg-amber-400 h-full rounded-full" style={{ width: `${alignmentPercent}%` }} />
            </div>
            <p className="text-[11px] text-slate-300 mt-2">
              {100 - alignmentPercent}% Curricular deficit vs 2026 OEM requirements
            </p>
          </div>
        </div>
      )}

      {/* Side-by-Side Comparison Matrix */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              Side-by-Side Competency Alignment Audit
            </h3>
            <p className="text-xs text-slate-500">
              Comparing industry required skills against actual syllabus coverage and required lab hardware.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Covered
            </span>
            <span className="flex items-center gap-1 text-amber-700 font-semibold">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Partial (Theory Only)
            </span>
            <span className="flex items-center gap-1 text-rose-700 font-semibold">
              <XCircle className="w-3.5 h-3.5 text-rose-600" /> Missing from Syllabus
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {(alignmentData?.competencies || []).map((item, idx) => {
            const isMissing = item.coverageStatus === 'NOT_COVERED';
            const isPartial = item.coverageStatus === 'PARTIAL';
            const isCovered = item.coverageStatus === 'COVERED' || item.coverageStatus === 'FULLY_COVERED';

            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border transition-all ${
                  isMissing
                    ? 'bg-rose-50/40 border-rose-200'
                    : isPartial
                    ? 'bg-amber-50/40 border-amber-200'
                    : 'bg-emerald-50/30 border-emerald-200'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Industry Demand column */}
                  <div className="md:col-span-5 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{item.skillName}</span>
                      <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-slate-200 text-slate-800">
                        Demand: {item.demandScore}/100
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{item.description}</p>
                    <div className="text-[10px] text-slate-400 font-mono">
                      NSDC Standard: {item.nsdcQpCode || 'ASC/Q1402'}
                    </div>
                  </div>

                  {/* Syllabus / Trade Coverage column */}
                  <div className="md:col-span-4 space-y-1 border-t md:border-t-0 md:border-l border-slate-200/80 pt-2 md:pt-0 md:pl-4">
                    <div className="flex items-center gap-1.5 font-semibold text-xs">
                      {isCovered && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      {isPartial && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                      {isMissing && <XCircle className="w-4 h-4 text-rose-600" />}
                      <span
                        className={
                          isCovered
                            ? 'text-emerald-800'
                            : isPartial
                            ? 'text-amber-800'
                            : 'text-rose-800'
                        }
                      >
                        {isCovered ? 'Syllabus Aligned' : isPartial ? 'Theoretical Only' : 'Omitted from Trade Syllabus'}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600">
                      <strong>Syllabus Module:</strong> {item.syllabusTopic || item.syllabusTopicReference || 'None (Needs Add-on Module)'}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Practical Lab Ratio: <strong>{Math.round((item.practicalHoursRatio || 0.3) * 100)}%</strong>
                    </div>
                  </div>

                  {/* Required Lab Equipment / Action column */}
                  <div className="md:col-span-3 space-y-1.5 border-t md:border-t-0 md:border-l border-slate-200/80 pt-2 md:pt-0 md:pl-4">
                    <div className="text-[11px] font-semibold text-slate-700 flex items-center gap-1">
                      <Wrench className="w-3 h-3 text-indigo-600" />
                      Required Hardware / Lab Spec:
                    </div>
                    <div className="text-xs text-slate-600 bg-white p-2 rounded-lg border border-slate-200/80 shadow-xs">
                      {Array.isArray(item.labEquipmentRequired)
                        ? item.labEquipmentRequired.join(', ')
                        : item.requiredEquipment || '400V/800V Safety Isolation Rig'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action bar */}
        <div className="mt-6 p-4 rounded-xl bg-indigo-50 border border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-indigo-700 shrink-0" />
            <div className="text-xs text-indigo-950">
              <strong>Need to update this trade syllabus?</strong> The AI Decision Engine has generated an approved 60-hour bridge module recommendation for Pune ITIs.
            </div>
          </div>
          <button
            onClick={() => onNavigate('recommendations')}
            className="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer"
          >
            Review Policy Plan &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseAlignmentPage;
