import express from 'express';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response): void => {
  res.status(404).send('<h1>Page Not Found</h1>');
});

export default router;
