import mongoose, { Schema } from 'mongoose';

export const SkillSchema = new Schema({
  skillId: { type: String, required: true, unique: true },
  skillName: { type: String, required: true },
  category: { type: String, required: true },
  aliases: [{ type: String }],
  description: { type: String },
  demandScore: { type: Number, default: 50 },
  difficultyLevel: { type: String, enum: ['BASIC', 'INTERMEDIATE', 'ADVANCED'], default: 'INTERMEDIATE' },
  escoCode: { type: String },
  nsdcQpCode: { type: String },
  growthRatePercent: { type: Number, default: 0 },
  isEmerging: { type: Boolean, default: false },
});

export const Skill = mongoose.models.Skill || mongoose.model('Skill', SkillSchema);
export default Skill;
