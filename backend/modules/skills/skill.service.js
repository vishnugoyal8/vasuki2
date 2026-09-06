import { dbStore } from '../../db/database.js';

export const getSkillGaps = async (district = 'Pune', industry = 'Automotive / EV', thresholds = { critical: 85, high: 70, medium: 50 }) => {
  return dbStore.getSkillGaps(district, industry, thresholds);
};

export const getSkillsList = async () => {
  return dbStore.getSkills();
};

export default {
  getSkillGaps,
  getSkillsList,
};
