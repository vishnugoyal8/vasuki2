import { dbStore } from '../../db/database.js';

export const getInstitutes = async (district) => {
  return dbStore.getInstitutes(district);
};

export const getInstituteById = async (id) => {
  return dbStore.getInstituteById(id);
};

export default {
  getInstitutes,
  getInstituteById,
};
