import { Router } from 'express';
import analyticsController from './analytics.controller.js';

const router = Router();

router.get('/stats', analyticsController.getStats);
router.get('/districts', analyticsController.getDistricts);
router.get('/districts/:district/plan', analyticsController.getDistrictPlan);

export default router;
