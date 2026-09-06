import { Router } from 'express';
import recommendationController from './recommendation.controller.js';

const router = Router();

router.get('/recommendations', recommendationController.getRecommendations);
router.patch('/recommendations/:id', recommendationController.updateRecommendationStatus);

export default router;
