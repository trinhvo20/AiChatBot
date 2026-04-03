import express from 'express';
import type { Request, Response } from 'express';
import { chatController } from './controllers/chat.controller';
import { PrismaClient } from './generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

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
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

router.get('/api/products/:id/reviews', async (req: Request, res: Response) => {
    const productId = Number(req.params.id);
    if (isNaN(productId)) {
        return res.status(400).json({error: "Invalid product id"});
    }

    const reviews = await prisma.review.findMany({
        where: {
            productId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    res.json(reviews);
});

// Export 'default' because we only export 1 item in this file
export default router;