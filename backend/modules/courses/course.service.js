import { dbStore } from '../../db/database.js';

export const getCourses = async () => {
  return dbStore.getCourses();
};

export const getCourseAlignment = async (courseId = 'COURSE_ITI_EV_TECH') => {
  return dbStore.getCourseAlignment(courseId);
};

export default {
  getCourses,
  getCourseAlignment,
};
