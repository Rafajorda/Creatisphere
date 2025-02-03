import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function getSession() {
    return await getServerSession(authOptions)
}

export default async function getCurrentUser() {
    try {
        const session = await getSession()

        if (!session?.user?.email) {
            return null
        }

        const currentUser = await prisma.user.findFirst({
            where: {
                email: session.user.email
            },
            select: {
                id: true,
                email: true,
                followers: true,
                following: true,
                role: true,
                profile: {
                    select: {
                        username: true,
                        avatar: true,
                        bio: true
                    }
                }
            }
        })

        if (!currentUser) {
            return null
        }

        return currentUser

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Error in getCurrentUser:", error)
        return null
    }
}