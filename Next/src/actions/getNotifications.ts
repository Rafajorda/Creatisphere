import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

export async function getSession() {
    return await getServerSession(authOptions)
}


export async function getNotifications() {
    try{
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
        return null
    }

    const user = await prisma.user.findFirst({
        where: {
            email: session.user.email
        }
    })

    if (!user) {
        return null
    }

    const notifications = await prisma.notification.findMany({
        where: {
            userId: user.id,
            isRead: false,
            notificationType: "bell",
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return notifications;
    } catch (error) {
        console.error("Error al obtener las notificaciones", error);
        return null;
    }
}