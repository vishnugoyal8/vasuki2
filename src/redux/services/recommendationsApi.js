import apiClient from '../../services/api.js';

export const recommendationsApi = {
  getRecommendations: (filters = {}) => apiClient.get('/recommendations', filters),
  updateRecommendationStatus: (id, status) => apiClient.patch(`/recommendations/${id}`, { status }),
};

export default recommendationsApi;
