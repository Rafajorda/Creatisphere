import { $Enums } from "@prisma/client";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function PrismaCreateNotification(
    user: number,
    message: string,
    notificationType: $Enums.notificationType,
    isRead: boolean 
){ 
    
    const newNotification = await prisma.notification.create({
        data: {
            userId: user,
            notificationType: notificationType,
            message: message,
            isRead: isRead
        }   
    });

    return newNotification;
};
