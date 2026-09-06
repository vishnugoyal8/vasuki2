import employerService from './employer.service.js';
import { successResponse, errorResponse } from '../../utils/response.js';

export const getEmployers = async (req, res, next) => {
  try {
    const district = req.query.district;
    const employers = await employerService.getEmployers(district);
    return successResponse(res, employers);
  } catch (err) {
    next(err);
  }
};

export const getEmployerFeedback = async (req, res, next) => {
  try {
    const feedback = await employerService.getEmployerFeedback();
    return successResponse(res, feedback);
  } catch (err) {
    next(err);
  }
};

export const submitEmployerFeedback = async (req, res, next) => {
  try {
    const { companyName, role, hiringDifficultyScore } = req.body;
    if (!companyName || !role || !hiringDifficultyScore) {
      return errorResponse(res, 'companyName, role, and hiringDifficultyScore are required fields.', 400);
    }

    const result = await employerService.submitEmployerFeedback(req.body);
    return res.status(201).json({
      success: true,
      message: 'Employer feedback registered. Dynamic demand models recalibrated.',
      ...result,
    });
  } catch (err) {
    next(err);
  }
};

export default {
  getEmployers,
  getEmployerFeedback,
  submitEmployerFeedback,
};
