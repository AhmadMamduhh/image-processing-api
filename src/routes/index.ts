import express from 'express';
import image from './api/image';

const router = express.Router();

router.use('/', image);
router.get('/', (req: express.Request, res: express.Response): void => {
  res.status(200).send('<h1>Main API Route</h1>');
});

export default router;
