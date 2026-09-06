import { Router } from 'express';
import courseController from './course.controller.js';

const router = Router();

router.get('/courses', courseController.getCourses);
router.get('/courses/alignment', courseController.getCourseAlignment);

export default router;
