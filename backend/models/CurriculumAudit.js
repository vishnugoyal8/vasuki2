import mongoose from 'mongoose';

const CurriculumAuditSchema = new mongoose.Schema(
  {
    auditId: { type: String, required: true, unique: true },
    instituteId: { type: String, default: 'INST_PUNE_ITI_AUNDH' },
    fileName: { type: String, required: true },
    courseTitle: { type: String, required: true },
    tradeSector: { type: String, default: 'Electrician & EV Technician' },
    district: { type: String, default: 'Pune' },
    awardingBody: { type: String, default: 'DGT CTS' },
    detectedNsqfLevel: { type: String, default: 'NSQF Level 4' },
    totalHours: { type: Number, default: 1200 },
    practicalHoursRatio: { type: Number, default: 0.4 },
    overallAlignmentScore: { type: Number, required: true },
    alignmentStatus: { type: String, default: 'MODERATE_ALIGNMENT' },
    executiveSummary: { type: String },
    breakdownStats: {
      totalCompetencies: Number,
      coveredCount: Number,
      partialCount: Number,
      missingCount: Number,
      curricularDeficitPercent: Number,
    },
    competencies: [
      {
        skillName: String,
        category: String,
        demandScore: Number,
        coverageStatus: String,
        syllabusTopic: String,
        gapDiagnostic: String,
        recommendedAction: String,
        requiredLabEquipment: String,
      },
    ],
    obsoleteTopics: [
      {
        topicName: String,
        reasonObsolete: String,
        replacementRecommendation: String,
      },
    ],
    missingEmergingSkills: [
      {
        skillName: String,
        industrialNeed: String,
        recommendedHours: Number,
      },
    ],
    bridgeRecommendation: {
      moduleTitle: String,
      recommendedHours: Number,
      targetBatch: String,
      estimatedLabCost: String,
      syllabusSummary: String,
    },
  },
  { timestamps: true }
);

export const CurriculumAudit = mongoose.model('CurriculumAudit', CurriculumAuditSchema);
export default CurriculumAudit;
