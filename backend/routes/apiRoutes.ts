/**
 * REST API ROUTER for Maharashtra Skill Intelligence & Training Planning Platform
 */

import { Router, Request, Response } from 'express';
import { dbStore } from '../db/database.ts';
import { analyzeJobDescriptionWithGemini } from '../services/geminiService.ts';
import { MAHARASHTRA_DISTRICTS_DATA } from '../data/seedData.ts';

const router = Router();

// Health check
router.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    platform: 'MahaSkill AI - Skill Intelligence & Decision Support Platform',
    version: '1.0.0 (MERN Stack Edition)',
    database: dbStore.getStatus(),
  });
});

// MongoDB & Data Layer Status
router.get('/db/status', (req: Request, res: Response) => {
  res.json(dbStore.getStatus());
});

// Overview KPI stats
router.get('/stats', (req: Request, res: Response) => {
  const district = (req.query.district as string) || 'Pune';
  const stats = dbStore.getStats(district);
  res.json(stats);
});

// Maharashtra Districts GIS & summary data
router.get('/districts', (req: Request, res: Response) => {
  res.json(MAHARASHTRA_DISTRICTS_DATA);
});

// District Skill Plan (e.g. Pune Skill Plan)
router.get('/districts/:district/plan', (req: Request, res: Response) => {
  const district = req.params.district || 'Pune';
  const plan = dbStore.getDistrictPlan(district);
  res.json(plan);
});

// Market Intelligence for drill-down role
router.get('/market-intelligence', (req: Request, res: Response) => {
  const role = (req.query.role as string) || 'EV Technician';
  const district = (req.query.district as string) || 'Pune';
  const data = dbStore.getMarketIntelligence(role, district);
  res.json(data);
});

// Skill gaps matrix & severity analysis
router.get('/skill-gaps', (req: Request, res: Response) => {
  const district = (req.query.district as string) || 'Pune';
  const industry = (req.query.industry as string) || 'Automotive / EV';
  const critThreshold = Number(req.query.criticalThreshold) || 85;
  const highThreshold = Number(req.query.highThreshold) || 70;
  const medThreshold = Number(req.query.medThreshold) || 50;

  const data = dbStore.getSkillGaps(district, industry, {
    critical: critThreshold,
    high: highThreshold,
    medium: medThreshold,
  });
  res.json(data);
});

// Courses list
router.get('/courses', (req: Request, res: Response) => {
  const courses = dbStore.getCourses();
  res.json(courses);
});

// Course alignment side-by-side analysis
router.get('/courses/alignment', (req: Request, res: Response) => {
  const courseId = (req.query.courseId as string) || 'COURSE_ITI_EV_TECH';
  const alignment = dbStore.getCourseAlignment(courseId);
  res.json(alignment);
});

// AI Job Description Analyzer (Gemini 3.7 Flash)
router.post('/job-description/analyze', async (req: Request, res: Response) => {
  try {
    const { jobDescription, district = 'Pune' } = req.body;
    if (!jobDescription || typeof jobDescription !== 'string') {
      res.status(400).json({ error: 'Please provide a valid jobDescription string in the request body.' });
      return;
    }

    const analysis = await analyzeJobDescriptionWithGemini(jobDescription, district);
    res.json(analysis);
  } catch (error) {
    console.error('[API] Job Description Analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze job description.', details: (error as Error).message });
  }
});

// Recommendations list
router.get('/recommendations', (req: Request, res: Response) => {
  const district = req.query.district as string;
  const priority = req.query.priority as string;
  const status = req.query.status as string;

  const recs = dbStore.getRecommendations({ district, priority, status });
  res.json(recs);
});

// Update recommendation status
router.patch('/recommendations/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['PENDING_APPROVAL', 'APPROVED', 'IN_PROGRESS', 'COMPLETED'].includes(status)) {
    res.status(400).json({ error: 'Invalid status value.' });
    return;
  }

  const updated = dbStore.updateRecommendationStatus(id, status);
  if (!updated) {
    res.status(404).json({ error: 'Recommendation not found.' });
    return;
  }

  res.json(updated);
});

// Training Institutes
router.get('/institutes', (req: Request, res: Response) => {
  const district = req.query.district as string;
  const institutes = dbStore.getInstitutes(district);
  res.json(institutes);
});

// Employers
router.get('/employers', (req: Request, res: Response) => {
  const district = req.query.district as string;
  const employers = dbStore.getEmployers(district);
  res.json(employers);
});

// Employer feedback signals list
router.get('/employer-feedback', (req: Request, res: Response) => {
  const feedbackList = dbStore.getEmployerFeedback();
  res.json(feedbackList);
});

// Submit employer feedback & trigger continuous loop recalibration
router.post('/employer-feedback', (req: Request, res: Response) => {
  try {
    const { companyName, district, industry, role, requiredSkills, hiringDifficultyScore, reportedShortages, candidateVolumeNeeded, quarter } = req.body;

    if (!companyName || !role || !hiringDifficultyScore) {
      res.status(400).json({ error: 'companyName, role, and hiringDifficultyScore are required fields.' });
      return;
    }

    const result = dbStore.addEmployerFeedback({
      employerId: `EMP_${companyName.toUpperCase().replace(/\s+/g, '_').slice(0, 10)}`,
      companyName,
      district: district || 'Pune',
      industry: industry || 'Automotive / EV',
      role,
      requiredSkills: Array.isArray(requiredSkills) ? requiredSkills : [requiredSkills],
      hiringDifficultyScore: Number(hiringDifficultyScore) || 5,
      reportedShortages: Array.isArray(reportedShortages) ? reportedShortages : [reportedShortages],
      candidateVolumeNeeded: Number(candidateVolumeNeeded) || 10,
      quarter: quarter || 'Q3 2026',
    });

    res.status(201).json({
      success: true,
      message: 'Employer feedback registered. Dynamic demand models recalibrated.',
      ...result,
    });
  } catch (err) {
    console.error('[API] Error submitting employer feedback:', err);
    res.status(500).json({ error: 'Failed to submit employer feedback.' });
  }
});

// Placements
router.get('/placements', (req: Request, res: Response) => {
  const placements = dbStore.getPlacements();
  res.json(placements);
});

// Reset seed data
router.post('/seed/reset', (req: Request, res: Response) => {
  dbStore.seedInMemory();
  res.json({ message: 'Demo seed dataset restored successfully.' });
});

export default router;
