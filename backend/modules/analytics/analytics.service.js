import { dbStore } from '../../db/database.js';
import { MAHARASHTRA_DISTRICTS_DATA } from '../../data/districts.seed.js';

export const getStats = async (district = 'Pune') => {
  return dbStore.getStats(district);
};

export const getDistricts = async () => {
  return MAHARASHTRA_DISTRICTS_DATA;
};

export const getDistrictPlan = async (district = 'Pune') => {
  return dbStore.getDistrictPlan(district);
};

export default {
  getStats,
  getDistricts,
  getDistrictPlan,
};
