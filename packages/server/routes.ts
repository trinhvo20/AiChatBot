import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import { chatController } from './controllers/chat.controller';

const router = express.Router();

// TEST
router.get('/', (req: Request, res: Response) => {
    res.send('Hello world')
});

router.get('/api/hello', (req: Request, res: Response) => {
    res.json({message: "Hello"})
});

// MAIN
router.post('/api/chat', chatController.sendMessage)

// Export 'default' because we only export 1 item in this file
export default router;