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

        const currentUser = await prisma.profile.findFirst({
            where: {
                user: {
                    email: session.user.email
                }
            },
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