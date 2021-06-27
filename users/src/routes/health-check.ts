import express from 'express';
import { healthCheckController } from '../controllers/health-check-controller';

const router = express.Router();

router.get('/ping', healthCheckController);

export { router as healthCheckRouter };
