import { dbStore } from '../../db/database.js';

export const getMarketIntelligence = async (role = 'EV Technician', district = 'Pune') => {
  return dbStore.getMarketIntelligence(role, district);
};

export const getJobs = async (district) => {
  return dbStore.getJobs(district);
};

export default {
  getMarketIntelligence,
  getJobs,
};
