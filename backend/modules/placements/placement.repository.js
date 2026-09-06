import { dbStore } from '../../db/database.js';
import { isMongoConnected } from '../../db/connection.js';
import { Placement } from '../../models/Placement.js';

export const getPlacements = async () => {
  if (isMongoConnected()) {
    try {
      const placements = await Placement.find().lean();
      if (placements && placements.length > 0) return placements;
    } catch (e) {
      console.warn('[Placement Repository] Fallback to in-memory store:', e.message);
    }
  }
  return dbStore.getPlacements();
};

export default {
  getPlacements,
};
