import mongoose, { Schema } from 'mongoose';

export const PlacementSchema = new Schema({
  placementId: { type: String, required: true, unique: true },
  instituteId: { type: String, required: true },
  courseId: { type: String, required: true },
  role: { type: String, required: true },
  year: { type: String, required: true },
  batchSize: { type: Number, required: true },
  placedCount: { type: Number, required: true },
  avgSalary: { type: String, required: true },
  topRecruiters: [{ type: String }],
  retentionRate6Month: { type: Number, default: 85 },
});

export const Placement = mongoose.models.Placement || mongoose.model('Placement', PlacementSchema);
export default Placement;
