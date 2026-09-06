import { dbStore } from '../../db/database.js';
import { isMongoConnected } from '../../db/connection.js';
import { Recommendation } from '../../models/Recommendation.js';

export const getRecommendations = async (filters) => {
  if (isMongoConnected()) {
    try {
      const query = {};
      if (filters?.district && filters.district.toLowerCase() !== 'all') {
        query.district = new RegExp(`^${filters.district}$`, 'i');
      }
      if (filters?.priority && filters.priority.toLowerCase() !== 'all') {
        query.priority = new RegExp(`^${filters.priority}$`, 'i');
      }
      if (filters?.status && filters.status.toLowerCase() !== 'all') {
        query.status = new RegExp(`^${filters.status}$`, 'i');
      }
      const recs = await Recommendation.find(query).lean();
      if (recs && recs.length > 0) return recs;
    } catch (e) {
      console.warn('[Recommendation Repository] Fallback to in-memory store:', e.message);
    }
  }
  return dbStore.getRecommendations(filters);
};

export const updateRecommendationStatus = async (id, status) => {
  const updated = dbStore.updateRecommendationStatus(id, status);
  if (isMongoConnected()) {
    try {
      await Recommendation.findOneAndUpdate({ recommendationId: id }, { status });
    } catch (e) {
      console.warn('[Recommendation Repository] MongoDB update notice:', e.message);
    }
  }
  return updated;
};

export default {
  getRecommendations,
  updateRecommendationStatus,
};
