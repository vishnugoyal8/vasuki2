import { Router } from 'express';
import skillController from './skill.controller.js';

const router = Router();

router.get('/skill-gaps', skillController.getSkillGaps);

export default router;
