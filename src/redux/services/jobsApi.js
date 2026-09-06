import apiClient from '../../services/api.js';

export const jobsApi = {
  getMarketIntelligence: (role = 'EV Technician', district = 'Pune') =>
    apiClient.get('/market-intelligence', { role, district }),
};

export default jobsApi;
