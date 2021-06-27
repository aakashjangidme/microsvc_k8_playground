import express from 'express';
import logger from '../services/logger';

const router = express.Router();

router.get('/api/users/onboard', (_req, res) => {
  res.status(200).json({ message: 'working' });
});

router.get('/api/users/details', (_req, res) => {
  logger.info(`/details Accessed`);
  res.status(200).json({ message: 'woreking' });
});

export { router as userRouter };
