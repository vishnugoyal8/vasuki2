import { Router } from 'express';
import { dbStore } from '../db/database.js';

import skillRoutes from '../modules/skills/skill.routes.js';
import courseRoutes from '../modules/courses/course.routes.js';
import jobRoutes from '../modules/jobs/job.routes.js';
import instituteRoutes from '../modules/institutes/institute.routes.js';
import employerRoutes from '../modules/employers/employer.routes.js';
import recommendationRoutes from '../modules/recommendations/recommendation.routes.js';
import placementRoutes from '../modules/placements/placement.routes.js';
import analyticsRoutes from '../modules/analytics/analytics.routes.js';
import aiRoutes from '../modules/ai/ai.routes.js';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    platform: 'CareerSync - Skill Intelligence & Decision Support Platform',
    version: '1.0.0 (MERN Stack Edition - Refactored JS Architecture)',
    database: dbStore.getStatus(),
  });
});

// MongoDB & Data Layer Status
router.get('/db/status', (req, res) => {
  res.json(dbStore.getStatus());
});

// Reset seed data
router.post('/seed/reset', (req, res) => {
  dbStore.seedInMemory();
  res.json({ message: 'Demo seed dataset restored successfully.' });
});

// Domain Feature Routes
router.use(analyticsRoutes);
router.use(skillRoutes);
router.use(courseRoutes);
router.use(jobRoutes);
router.use(instituteRoutes);
router.use(employerRoutes);
router.use(recommendationRoutes);
router.use(placementRoutes);
router.use(aiRoutes);

export default router;
