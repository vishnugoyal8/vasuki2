import { Router } from 'express';
import trainingPlanController from './trainingPlan.controller.js';

const router = Router();

router.get('/training-plans', trainingPlanController.getPlans);
router.get('/training-plans/:district', trainingPlanController.getPlanByDistrict);
router.post('/training-plans/recalculate', trainingPlanController.recalculatePlan);
router.put('/training-plans/:planId', trainingPlanController.updatePlan);

export default router;
