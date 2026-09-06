import express from 'express';
import cors from 'cors';
import { config } from './config/env.js';
import { dbStore } from './db/database.js';
import apiRouter from './routes/index.js';
import { errorHandler } from './middleware/error.middleware.js';

export const createApp = () => {
  const app = express();

  // Core middleware
  app.use(cors());
  app.use(express.json());

  // API Routes
  app.use('/api', apiRouter);

  // Global Error Handler
  app.use(errorHandler);

  return app;
};

export const startStandaloneServer = async () => {
  const app = createApp();
  await dbStore.initialize();

  const PORT = config.port;
  return app.listen(PORT, '0.0.0.0', () => {
    console.log(`[CareerSync Backend] API server running on http://0.0.0.0:${PORT}`);
  });
};

export default createApp;
