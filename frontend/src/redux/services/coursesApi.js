import apiClient from '../../services/api.js';

export const coursesApi = {
  getCourses: () => apiClient.get('/courses'),
  getCourseAlignment: (courseId = 'COURSE_ITI_EV_TECH') => apiClient.get('/courses/alignment', { courseId }),
};

export default coursesApi;
