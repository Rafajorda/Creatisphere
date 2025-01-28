import { Product } from "@prisma/client";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { User, Profile } from "@prisma/client";
export default async function PrismaCreateNotificationBell(
    user: User & { profile: Profile },
    product: Product,
){ 
    const usernames = user.profile.username;

    const newNotification = await prisma.notification.create({
        data: {
            userId: product.userId,
            notificationType: 'bell',
            message: `${usernames} liked your '${product?.name}' `,
            isRead: false
        }   
    });

    return newNotification;
};
