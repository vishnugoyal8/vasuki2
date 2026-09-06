import { Router } from 'express';
import aiController from './ai.controller.js';

const router = Router();

router.post('/job-description/analyze', aiController.analyzeJobDescription);

export default router;
