import apiClient from '../../services/api.js';

export const analyticsApi = {
  getStats: (district = 'Pune') => apiClient.get('/stats', { district }),
  getDistricts: () => apiClient.get('/districts'),
  getDistrictPlan: (district = 'Pune') => apiClient.get(`/districts/${encodeURIComponent(district)}/plan`),
};

export default analyticsApi;
