import { PrismaClient, type Review } from '../generated/prisma/client';
import { reviewRepository } from '../repositories/review.repository';

export const reviewService = {
    async getReviews(productId: number): Promise<Review[]> {
        return reviewRepository.getReviews(productId);
    },

    async summarizeReviews(productId: number): Promise<string> {
        // Get last 10 reviews
        const reviews = await reviewRepository.getReviews(productId, 10);
        const joinedReviews = reviews.map(review => review.content).join('\n\n');

        // Send last 10 reviews to AI to summary
        const summary = 'This is a placeholder summary.';
        return summary;
    },
}