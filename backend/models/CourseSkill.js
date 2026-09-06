import mongoose, { Schema } from 'mongoose';

export const CourseSkillSchema = new Schema({
  courseId: { type: String, required: true },
  skillId: { type: String, required: true },
  coverageLevel: { type: String, enum: ['COVERED', 'PARTIAL', 'NOT_COVERED'], required: true },
  practicalHoursRatio: { type: Number, default: 0.5 },
  labEquipmentRequired: [{ type: String }],
  trainerCertifiedRequired: { type: Boolean, default: false },
  syllabusTopic: { type: String },
});

export const CourseSkill = mongoose.models.CourseSkill || mongoose.model('CourseSkill', CourseSkillSchema);
export default CourseSkill;
