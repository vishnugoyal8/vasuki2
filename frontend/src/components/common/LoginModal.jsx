import React, { useState, useEffect } from 'react';
import {
  X,
  GraduationCap,
  Building2,
  Briefcase,
  ShieldCheck,
  Award,
  ArrowRight,
  Sparkles,
  Lock,
} from 'lucide-react';
import { useAuth, DEMO_PROFILES } from '../../context/AuthContext.jsx';

export const LoginModal = ({ onNavigate }) => {
  const { isLoginModalOpen, closeLoginModal, pendingTargetRole, loginAs } = useAuth();
  const [selectedRole, setSelectedRole] = useState('student');

  useEffect(() => {
    if (pendingTargetRole) {
      setSelectedRole(pendingTargetRole);
    }
  }, [pendingTargetRole]);

  if (!isLoginModalOpen) return null;

  const roles = [
    { id: 'student', label: 'Student', icon: GraduationCap },
    { id: 'trainer', label: 'Trainer', icon: Award },
    { id: 'institute', label: 'Institute', icon: Building2 },
    { id: 'employer', label: 'Employer', icon: Briefcase },
    { id: 'government', label: 'Government', icon: ShieldCheck },
  ];

  const currentProfile = DEMO_PROFILES[selectedRole];

  const handleDemoLogin = () => {
    loginAs(selectedRole);
    closeLoginModal();
    if (onNavigate) {
      onNavigate(selectedRole);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleDemoLogin();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#222222]/70 flex items-center justify-center p-4">
      <div
        className="bg-white rounded-lg shadow-xl border border-[#DDE3E8] w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="bg-[#003B70] text-white px-6 py-4 flex items-center justify-between border-b border-[#00284D]">
          <div>
            <div className="text-[10px] font-bold text-[#E8F1F8] uppercase tracking-wider">
              DVET Maharashtra &middot; CareerSync
            </div>
            <h3 className="text-base font-bold text-white">
              Official Portal Sign-In
            </h3>
          </div>
          <button
            onClick={closeLoginModal}
            className="p-1 rounded text-white/80 hover:text-white hover:bg-[#00284D] transition-colors cursor-pointer"
            aria-label="Close login modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Selection Tabs */}
        <div className="flex border-b border-[#DDE3E8] bg-[#F7F8FA] p-1 gap-1 overflow-x-auto">
          {roles.map(r => {
            const Icon = r.icon;
            const isSelected = selectedRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setSelectedRole(r.id)}
                className={`flex-1 min-w-[70px] py-2 px-2 text-xs font-semibold rounded flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-white text-[#003B70] shadow-2xs border border-[#0056A6]/40 font-bold'
                    : 'text-[#666666] hover:text-[#222222] hover:bg-stone-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#0056A6]' : 'text-[#666666]'}`} />
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          <div className="bg-[#E8F1F8] border border-[#0056A6]/30 rounded-lg p-3 text-xs text-[#222222] flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#0056A6] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#003B70]">Evaluation Mode Active:</span>
              <p className="mt-0.5 text-[11px] text-[#666666]">
                You can authenticate using official credentials or use the 1-click test profile for{' '}
                <span className="font-semibold text-[#222222]">{currentProfile.name}</span> ({currentProfile.roleLabel}).
              </p>
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-3.5">
            {selectedRole === 'student' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-[#222222] mb-1">
                    Student ID / Enrollment Number
                  </label>
                  <input
                    type="text"
                    defaultValue={currentProfile.id}
                    className="w-full px-3 py-2 border border-[#DDE3E8] rounded text-xs text-[#222222] focus:border-[#0056A6] focus:outline-none"
                    placeholder="e.g. STU-2026-MH402"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#222222] mb-1">
                    Date of Birth / PIN
                  </label>
                  <input
                    type="password"
                    defaultValue="12-08-2004"
                    className="w-full px-3 py-2 border border-[#DDE3E8] rounded text-xs text-[#222222] focus:border-[#0056A6] focus:outline-none"
                    placeholder="DD-MM-YYYY"
                  />
                </div>
              </>
            )}

            {selectedRole === 'trainer' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-[#222222] mb-1">
                    Instructor Code
                  </label>
                  <input
                    type="text"
                    defaultValue={currentProfile.id}
                    className="w-full px-3 py-2 border border-[#DDE3E8] rounded text-xs text-[#222222] focus:border-[#0056A6] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#222222] mb-1">
                    Govt OTP / Password
                  </label>
                  <input
                    type="password"
                    defaultValue="••••••••"
                    className="w-full px-3 py-2 border border-[#DDE3E8] rounded text-xs text-[#222222] focus:border-[#0056A6] focus:outline-none"
                  />
                </div>
              </>
            )}

            {selectedRole === 'institute' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-[#222222] mb-1">
                    ITI Affiliation Code / MIS Code
                  </label>
                  <input
                    type="text"
                    defaultValue={currentProfile.itiCode}
                    className="w-full px-3 py-2 border border-[#DDE3E8] rounded text-xs text-[#222222] focus:border-[#0056A6] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#222222] mb-1">
                    Principal Administrative Key
                  </label>
                  <input
                    type="password"
                    defaultValue="••••••••••••"
                    className="w-full px-3 py-2 border border-[#DDE3E8] rounded text-xs text-[#222222] focus:border-[#0056A6] focus:outline-none"
                  />
                </div>
              </>
            )}

            {selectedRole === 'employer' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-[#222222] mb-1">
                    Corporate Email / MSME Udyam Number
                  </label>
                  <input
                    type="text"
                    defaultValue={currentProfile.email}
                    className="w-full px-3 py-2 border border-[#DDE3E8] rounded text-xs text-[#222222] focus:border-[#0056A6] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#222222] mb-1">
                    Industry Verification Password
                  </label>
                  <input
                    type="password"
                    defaultValue="••••••••"
                    className="w-full px-3 py-2 border border-[#DDE3E8] rounded text-xs text-[#222222] focus:border-[#0056A6] focus:outline-none"
                  />
                </div>
              </>
            )}

            {selectedRole === 'government' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-[#222222] mb-1">
                    Officer Employee Code (NIC / MahaGov)
                  </label>
                  <input
                    type="text"
                    defaultValue={currentProfile.id}
                    className="w-full px-3 py-2 border border-[#DDE3E8] rounded text-xs text-[#222222] focus:border-[#0056A6] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#222222] mb-1">
                    State 2-Factor Passcode
                  </label>
                  <input
                    type="password"
                    defaultValue="••••••••"
                    className="w-full px-3 py-2 border border-[#DDE3E8] rounded text-xs text-[#222222] focus:border-[#0056A6] focus:outline-none"
                  />
                </div>
              </>
            )}

            <div className="pt-2 flex flex-col gap-2">
              {/* Controlled Accent: Saffron Orange Instant Login */}
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full py-2.5 px-4 bg-[#F28C28] hover:bg-[#D96B1F] text-white rounded text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Instant Login as {currentProfile.name}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#F7F8FA] hover:bg-[#E8F1F8] text-[#003B70] border border-[#DDE3E8] rounded text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-[#0056A6]" />
                <span>Verify Credentials</span>
              </button>
            </div>
          </form>
        </div>

        {/* Footer info */}
        <div className="bg-[#F7F8FA] px-6 py-3 border-t border-[#DDE3E8] text-[11px] text-[#666666] flex items-center justify-between">
          <span>Protected under IT Act 2000</span>
          <span className="font-semibold text-[#0056A6] cursor-pointer hover:underline">
            Forgot Password?
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
