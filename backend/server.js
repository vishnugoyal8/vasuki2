import express from 'express';
import cors from 'cors';

import { config } from './config/env.js';
import { dbStore } from './db/database.js';
import apiRouter from './routes/index.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRouter);

// Error handler
app.use(errorHandler);

// Database + Server
const PORT = config.port || 5000;

const startServer = async () => {
  try {
    await dbStore.initialize();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
