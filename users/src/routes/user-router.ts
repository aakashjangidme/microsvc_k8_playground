import express from 'express';
import { onboardController } from '../controllers/user-controllers/onboard-controller';
import { getDetailController } from '../controllers/user-controllers/get-detail-controller';
import { updateDetailController } from '../controllers/user-controllers/update-detail-controller';

const router = express.Router();

router.post('/onboard', onboardController);
router.post('/details', getDetailController);
router.post('/update', updateDetailController);

export { router as userRouter };
