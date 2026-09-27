import mongoose from 'mongoose';

const TargetItiSchema = new mongoose.Schema({
  name: { type: String, required: true },
  taluka: { type: String },
  type: { type: String, default: 'Government ITI' },
  primaryTradesUpgraded: [String],
  investment: { type: String },
}, { _id: false });

const SeatReallocationSchema = new mongoose.Schema({
  action: { type: String, enum: ['EXPAND', 'DOWNSIZE', 'INTRODUCE'], required: true },
  tradeName: { type: String, required: true },
  seatChange: { type: Number, required: true },
  currentCapacity: { type: Number, required: true },
  proposedCapacity: { type: Number, required: true },
  rationale: { type: String, required: true },
}, { _id: false });

const LabProcurementSchema = new mongoose.Schema({
  equipmentName: { type: String, required: true },
  trade: { type: String, required: true },
  quantity: { type: Number, required: true },
  estimatedCost: { type: String, required: true },
  fundingSource: { type: String, default: 'World Bank STRIVE' },
  priority: { type: String, enum: ['Critical', 'High', 'Medium'], default: 'High' },
}, { _id: false });

const DistrictTrainingPlanSchema = new mongoose.Schema(
  {
    planId: { type: String, required: true, unique: true },
    district: { type: String, required: true },
    fiscalYear: { type: String, default: '2026-2027' },
    status: {
      type: String,
      enum: ['Approved & Gazetted', 'Pending DSC Review', 'Draft', 'In Execution'],
      default: 'Approved & Gazetted',
    },
    sanctionedBudget: { type: String, required: true },
    budgetBreakdown: {
      statePlanPercent: { type: Number, default: 60 },
      striveWorldBankPercent: { type: Number, default: 25 },
      csrIndustryPercent: { type: Number, default: 15 },
      disbursedPercent: { type: Number, default: 65 },
    },
    keyIndustrialClusters: [String],
    anchorEmployers: [String],
    targetItis: [TargetItiSchema],
    seatReallocations: [SeatReallocationSchema],
    labProcurements: [LabProcurementSchema],
    trainerUpskilling: {
      targetTrainers: { type: Number, default: 45 },
      completedCount: { type: Number, default: 28 },
      partnerCenters: [String],
      certificationModules: [String],
    },
    apprenticeshipTargets: {
      targetSeats: { type: Number, default: 1200 },
      partnerCount: { type: Number, default: 48 },
      napsSubsidySanctioned: { type: String, default: '₹2.40 Cr' },
    },
    executiveSummary: { type: String },
    gazetteNotificationNumber: { type: String, default: 'DVET/DSDP/2026/MAH-089' },
    dvetOfficerSignatory: {
      name: { type: String, default: 'Shri. S. V. Deshmukh' },
      designation: { type: String, default: 'Joint Director of Vocational Education & Training, Maharashtra State' },
    },
  },
  { timestamps: true }
);

export const DistrictTrainingPlan =
  mongoose.models.DistrictTrainingPlan ||
  mongoose.model('DistrictTrainingPlan', DistrictTrainingPlanSchema);

export default DistrictTrainingPlan;
