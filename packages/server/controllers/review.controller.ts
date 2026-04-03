import type { Request, Response } from 'express';
import { reviewService } from '../services/review.service';

export const reviewController = {
    // Get all reviews of a product from DB
    async getReviews(req: Request, res: Response) {
        const productId = Number(req.params.id);
        if (isNaN(productId)) {
            return res.status(400).json({error: "Invalid product id"});
        }
        const reviews = await reviewService.getReviews(productId);
        res.json(reviews);
    },
    
    // Get AI summary of all reviews of a product
    async summarizeReviews(req: Request, res: Response) {
        const productId = Number(req.params.id);
        if (isNaN(productId)) {
            return res.status(400).json({error: "Invalid product id"});
        }
        const summary = await reviewService.summarizeReviews(productId);
        res.json({summary});
    }
}