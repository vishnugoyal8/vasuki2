import mongoose from "mongoose";
import { config } from "../config/env.js";

let isConnected = false;

export const connectDatabase = async () => {
  console.log("[Database] connectDatabase() called");

  if (isConnected) {
    console.log("[Database] Already connected");
    return true;
  }

  const mongoUri = config.mongodbUri;

  console.log(
    "[Database] MongoDB URI configured:",
    !!mongoUri
  );

  if (!mongoUri) {
    console.log("[Database] MONGODB_URI is missing");
    return false;
  }

  try {
    const conn = await mongoose.connect(mongoUri);

    isConnected = true;

    console.log(
      `[Database] MongoDB Connected: ${conn.connection.host}`
    );

    return true;
  } catch (error) {
    console.error(
      "[Database] MongoDB connection failed:",
      error.message
    );

    isConnected = false;
    return false;
  }
};

export const isMongoConnected = () => {
  return isConnected && mongoose.connection.readyState === 1;
};

export default connectDatabase;