import mongoose, { Schema } from 'mongoose';

export const RecommendationSchema = new Schema({
  recommendationId: { type: String, required: true, unique: true },
  district: { type: String, required: true },
  sector: { type: String, required: true },
  role: { type: String, required: true },
  title: { type: String, required: true },
  priority: { type: String, enum: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'], required: true },
  reason: { type: String, required: true },
  confidenceScore: { type: Number, required: true },
  evidence: {
    jobPostingCount: { type: Number },
    difficultyPercent: { type: Number },
    growthPercent: { type: Number },
    currentCoveragePercent: { type: Number },
    trainerGap: { type: Number },
    labGap: { type: Number },
    primarySource: { type: String },
  },
  suggestedActions: [{ type: String }],
  targetInstitutes: [{ type: String }],
  status: { type: String, enum: ['PENDING_APPROVAL', 'APPROVED', 'IN_PROGRESS', 'COMPLETED'], default: 'PENDING_APPROVAL' },
  createdAt: { type: String },
});

export const Recommendation = mongoose.models.Recommendation || mongoose.model('Recommendation', RecommendationSchema);
export default Recommendation;
