import { dbStore } from '../../db/database.js';
import { isMongoConnected } from '../../db/connection.js';
import { Job } from '../../models/Job.js';

export const getJobs = async (district) => {
  if (isMongoConnected()) {
    try {
      const query = district && district.toLowerCase() !== 'all' ? { district: new RegExp(`^${district}$`, 'i') } : {};
      const jobs = await Job.find(query).lean();
      if (jobs && jobs.length > 0) return jobs;
    } catch (e) {
      console.warn('[Job Repository] Fallback to in-memory store:', e.message);
    }
  }
  return dbStore.getJobs(district);
};

export default {
  getJobs,
};
