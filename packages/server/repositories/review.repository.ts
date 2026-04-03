import { PrismaClient, type Review } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

export const reviewRepository = {
    async getReviews(productId: number): Promise<Review[]> {
        const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
        const prisma = new PrismaClient({ adapter });

        const reviews = await prisma.review.findMany({
            where: {productId},
            orderBy: { createdAt: 'desc' }
        });

        return reviews;
    }
}