import { dbStore } from '../../db/database.js';
import { isMongoConnected } from '../../db/connection.js';
import { Skill } from '../../models/Skill.js';

export const getAllSkills = async () => {
  if (isMongoConnected()) {
    try {
      const skills = await Skill.find().lean();
      if (skills && skills.length > 0) return skills;
    } catch (e) {
      console.warn('[Skill Repository] Fallback to in-memory store:', e.message);
    }
  }
  return dbStore.getSkills();
};

export const getSkillById = async (skillId) => {
  if (isMongoConnected()) {
    try {
      const skill = await Skill.findOne({ skillId }).lean();
      if (skill) return skill;
    } catch (e) {
      console.warn('[Skill Repository] Fallback to in-memory store:', e.message);
    }
  }
  return dbStore.getSkillById(skillId);
};

export const findSkillByTerm = async (term) => {
  return dbStore.findSkillByTerm(term);
};

export default {
  getAllSkills,
  getSkillById,
  findSkillByTerm,
};
