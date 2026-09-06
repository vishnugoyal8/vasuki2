import aiService from './ai.service.js';
import { successResponse, errorResponse } from '../../utils/response.js';

export const analyzeJobDescription = async (req, res, next) => {
  try {
    const { jobDescription, district = 'Pune' } = req.body;
    if (!jobDescription || typeof jobDescription !== 'string') {
      return errorResponse(res, 'Please provide a valid jobDescription string in the request body.', 400);
    }

    const analysis = await aiService.analyzeJobDescription(jobDescription, district);
    return successResponse(res, analysis);
  } catch (err) {
    console.error('[API] Job Description Analysis error:', err);
    return errorResponse(res, 'Failed to analyze job description.', 500, err.message);
  }
};

export default {
  analyzeJobDescription,
};
