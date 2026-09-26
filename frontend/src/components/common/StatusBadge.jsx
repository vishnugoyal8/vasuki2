import React from 'react';

export const StatusBadge = ({ status, text, size = 'sm' }) => {
  const label = text || status;
  const s = (status || '').toLowerCase();

  let styles = 'bg-[#F7F8FA] text-[#666666] border-[#DDE3E8]';

  if (s.includes('critical') || s.includes('deficit') || s.includes('retest') || s.includes('low') || s.includes('urgent')) {
    styles = 'bg-[#C62828]/10 text-[#C62828] border-[#C62828]/30 font-semibold';
  } else if (s.includes('ready') || s.includes('passed') || s.includes('verified') || s.includes('active') || s.includes('approved')) {
    styles = 'bg-[#198754]/10 text-[#198754] border-[#198754]/30 font-semibold';
  } else if (s.includes('high') || s.includes('medium') || s.includes('pending') || s.includes('progress') || s.includes('review') || s.includes('scheduled')) {
    styles = 'bg-[#F4B942]/15 text-[#D96B1F] border-[#F4B942]/40 font-semibold';
  } else if (s.includes('locked') || s.includes('draft')) {
    styles = 'bg-[#F7F8FA] text-[#666666] border-[#DDE3E8]';
  } else if (s.includes('priority') || s.includes('shortlisted')) {
    styles = 'bg-[#E8F1F8] text-[#0056A6] border-[#0056A6]/30 font-semibold';
  }

  const sizeClass = size === 'xs' ? 'text-[10px] px-1.5 py-0.2' : 'text-[11px] px-2.5 py-0.5';

  return (
    <span className={`inline-flex items-center rounded-full border ${sizeClass} ${styles} whitespace-nowrap`}>
      {label}
    </span>
  );
};

export default StatusBadge;
