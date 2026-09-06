import recommendationRepository from './recommendation.repository.js';

export const getRecommendations = async (filters) => {
  return recommendationRepository.getRecommendations(filters);
};

export const updateRecommendationStatus = async (id, status) => {
  return recommendationRepository.updateRecommendationStatus(id, status);
};

export default {
  getRecommendations,
  updateRecommendationStatus,
};
