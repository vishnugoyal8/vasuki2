import courseService from './course.service.js';
import { successResponse } from '../../utils/response.js';

export const getCourses = async (req, res, next) => {
  try {
    const courses = await courseService.getCourses();
    return successResponse(res, courses);
  } catch (err) {
    next(err);
  }
};

export const getCourseAlignment = async (req, res, next) => {
  try {
    const courseId = req.query.courseId || 'COURSE_ITI_EV_TECH';
    const alignment = await courseService.getCourseAlignment(courseId);
    return successResponse(res, alignment);
  } catch (err) {
    next(err);
  }
};

export default {
  getCourses,
  getCourseAlignment,
};
