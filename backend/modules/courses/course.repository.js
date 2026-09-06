import { dbStore } from '../../db/database.js';
import { isMongoConnected } from '../../db/connection.js';
import { Course } from '../../models/Course.js';
import { CourseSkill } from '../../models/CourseSkill.js';

export const getAllCourses = async () => {
  if (isMongoConnected()) {
    try {
      const courses = await Course.find().lean();
      if (courses && courses.length > 0) return courses;
    } catch (e) {
      console.warn('[Course Repository] Fallback to in-memory store:', e.message);
    }
  }
  return dbStore.getCourses();
};

export const getCourseById = async (courseId) => {
  if (isMongoConnected()) {
    try {
      const course = await Course.findOne({ courseId }).lean();
      if (course) return course;
    } catch (e) {
      console.warn('[Course Repository] Fallback to in-memory store:', e.message);
    }
  }
  return dbStore.getCourseById(courseId);
};

export const getCourseSkills = async (courseId) => {
  if (isMongoConnected()) {
    try {
      const query = courseId ? { courseId } : {};
      const courseSkills = await CourseSkill.find(query).lean();
      if (courseSkills && courseSkills.length > 0) return courseSkills;
    } catch (e) {
      console.warn('[Course Repository] Fallback to in-memory store:', e.message);
    }
  }
  return dbStore.getCourseSkills(courseId);
};

export default {
  getAllCourses,
  getCourseById,
  getCourseSkills,
};
