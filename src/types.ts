// Realistic Maharashtra & Pune EV Demo Dataset (Synthetic Data for Pilot Cluster)
// All data points are strictly traceable with realistic labour market metrics.

export interface ISkill {
  skillId: string;
  skillName: string;
  category: string;
  aliases: string[];
  description: string;
  demandScore: number; // 0 - 100
  difficultyLevel: 'BASIC' | 'INTERMEDIATE' | 'ADVANCED';
  escoCode?: string;
  nsdcQpCode?: string;
  growthRatePercent: number;
  isEmerging: boolean;
}

export interface ICourse {
  courseId: string;
  courseCode: string;
  title: string;
  sector: string;
  durationHours: number;
  nsqfLevel: number;
  awardingBody: string;
  targetRole: string;
  instituteIds: string[];
  lastUpdated: string;
  activeBatches: number;
  annualIntakeCapacity: number;
}

export interface ICourseSkill {
  courseId: string;
  skillId: string;
  coverageLevel: 'COVERED' | 'PARTIAL' | 'NOT_COVERED';
  practicalHoursRatio: number; // e.g. 0.6 = 60%
  labEquipmentRequired: string[];
  trainerCertifiedRequired: boolean;
  syllabusTopic: string;
}

export interface IJob {
  jobId: string;
  jobTitle: string;
  role: string;
  district: string;
  industry: string;
  company: string;
  salaryRange: string;
  experienceLevel: string;
  postedDate: string;
  requiredSkills: {
    skillId: string;
    skillName: string;
    importance: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'NICE_TO_HAVE';
    proficiency: 'BASIC' | 'INTERMEDIATE' | 'ADVANCED';
    frequency: number;
  }[];
  activePostingsCount: number;
  source: 'Mahaswayam' | 'NCS' | 'Industry_Direct' | 'Naukri_AutoIndex';
  rawDescription: string;
}

export interface IInstitute {
  instituteId: string;
  name: string;
  district: string;
  cluster: string;
  type: 'Govt_ITI' | 'Polytechnic' | 'Private_VTP' | 'MSDC';
  lat: number;
  lng: number;
  capacity: number;
  activeEnrollments: number;
  labReadinessScore: number; // 0 - 100
  trainerReadinessScore: number; // 0 - 100
  coursesOffered: string[];
  missingEquipment: string[];
  trainersNeeded: number;
}

export interface IEmployer {
  employerId: string;
  name: string;
  district: string;
  cluster: string;
  industry: string;
  employeeCount: string;
  activeOpenings: number;
  primaryRoles: string[];
}

export interface IEmployerFeedback {
  feedbackId: string;
  employerId: string;
  companyName: string;
  district: string;
  industry: string;
  role: string;
  requiredSkills: string[];
  hiringDifficultyScore: number; // 1 to 10
  reportedShortages: string[];
  candidateVolumeNeeded: number;
  quarter: string;
  timestamp: string;
}

export interface IRecommendation {
  recommendationId: string;
  district: string;
  sector: string;
  role: string;
  title: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  reason: string;
  confidenceScore: number; // 0 - 100
  evidence: {
    jobPostingCount: number;
    difficultyPercent: number;
    growthPercent: number;
    currentCoveragePercent: number;
    trainerGap: number;
    labGap: number;
    primarySource: string;
  };
  suggestedActions: string[];
  targetInstitutes: string[];
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'IN_PROGRESS' | 'COMPLETED';
  createdAt: string;
}

export interface IPlacement {
  placementId: string;
  instituteId: string;
  courseId: string;
  role: string;
  year: string;
  batchSize: number;
  placedCount: number;
  avgSalary: string;
  topRecruiters: string[];
  retentionRate6Month: number;
}
