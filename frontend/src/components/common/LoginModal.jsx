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
  Mail,
  KeyRound,
} from 'lucide-react';
import { useAuth, DEMO_PROFILES } from '../../context/AuthContext.jsx';

export const LoginModal = ({ onNavigate }) => {
  const {
    isLoginModalOpen,
    closeLoginModal,
    pendingTargetRole,
    loginAs,
    loginWithCredentials,
    openRegisterModal,
  } = useAuth();
  const [selectedRole, setSelectedRole] = useState('student');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (pendingTargetRole) {
      setSelectedRole(pendingTargetRole);
    }
  }, [pendingTargetRole]);

  useEffect(() => {
    if (DEMO_PROFILES[selectedRole]) {
      setEmailInput(DEMO_PROFILES[selectedRole].email);
      setPasswordInput('password123');
    }
  }, [selectedRole]);

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!emailInput.trim() && !passwordInput.trim()) {
      handleDemoLogin();
      return;
    }
    setIsSubmitting(true);
    setLoginError('');
    try {
      await loginWithCredentials({
        email: emailInput || currentProfile.email,
        password: passwordInput || 'password123',
        role: selectedRole,
      });
      closeLoginModal();
      if (onNavigate) {
        onNavigate(selectedRole);
      }
    } catch (err) {
      setLoginError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setIsSubmitting(false);
    }
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
              DVET Maharashtra &middot; SkillScan
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

        {/* Mode Switcher: Sign In vs New Registration */}
        <div className="flex border-b border-[#DDE3E8] bg-[#F7F8FA] text-xs font-bold">
          <button
            type="button"
            className="flex-1 py-2.5 text-center border-b-2 border-[#003B70] text-[#003B70] bg-white cursor-default"
          >
            Official Sign-In
          </button>
          <button
            type="button"
            onClick={() => {
              closeLoginModal();
              openRegisterModal(selectedRole);
            }}
            className="flex-1 py-2.5 text-center text-[#666666] hover:text-[#003B70] hover:bg-stone-50 cursor-pointer transition-colors"
          >
            New Registration &rarr;
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
            {/* 1. Email ID Input (Replaces all generated IDs) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-[#003B70]">
                  Email ID / Official Email Address
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setEmailInput(currentProfile.email);
                    setPasswordInput('password123');
                  }}
                  className="text-[10px] text-[#0056A6] hover:underline font-bold cursor-pointer"
                >
                  Autofill Demo Email
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4 text-[#0056A6]" />
                </div>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={e => setEmailInput(e.target.value)}
                  placeholder={`e.g. ${currentProfile.email}`}
                  className="w-full pl-9 pr-3 py-2 border border-[#DDE3E8] rounded-md text-xs text-[#222222] focus:border-[#0056A6] focus:ring-1 focus:ring-[#0056A6] focus:outline-none"
                />
              </div>
              <p className="text-[10px] text-[#666666] mt-1">
                Sign in using your registered email ID. No auto-generated user code or enrollment ID required.
              </p>
            </div>

            {/* 2. Password Input */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-[#003B70]">
                  Account Password
                </label>
                <span className="text-[10px] text-[#666666]">
                  Demo: <span className="font-mono text-slate-700 bg-slate-100 px-1 py-0.5 rounded">password123</span>
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4 text-[#0056A6]" />
                </div>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                  placeholder="Enter your account password"
                  className="w-full pl-9 pr-3 py-2 border border-[#DDE3E8] rounded-md text-xs text-[#222222] focus:border-[#0056A6] focus:ring-1 focus:ring-[#0056A6] focus:outline-none"
                />
              </div>
            </div>

            {loginError && (
              <div className="p-2.5 rounded bg-red-50 border border-red-200 text-xs text-red-700">
                {loginError}
              </div>
            )}

            <div className="pt-2 flex flex-col gap-2">
              {/* Primary Email Sign-In */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 bg-[#003B70] hover:bg-[#00284D] text-white rounded text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Lock className="w-3.5 h-3.5 text-white" />
                <span>{isSubmitting ? 'Verifying...' : 'Sign In with Email & Password'}</span>
              </button>

              {/* Controlled Accent: Saffron Orange 1-Click Instant Login */}
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full py-2.5 px-4 bg-[#F28C28] hover:bg-[#D96B1F] text-white rounded text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Instant 1-Click Login ({currentProfile.name})</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              {/* Direct Registration Switch */}
              <div className="pt-2 text-center border-t border-[#DDE3E8] mt-1">
                <span className="text-xs text-[#666666]">New to SkillScan? </span>
                <button
                  type="button"
                  onClick={() => {
                    closeLoginModal();
                    openRegisterModal(selectedRole);
                  }}
                  className="text-xs text-[#0056A6] font-bold hover:underline cursor-pointer"
                >
                  Register as {roles.find(r => r.id === selectedRole)?.label} &rarr;
                </button>
              </div>
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
