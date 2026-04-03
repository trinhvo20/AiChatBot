import express from 'express';
import type { Request, Response } from 'express';
import { chatController } from './controllers/chat.controller';
import { reviewController } from './controllers/review.controller';


const router = express.Router();

// TEST
router.get('/', (req: Request, res: Response) => {
    res.send('Hello world')
});

router.get('/api/hello', (req: Request, res: Response) => {
    res.json({message: "Hello"})
});

// MAIN
// Part 1 - ChatAI
router.post('/api/chat', chatController.sendMessage)

// Part 2 - AI Review Summarizer 
router.get('/api/products/:id/reviews', reviewController.getReviews);
router.post('/api/products/:id/reviews/summarize', reviewController.summarizeReviews);

// Export 'default' because we only export 1 item in this file
export default router;