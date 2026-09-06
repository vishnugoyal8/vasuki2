import apiClient from '../../services/api.js';

export const institutesApi = {
  getInstitutes: (district) => apiClient.get('/institutes', { district }),
};

export default institutesApi;
