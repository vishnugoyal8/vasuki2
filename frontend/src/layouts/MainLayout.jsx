import React from 'react';
import { Navbar } from '../components/Navbar.jsx';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';

export const MainLayout = ({
  children,
  activePage,
  onSelectPage,
  selectedDistrict,
  onSelectDistrict,
  onResetData,
  toastMessage,
}) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] flex flex-col font-sans antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Navbar */}
      <Navbar
        activePage={activePage}
        onSelectPage={onSelectPage}
        selectedDistrict={selectedDistrict}
        onSelectDistrict={onSelectDistrict}
        onResetData={onResetData}
      />

      {/* Page Content Container */}
      <main className="flex-1">
        {children}
      </main>

      {/* Institutional Footer */}
      <footer className="bg-white border-t border-slate-200 py-5 px-4 sm:px-6 text-center text-xs text-slate-500 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">{t?.appName || 'CareerSync'}</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[10px] border border-slate-200">
              Demo / Synthetic Pilot Dataset
            </span>
          </div>
          <div className="text-[11px] text-slate-400">
            Government of Maharashtra &middot; Directorate of Vocational Education and Training (DVET)
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
