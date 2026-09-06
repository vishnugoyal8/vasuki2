import recommendationService from './recommendation.service.js';
import { successResponse, errorResponse } from '../../utils/response.js';

export const getRecommendations = async (req, res, next) => {
  try {
    const { district, priority, status } = req.query;
    const recs = await recommendationService.getRecommendations({ district, priority, status });
    return successResponse(res, recs);
  } catch (err) {
    next(err);
  }
};

export const updateRecommendationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['PENDING_APPROVAL', 'APPROVED', 'IN_PROGRESS', 'COMPLETED'].includes(status)) {
      return errorResponse(res, 'Invalid status value.', 400);
    }

    const updated = await recommendationService.updateRecommendationStatus(id, status);
    if (!updated) {
      return errorResponse(res, 'Recommendation not found.', 404);
    }

    return successResponse(res, updated);
  } catch (err) {
    next(err);
  }
};

export default {
  getRecommendations,
  updateRecommendationStatus,
};
