import skillService from './skill.service.js';
import { successResponse, errorResponse } from '../../utils/response.js';

export const getSkillGaps = async (req, res, next) => {
  try {
    const district = req.query.district || 'Pune';
    const industry = req.query.industry || 'Automotive / EV';
    const critThreshold = Number(req.query.criticalThreshold) || 85;
    const highThreshold = Number(req.query.highThreshold) || 70;
    const medThreshold = Number(req.query.medThreshold) || 50;

    const data = await skillService.getSkillGaps(district, industry, {
      critical: critThreshold,
      high: highThreshold,
      medium: medThreshold,
    });
    return successResponse(res, data);
  } catch (err) {
    next(err);
  }
};

export default {
  getSkillGaps,
};
