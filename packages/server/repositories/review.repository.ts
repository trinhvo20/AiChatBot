import dayjs from 'dayjs';
import { PrismaClient, type Review } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

export const reviewRepository = {
    // Get all reviews of a product from DB
    async getReviews(productId: number, limit?: number): Promise<Review[]> {
        const reviews = await prisma.review.findMany({
            where: {productId},
            orderBy: { createdAt: 'desc' },
            take: limit
        });
        return reviews;
    },

    // Store the review summary to the DB
    storeSummary(productId: number, summary: string) {
        const now = new Date();
        const expiresAt = dayjs(now).add(7, 'days').toDate();

        const data = {
            content: summary,
            generatedAt: now,
            expiresAt,
            productId
        }

        return prisma.summary.upsert({
            where: { productId },
            update: data,
            create: data,
        })
    },

    // Get summary of a product from DB
    getSummary(productId: number) {
        return prisma.summary.findUnique({ 
            where: { productId } 
        });
    },
}