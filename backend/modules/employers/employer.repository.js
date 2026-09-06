import { dbStore } from '../../db/database.js';
import { isMongoConnected } from '../../db/connection.js';
import { Employer } from '../../models/Employer.js';
import { EmployerFeedback } from '../../models/EmployerFeedback.js';

export const getEmployers = async (district) => {
  if (isMongoConnected()) {
    try {
      const query = district && district.toLowerCase() !== 'all' ? { district: new RegExp(`^${district}$`, 'i') } : {};
      const employers = await Employer.find(query).lean();
      if (employers && employers.length > 0) return employers;
    } catch (e) {
      console.warn('[Employer Repository] Fallback to in-memory store:', e.message);
    }
  }
  return dbStore.getEmployers(district);
};

export const getEmployerFeedback = async () => {
  if (isMongoConnected()) {
    try {
      const feedback = await EmployerFeedback.find().sort({ timestamp: -1 }).lean();
      if (feedback && feedback.length > 0) return feedback;
    } catch (e) {
      console.warn('[Employer Repository] Fallback to in-memory store:', e.message);
    }
  }
  return dbStore.getEmployerFeedback();
};

export const addEmployerFeedback = async (feedbackData) => {
  const result = dbStore.addEmployerFeedback(feedbackData);
  if (isMongoConnected()) {
    try {
      await EmployerFeedback.create(result.feedback);
    } catch (e) {
      console.warn('[Employer Repository] MongoDB feedback async save notice:', e.message);
    }
  }
  return result;
};

export default {
  getEmployers,
  getEmployerFeedback,
  addEmployerFeedback,
};
