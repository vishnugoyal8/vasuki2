import { Router } from 'express';
import employerController from './employer.controller.js';

const router = Router();

router.get('/employers', employerController.getEmployers);
router.get('/employer-feedback', employerController.getEmployerFeedback);
router.post('/employer-feedback', employerController.submitEmployerFeedback);

export default router;
