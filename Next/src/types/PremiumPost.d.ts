import { PremiumPost } from "@prisma/client";

export interface PremiumPostItem extends Omit<PremiumPost, 'UpdatedAt'> {
    id: number;
    title: string;
    description: string;
    src: string;
    postType: $Enums.postType;
    status: $Enums.status;
    createdAt: Date;
}

export interface PremiumPostResponse {
    premiumPosts: PremiumPostItem[];
}