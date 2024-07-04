import { Router } from 'express';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.send('OK');
});

export default router;