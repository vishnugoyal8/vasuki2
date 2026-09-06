import apiClient from '../../services/api.js';

export const aiApi = {
  analyzeJobDescription: (jobDescription, district = 'Pune') =>
    apiClient.post('/job-description/analyze', { jobDescription, district }),
};

export default aiApi;
