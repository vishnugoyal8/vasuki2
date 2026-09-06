import React from 'react';

export const DemandGauge = ({
  score,
  size = 140,
  strokeWidth = 12,
  label = 'Demand Score',
  sublabel,
  showEvidenceButton = true,
  onEvidenceClick,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Semi-circle gauge or 240 deg arc
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength - (score / 100) * arcLength;

  let colorClass = 'text-indigo-600';
  let badgeBg = 'bg-indigo-50 text-indigo-700 border-indigo-200';
  let statusText = 'Normal Demand';

  if (score >= 85) {
    colorClass = 'text-rose-600';
    badgeBg = 'bg-rose-50 text-rose-700 border-rose-200';
    statusText = 'Critical Demand Surge';
  } else if (score >= 70) {
    colorClass = 'text-amber-600';
    badgeBg = 'bg-amber-50 text-amber-700 border-amber-200';
    statusText = 'High Demand';
  } else if (score >= 50) {
    colorClass = 'text-blue-600';
    badgeBg = 'bg-blue-50 text-blue-700 border-blue-200';
    statusText = 'Moderate Demand';
  } else {
    colorClass = 'text-emerald-600';
    badgeBg = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    statusText = 'Balanced Supply';
  }

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-135"
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
            className="text-slate-100"
          />
          {/* Active progress arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`${colorClass} transition-all duration-1000 ease-out`}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{score}</span>
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">/ 100</span>
        </div>
      </div>

      <div className="mt-1 flex flex-col items-center">
        <span className="text-xs font-bold text-slate-800">{label}</span>
        <div className={`mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${badgeBg}`}>
          {statusText}
        </div>
        {sublabel && <span className="text-[11px] text-slate-500 mt-1">{sublabel}</span>}

        {showEvidenceButton && onEvidenceClick && (
          <button
            onClick={onEvidenceClick}
            className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer transition-colors"
          >
            <span>Why this score? (Evidence)</span>
            <span aria-hidden="true">&rarr;</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default DemandGauge;
