import type { Request, Response } from 'express';
import { reviewService } from '../services/review.service';
import { productRepository } from '../repositories/product.repository';
import { reviewRepository } from '../repositories/review.repository';

export const reviewController = {
    // Get all reviews of a product from DB
    async getReviews(req: Request, res: Response) {
        const productId = Number(req.params.id);
        if (isNaN(productId)) {
            return res.status(400).json({error: "Invalid product id"});
        }

        const product = await productRepository.getProduct(productId);
        if (!product) {
            return res.status(404).json({error: "Product not found"});
        }

        const reviews = await reviewRepository.getReviews(productId);
        const summary = await reviewRepository.getSummary(productId);

        res.json({
            reviews,
            summary
        });
    },
    
    // Get AI summary of all reviews of a product
    async summarizeReviews(req: Request, res: Response) {
        const productId = Number(req.params.id);
        if (isNaN(productId)) {
            return res.status(400).json({error: "Invalid product id"});
        }

        const product = await productRepository.getProduct(productId);
        if (!product) {
            return res.status(404).json({error: "Product not found"});
        }

        const reviews = await reviewRepository.getReviews(productId, 1);
        if (!reviews.length) {
            return res.status(404).json({error: "No reviews found"});
        }

        const summary = await reviewService.summarizeReviews(productId);
        res.json({summary});
    }
}