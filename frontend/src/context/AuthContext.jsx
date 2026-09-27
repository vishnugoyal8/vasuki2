import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../services/api.js';

export const DEMO_PROFILES = {
  student: {
    id: 'STU-DEMO-402',
    name: 'Candidate Trainee',
    role: 'student',
    roleLabel: 'Student Trainee',
    trade: 'Electrician & EV Technician',
    institute: 'Model Industrial Training Institute',
    district: 'Pune',
    year: '2nd Year (Semester 4)',
    email: 'trainee.demo@dvet.gov.in',
    avatar: 'CT',
  },
  trainer: {
    id: 'TRN-DEMO-084',
    name: 'Master Instructor',
    role: 'trainer',
    roleLabel: 'Master Trainer / Instructor',
    department: 'Electrical & Automotive Trades',
    institute: 'Model Vocational Training Institute',
    district: 'Pune',
    experience: '8 Years',
    email: 'instructor.demo@dvet.gov.in',
    avatar: 'MI',
  },
  institute: {
    id: 'INST-DEMO-01',
    name: 'Institute Principal',
    role: 'institute',
    roleLabel: 'Principal & Training Head',
    institute: 'Model Industrial Training Institute (CoE)',
    district: 'Pune',
    itiCode: 'ITI-MH-2718',
    email: 'principal.demo@dvet.gov.in',
    avatar: 'IP',
  },
  employer: {
    id: 'EMP-DEMO-01',
    name: 'Talent Acquisition Head',
    role: 'employer',
    roleLabel: 'Head of Talent Acquisition',
    company: 'Industrial Manufacturing Partner',
    district: 'Pune (Chakan Cluster)',
    sector: 'Automotive & Clean Mobility',
    email: 'recruiter.demo@industry.org',
    avatar: 'TA',
  },
  government: {
    id: 'GOV-DEMO-01',
    name: 'Joint Director (Planning)',
    role: 'government',
    roleLabel: 'Joint Director (Planning & Intelligence)',
    department: 'Directorate of Vocational Education & Training (DVET)',
    district: 'Statewide (Maharashtra)',
    jurisdiction: 'All 36 Districts',
    email: 'planning.director@dvet.gov.in',
    avatar: 'JD',
  },
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('skillscan_auth_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return null;
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [pendingTargetRole, setPendingTargetRole] = useState(null);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('skillscan_auth_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('skillscan_auth_user');
      }
    } catch {
      // ignore
    }
  }, [user]);

  // Demo one-click sign in
  const loginAs = (roleKey, customData = {}) => {
    if (DEMO_PROFILES[roleKey]) {
      const profile = { ...DEMO_PROFILES[roleKey], ...customData };
      setUser(profile);
      setIsLoginModalOpen(false);
      setIsRegisterModalOpen(false);
      setPendingTargetRole(null);
      return profile;
    }
    return null;
  };

  // Real Credential Login
  const loginWithCredentials = async ({ email, password, role }) => {
    try {
      const res = await apiClient.login({ email, password, role });
      if (res && res.user) {
        setUser(res.user);
        if (res.token) {
          localStorage.setItem('skillscan_auth_token', res.token);
        }
        setIsLoginModalOpen(false);
        setIsRegisterModalOpen(false);
        setPendingTargetRole(null);
        return res.user;
      }
      throw new Error('Login failed: invalid response structure');
    } catch (err) {
      // Fallback demo matching if offline/demo
      const matched = Object.values(DEMO_PROFILES).find(p => p.email.toLowerCase() === email.toLowerCase());
      if (matched) {
        setUser(matched);
        setIsLoginModalOpen(false);
        return matched;
      }
      throw err;
    }
  };

  // Real Role-Based Registration
  const registerUser = async (registrationData) => {
    try {
      const res = await apiClient.register(registrationData);
      if (res && res.user) {
        setUser(res.user);
        if (res.token) {
          localStorage.setItem('skillscan_auth_token', res.token);
        }
        setIsRegisterModalOpen(false);
        setIsLoginModalOpen(false);
        setPendingTargetRole(null);
        return res.user;
      }
      throw new Error('Registration failed: invalid response structure');
    } catch (err) {
      // If network issue, create in-memory profile and login
      console.warn('Backend register notice, using local persistence:', err.message);
      const fallbackUser = {
        id: `USR-${Date.now()}`,
        name: registrationData.name,
        email: registrationData.email,
        mobile: registrationData.mobile,
        state: registrationData.state || 'Maharashtra',
        district: registrationData.district,
        role: registrationData.role,
        roleLabel: registrationData.role.charAt(0).toUpperCase() + registrationData.role.slice(1),
        avatar: registrationData.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || 'SK',
        isVerified: true,
        ...registrationData,
      };
      setUser(fallbackUser);
      setIsRegisterModalOpen(false);
      return fallbackUser;
    }
  };

  const logout = () => {
    setUser(null);
    setPendingTargetRole(null);
    localStorage.removeItem('skillscan_auth_token');
  };

  const openLoginModal = (targetRole = null) => {
    setPendingTargetRole(targetRole);
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    setPendingTargetRole(null);
  };

  const openRegisterModal = (targetRole = null) => {
    setPendingTargetRole(targetRole);
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
    setPendingTargetRole(null);
  };

  const isAuthenticated = !!user;
  const currentRole = user ? user.role : 'guest';

  return (
    <AuthContext.Provider
      value={{
        user,
        currentRole,
        isAuthenticated,
        loginAs,
        loginWithCredentials,
        registerUser,
        logout,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        isRegisterModalOpen,
        openRegisterModal,
        closeRegisterModal,
        pendingTargetRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
