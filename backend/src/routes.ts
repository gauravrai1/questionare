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
    // Generate a random index based on the number of questions
    const randomIndex = Math.floor(Math.random() * questions.length);

    // Get a random question using the randomIndex
    const randomQuestion = questions[randomIndex];
    const { id, question, options } = randomQuestion;
    res.json({ id, question, options });
});

router.post('/submit', (req, res) => {
    const { id, answer } = req.body;
  
    // Check if both id and answer are provided
    if (id === undefined || answer === undefined) {
      return res.status(400).json({ message: 'Missing id or answer in request body' });
    }
  
    // Find the question with the provided id
    const question = questions.find(q => q.id === id);
  
    // Check if the question exists
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
  
    // Check if the given answer matches the correct answer
    const isCorrect = question.answer === answer;
  
    res.json({
      id,
      correct: isCorrect,
      correctAnswer: question.answer
    });
});

export default router;