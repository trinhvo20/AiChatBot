import { PrismaClient, type Review } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

export const productRepository = {
    
    getProduct(productId: number) {
        return prisma.product.findUnique({
            where: {id: productId}
        });
    }
}