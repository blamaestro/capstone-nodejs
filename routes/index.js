import express from 'express';
import { getAbsolutePath } from '../utils/index.js';

const router = express.Router();

router.all('/api/*', (req, res) => {
  res.status(404).json({
    status: 'Error',
    message: 'This endpoint is not supported',
  });
});

router.get('/', (req, res) => {
  const indexFilePath = getAbsolutePath('../views/index.html', import.meta.url);
  res.sendFile(indexFilePath);
});

router.all('*', (req, res) => {
  const errorPagePath = getAbsolutePath('../views/404.html', import.meta.url);
  res.sendFile(errorPagePath);
});

export default router;
