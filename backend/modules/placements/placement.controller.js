import placementService from './placement.service.js';
import { successResponse } from '../../utils/response.js';

export const getPlacements = async (req, res, next) => {
  try {
    const placements = await placementService.getPlacements();
    return successResponse(res, placements);
  } catch (err) {
    next(err);
  }
};

export default {
  getPlacements,
};
