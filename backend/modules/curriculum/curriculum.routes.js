import { Router } from 'express';
import multer from 'multer';
import curriculumController from './curriculum.controller.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 30 * 1024 * 1024, // 30MB max
  },
});

const router = Router();

// Run curriculum audit (accepts file upload OR JSON base64 / rawText / sampleId)
router.post('/curriculum/audit', upload.single('syllabusFile'), curriculumController.auditSyllabus);

// Sample syllabi for instant demo & evaluation
router.get('/curriculum/samples', curriculumController.getSampleSyllabi);
router.get('/curriculum/samples/:id', curriculumController.getSampleSyllabusById);

export default router;
