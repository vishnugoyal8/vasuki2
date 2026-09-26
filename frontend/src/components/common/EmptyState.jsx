import React from 'react';
import { Inbox } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = Inbox,
  title = 'No Data Available',
  description = 'There are currently no records matching this query.',
  actionText,
  onAction,
}) => {
  return (
    <div className="bg-white rounded-lg border border-[#DDE3E8] p-8 text-center flex flex-col items-center justify-center my-4">
      <div className="w-12 h-12 rounded-full bg-[#E8F1F8] flex items-center justify-center text-[#0056A6] mb-3 border border-[#0056A6]/20">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-sm font-bold text-[#003B70]">{title}</h4>
      <p className="text-xs text-[#666666] max-w-sm mt-1 mb-4">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-[#0056A6] hover:bg-[#003B70] text-white rounded text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export const LoadingSkeleton = ({ count = 3, type = 'card' }) => {
  if (type === 'table') {
    return (
      <div className="bg-white rounded-lg border border-[#DDE3E8] p-4 space-y-3 animate-pulse">
        <div className="h-6 bg-[#E8F1F8] rounded w-1/4"></div>
        <div className="space-y-2">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="h-10 bg-[#F7F8FA] rounded w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg border border-[#DDE3E8] p-5 space-y-3">
          <div className="h-4 bg-[#E8F1F8] rounded w-1/3"></div>
          <div className="h-8 bg-slate-200 rounded w-1/2"></div>
          <div className="h-3 bg-[#F7F8FA] rounded w-2/3"></div>
        </div>
      ))}
    </div>
  );
};

export default EmptyState;
