import { DistrictTrainingPlan } from '../../models/DistrictTrainingPlan.js';
import { SEED_DISTRICT_TRAINING_PLANS } from '../../data/districtPlans.seed.js';

let inMemoryPlans = JSON.parse(JSON.stringify(SEED_DISTRICT_TRAINING_PLANS));

export const getPlans = async () => {
  try {
    const plans = await DistrictTrainingPlan.find().lean();
    if (plans && plans.length > 0) return plans;
  } catch (e) {
    console.warn('[TrainingPlan Repository] MongoDB read notice:', e.message);
  }
  return inMemoryPlans;
};

export const getPlanByDistrict = async (district) => {
  try {
    const plan = await DistrictTrainingPlan.findOne({
      district: new RegExp(`^${district}$`, 'i'),
    }).lean();
    if (plan) return plan;
  } catch (e) {
    console.warn('[TrainingPlan Repository] MongoDB read notice:', e.message);
  }

  const found = inMemoryPlans.find(
    (p) => p.district.toLowerCase() === district.toLowerCase()
  );
  return found || inMemoryPlans[0];
};

export const savePlan = async (planData) => {
  // Update in memory
  const idx = inMemoryPlans.findIndex(
    (p) => p.planId === planData.planId || p.district.toLowerCase() === planData.district.toLowerCase()
  );
  if (idx >= 0) {
    inMemoryPlans[idx] = { ...inMemoryPlans[idx], ...planData, updatedAt: new Date() };
  } else {
    inMemoryPlans.unshift(planData);
  }

  // Update in MongoDB
  try {
    await DistrictTrainingPlan.findOneAndUpdate(
      { planId: planData.planId },
      planData,
      { upsert: true, new: true }
    );
  } catch (e) {
    console.warn('[TrainingPlan Repository] MongoDB save notice:', e.message);
  }

  return planData;
};

export const initPlansToDb = async () => {
  try {
    const count = await DistrictTrainingPlan.countDocuments();
    if (count === 0) {
      await DistrictTrainingPlan.insertMany(SEED_DISTRICT_TRAINING_PLANS);
      console.log('[TrainingPlan Repository] Seeded District Training Plans to MongoDB Atlas.');
    }
  } catch (e) {
    console.warn('[TrainingPlan Repository] Init sync notice:', e.message);
  }
};

export default {
  getPlans,
  getPlanByDistrict,
  savePlan,
  initPlansToDb,
};
