import mongoose, { Schema } from 'mongoose';

export const EmployerFeedbackSchema = new Schema({
  feedbackId: { type: String, required: true, unique: true },
  employerId: { type: String },
  companyName: { type: String, required: true },
  district: { type: String, required: true },
  industry: { type: String, required: true },
  role: { type: String, required: true },
  requiredSkills: [{ type: String }],
  hiringDifficultyScore: { type: Number, required: true },
  reportedShortages: [{ type: String }],
  candidateVolumeNeeded: { type: Number, default: 10 },
  quarter: { type: String },
  timestamp: { type: String },
});

export const EmployerFeedback = mongoose.models.EmployerFeedback || mongoose.model('EmployerFeedback', EmployerFeedbackSchema);
export default EmployerFeedback;
