import mongoose, { Schema } from 'mongoose';

export const InstituteSchema = new Schema({
  instituteId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  district: { type: String, required: true },
  cluster: { type: String },
  type: { type: String, enum: ['Govt_ITI', 'Polytechnic', 'Private_VTP', 'MSDC'] },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  capacity: { type: Number, default: 500 },
  activeEnrollments: { type: Number, default: 400 },
  labReadinessScore: { type: Number, default: 70 },
  trainerReadinessScore: { type: Number, default: 70 },
  coursesOffered: [{ type: String }],
  missingEquipment: [{ type: String }],
  trainersNeeded: { type: Number, default: 0 },
});

export const Institute = mongoose.models.Institute || mongoose.model('Institute', InstituteSchema);
export default Institute;
