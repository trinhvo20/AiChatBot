import OpenAI from 'openai';
import { type Review } from '../generated/prisma/client';
import { reviewRepository } from '../repositories/review.repository';

// Get OpenAI through API key
const openAIClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export const reviewService = {
    // Get all reviews of a product from DB
    async getReviews(productId: number): Promise<Review[]> {
        return reviewRepository.getReviews(productId);
    },

    // Get AI summary of all reviews of a product
    async summarizeReviews(productId: number): Promise<string> {
        // Get last 10 reviews from DB
        const reviews = await reviewRepository.getReviews(productId, 10);
        const joinedReviews = reviews.map(review => review.content).join('\n\n');

        // Send last 10 reviews to AI to summary
        const prompt = `Summarize the following customer reviews into a short paragraph highlighting the key themes, both positive and negative: ${joinedReviews}`;
        const response = await openAIClient.responses.create({
            model: 'gpt-4.1',
            input: prompt,
            temperature: 0.2, // decide how logic/creative the answer is (0.2=logic, 1.0=creative)
            max_output_tokens: 500, 
        })
        
        const summary = response.output_text;
        return summary;
    },
}