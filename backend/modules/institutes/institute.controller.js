import instituteService from './institute.service.js';
import { successResponse } from '../../utils/response.js';

export const getInstitutes = async (req, res, next) => {
  try {
    const district = req.query.district;
    const institutes = await instituteService.getInstitutes(district);
    return successResponse(res, institutes);
  } catch (err) {
    next(err);
  }
};

export default {
  getInstitutes,
};
