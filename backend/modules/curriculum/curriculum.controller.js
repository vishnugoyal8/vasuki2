import curriculumService from './curriculum.service.js';
import { successResponse, errorResponse } from '../../utils/response.js';

export const auditSyllabus = async (req, res, next) => {
  try {
    const { base64, rawText, fileName, tradeSector, district, sampleId } = req.body || {};
    const file = req.file;

    const fileBuffer = file ? file.buffer : base64 ? Buffer.from(base64, 'base64') : null;
    const resolvedFileName = file ? file.originalname : fileName || 'Uploaded_Syllabus.pdf';

    const result = await curriculumService.analyzeSyllabus({
      fileBuffer,
      base64Pdf: base64,
      rawText,
      fileName: resolvedFileName,
      tradeSector: tradeSector || 'Electrician & EV Technician',
      district: district || 'Pune',
      sampleId,
    });

    return successResponse(res, result, 'Curriculum alignment audit completed successfully.');
  } catch (err) {
    console.error('[CurriculumController] Audit failed:', err);
    return errorResponse(res, err.message || 'Failed to process curriculum audit', 500);
  }
};

export const getSampleSyllabi = async (req, res, next) => {
  try {
    const samples = curriculumService.getSampleSyllabi();
    return successResponse(res, samples);
  } catch (err) {
    next(err);
  }
};

export const getSampleSyllabusById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sample = curriculumService.getSampleSyllabusById(id);
    if (!sample) {
      return errorResponse(res, 'Sample syllabus not found', 404);
    }
    return successResponse(res, sample);
  } catch (err) {
    next(err);
  }
};

export default {
  auditSyllabus,
  getSampleSyllabi,
  getSampleSyllabusById,
};
