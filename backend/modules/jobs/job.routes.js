import { Router } from 'express';
import jobController from './job.controller.js';

const router = Router();

router.get('/market-intelligence', jobController.getMarketIntelligence);

export default router;
