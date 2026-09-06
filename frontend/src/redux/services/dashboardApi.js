import apiClient from '../../services/api.js';

export const dashboardApi = {
  getStats: (district = 'Pune') => apiClient.get('/stats', { district }),
  resetSeedData: () => apiClient.post('/seed/reset'),
};

export default dashboardApi;
