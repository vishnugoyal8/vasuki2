import mongoose, { Schema } from 'mongoose';

export const EmployerSchema = new Schema({
  employerId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  district: { type: String, required: true },
  cluster: { type: String },
  industry: { type: String, required: true },
  employeeCount: { type: String },
  activeOpenings: { type: Number, default: 0 },
  primaryRoles: [{ type: String }],
});

export const Employer = mongoose.models.Employer || mongoose.model('Employer', EmployerSchema);
export default Employer;
