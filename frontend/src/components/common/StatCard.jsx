import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  subtext,
  trend,
  trendDirection = 'up',
  icon: Icon,
  badgeText,
  badgeColor = 'blue',
  className = '',
}) => {
  const badgeColors = {
    blue: 'bg-[#E8F1F8] text-[#0056A6] border-[#0056A6]/20',
    navy: 'bg-[#E8F1F8] text-[#003B70] border-[#0056A6]/30',
    emerald: 'bg-[#198754]/10 text-[#198754] border-[#198754]/30',
    amber: 'bg-[#F4B942]/15 text-[#D96B1F] border-[#F4B942]/40',
    rose: 'bg-[#C62828]/10 text-[#C62828] border-[#C62828]/30',
    slate: 'bg-[#F7F8FA] text-[#666666] border-[#DDE3E8]',
  };

  return (
    <div className={`bg-white rounded-lg border border-[#DDE3E8] p-4 sm:p-5 shadow-2xs transition-shadow hover:shadow-xs min-w-0 overflow-hidden ${className}`}>
      <div className="flex items-start justify-between gap-2 sm:gap-3 min-w-0">
        <div className="min-w-0 flex-1">
          <span className="text-xs font-semibold text-[#666666] uppercase tracking-wider block truncate">
            {title}
          </span>
          <div className="text-xl sm:text-2xl font-black text-[#003B70] mt-1 tracking-tight truncate">
            {value}
          </div>
        </div>

        {Icon && (
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded bg-[#E8F1F8] border border-[#0056A6]/20 flex items-center justify-center text-[#003B70] shrink-0">
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-[#DDE3E8]/60 gap-2 min-w-0">
        {subtext && (
          <span className="text-[#666666] font-medium text-[11px] truncate flex-1 min-w-0" title={subtext}>
            {subtext}
          </span>
        )}

        <div className="flex items-center gap-1.5 shrink-0 ml-auto">
          {trend && (
            <span className={`inline-flex items-center gap-0.5 text-[11px] font-bold ${
              trendDirection === 'up' ? 'text-[#198754]' : 'text-[#C62828]'
            }`}>
              {trendDirection === 'up' ? (
                <ArrowUpRight className="w-3.5 h-3.5" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5" />
              )}
              {trend}
            </span>
          )}

          {badgeText && (
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${badgeColors[badgeColor] || badgeColors.blue}`}>
              {badgeText}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
