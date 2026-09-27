import authRepository from './auth.repository.js';

// In-memory OTP store for active verification sessions
const otpStore = new Map();

const ROLE_LABELS = {
  student: 'Student Trainee',
  trainer: 'Trainer / Instructor',
  institute: 'Training Institute / ITI',
  employer: 'Industrial Employer',
  government: 'Government / State Officer',
};

export const authService = {
  async register(data) {
    const {
      name,
      email,
      mobile,
      password,
      state = 'Maharashtra',
      district,
      role,
      profilePhoto = '',
      studentDetails = {},
      trainerDetails = {},
      instituteDetails = {},
      employerDetails = {},
      governmentDetails = {},
    } = data;

    // Validate core fields
    if (!name || !name.trim()) {
      throw new Error('Full Name is required.');
    }
    if (!email || !email.trim()) {
      throw new Error('Email Address is required.');
    }
    if (!mobile || !mobile.trim()) {
      throw new Error('Mobile Number is required.');
    }
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }
    if (!district || !district.trim()) {
      throw new Error('District is required.');
    }
    const validRoles = ['student', 'trainer', 'institute', 'employer', 'government'];
    if (!role || !validRoles.includes(role)) {
      throw new Error(`Role must be one of: ${validRoles.join(', ')}`);
    }

    // Check duplicate
    const existing = await authRepository.findByEmail(email);
    if (existing) {
      throw new Error(`An account with email ${email} already exists.`);
    }

    // Government verification requirement:
    // "Government accounts should use official verification and admin approval."
    const isGovernment = role === 'government';
    const initialStatus = isGovernment ? 'pending_approval' : 'active';
    const isVerified = true; // after OTP flow

    // Create user object
    const newUser = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      mobile: mobile.trim(),
      password, // in production hash with bcrypt
      state: state.trim() || 'Maharashtra',
      district: district.trim(),
      role,
      roleLabel: ROLE_LABELS[role] || role,
      profilePhoto,
      status: initialStatus,
      isVerified,
      avatar: name
        .split(' ')
        .map(w => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) || 'SK',
      studentDetails,
      trainerDetails,
      instituteDetails,
      employerDetails,
      governmentDetails: {
        ...governmentDetails,
        verificationStatus: isGovernment
          ? 'Pending Official Verification'
          : 'Verified & Approved',
      },
    };

    const created = await authRepository.create(newUser);

    // Return safe user payload (excluding password)
    const { password: _, ...safeUser } = created;
    return {
      user: safeUser,
      token: `demo-jwt-${Date.now()}-${safeUser.id || safeUser._id}`,
      message: isGovernment
        ? 'Account registered successfully. Government portal access is pending administrative validation.'
        : 'Registration successful! Welcome to SkillScan.',
    };
  },

  async login(email, password, role) {
    if (!email || !password) {
      throw new Error('Email and password are required.');
    }

    const user = await authRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password.');
    }

    if (user.password !== password) {
      throw new Error('Invalid email or password.');
    }

    if (role && user.role !== role) {
      throw new Error(`This account is registered as a ${ROLE_LABELS[user.role] || user.role}.`);
    }

    const { password: _, ...safeUser } = user;
    return {
      user: safeUser,
      token: `demo-jwt-${Date.now()}-${safeUser.id || safeUser._id}`,
    };
  },

  sendOtp(target) {
    const cleanTarget = (target || '').trim().toLowerCase();
    if (!cleanTarget) {
      throw new Error('Email or mobile number is required to send verification code.');
    }

    // Default simulation OTP: 123456
    const code = '123456';
    otpStore.set(cleanTarget, {
      code,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    });

    return {
      success: true,
      message: `Verification code sent to ${target}. (Demo Code: 123456)`,
      code, // returned for seamless hackathon testing & autofill
    };
  },

  verifyOtp(target, code) {
    const cleanTarget = (target || '').trim().toLowerCase();
    const cleanCode = (code || '').trim();

    if (!cleanTarget || !cleanCode) {
      throw new Error('Contact information and verification code are required.');
    }

    // Always accept universal demo test code '123456'
    if (cleanCode === '123456') {
      return { verified: true, message: 'Identity verified successfully.' };
    }

    const record = otpStore.get(cleanTarget);
    if (!record) {
      throw new Error('No active OTP found. Please request a new code.');
    }

    if (Date.now() > record.expiresAt) {
      otpStore.delete(cleanTarget);
      throw new Error('Verification code has expired. Please request a new code.');
    }

    if (record.code !== cleanCode) {
      throw new Error('Invalid verification code.');
    }

    otpStore.delete(cleanTarget);
    return { verified: true, message: 'Identity verified successfully.' };
  },
};

export default authService;
