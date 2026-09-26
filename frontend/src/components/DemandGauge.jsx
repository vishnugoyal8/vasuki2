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

  let colorClass = 'text-[#0056A6]';
  let badgeBg = 'bg-[#E8F1F8] text-[#0056A6] border-[#DDE3E8]';
  let statusText = 'Normal Demand';

  if (score >= 85) {
    colorClass = 'text-[#C62828]';
    badgeBg = 'bg-[#C62828]/10 text-[#C62828] border-[#C62828]/30';
    statusText = 'Critical Demand Surge';
  } else if (score >= 70) {
    colorClass = 'text-[#F28C28]';
    badgeBg = 'bg-[#F28C28]/10 text-[#D96B1F] border-[#F28C28]/30';
    statusText = 'High Demand';
  } else if (score >= 50) {
    colorClass = 'text-[#0056A6]';
    badgeBg = 'bg-[#E8F1F8] text-[#0056A6] border-[#DDE3E8]';
    statusText = 'Moderate Demand';
  } else {
    colorClass = 'text-[#198754]';
    badgeBg = 'bg-[#198754]/10 text-[#198754] border-[#198754]/30';
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
            className="text-[#DDE3E8]"
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
          <span className="text-3xl font-extrabold text-[#003B70] tracking-tight">{score}</span>
          <span className="text-[10px] font-semibold text-[#666666] uppercase tracking-wider">/ 100</span>
        </div>
      </div>

      <div className="mt-1 flex flex-col items-center">
        <span className="text-xs font-bold text-[#222222]">{label}</span>
        <div className={`mt-1 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border ${badgeBg}`}>
          {statusText}
        </div>
        {sublabel && <span className="text-[11px] text-[#666666] mt-1">{sublabel}</span>}

        {showEvidenceButton && onEvidenceClick && (
          <button
            onClick={onEvidenceClick}
            className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-semibold text-[#0056A6] hover:text-[#003B70] hover:underline cursor-pointer transition-colors"
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
