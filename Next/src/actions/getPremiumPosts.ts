import { prisma } from '@/lib/prisma';
import { PremiumPostResponse } from '@/types/PremiumPost';

export default async function getPremiumPosts(): Promise<PremiumPostResponse> {
    const data = await prisma.premiumPost.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });

    return {
        premiumPosts: data.map((premiumPost) => ({
            ...premiumPost
        })),
    }
}