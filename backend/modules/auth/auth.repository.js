import { User } from '../../models/User.js';
import { dbStore } from '../../db/database.js';
import { isMongoConnected } from '../../db/connection.js';

export const authRepository = {
  async findByEmail(email) {
    const normalized = (email || '').toLowerCase().trim();
    if (isMongoConnected()) {
      try {
        const user = await User.findOne({ email: normalized }).lean();
        if (user) return user;
      } catch (err) {
        console.error('Mongo findByEmail error, falling back to dbStore:', err.message);
      }
    }
    return dbStore.users.find(u => (u.email || '').toLowerCase() === normalized) || null;
  },

  async findById(id) {
    if (isMongoConnected()) {
      try {
        const user = await User.findById(id).lean();
        if (user) return user;
      } catch (err) {
        console.error('Mongo findById error, falling back to dbStore:', err.message);
      }
    }
    return dbStore.users.find(u => u.id === id || u._id === id) || null;
  },

  async create(userData) {
    const id = `USR-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const fullUser = {
      ...userData,
      id,
      _id: id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save in memory
    dbStore.users.push(fullUser);

    // Save in MongoDB if available
    if (isMongoConnected()) {
      try {
        const mongoUser = await User.create(userData);
        return mongoUser.toObject();
      } catch (err) {
        console.error('Mongo user creation error, saved in memory:', err.message);
      }
    }

    return fullUser;
  },

  async getAll() {
    if (isMongoConnected()) {
      try {
        return await User.find().lean();
      } catch (err) {
        console.error('Mongo getAll users error:', err.message);
      }
    }
    return dbStore.users;
  },
};

export default authRepository;
