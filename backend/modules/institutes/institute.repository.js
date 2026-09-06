import { dbStore } from '../../db/database.js';
import { isMongoConnected } from '../../db/connection.js';
import { Institute } from '../../models/Institute.js';

export const getInstitutes = async (district) => {
  if (isMongoConnected()) {
    try {
      const query = district && district.toLowerCase() !== 'all' ? { district: new RegExp(`^${district}$`, 'i') } : {};
      const institutes = await Institute.find(query).lean();
      if (institutes && institutes.length > 0) return institutes;
    } catch (e) {
      console.warn('[Institute Repository] Fallback to in-memory store:', e.message);
    }
  }
  return dbStore.getInstitutes(district);
};

export const getInstituteById = async (instituteId) => {
  if (isMongoConnected()) {
    try {
      const institute = await Institute.findOne({ instituteId }).lean();
      if (institute) return institute;
    } catch (e) {
      console.warn('[Institute Repository] Fallback to in-memory store:', e.message);
    }
  }
  return dbStore.getInstituteById(instituteId);
};

export default {
  getInstitutes,
  getInstituteById,
};
