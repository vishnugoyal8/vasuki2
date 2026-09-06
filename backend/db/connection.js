import mongoose from 'mongoose';
import { config } from '../config/env.js';

let isConnected = false;

export const connectDatabase = async () => {
  if (isConnected) return true;

  const mongoUri = config.mongodbUri;
  if (mongoUri && mongoUri.startsWith('mongodb')) {
    try {
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2000 });
      isConnected = mongoose.connection.readyState === 1;
      console.log('[Database] Connected to MongoDB database successfully via Mongoose.');
      return isConnected;
    } catch (err) {
      console.log('[Database] MongoDB connection bypassed (using active in-memory repository store):', err.message);
      isConnected = false;
      return false;
    }
  } else {
    console.log('[Database] Running unified MERN repository with zero-latency in-memory data cache.');
    isConnected = false;
    return false;
  }
};

export const isMongoConnected = () => isConnected && mongoose.connection.readyState === 1;

export const getMongooseReadyState = () => mongoose.connection.readyState;

export default connectDatabase;
