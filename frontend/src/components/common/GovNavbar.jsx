import React, { useState, useRef, useEffect } from 'react';
import {
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
  GraduationCap,
  Building2,
  Briefcase,
  ShieldCheck,
  Compass,
  Award,
  ChevronRight,
  Globe,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';

export const GovNavbar = ({ activePage, onNavigate }) => {
  const { user, isAuthenticated, logout, openLoginModal } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRoleSelect = (roleKey) => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    openLoginModal(roleKey);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#DDE3E8] shadow-xs">
      {/* Official Government Top Bar with Accessibility & 3-Language Switcher */}
      <div className="bg-[#00284D] text-[#E8F1F8] text-[10px] sm:text-[11px] px-3 sm:px-8 py-1.5 flex items-center justify-between border-b border-[#001F3D] min-w-0 overflow-hidden">
        <div className="flex items-center gap-2 min-w-0 flex-1 truncate">
          <span className="font-bold text-white tracking-wide truncate">
            {t.govtOfMaharashtra || 'GOVT. OF MAHARASHTRA'}
          </span>
          <span className="text-[#0056A6] hidden sm:inline">|</span>
          <span className="hidden sm:inline text-[#E8F1F8] font-medium truncate">
            {t.dvetTitle || 'Directorate of Vocational Education & Training (DVET)'}
          </span>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 text-[#E8F1F8] shrink-0 font-medium">
          <span className="hover:text-white cursor-pointer text-[10px] hidden md:inline">
            {t.skipToMain || 'Skip to Main Content'}
          </span>
          <span className="hidden md:inline text-white/40">|</span>
          <span className="hover:text-white cursor-pointer text-[10px] hidden sm:inline">
            {t.fontSize || 'A- A A+'}
          </span>
          <span className="hidden sm:inline text-white/40">|</span>

          {/* Hindi, English, Marathi Language Switcher */}
          <div className="flex items-center gap-0.5 sm:gap-1 bg-[#003B70] px-1.5 sm:px-2 py-0.5 rounded border border-[#0056A6]">
            <Globe className="w-3 h-3 text-[#E8F1F8] mr-0.5 shrink-0" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                language === 'en'
                  ? 'bg-[#0056A6] text-white shadow-xs'
                  : 'text-[#E8F1F8] hover:text-white'
              }`}
              title="English"
            >
              EN
            </button>
            <span className="text-white/30 text-[10px]">|</span>
            <button
              onClick={() => setLanguage('mr')}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                language === 'mr'
                  ? 'bg-[#0056A6] text-white shadow-xs'
                  : 'text-[#E8F1F8] hover:text-white'
              }`}
              title="मराठी (Marathi)"
            >
              मराठी
            </button>
            <span className="text-white/30 text-[10px]">|</span>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                language === 'hi'
                  ? 'bg-[#0056A6] text-white shadow-xs'
                  : 'text-[#E8F1F8] hover:text-white'
              }`}
              title="हिन्दी (Hindi)"
            >
              हिन्दी
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 min-w-0">
        {/* Brand with Official DVET Emblem Representation */}
        <div
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-3.5 cursor-pointer select-none group"
        >
          {/* Official Emblem Representation with Deep Navy & Saffron Touch */}
          <div className="w-11 h-11 rounded-md bg-[#E8F1F8] border border-[#0056A6]/30 flex items-center justify-center p-1.5 shadow-2xs group-hover:border-[#0056A6] transition-colors">
            <svg viewBox="0 0 100 100" className="w-8 h-8 fill-[#003B70]">
              <circle cx="50" cy="38" r="18" fill="none" stroke="#003B70" strokeWidth="4" />
              <circle cx="50" cy="38" r="6" fill="#F28C28" />
              <path d="M42 30 L58 46 M58 30 L42 46" stroke="#003B70" strokeWidth="2.5" />
              <path d="M30 64 L70 64 L65 84 L35 84 Z" fill="#003B70" />
              <rect x="25" y="86" width="50" height="5" rx="1.5" fill="#F28C28" />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#003B70] font-sans">
                Career<span className="text-[#0056A6]">Sync</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E8F1F8] text-[#003B70] border border-[#0056A6]/20 hidden md:inline">
                DVET MAHARASHTRA
              </span>
            </div>
            <p className="text-[11px] text-[#666666] font-medium tracking-wide">
              Directorate of Vocational Education &amp; Training
            </p>
          </div>
        </div>

        {/* Desktop Nav Links - Clean Government Blue active/hover styling */}
        <nav className="hidden lg:flex items-center gap-1.5">
          <button
            onClick={() => onNavigate('landing')}
            className={`px-3.5 py-2 text-xs font-semibold rounded transition-colors cursor-pointer ${
              activePage === 'landing'
                ? 'bg-[#E8F1F8] text-[#003B70] font-bold border border-[#0056A6]/30'
                : 'text-[#222222] hover:text-[#0056A6] hover:bg-[#F7F8FA]'
            }`}
          >
            {t.navHome || 'Home'}
          </button>
          <button
            onClick={() => onNavigate('public-portal')}
            className={`px-3.5 py-2 text-xs font-semibold rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
              activePage === 'public-portal'
                ? 'bg-[#E8F1F8] text-[#003B70] font-bold border border-[#0056A6]/30'
                : 'text-[#222222] hover:text-[#0056A6] hover:bg-[#F7F8FA]'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-[#0056A6]" />
            {t.navPublicPortal || 'Public Intelligence'}
          </button>
          <button
            onClick={() => {
              onNavigate('landing');
              setTimeout(() => {
                const el = document.getElementById('how-it-works');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="px-3.5 py-2 text-xs font-semibold rounded text-[#222222] hover:text-[#0056A6] hover:bg-[#F7F8FA] transition-colors cursor-pointer"
          >
            {t.navHowItWorks || 'How it Works'}
          </button>
          <button
            onClick={() => {
              onNavigate('landing');
              setTimeout(() => {
                const el = document.getElementById('about-dvet');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="px-3.5 py-2 text-xs font-semibold rounded text-[#222222] hover:text-[#0056A6] hover:bg-[#F7F8FA] transition-colors cursor-pointer"
          >
            {t.navAboutDVET || 'About DVET'}
          </button>
        </nav>

        {/* Right Section: User Session or Controlled Saffron CTA Login */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => onNavigate(user.role)}
                className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#F7F8FA] hover:bg-[#E8F1F8] border border-[#DDE3E8] transition-colors cursor-pointer text-left"
              >
                <div className="w-7 h-7 rounded-full bg-[#003B70] text-white font-bold text-xs flex items-center justify-center border border-[#0056A6]">
                  {user.avatar || 'U'}
                </div>
                <div className="hidden sm:block">
                  <div className="text-xs font-bold text-[#222222] leading-tight">{user.name}</div>
                  <div className="text-[10px] text-[#0056A6] font-semibold capitalize">{user.roleLabel || user.role}</div>
                </div>
              </button>
              <button
                onClick={logout}
                title="Log out of portal"
                className="p-2 rounded bg-white hover:bg-[#C62828] text-[#666666] hover:text-white border border-[#DDE3E8] transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="relative" ref={dropdownRef}>
              {/* Controlled Accent: Saffron Orange CTA Button */}
              <button
                onClick={() => setIsDropdownOpen(prev => !prev)}
                className="flex items-center gap-2 px-4 py-2 rounded bg-[#F28C28] hover:bg-[#D96B1F] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                aria-label="User Login Menu"
                aria-expanded={isDropdownOpen}
              >
                <User className="w-4 h-4 text-white" />
                <span className="hidden sm:inline">{t.navPortalLogin || 'Portal Login'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Login Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white text-[#222222] rounded-lg shadow-lg border border-[#DDE3E8] py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2.5 border-b border-[#DDE3E8] bg-[#F7F8FA]">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#003B70]">
                      {t.selectRole || 'Select Your Portal Role'}
                    </p>
                    <p className="text-[11px] text-[#666666] mt-0.5">
                      DVET Maharashtra Authorized Portals
                    </p>
                  </div>

                  {/* Individual Roles */}
                  <div className="py-1">
                    <div className="px-4 py-1 text-[10px] font-bold text-[#0056A6] uppercase tracking-wider">
                      Individual Logins
                    </div>
                    <button
                      onClick={() => handleRoleSelect('student')}
                      className="w-full px-4 py-2 text-left flex items-center justify-between hover:bg-[#E8F1F8] transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded bg-[#E8F1F8] text-[#003B70] flex items-center justify-center">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[#222222] group-hover:text-[#0056A6]">Student Trainee</div>
                          <div className="text-[10px] text-[#666666]">Access with Student ID</div>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#0056A6]" />
                    </button>

                    <button
                      onClick={() => handleRoleSelect('trainer')}
                      className="w-full px-4 py-2 text-left flex items-center justify-between hover:bg-[#E8F1F8] transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded bg-[#E8F1F8] text-[#003B70] flex items-center justify-center">
                          <Award className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[#222222] group-hover:text-[#0056A6]">Trainer / Instructor</div>
                          <div className="text-[10px] text-[#666666]">Class &amp; Upskilling Portal</div>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#0056A6]" />
                    </button>
                  </div>

                  {/* Visual Divider */}
                  <div className="my-1 border-t border-[#DDE3E8]">
                    <div className="px-4 pt-2 pb-1 text-[10px] font-bold text-[#666666] uppercase tracking-wider">
                      Organizational &amp; Govt Logins
                    </div>
                  </div>

                  {/* Organizational Roles */}
                  <div className="py-1">
                    <button
                      onClick={() => handleRoleSelect('institute')}
                      className="w-full px-4 py-2 text-left flex items-center justify-between hover:bg-[#E8F1F8] transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded bg-[#E8F1F8] text-[#003B70] flex items-center justify-center">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[#222222] group-hover:text-[#0056A6]">Training Institute</div>
                          <div className="text-[10px] text-[#666666]">Principal &amp; ITI Administration</div>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#0056A6]" />
                    </button>

                    <button
                      onClick={() => handleRoleSelect('employer')}
                      className="w-full px-4 py-2 text-left flex items-center justify-between hover:bg-[#E8F1F8] transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded bg-[#E8F1F8] text-[#003B70] flex items-center justify-center">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[#222222] group-hover:text-[#0056A6]">Employer / Industry</div>
                          <div className="text-[10px] text-[#666666]">Post Jobs &amp; Hire Talent</div>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#0056A6]" />
                    </button>

                    <button
                      onClick={() => handleRoleSelect('government')}
                      className="w-full px-4 py-2 text-left flex items-center justify-between hover:bg-[#E8F1F8] transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded bg-[#003B70] text-white flex items-center justify-center">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[#222222] group-hover:text-[#0056A6]">Government / DVET</div>
                          <div className="text-[10px] text-[#666666]">District &amp; State Authority</div>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#0056A6]" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            className="lg:hidden p-2 rounded text-[#003B70] hover:bg-[#F7F8FA] cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#DDE3E8] px-4 py-3 space-y-2">
          {/* Mobile Language Switcher */}
          <div className="pb-2 border-b border-[#DDE3E8] flex items-center justify-between">
            <span className="text-xs text-[#222222] font-semibold flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#0056A6]" />
              <span>{t.selectLanguage || 'Language'}:</span>
            </span>
            <div className="flex items-center gap-1 bg-[#F7F8FA] p-1 rounded border border-[#DDE3E8]">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded text-xs font-bold ${
                  language === 'en' ? 'bg-[#0056A6] text-white' : 'text-[#666666]'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('mr')}
                className={`px-2 py-0.5 rounded text-xs font-bold ${
                  language === 'mr' ? 'bg-[#0056A6] text-white' : 'text-[#666666]'
                }`}
              >
                मराठी
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2 py-0.5 rounded text-xs font-bold ${
                  language === 'hi' ? 'bg-[#0056A6] text-white' : 'text-[#666666]'
                }`}
              >
                हिन्दी
              </button>
            </div>
          </div>

          <button
            onClick={() => { onNavigate('landing'); setIsMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded text-xs font-semibold text-[#222222] hover:bg-[#E8F1F8]"
          >
            {t.navHome || 'Home'}
          </button>
          <button
            onClick={() => { onNavigate('public-portal'); setIsMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded text-xs font-semibold text-[#222222] hover:bg-[#E8F1F8] flex items-center gap-2"
          >
            <Compass className="w-3.5 h-3.5 text-[#0056A6]" />
            {t.navPublicPortal || 'Public Intelligence'}
          </button>
          <button
            onClick={() => { onNavigate('landing'); setIsMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded text-xs font-semibold text-[#222222] hover:bg-[#E8F1F8]"
          >
            {t.navHowItWorks || 'How it Works'}
          </button>
          <button
            onClick={() => { onNavigate('landing'); setIsMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded text-xs font-semibold text-[#222222] hover:bg-[#E8F1F8]"
          >
            {t.navAboutDVET || 'About DVET'}
          </button>

          <div className="pt-2 border-t border-[#DDE3E8]">
            <button
              onClick={() => { setIsMobileMenuOpen(false); openLoginModal('student'); }}
              className="w-full py-2.5 text-center rounded bg-[#F28C28] hover:bg-[#D96B1F] text-white font-bold text-xs shadow-xs"
            >
              {t.navPortalLogin || 'Portal Login'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default GovNavbar;
