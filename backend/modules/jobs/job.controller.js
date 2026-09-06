import jobService from './job.service.js';
import { successResponse } from '../../utils/response.js';

export const getMarketIntelligence = async (req, res, next) => {
  try {
    const role = req.query.role || 'EV Technician';
    const district = req.query.district || 'Pune';
    const data = await jobService.getMarketIntelligence(role, district);
    return successResponse(res, data);
  } catch (err) {
    next(err);
  }
};

export default {
  getMarketIntelligence,
};
