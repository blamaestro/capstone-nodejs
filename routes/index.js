import express from 'express';
import { getAbsolutePath } from '../utils/index.js';

const router = express.Router();

router.get('/', (req, res) => {
  const indexFilePath = getAbsolutePath('../views/index.html', import.meta.url);
  res.sendFile(indexFilePath);
});

export default router;
