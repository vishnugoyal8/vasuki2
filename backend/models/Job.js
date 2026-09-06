import mongoose, { Schema } from 'mongoose';

export const JobSchema = new Schema({
  jobId: { type: String, required: true, unique: true },
  jobTitle: { type: String, required: true },
  role: { type: String, required: true },
  district: { type: String, required: true },
  industry: { type: String, required: true },
  company: { type: String, required: true },
  salaryRange: { type: String },
  experienceLevel: { type: String },
  postedDate: { type: String },
  requiredSkills: [
    {
      skillId: { type: String },
      skillName: { type: String },
      importance: { type: String, enum: ['CRITICAL', 'HIGH', 'MEDIUM', 'NICE_TO_HAVE'] },
      proficiency: { type: String, enum: ['BASIC', 'INTERMEDIATE', 'ADVANCED'] },
      frequency: { type: Number },
    },
  ],
  activePostingsCount: { type: Number, default: 1 },
  source: { type: String, enum: ['Mahaswayam', 'NCS', 'Industry_Direct', 'Naukri_AutoIndex'] },
  rawDescription: { type: String },
});

export const Job = mongoose.models.Job || mongoose.model('Job', JobSchema);
export default Job;
