import React, { useState, useEffect } from 'react';
import {
  X,
  GraduationCap,
  Award,
  Building2,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Lock,
  Mail,
  Phone,
  User,
  MapPin,
  Building,
  KeyRound,
  FileCheck,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../../context/AuthContext.jsx';
import { MAHARASHTRA_DISTRICTS_DATA } from '../../data/districts.data.js';
import apiClient from '../../services/api.js';

const ROLES = [
  {
    id: 'student',
    label: 'Student Trainee',
    shortLabel: 'Student',
    icon: GraduationCap,
    desc: 'Skill-gap identification, career pathways, and customized learning recommendations.',
    color: 'from-blue-600 to-indigo-700',
    accentColor: '#0056A6',
  },
  {
    id: 'trainer',
    label: 'Trainer / Instructor',
    shortLabel: 'Trainer',
    icon: Award,
    desc: 'Teaching skills, faculty upskilling (ToT), and trade curriculum improvement.',
    color: 'from-indigo-600 to-purple-700',
    accentColor: '#4F46E5',
  },
  {
    id: 'institute',
    label: 'Training Institute / ITI',
    shortLabel: 'Institute',
    icon: Building2,
    desc: 'Curriculum alignment, trainer workload, and lab infrastructure planning.',
    color: 'from-sky-600 to-blue-800',
    accentColor: '#0284C7',
  },
  {
    id: 'employer',
    label: 'Industrial Employer',
    shortLabel: 'Employer',
    icon: Briefcase,
    desc: 'Publish hiring skill demands, validate trade curricula, and hire certified talent.',
    color: 'from-amber-600 to-orange-700',
    accentColor: '#F28C28',
  },
  {
    id: 'government',
    label: 'Government / State Officer',
    shortLabel: 'Government',
    icon: ShieldCheck,
    desc: 'District/state-level skill planning, fund allocation, and labour observatory monitoring.',
    color: 'from-emerald-700 to-teal-800',
    accentColor: '#003B70',
  },
];

const MAHARASHTRA_DISTRICTS_LIST = [
  'Pune',
  'Mumbai City',
  'Mumbai Suburban',
  'Thane',
  'Nashik',
  'Nagpur',
  'Chhatrapati Sambhajinagar',
  'Kolhapur',
  'Solapur',
  'Amravati',
  'Nanded',
  'Sangli',
  'Jalgaon',
  'Akola',
  'Latur',
  'Dhule',
  'Ahmednagar',
  'Chandrapur',
  'Parbhani',
  'Jalna',
  'Buldhana',
  'Raigad',
  'Palghar',
  'Beed',
  'Yavatmal',
  'Satara',
  'Gondia',
  'Wardha',
  'Bhandara',
  'Washim',
  'Osmanabad / Dharashiv',
  'Nandurbar',
  'Ratnagiri',
  'Hingoli',
  'Sindhudurg',
  'Gadchiroli',
];

export const RegisterModal = ({ onNavigate }) => {
  const {
    isRegisterModalOpen,
    closeRegisterModal,
    openLoginModal,
    pendingTargetRole,
    registerUser,
  } = useAuth();

  const [currentStep, setCurrentStep] = useState(1); // 1: Core, 2: Role Details, 3: OTP Verification, 4: Success
  const [selectedRole, setSelectedRole] = useState('student');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // OTP State
  const [otpValue, setOtpValue] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(60);

  // Form State: Common Information
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    state: 'Maharashtra',
    district: 'Pune',
    profilePhoto: '',

    // Student fields
    highestQualification: 'ITI (Electrician / Fitter)',
    collegeName: '',
    courseBranch: 'Electrician & EV Technician',
    graduationYear: '2025',
    currentSkills: 'Electrical Wiring, Basic PLC, Safety Protocols',
    skillsInterestedIn: 'EV Battery Management, CAN Bus, Solar Inverter Maintenance',
    preferredJobRole: 'EV Assembly Technician',
    preferredWorkLocation: 'Pune / Chakan Industrial Zone',

    // Trainer fields
    trainerInstituteName: '',
    trainerId: '',
    subjectDomain: 'Electrical & Automotive Trades',
    coursesCurrentlyTeaching: 'Electrician Semester 2 & 4, EV Basics',
    trainerSkills: 'Industrial Automation, Motor Drives, High Voltage Safety',
    yearsOfExperience: '5+ Years',
    certifications: 'Craft Instructor Training Scheme (CITS), NSQF Level 5 Assessor',
    trainerQualification: 'B.Tech Electrical / CITS',
    preferredUpskillingAreas: 'EV Powertrains, Industry 4.0 Sensors',

    // Institute fields
    instituteName: '',
    officialEmail: '',
    contactNumber: '',
    fullAddress: '',
    instituteType: 'ITI',
    affiliationNumber: '',
    website: '',
    coursesOffered: 'Electrician, Fitter, Machinist, EV Technician, Welder',
    trainerCount: '28',
    availableInfrastructure: 'CNC Machining Workshop, EV Simulator Lab, Smart Classroom',
    adminName: '',
    adminEmail: '',
    adminMobile: '',

    // Employer fields
    companyName: '',
    employerOfficialEmail: '',
    companyPhone: '',
    industrySector: 'Automotive & EV Manufacturing',
    companySize: '201-1000 employees',
    employerAddress: '',
    companyWebsite: '',
    contactPersonName: '',
    contactPersonDesignation: 'Head of Talent Acquisition',
    contactPersonEmail: '',
    contactPersonMobile: '',
    hiringRoles: 'EV Assembler, Quality Control Technician, CNC Operator',
    requiredSkills: 'Battery Pack Assembly, High-Voltage Handling, G-Code',
    experienceRequirements: 'Fresher ITI Trainees to 2 Years Experience',
    preferredQualifications: 'ITI Electrician / Fitter / Turner',

    // Government fields
    officerName: '',
    govOfficialEmail: '',
    govMobile: '',
    department: 'Directorate of Vocational Education & Training (DVET)',
    designation: 'District Vocational Education Officer (DVEO)',
    office: 'Regional Directorate Office',
    employeeId: '',
  });

  useEffect(() => {
    if (pendingTargetRole) {
      setSelectedRole(pendingTargetRole);
    }
  }, [pendingTargetRole]);

  useEffect(() => {
    let timer;
    if (otpSent && otpCountdown > 0) {
      timer = setInterval(() => setOtpCountdown(c => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [otpSent, otpCountdown]);

  if (!isRegisterModalOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrorMsg('');
  };

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setErrorMsg('');
  };

  // Step 1 Validation
  const validateStep1 = () => {
    if (!formData.name.trim()) return 'Please enter your Full Name.';
    if (!formData.email.trim() || !formData.email.includes('@'))
      return 'Please enter a valid Email Address.';
    if (!formData.mobile.trim() || formData.mobile.length < 10)
      return 'Please enter a valid 10-digit Mobile Number.';
    if (!formData.password || formData.password.length < 6)
      return 'Password must be at least 6 characters.';
    if (!formData.district) return 'Please select your District.';
    return null;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    if (selectedRole === 'student') {
      if (!formData.collegeName.trim()) return 'Please enter your College / ITI Name.';
      if (!formData.courseBranch.trim()) return 'Please enter your Course / Trade.';
    } else if (selectedRole === 'trainer') {
      if (!formData.trainerInstituteName.trim())
        return 'Please enter the ITI or Institute you are affiliated with.';
    } else if (selectedRole === 'institute') {
      if (!formData.instituteName.trim()) return 'Please enter Institute Name.';
      if (!formData.affiliationNumber.trim())
        return 'Please enter Registration / Affiliation Number.';
    } else if (selectedRole === 'employer') {
      if (!formData.companyName.trim()) return 'Please enter Company Name.';
      if (!formData.contactPersonName.trim()) return 'Please enter Contact Person Name.';
    } else if (selectedRole === 'government') {
      if (!formData.designation.trim()) return 'Please enter your Official Designation.';
      if (!formData.employeeId.trim()) return 'Please enter your Employee / Officer ID.';
    }
    return null;
  };

  const handleProceedToStep2 = (e) => {
    e.preventDefault();
    const err = validateStep1();
    if (err) {
      setErrorMsg(err);
      return;
    }
    setErrorMsg('');
    setCurrentStep(2);
  };

  const handleProceedToVerification = (e) => {
    e.preventDefault();
    const err = validateStep2();
    if (err) {
      setErrorMsg(err);
      return;
    }
    setErrorMsg('');
    setCurrentStep(3);
    sendOtp();
  };

  const sendOtp = async () => {
    setIsLoading(true);
    try {
      await apiClient.sendOtp(formData.mobile || formData.email);
      setOtpSent(true);
      setOtpCountdown(60);
    } catch {
      // simulate fallback
      setOtpSent(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpValue || otpValue.trim().length < 6) {
      setErrorMsg('Please enter the 6-digit OTP code.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      await apiClient.verifyOtp(formData.mobile || formData.email, otpValue);
      setOtpVerified(true);
      await submitCompleteRegistration();
    } catch (err) {
      setErrorMsg(err.message || 'Invalid OTP code. Use demo code: 123456');
    } finally {
      setIsLoading(false);
    }
  };

  const submitCompleteRegistration = async () => {
    setIsLoading(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      password: formData.password,
      state: formData.state,
      district: formData.district,
      role: selectedRole,
      profilePhoto: formData.profilePhoto,
      studentDetails:
        selectedRole === 'student'
          ? {
              highestQualification: formData.highestQualification,
              collegeName: formData.collegeName,
              courseBranch: formData.courseBranch,
              graduationYear: formData.graduationYear,
              currentSkills: formData.currentSkills.split(',').map(s => s.trim()).filter(Boolean),
              skillsInterestedIn: formData.skillsInterestedIn.split(',').map(s => s.trim()).filter(Boolean),
              preferredJobRole: formData.preferredJobRole,
              preferredWorkLocation: formData.preferredWorkLocation,
            }
          : undefined,
      trainerDetails:
        selectedRole === 'trainer'
          ? {
              instituteName: formData.trainerInstituteName,
              trainerId: formData.trainerId,
              subjectDomain: formData.subjectDomain,
              coursesCurrentlyTeaching: formData.coursesCurrentlyTeaching.split(',').map(s => s.trim()).filter(Boolean),
              skills: formData.trainerSkills.split(',').map(s => s.trim()).filter(Boolean),
              yearsOfExperience: formData.yearsOfExperience,
              certifications: formData.certifications.split(',').map(s => s.trim()).filter(Boolean),
              qualification: formData.trainerQualification,
              preferredUpskillingAreas: formData.preferredUpskillingAreas.split(',').map(s => s.trim()).filter(Boolean),
            }
          : undefined,
      instituteDetails:
        selectedRole === 'institute'
          ? {
              instituteName: formData.instituteName,
              officialEmail: formData.officialEmail || formData.email,
              contactNumber: formData.contactNumber || formData.mobile,
              fullAddress: formData.fullAddress,
              instituteType: formData.instituteType,
              affiliationNumber: formData.affiliationNumber,
              website: formData.website,
              coursesOffered: formData.coursesOffered.split(',').map(s => s.trim()).filter(Boolean),
              trainerCount: Number(formData.trainerCount) || 20,
              availableInfrastructure: formData.availableInfrastructure.split(',').map(s => s.trim()).filter(Boolean),
              adminName: formData.adminName || formData.name,
              adminEmail: formData.adminEmail || formData.email,
              adminMobile: formData.adminMobile || formData.mobile,
            }
          : undefined,
      employerDetails:
        selectedRole === 'employer'
          ? {
              companyName: formData.companyName,
              officialEmail: formData.employerOfficialEmail || formData.email,
              phone: formData.companyPhone || formData.mobile,
              industrySector: formData.industrySector,
              companySize: formData.companySize,
              fullAddress: formData.employerAddress,
              website: formData.companyWebsite,
              contactPersonName: formData.contactPersonName || formData.name,
              designation: formData.contactPersonDesignation,
              contactPersonEmail: formData.contactPersonEmail || formData.email,
              contactPersonMobile: formData.contactPersonMobile || formData.mobile,
              hiringRoles: formData.hiringRoles.split(',').map(s => s.trim()).filter(Boolean),
              requiredSkills: formData.requiredSkills.split(',').map(s => s.trim()).filter(Boolean),
              experienceRequirements: formData.experienceRequirements,
              preferredQualifications: formData.preferredQualifications,
            }
          : undefined,
      governmentDetails:
        selectedRole === 'government'
          ? {
              officerName: formData.officerName || formData.name,
              officialEmail: formData.govOfficialEmail || formData.email,
              mobile: formData.govMobile || formData.mobile,
              department: formData.department,
              designation: formData.designation,
              office: formData.office,
              employeeId: formData.employeeId,
              verificationStatus: 'Pending Official Verification',
            }
          : undefined,
    };

    try {
      await registerUser(payload);
      setCurrentStep(4);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed. Please check your data.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLaunchDashboard = () => {
    closeRegisterModal();
    if (onNavigate) {
      onNavigate(selectedRole);
    }
  };

  const activeRoleMeta = ROLES.find(r => r.id === selectedRole) || ROLES[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#00284D]/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className="bg-white rounded-xl shadow-2xl border border-[#DDE3E8] w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-6"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-[#003B70] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-[#00284D]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-[#E8F1F8] uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded">
                Government of Maharashtra &middot; SkillScan
              </span>
              <span className="text-[10px] font-semibold text-amber-300">
                Official Portal Registration
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white mt-1">
              Create Your SkillScan Account
            </h2>
          </div>
          <button
            onClick={closeRegisterModal}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-[#00284D] transition-colors cursor-pointer"
            aria-label="Close registration modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="bg-[#F7F8FA] border-b border-[#DDE3E8] px-6 py-3">
          <div className="flex items-center justify-between max-w-md mx-auto text-xs">
            <div className="flex items-center gap-1.5 font-bold">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  currentStep >= 1
                    ? 'bg-[#003B70] text-white'
                    : 'bg-[#DDE3E8] text-[#666666]'
                }`}
              >
                1
              </div>
              <span className={currentStep >= 1 ? 'text-[#003B70]' : 'text-[#666666]'}>
                Account &amp; Role
              </span>
            </div>
            <div className={`h-0.5 w-8 ${currentStep >= 2 ? 'bg-[#003B70]' : 'bg-[#DDE3E8]'}`} />

            <div className="flex items-center gap-1.5 font-bold">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  currentStep >= 2
                    ? 'bg-[#003B70] text-white'
                    : 'bg-[#DDE3E8] text-[#666666]'
                }`}
              >
                2
              </div>
              <span className={currentStep >= 2 ? 'text-[#003B70]' : 'text-[#666666]'}>
                Profile Details
              </span>
            </div>
            <div className={`h-0.5 w-8 ${currentStep >= 3 ? 'bg-[#003B70]' : 'bg-[#DDE3E8]'}`} />

            <div className="flex items-center gap-1.5 font-bold">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  currentStep >= 3
                    ? 'bg-[#003B70] text-white'
                    : 'bg-[#DDE3E8] text-[#666666]'
                }`}
              >
                3
              </div>
              <span className={currentStep >= 3 ? 'text-[#003B70]' : 'text-[#666666]'}>
                Verify &amp; Launch
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: ROLE SELECTION & COMMON BASICS */}
          {currentStep === 1 && (
            <form onSubmit={handleProceedToStep2} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-[#003B70] uppercase tracking-wider mb-2">
                  Select Your Portal Role *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {ROLES.map(r => {
                    const Icon = r.icon;
                    const isSelected = selectedRole === r.id;
                    return (
                      <button
                        type="button"
                        key={r.id}
                        onClick={() => handleRoleSelect(r.id)}
                        className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                          isSelected
                            ? 'border-[#003B70] bg-[#E8F1F8] ring-2 ring-[#003B70]/20'
                            : 'border-[#DDE3E8] bg-white hover:bg-[#F7F8FA] hover:border-slate-400'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isSelected ? 'bg-[#003B70] text-white' : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-bold text-[#222222] leading-tight">
                          {r.shortLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-2.5 p-2.5 rounded-md bg-[#E8F1F8] text-[11px] text-[#003B70] flex items-center gap-2">
                  <span className="font-bold">{activeRoleMeta.label}:</span>
                  <span>{activeRoleMeta.desc}</span>
                </div>
              </div>

              {/* Common Information Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 border-t border-[#DDE3E8]">
                <div>
                  <label className="block text-xs font-semibold text-[#222222] mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kadam"
                      value={formData.name}
                      onChange={e => handleInputChange('name', e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded border border-[#DDE3E8] focus:border-[#0056A6] focus:ring-1 focus:ring-[#0056A6] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#222222] mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. ramesh.kadam@example.com"
                      value={formData.email}
                      onChange={e => handleInputChange('email', e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded border border-[#DDE3E8] focus:border-[#0056A6] focus:ring-1 focus:ring-[#0056A6] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#222222] mb-1">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="10-digit mobile (e.g. 9822012345)"
                      value={formData.mobile}
                      onChange={e => handleInputChange('mobile', e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded border border-[#DDE3E8] focus:border-[#0056A6] focus:ring-1 focus:ring-[#0056A6] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#222222] mb-1">
                    Password (Min 6 chars) *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      required
                      placeholder="Create secure password"
                      value={formData.password}
                      onChange={e => handleInputChange('password', e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded border border-[#DDE3E8] focus:border-[#0056A6] focus:ring-1 focus:ring-[#0056A6] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#222222] mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={e => handleInputChange('state', e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded border border-[#DDE3E8] bg-slate-50 focus:border-[#0056A6] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#222222] mb-1">
                    District *
                  </label>
                  <select
                    value={formData.district}
                    onChange={e => handleInputChange('district', e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded border border-[#DDE3E8] focus:border-[#0056A6] focus:ring-1 focus:ring-[#0056A6] outline-none bg-white cursor-pointer"
                  >
                    {MAHARASHTRA_DISTRICTS_LIST.map(d => (
                      <option key={d} value={d}>
                        {d} {d === 'Pune' ? '(Automotive / EV Hub)' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Step 1 Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-[#DDE3E8]">
                <button
                  type="button"
                  onClick={() => {
                    closeRegisterModal();
                    openLoginModal();
                  }}
                  className="text-xs text-[#0056A6] hover:underline font-semibold cursor-pointer"
                >
                  Already have an account? Sign In
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[#003B70] hover:bg-[#00284D] text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue to Step 2</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: ROLE-SPECIFIC DETAILS */}
          {currentStep === 2 && (
            <form onSubmit={handleProceedToVerification} className="space-y-4">
              <div className="bg-[#E8F1F8] p-3 rounded-lg border border-[#0056A6]/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#003B70] text-white flex items-center justify-center">
                    <activeRoleMeta.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#003B70]">
                      {activeRoleMeta.label} Profile Setup
                    </div>
                    <div className="text-[10px] text-[#666666]">
                      {formData.name} &middot; {formData.district}, {formData.state}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-[11px] text-[#0056A6] font-semibold hover:underline cursor-pointer"
                >
                  Change Role
                </button>
              </div>

              {/* 1. STUDENT FIELDS */}
              {selectedRole === 'student' && (
                <div className="space-y-3.5">
                  <div className="text-xs font-bold text-[#003B70] uppercase tracking-wider">
                    Education &amp; ITI Trade
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#222222] mb-1">
                        Highest Qualification *
                      </label>
                      <select
                        value={formData.highestQualification}
                        onChange={e => handleInputChange('highestQualification', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DDE3E8] bg-white outline-none"
                      >
                        <option value="10th Matriculate">10th Matriculate</option>
                        <option value="12th Vocational / Science">12th Vocational / Science</option>
                        <option value="ITI Trainee (Enrolled)">ITI Trainee (Enrolled)</option>
                        <option value="ITI Graduate / Certified">ITI Graduate / Certified</option>
                        <option value="Diploma in Engineering">Diploma in Engineering</option>
                        <option value="B.Voc / Polytechnic">B.Voc / Polytechnic</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#222222] mb-1">
                        College / ITI Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Government ITI Aundh, Pune"
                        value={formData.collegeName}
                        onChange={e => handleInputChange('collegeName', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DDE3E8] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#222222] mb-1">
                        Trade / Course / Branch *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Electrician / EV Technician"
                        value={formData.courseBranch}
                        onChange={e => handleInputChange('courseBranch', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DDE3E8] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#222222] mb-1">
                        Graduation Year / Cohort
                      </label>
                      <select
                        value={formData.graduationYear}
                        onChange={e => handleInputChange('graduationYear', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DDE3E8] bg-white outline-none"
                      >
                        <option value="2024">2024 (Graduated)</option>
                        <option value="2025">2025 (Final Year)</option>
                        <option value="2026">2026 (Enrolled)</option>
                        <option value="2027">2027</option>
                      </select>
                    </div>
                  </div>

                  <div className="text-xs font-bold text-[#003B70] uppercase tracking-wider pt-2">
                    Skills &amp; Career Preferences
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#222222] mb-1">
                        Current Skills (Comma separated)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Wiring, Multimeter, Soldering"
                        value={formData.currentSkills}
                        onChange={e => handleInputChange('currentSkills', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DDE3E8] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#222222] mb-1">
                        Skills Interested In
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. EV Battery Pack, BMS Diagnostics"
                        value={formData.skillsInterestedIn}
                        onChange={e => handleInputChange('skillsInterestedIn', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DDE3E8] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#222222] mb-1">
                        Target Job Role
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. EV Assembly Tech / Maintenance"
                        value={formData.preferredJobRole}
                        onChange={e => handleInputChange('preferredJobRole', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DDE3E8] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#222222] mb-1">
                        Preferred Location
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Pune / Chakan / Pimpri"
                        value={formData.preferredWorkLocation}
                        onChange={e => handleInputChange('preferredWorkLocation', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DDE3E8] outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 2. TRAINER FIELDS */}
              {selectedRole === 'trainer' && (
                <div className="space-y-3.5">
                  <div className="p-2.5 rounded bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center justify-between">
                    <span>
                      <strong>Trainer–Institute Link:</strong> You will be registered as a faculty under your accredited institute.
                    </span>
                    <span className="text-[10px] font-bold bg-blue-200 px-2 py-0.5 rounded text-blue-900">
                      CITS Linked
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#222222] mb-1">
                        Affiliated Institute / ITI *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Model Vocational Training Institute Pune"
                        value={formData.trainerInstituteName}
                        onChange={e => handleInputChange('trainerInstituteName', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DDE3E8] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#222222] mb-1">
                        Trainer ID (if issued)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. TRN-MH-4091"
                        value={formData.trainerId}
                        onChange={e => handleInputChange('trainerId', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DDE3E8] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#222222] mb-1">
                        Subject / Domain *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Electrical & Automotive Trades"
                        value={formData.subjectDomain}
                        onChange={e => handleInputChange('subjectDomain', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DDE3E8] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#222222] mb-1">
                        Years of Experience
                      </label>
                      <select
                        value={formData.yearsOfExperience}
                        onChange={e => handleInputChange('yearsOfExperience', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DDE3E8] bg-white outline-none"
                      >
                        <option value="1-3 Years">1-3 Years</option>
                        <option value="3-5 Years">3-5 Years</option>
                        <option value="5+ Years">5+ Years</option>
                        <option value="10+ Years">10+ Years (Senior Instructor)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#222222] mb-1">
                        Certifications (CITS / Assessor)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. CITS Certified, NSQF Level 5"
                        value={formData.certifications}
                        onChange={e => handleInputChange('certifications', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DDE3E8] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#222222] mb-1">
                        Preferred Upskilling Areas
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. EV Powertrains, Industry 4.0 IoT"
                        value={formData.preferredUpskillingAreas}
                        onChange={e => handleInputChange('preferredUpskillingAreas', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DDE3E8] outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 3. INSTITUTE FIELDS */}
              {selectedRole === 'institute' && (
                <div className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#222222] mb-1">
                        Institute Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Industrial Training Institute, Pune (CoE)"
                        value={formData.instituteName}
                        onChange={e => handleInputChange('instituteName', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DDE3E8] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#222222] mb-1">
                        Institute Type *
                      </label>
                      <select
                        value={formData.instituteType}
                        onChange={e => handleInputChange('instituteType', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DDE3E8] bg-white outline-none"
                      >
                        <option value="ITI">Industrial Training Institute (ITI)</option>
                        <option value="Government">Government Technical High School / Centre</option>
                        <option value="Private">Private ITI / Vocational Institute</option>
                        <option value="Polytechnic">Polytechnic College</option>
                        <option value="Skill Centre">Pradhan Mantri Kaushal Kendra (PMKK)</option>
                        <option value="College/University">Engineering College / University</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#222222] mb-1">
                        Registration / DGT Affiliation No. *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. DGT-MH-2718 / DVET-2024"
                        value={formData.affiliationNumber}
                        onChange={e => handleInputChange('affiliationNumber', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DDE3E8] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#222222] mb-1">
                        Number of Instructors / Trainers
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 24"
                        value={formData.trainerCount}
                        onChange={e => handleInputChange('trainerCount', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DDE3E8] outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-[#222222] mb-1">
                        Campus Address
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Aundh Road, Ganeshkhind, Pune 411007"
                        value={formData.fullAddress}
                        onChange={e => handleInputChange('fullAddress', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DDE3E8] outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-[#222222] mb-1">
                        Available Infrastructure &amp; Workshops
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. CNC Lab, EV Battery Testbench, PLC Automation Lab"
                        value={formData.availableInfrastructure}
                        onChange={e => handleInputChange('availableInfrastructure', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DDE3E8] outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 4. EMPLOYER FIELDS */}
              {selectedRole === 'employer' && (
                <div className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#222222] mb-1">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Bharat Forge / Tata AutoComp"
                        value={formData.companyName}
                        onChange={e => handleInputChange('companyName', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DDE3E8] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#222222] mb-1">
                        Industry / Sector *
                      </label>
                      <select
                        value={formData.industrySector}
                        onChange={e => handleInputChange('industrySector', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DDE3E8] bg-white outline-none"
                      >
                        <option value="Automotive & EV Manufacturing">Automotive &amp; EV Manufacturing</option>
                        <option value="Auto Components & Precision Engineering">Auto Components &amp; Precision Engineering</option>
                        <option value="Aerospace & Defence Components">Aerospace &amp; Defence Components</option>
                        <option value="Logistics & Warehousing">Logistics &amp; Warehousing</option>
                        <option value="Pharmaceuticals & Chemical Processing">Pharmaceuticals &amp; Chemical Processing</option>
                        <option value="Green Energy & Solar Systems">Green Energy &amp; Solar Systems</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#222222] mb-1">
                        Contact Person Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Neha Deshmukh"
                        value={formData.contactPersonName}
                        onChange={e => handleInputChange('contactPersonName', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DDE3E8] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#222222] mb-1">
                        Designation
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Head of Talent Acquisition"
                        value={formData.contactPersonDesignation}
                        onChange={e => handleInputChange('contactPersonDesignation', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DDE3E8] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#222222] mb-1">
                        Hiring Roles
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. EV Assembler, CNC Operator"
                        value={formData.hiringRoles}
                        onChange={e => handleInputChange('hiringRoles', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DDE3E8] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#222222] mb-1">
                        Required Skills
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. High Voltage Handling, G-Code"
                        value={formData.requiredSkills}
                        onChange={e => handleInputChange('requiredSkills', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DDE3E8] outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 5. GOVERNMENT FIELDS */}
              {selectedRole === 'government' && (
                <div className="space-y-3.5">
                  <div className="p-3 rounded bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold">Official Protocol Verification</div>
                      <div className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
                        Government accounts require institutional validation under the Directorate of Vocational Education &amp; Training (DVET) / Maharashtra State Innovation Society framework.
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#222222] mb-1">
                        Department / Directorate *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.department}
                        onChange={e => handleInputChange('department', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DDE3E8] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#222222] mb-1">
                        Official Designation *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. District Vocational Education Officer (DVEO)"
                        value={formData.designation}
                        onChange={e => handleInputChange('designation', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DDE3E8] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#222222] mb-1">
                        Office / Committee *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. District Skill Committee, Pune"
                        value={formData.office}
                        onChange={e => handleInputChange('office', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DDE3E8] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#222222] mb-1">
                        Employee / Officer ID *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. MH-GOV-DVET-8491"
                        value={formData.employeeId}
                        onChange={e => handleInputChange('employeeId', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DDE3E8] outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2 Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-[#DDE3E8]">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 rounded text-xs font-semibold text-[#666666] hover:bg-[#F7F8FA] border border-[#DDE3E8] cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[#003B70] hover:bg-[#00284D] text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Verification</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: OTP VERIFICATION */}
          {currentStep === 3 && (
            <div className="space-y-5 text-center py-2">
              <div className="w-12 h-12 rounded-full bg-[#E8F1F8] text-[#003B70] flex items-center justify-center mx-auto">
                <KeyRound className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-base font-bold text-[#003B70]">
                  Verify Your Contact Information
                </h3>
                <p className="text-xs text-[#666666] mt-1">
                  We sent a 6-digit OTP verification code to{' '}
                  <span className="font-bold text-[#222222]">
                    {formData.mobile || formData.email}
                  </span>
                </p>
              </div>

              {/* Demo Helper Banner */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-800 max-w-sm mx-auto flex items-center justify-between">
                <span>Demo OTP Code: <strong>123456</strong></span>
                <button
                  type="button"
                  onClick={() => setOtpValue('123456')}
                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-[10px] cursor-pointer"
                >
                  Auto-Fill
                </button>
              </div>

              {/* 6 Digit Input */}
              <div className="max-w-xs mx-auto">
                <input
                  type="text"
                  maxLength={6}
                  value={otpValue}
                  onChange={e => setOtpValue(e.target.value.replace(/\D/g, ''))}
                  placeholder="&bull; &bull; &bull; &bull; &bull; &bull;"
                  className="w-full text-center text-2xl tracking-[0.5em] font-mono py-2.5 rounded-lg border-2 border-[#003B70] focus:ring-2 focus:ring-[#003B70]/30 outline-none"
                />
              </div>

              {/* Countdown / Resend */}
              <div className="text-xs text-slate-500">
                {otpCountdown > 0 ? (
                  <span>Resend code in {otpCountdown}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={sendOtp}
                    className="text-[#0056A6] font-bold hover:underline cursor-pointer"
                  >
                    Resend Verification Code
                  </button>
                )}
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-[#DDE3E8]">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 rounded text-xs font-semibold text-[#666666] hover:bg-[#F7F8FA] border border-[#DDE3E8] cursor-pointer"
                >
                  Back
                </button>

                <button
                  type="button"
                  disabled={isLoading}
                  onClick={handleVerifyOtp}
                  className="px-6 py-2.5 rounded-lg bg-[#003B70] hover:bg-[#00284D] text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? 'Verifying & Creating...' : 'Verify & Create Account'}
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS CONFIRMATION & DASHBOARD REDIRECTION */}
          {currentStep === 4 && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F1F8] text-[#003B70] uppercase">
                  Account Activated
                </span>
                <h3 className="text-xl font-black text-[#003B70] mt-1.5">
                  Welcome to SkillScan, {formData.name}!
                </h3>
                <p className="text-xs text-[#666666] max-w-md mx-auto mt-1">
                  Your official {activeRoleMeta.label} profile is verified and active under{' '}
                  <span className="font-semibold text-[#222222]">
                    {formData.district}, Maharashtra
                  </span>.
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-[#F7F8FA] rounded-lg border border-[#DDE3E8] p-4 text-left max-w-md mx-auto space-y-2 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#DDE3E8]">
                  <span className="text-[#666666]">Authorized Role:</span>
                  <span className="font-bold text-[#003B70]">{activeRoleMeta.label}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#DDE3E8]">
                  <span className="text-[#666666]">Registered Email:</span>
                  <span className="font-medium text-[#222222]">{formData.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#666666]">Jurisdiction / Hub:</span>
                  <span className="font-medium text-[#222222]">
                    {formData.district}, Maharashtra
                  </span>
                </div>
              </div>

              {selectedRole === 'government' && (
                <div className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded border border-amber-200 max-w-md mx-auto">
                  State Officer identity logged. Full administrative directives enabled in trial/evaluation sandbox.
                </div>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleLaunchDashboard}
                  className="w-full max-w-md mx-auto py-3 rounded-lg bg-[#F28C28] hover:bg-[#D96B1F] text-white text-sm font-bold shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Launch {activeRoleMeta.shortLabel} Portal Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
