import { Router } from 'express';
import placementController from './placement.controller.js';

const router = Router();

router.get('/placements', placementController.getPlacements);

export default router;
