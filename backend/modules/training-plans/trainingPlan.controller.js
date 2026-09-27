import trainingPlanService from './trainingPlan.service.js';

export const getPlans = async (req, res, next) => {
  try {
    const plans = await trainingPlanService.getAllPlans();
    res.json(plans);
  } catch (error) {
    next(error);
  }
};

export const getPlanByDistrict = async (req, res, next) => {
  try {
    const { district } = req.params;
    const plan = await trainingPlanService.getPlanByDistrict(district);
    res.json(plan);
  } catch (error) {
    next(error);
  }
};

export const updatePlan = async (req, res, next) => {
  try {
    const { planId } = req.params;
    const updated = await trainingPlanService.updatePlan(planId, req.body);
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const recalculatePlan = async (req, res, next) => {
  try {
    const { district, focusAreas } = req.body;
    const recalculated = await trainingPlanService.recalculatePlanWithAi(district, focusAreas);
    res.json(recalculated);
  } catch (error) {
    next(error);
  }
};

export default {
  getPlans,
  getPlanByDistrict,
  updatePlan,
  recalculatePlan,
};
