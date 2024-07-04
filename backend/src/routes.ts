import { Router } from 'express';
import questions from './questions.json';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.send('OK');
});

router.get('/questions', (req, res) => {
    res.json(questions);
  });

router.get('/questions/random', (req, res) => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomIndex];
    const { id, question, options } = randomQuestion;
    res.json({ id, question, options });
});

export default router;