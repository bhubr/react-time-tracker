// src/app.js
import './env';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import tasksRouter from './routes/tasks';
import timeSlicesRouter from './routes/timeSlices';
import lockRouter from './routes/lock';

const app = express();

app.use(bodyParser.json());
app.use('/api/tasks', tasksRouter);
app.use('/api/time-slices', timeSlicesRouter);
app.use('/api/lock', lockRouter);

// Check whether we are in production env
const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  // Compute the build path and index.html path
  const buildPath = path.resolve(__dirname, '../../front/build');
  const indexHtml = path.join(buildPath, 'index.html');

  // Setup build path as a static assets path
  app.use(express.static(buildPath));
  // Serve index.html on unmatched routes
  app.get('*', (req, res) => res.sendFile(indexHtml));
}

export default app;
