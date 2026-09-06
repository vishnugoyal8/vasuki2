import { Router } from 'express';
import instituteController from './institute.controller.js';

const router = Router();

router.get('/institutes', instituteController.getInstitutes);

export default router;
