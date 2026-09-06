import mongoose, { Schema } from 'mongoose';

export const CourseSchema = new Schema({
  courseId: { type: String, required: true, unique: true },
  courseCode: { type: String, required: true },
  title: { type: String, required: true },
  sector: { type: String, required: true },
  durationHours: { type: Number, required: true },
  nsqfLevel: { type: Number, required: true },
  awardingBody: { type: String, required: true },
  targetRole: { type: String, required: true },
  instituteIds: [{ type: String }],
  lastUpdated: { type: String },
  activeBatches: { type: Number, default: 1 },
  annualIntakeCapacity: { type: Number, default: 100 },
});

export const Course = mongoose.models.Course || mongoose.model('Course', CourseSchema);
export default Course;
