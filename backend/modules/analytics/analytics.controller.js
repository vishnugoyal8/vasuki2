import analyticsService from './analytics.service.js';
import { successResponse } from '../../utils/response.js';

export const getStats = async (req, res, next) => {
  try {
    const district = req.query.district || 'Pune';
    const stats = await analyticsService.getStats(district);
    return successResponse(res, stats);
  } catch (err) {
    next(err);
  }
};

export const getDistricts = async (req, res, next) => {
  try {
    const districts = await analyticsService.getDistricts();
    return successResponse(res, districts);
  } catch (err) {
    next(err);
  }
};

export const getDistrictPlan = async (req, res, next) => {
  try {
    const district = req.params.district || 'Pune';
    const plan = await analyticsService.getDistrictPlan(district);
    return successResponse(res, plan);
  } catch (err) {
    next(err);
  }
};

export default {
  getStats,
  getDistricts,
  getDistrictPlan,
};
