import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      default: 'Maharashtra',
    },
    district: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['student', 'trainer', 'institute', 'employer', 'government'],
    },
    profilePhoto: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['active', 'pending_approval', 'verified'],
      default: 'active',
    },
    isVerified: {
      type: Boolean,
      default: true,
    },

    // 1. Student Specific Details
    studentDetails: {
      highestQualification: { type: String, default: '' },
      collegeName: { type: String, default: '' },
      courseBranch: { type: String, default: '' },
      graduationYear: { type: String, default: '' },
      currentSkills: { type: [String], default: [] },
      skillsInterestedIn: { type: [String], default: [] },
      preferredJobRole: { type: String, default: '' },
      preferredWorkLocation: { type: String, default: '' },
    },

    // 2. Trainer Specific Details
    trainerDetails: {
      instituteName: { type: String, default: '' },
      trainerId: { type: String, default: '' },
      subjectDomain: { type: String, default: '' },
      coursesCurrentlyTeaching: { type: [String], default: [] },
      skills: { type: [String], default: [] },
      yearsOfExperience: { type: String, default: '' },
      certifications: { type: [String], default: [] },
      qualification: { type: String, default: '' },
      preferredUpskillingAreas: { type: [String], default: [] },
    },

    // 3. Institute Specific Details
    instituteDetails: {
      instituteName: { type: String, default: '' },
      officialEmail: { type: String, default: '' },
      contactNumber: { type: String, default: '' },
      fullAddress: { type: String, default: '' },
      instituteType: {
        type: String,
        enum: ['Government', 'Private', 'Skill Centre', 'ITI', 'Polytechnic', 'College/University', ''],
        default: 'ITI',
      },
      affiliationNumber: { type: String, default: '' },
      website: { type: String, default: '' },
      coursesOffered: { type: [String], default: [] },
      trainerCount: { type: Number, default: 0 },
      availableInfrastructure: { type: [String], default: [] },
      adminName: { type: String, default: '' },
      adminEmail: { type: String, default: '' },
      adminMobile: { type: String, default: '' },
    },

    // 4. Employer Specific Details
    employerDetails: {
      companyName: { type: String, default: '' },
      officialEmail: { type: String, default: '' },
      phone: { type: String, default: '' },
      industrySector: { type: String, default: '' },
      companySize: { type: String, default: '' },
      fullAddress: { type: String, default: '' },
      website: { type: String, default: '' },
      contactPersonName: { type: String, default: '' },
      designation: { type: String, default: '' },
      contactPersonEmail: { type: String, default: '' },
      contactPersonMobile: { type: String, default: '' },
      hiringRoles: { type: [String], default: [] },
      requiredSkills: { type: [String], default: [] },
      experienceRequirements: { type: String, default: '' },
      preferredQualifications: { type: String, default: '' },
    },

    // 5. Government Specific Details
    governmentDetails: {
      officerName: { type: String, default: '' },
      officialEmail: { type: String, default: '' },
      mobile: { type: String, default: '' },
      department: { type: String, default: '' },
      designation: { type: String, default: '' },
      office: { type: String, default: '' },
      employeeId: { type: String, default: '' },
      verificationStatus: {
        type: String,
        enum: ['Pending Official Verification', 'Verified & Approved'],
        default: 'Pending Official Verification',
      },
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model('User', UserSchema);
export default User;
