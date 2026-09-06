import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { config } from './backend/config/env.js';
import { dbStore } from './backend/db/database.js';
import apiRouter from './backend/routes/index.js';
import { errorHandler } from './backend/middleware/error.middleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = config.port || 3000;

  // Middleware for body parsing and cross-origin requests
  app.use(cors());
  app.use(express.json());

  // Initialize unified database & seed dataset
  await dbStore.initialize();

  // API Routes mount FIRST
  app.use('/api', apiRouter);

  // Vite middleware for development vs static build in production
  if (config.nodeEnv !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Error Handler
  app.use(errorHandler);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[CareerSync Server] Listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
