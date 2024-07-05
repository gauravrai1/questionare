import { Router } from 'express';
import questions from './questions.json';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Question:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The question ID
 *         question:
 *           type: string
 *           description: The question text
 *         options:
 *           type: array
 *           items:
 *             type: string
 *           description: The answer options
 */

/**
 * @swagger
 * /api/questions:
 *   get:
 *     summary: Get all questions
 *     responses:
 *       200:
 *         description: A list of questions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Question'
 */
router.get('/questions', (req, res) => {
    res.json(questions);
});

/**
 * @swagger
 * /api/questions/random:
 *   get:
 *     summary: Get a random question
 *     responses:
 *       200:
 *         description: A random question
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 */
router.get('/questions/random', (req, res) => {
    // Generate a random index based on the number of questions
    const randomIndex = Math.floor(Math.random() * questions.length);

    // Get a random question using the randomIndex
    const randomQuestion = questions[randomIndex];
    const { id, question, options } = randomQuestion;
    res.json({ id, question, options });
});

/**
 * @swagger
 * /api/submit:
 *   post:
 *     summary: Submit answers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The question ID
 *               answer:
 *                 type: string
 *                 description: The chosen answer
 *     responses:
 *       200:
 *         description: The result of the submission
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 correct:
 *                   type: boolean
 *                 correctAnswer:
 *                   type: string
 *       400:
 *         description: Missing id or answer in request body
 *       404:
 *         description: Question not found
 */
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