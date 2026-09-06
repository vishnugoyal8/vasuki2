import apiClient from '../../services/api.js';

export const employersApi = {
  getEmployers: (district) => apiClient.get('/employers', { district }),
  getEmployerFeedback: () => apiClient.get('/employer-feedback'),
  submitEmployerFeedback: (feedback) => apiClient.post('/employer-feedback', feedback),
};

export default employersApi;
