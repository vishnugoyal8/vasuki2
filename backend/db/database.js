import mongoose from 'mongoose';
import { connectDatabase, isMongoConnected } from './connection.js';
import {
  SEED_SKILLS,
  SEED_COURSES,
  SEED_COURSE_SKILLS,
  SEED_INSTITUTES,
  SEED_EMPLOYERS,
  SEED_JOBS,
  SEED_EMPLOYER_FEEDBACK,
  SEED_RECOMMENDATIONS,
  SEED_PLACEMENTS,
  MAHARASHTRA_DISTRICTS_DATA,
} from '../data/index.js';
import { Skill } from '../models/Skill.js';
import { Course } from '../models/Course.js';
import { CourseSkill } from '../models/CourseSkill.js';
import { Job } from '../models/Job.js';
import { Institute } from '../models/Institute.js';
import { EmployerFeedback } from '../models/EmployerFeedback.js';
import { Recommendation } from '../models/Recommendation.js';
import { Placement } from '../models/Placement.js';

class DatabaseStore {
  constructor() {
    this.skills = [];
    this.courses = [];
    this.courseSkills = [];
    this.institutes = [];
    this.employers = [];
    this.jobs = [];
    this.employerFeedback = [];
    this.recommendations = [];
    this.placements = [];
    this.isInitialized = false;
    this.seedInMemory();
  }

  async initialize() {
    if (this.isInitialized) return;
    const connected = await connectDatabase();
    
    if (connected) {
      await this.syncToMongo();
    }
    this.isInitialized = true;
  }

  async syncToMongo() {
    if (!isMongoConnected()) return;
    try {
      const count = await Skill.countDocuments();
      if (count === 0) {
        await Skill.insertMany(this.skills);
        await Course.insertMany(this.courses);
        await CourseSkill.insertMany(this.courseSkills);
        await Job.insertMany(this.jobs);
        await Institute.insertMany(this.institutes);
        await EmployerFeedback.insertMany(this.employerFeedback);
        await Recommendation.insertMany(this.recommendations);
        await Placement.insertMany(this.placements);
        console.log('[Database] MongoDB collections populated with Maharashtra Skill seed dataset.');
      }
    } catch (e) {
      console.warn('[Database] Background MongoDB initial sync notice:', e.message);
    }
  }

  getStatus() {
    return {
      engine: 'MongoDB + Mongoose (MERN Stack)',
      mongooseReadyState: mongoose.connection.readyState,
      connectionStatus: mongoose.connection.readyState === 1 ? 'Connected (Live MongoDB)' : 'Local MERN In-Memory Replica',
      mongoUriConfigured: !!process.env.MONGODB_URI,
      collections: {
        skills: this.skills.length,
        courses: this.courses.length,
        courseSkills: this.courseSkills.length,
        institutes: this.institutes.length,
        jobs: this.jobs.length,
        employerFeedback: this.employerFeedback.length,
        recommendations: this.recommendations.length,
        placements: this.placements.length,
      },
    };
  }

  seedInMemory() {
    this.skills = JSON.parse(JSON.stringify(SEED_SKILLS));
    this.courses = JSON.parse(JSON.stringify(SEED_COURSES));
    this.courseSkills = JSON.parse(JSON.stringify(SEED_COURSE_SKILLS));
    this.institutes = JSON.parse(JSON.stringify(SEED_INSTITUTES));
    this.employers = JSON.parse(JSON.stringify(SEED_EMPLOYERS));
    this.jobs = JSON.parse(JSON.stringify(SEED_JOBS));
    this.employerFeedback = JSON.parse(JSON.stringify(SEED_EMPLOYER_FEEDBACK));
    this.recommendations = JSON.parse(JSON.stringify(SEED_RECOMMENDATIONS));
    this.placements = JSON.parse(JSON.stringify(SEED_PLACEMENTS));
    console.log('[Database] Seeded Pune/Maharashtra demo dataset successfully.');
  }

  // --- Skills ---
  getSkills() {
    return this.skills;
  }

  getSkillById(id) {
    return this.skills.find(s => s.skillId === id);
  }

  findSkillByTerm(term) {
    const clean = term.toLowerCase().trim();
    return this.skills.find(
      s =>
        s.skillName.toLowerCase().includes(clean) ||
        (s.aliases && s.aliases.some(a => a.toLowerCase().includes(clean) || clean.includes(a.toLowerCase())))
    );
  }

  // --- Courses ---
  getCourses() {
    return this.courses;
  }

  getCourseById(id) {
    return this.courses.find(c => c.courseId === id);
  }

  getCourseSkills(courseId) {
    if (!courseId) return this.courseSkills;
    return this.courseSkills.filter(cs => cs.courseId === courseId);
  }

  // --- Institutes ---
  getInstitutes(district) {
    if (!district || district.toLowerCase() === 'all') return this.institutes;
    return this.institutes.filter(i => i.district.toLowerCase() === district.toLowerCase());
  }

  getInstituteById(id) {
    return this.institutes.find(i => i.instituteId === id);
  }

  // --- Employers & Feedback ---
  getEmployers(district) {
    if (!district || district.toLowerCase() === 'all') return this.employers;
    return this.employers.filter(e => e.district.toLowerCase() === district.toLowerCase());
  }

  getEmployerFeedback() {
    return this.employerFeedback;
  }

  addEmployerFeedback(feedback) {
    const feedbackId = `FB_DYN_${Date.now()}`;
    const newFeedback = {
      ...feedback,
      feedbackId,
      timestamp: new Date().toISOString(),
    };

    this.employerFeedback.unshift(newFeedback);

    let targetSkillNames = feedback.requiredSkills || [];
    let updatedSkillScore = 90;

    targetSkillNames.forEach(skillName => {
      const match = this.findSkillByTerm(skillName);
      if (match) {
        match.demandScore = Math.min(99, match.demandScore + Math.round(feedback.hiringDifficultyScore * 0.5));
        match.growthRatePercent = Number((match.growthRatePercent + 1.8).toFixed(1));
        updatedSkillScore = match.demandScore;
      }
    });

    let newRecommendation;
    if (feedback.hiringDifficultyScore >= 7) {
      const recId = `REC_AUTO_${Date.now().toString().slice(-4)}`;
      newRecommendation = {
        recommendationId: recId,
        district: feedback.district || 'Pune',
        sector: feedback.industry || 'Automotive / EV',
        role: feedback.role,
        title: `Employer Signal Alert: Immediate Lab Equipment & Curriculum Intervention for ${feedback.role}`,
        priority: feedback.hiringDifficultyScore >= 8 ? 'CRITICAL' : 'HIGH',
        reason: `Recent employer feedback from ${feedback.companyName} indicates severe hiring difficulty (${feedback.hiringDifficultyScore}/10) with immediate requirement of ${feedback.candidateVolumeNeeded} candidates in ${targetSkillNames.join(', ')}.`,
        confidenceScore: 92,
        evidence: {
          jobPostingCount: feedback.candidateVolumeNeeded * 12,
          difficultyPercent: feedback.hiringDifficultyScore * 10,
          growthPercent: 45.0,
          currentCoveragePercent: 38,
          trainerGap: 4,
          labGap: 65,
          primarySource: `Real-time Employer Feedback: ${feedback.companyName} (${feedback.quarter || 'Q3 2026'})`,
        },
        suggestedActions: [
          `Coordinate expedited weekend hands-on workshops at ITI Pimpri-Chinchwad & Aundh.`,
          `Integrate company specific live tooling protocols: ${targetSkillNames.slice(0, 2).join(', ')}.`,
          `Organize customized placement drive with ${feedback.companyName} for active batch trainees.`,
        ],
        targetInstitutes: ['INST_PUNE_AUNDH', 'INST_PCMC_PIMPRI'],
        status: 'PENDING_APPROVAL',
        createdAt: new Date().toISOString(),
      };

      this.recommendations.unshift(newRecommendation);
    }

    return {
      feedback: newFeedback,
      updatedDemandScore: updatedSkillScore,
      impactSummary: `Employer signal successfully integrated into Maharashtra Skill Graph. Updated demand scores for ${targetSkillNames.length} key competencies and queued actionable policy alerts.`,
      newRecommendation,
    };
  }

  // --- Recommendations ---
  getRecommendations(filters) {
    return this.recommendations.filter(r => {
      if (filters?.district && filters.district.toLowerCase() !== 'all' && r.district.toLowerCase() !== filters.district.toLowerCase()) {
        return false;
      }
      if (filters?.priority && filters.priority.toLowerCase() !== 'all' && r.priority.toLowerCase() !== filters.priority.toLowerCase()) {
        return false;
      }
      if (filters?.status && filters.status.toLowerCase() !== 'all' && r.status.toLowerCase() !== filters.status.toLowerCase()) {
        return false;
      }
      return true;
    });
  }

  updateRecommendationStatus(id, status) {
    const rec = this.recommendations.find(r => r.recommendationId === id);
    if (rec) {
      rec.status = status;
      return rec;
    }
    return null;
  }

  addRecommendation(rec) {
    this.recommendations.unshift(rec);
    return rec;
  }

  // --- Jobs ---
  getJobs(district) {
    if (!district || district.toLowerCase() === 'all') return this.jobs;
    return this.jobs.filter(j => j.district.toLowerCase() === district.toLowerCase());
  }

  // --- Placements ---
  getPlacements() {
    return this.placements;
  }

  // --- Aggregated Stats ---
  getStats(district = 'Pune') {
    const distInfo =
      MAHARASHTRA_DISTRICTS_DATA.find(d => d.name.toLowerCase() === district.toLowerCase()) ||
      MAHARASHTRA_DISTRICTS_DATA[0];

    const activeJobs = this.getJobs(district);
    const totalPostings = activeJobs.length > 0
      ? activeJobs.reduce((acc, j) => acc + j.activePostingsCount, 0) * 8 + 1200
      : distInfo.activeJobCount;

    const institutesInDist = this.getInstitutes(district);
    const totalTrainersNeeded = institutesInDist.length > 0
      ? institutesInDist.reduce((acc, i) => acc + i.trainersNeeded, 0)
      : Math.round(distInfo.criticalGapsCount * 2.2);

    const avgLabReadiness = institutesInDist.length > 0
      ? Math.round(institutesInDist.reduce((acc, i) => acc + i.labReadinessScore, 0) / institutesInDist.length)
      : distInfo.workforceReadiness;

    const criticalGapsCount = distInfo.criticalGapsCount;
    const coursesNeedingUpdate = Math.max(2, Math.round(distInfo.criticalGapsCount * 0.75));

    return {
      district: distInfo.name,
      totalActiveJobSignals: totalPostings,
      criticalSkillGaps: criticalGapsCount,
      coursesNeedingUpdate: coursesNeedingUpdate,
      avgTrainerShortagePercent: Math.round(100 - distInfo.workforceReadiness * 0.8),
      trainersDeficitCount: totalTrainersNeeded || 6,
      avgLabReadinessScore: avgLabReadiness,
      overallAlignmentScore: Math.round(distInfo.workforceReadiness * 0.95),
      totalEnrolledTrainees: institutesInDist.length > 0
        ? institutesInDist.reduce((acc, i) => acc + i.activeEnrollments, 0)
        : distInfo.itiCount * 85,
      districtCapacity: institutesInDist.length > 0
        ? institutesInDist.reduce((acc, i) => acc + i.capacity, 0)
        : distInfo.itiCount * 110,
      placementRatePercent: Math.round(75 + (distInfo.workforceReadiness / 10)),
      topSector: distInfo.topSector,
      focusRoles: distInfo.focusRoles,
    };
  }

  // --- Market Intelligence for Specific Role ---
  getMarketIntelligence(role = 'EV Technician', district = 'Pune') {
    const distInfo =
      MAHARASHTRA_DISTRICTS_DATA.find(d => d.name.toLowerCase() === district.toLowerCase()) ||
      MAHARASHTRA_DISTRICTS_DATA[0];

    const relevantJobs = this.jobs.filter(
      j =>
        (j.role.toLowerCase() === role.toLowerCase() || j.jobTitle.toLowerCase().includes(role.toLowerCase())) &&
        (district === 'all' || j.district.toLowerCase() === district.toLowerCase())
    );
    const relevantSkills = this.skills.filter(
      s =>
        s.category.includes('Powertrain') ||
        s.category.includes('Safety') ||
        s.category.includes('Diagnostics') ||
        s.category.includes('Automotive') ||
        s.demandScore > 80
    );

    const evidenceStats = {
      jobPostingCount: distInfo.activeJobCount,
      difficultyPercent: Math.round(100 - distInfo.workforceReadiness * 0.5),
      yoyGrowthPercent: Math.round(distInfo.demandScore * 0.52),
      avgSalaryRange: '₹3.2 - ₹5.0 LPA',
      experienceDistribution: { '0-1 yr': 25, '1-3 yrs': 55, '3+ yrs': 20 },
      topClusters: [`${distInfo.name} Industrial Area`, `${distInfo.topSector} Cluster`],
      topHiringEmployers: ['Local Anchor Industries', 'MIDC Component Manufacturers', 'State Enterprise Partners'],
      curriculumCoveragePercent: distInfo.workforceReadiness,
    };

    return {
      role,
      district: distInfo.name,
      demandScore: distInfo.demandScore,
      evidence: evidenceStats,
      skillDemandRanked: relevantSkills.map(skill => {
        const courseSkill = this.courseSkills.find(cs => cs.skillId === skill.skillId);
        return {
          skillId: skill.skillId,
          skillName: skill.skillName,
          category: skill.category,
          demandScore: Math.min(99, Math.round(skill.demandScore * (distInfo.demandScore / 90))),
          growthRate: skill.growthRatePercent,
          difficultyLevel: skill.difficultyLevel,
          coverageStatus: courseSkill ? courseSkill.coverageLevel : 'NOT_COVERED',
          practicalRatio: courseSkill ? Math.round(courseSkill.practicalHoursRatio * 100) : 0,
          gapSeverity:
            !courseSkill || courseSkill.coverageLevel === 'NOT_COVERED'
              ? 'CRITICAL'
              : courseSkill.coverageLevel === 'PARTIAL'
              ? 'HIGH'
              : 'LOW',
        };
      }),
      wageTrend: [
        { quarter: 'Q1 2025', avgSalary: 280000, demandIndex: Math.round(distInfo.demandScore * 0.78) },
        { quarter: 'Q2 2025', avgSalary: 310000, demandIndex: Math.round(distInfo.demandScore * 0.85) },
        { quarter: 'Q3 2025', avgSalary: 335000, demandIndex: Math.round(distInfo.demandScore * 0.92) },
        { quarter: 'Q4 2025', avgSalary: 350000, demandIndex: Math.round(distInfo.demandScore * 0.96) },
        { quarter: 'Q1 2026', avgSalary: 380000, demandIndex: distInfo.demandScore },
      ],
    };
  }

  // --- Skill Gaps Matrix ---
  getSkillGaps(district = 'Pune', industry = 'Automotive / EV', thresholds = { critical: 85, high: 70, medium: 50 }) {
    const list = this.skills.map(skill => {
      const courseSkill = this.courseSkills.find(cs => cs.skillId === skill.skillId);
      const isCovered = courseSkill?.coverageLevel === 'COVERED';
      const isPartial = courseSkill?.coverageLevel === 'PARTIAL';
      const availableCoverage = isCovered ? 85 : isPartial ? 40 : 10;
      const gapScore = Math.max(0, skill.demandScore - availableCoverage);

      let severity = 'LOW';
      if (gapScore >= thresholds.critical) severity = 'CRITICAL';
      else if (gapScore >= thresholds.high) severity = 'HIGH';
      else if (gapScore >= thresholds.medium) severity = 'MEDIUM';

      return {
        skillId: skill.skillId,
        skillName: skill.skillName,
        category: skill.category,
        demandScore: skill.demandScore,
        availableCoveragePercent: availableCoverage,
        gapScore,
        severity,
        growthRate: skill.growthRatePercent,
        trainerGap: isCovered ? 0 : isPartial ? 2 : 5,
        labReadinessGap: isCovered ? 15 : isPartial ? 60 : 90,
        escoCode: skill.escoCode,
        nsdcQpCode: skill.nsdcQpCode,
      };
    });

    return {
      district,
      industry,
      thresholds,
      gaps: list.sort((a, b) => b.gapScore - a.gapScore),
    };
  }

  // --- Course Alignment Breakdown ---
  getCourseAlignment(courseId = 'COURSE_ITI_EV_TECH') {
    const course = this.courses.find(c => c.courseId === courseId) || this.courses[0];
    const mappings = this.courseSkills.filter(cs => cs.courseId === course.courseId);

    const enrichedSkills = this.skills.map(skill => {
      const mapping = mappings.find(m => m.skillId === skill.skillId);
      return {
        skillId: skill.skillId,
        skillName: skill.skillName,
        category: skill.category,
        industryDemandScore: skill.demandScore,
        coverageLevel: mapping ? mapping.coverageLevel : 'NOT_COVERED',
        practicalRatio: mapping ? mapping.practicalHoursRatio : 0,
        syllabusTopic: mapping ? mapping.syllabusTopic : 'Not in syllabus',
        equipmentNeeded: mapping ? mapping.labEquipmentRequired : ['Equipment standard unverified'],
        trainerCertifiedRequired: mapping ? mapping.trainerCertifiedRequired : true,
      };
    });

    const coveredCount = enrichedSkills.filter(s => s.coverageLevel === 'COVERED').length;
    const partialCount = enrichedSkills.filter(s => s.coverageLevel === 'PARTIAL').length;
    const missingCount = enrichedSkills.filter(s => s.coverageLevel === 'NOT_COVERED').length;
    const total = enrichedSkills.length;
    const alignmentPercent = Math.round(((coveredCount * 1.0 + partialCount * 0.45) / total) * 100);

    return {
      course,
      alignmentPercent,
      breakdown: {
        covered: coveredCount,
        partial: partialCount,
        missing: missingCount,
        total,
      },
      skills: enrichedSkills,
    };
  }

  // --- District Skill Plan Data ---
  getDistrictPlan(district = 'Pune') {
    const distInfo = MAHARASHTRA_DISTRICTS_DATA.find(d => d.name.toLowerCase() === district.toLowerCase()) || MAHARASHTRA_DISTRICTS_DATA[0];
    const institutes = this.getInstitutes(district);
    const recs = this.recommendations.filter(r => r.district.toLowerCase() === district.toLowerCase());

    return {
      district: distInfo.name,
      planYear: '2026-2027',
      approvedBy: 'District Skill Committee (DSC) & Maharashtra State Skill Development Society',
      status: 'SUBMITTED_FOR_CABINET_NOTIFICATION',
      keyMetrics: {
        targetUpskillingQuota: 14500,
        itiModernizationAllocation: '₹14.80 Crore',
        industryPartnershipsCount: 18,
        projectedJobPlacements: 12800,
        currentPlacementRate: '88.2%',
      },
      prioritySectors: [
        { sector: 'Electric Vehicles (EV) & Battery Tech', share: 45, allocation: '₹6.80 Cr' },
        { sector: 'Precision Engineering & 5-Axis CNC', share: 30, allocation: '₹4.50 Cr' },
        { sector: 'Power Electronics & Charging Infra', share: 15, allocation: '₹2.20 Cr' },
        { sector: 'Circular Economy & Battery 2nd Life', share: 10, allocation: '₹1.30 Cr' },
      ],
      interventions: recs,
      instituteActions: institutes.map(inst => ({
        instituteId: inst.instituteId,
        instituteName: inst.name,
        type: inst.type,
        capacity: inst.capacity,
        targetBatches: 8,
        allocatedBudget: inst.type === 'Govt_ITI' ? '₹1.85 Cr' : '₹95 Lakh',
        keyEquipmentToProcure: inst.missingEquipment,
        trainersToUpskill: inst.trainersNeeded,
      })),
      governanceCalendar: [
        { month: 'Sep 2026', milestone: 'Procure 800V EV Isolation Test Simulator Benches for Aundh & Pimpri' },
        { month: 'Oct 2026', milestone: 'ARAI 40-hr Certified Master Trainer Batch for 24 ITI Instructors' },
        { month: 'Nov 2026', milestone: 'Roll out updated DGT Mechanic EV curriculum module statewide' },
        { month: 'Jan 2027', milestone: 'Mid-term Placement & Industry Satisfaction Review with SIAM/ACMA' },
      ],
    };
  }
}

export const dbStore = new DatabaseStore();
export default dbStore;
