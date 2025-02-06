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
                profile: true,
                Cart: {
                    include: {
                      cartLines: {
                        include: {
                          product: true,
                        },
                      },
                    },
                  },
                following: {
                    include: {
                        following: {  // Incluimos los datos completos del usuario seguido
                            include: {
                                profile: true
                            }
                        }
                    }
                },
                followers: {
                    include: {
                        follower: {  // Incluimos los datos completos del seguidor
                            include: {
                                profile: true
                            }
                        }
                    }
                }
            }
        })

        if (!currentUser) {
            return null
        }
        // const followingIds = new Set(currentUser.following.map(f => f.following.id))
        return {
            id: currentUser.id,
            email: currentUser.email,
            profile: currentUser.profile,
            cart: currentUser.Cart,
            following: currentUser.following.map(follow => ({
                id: follow.following.id,
                username: follow.following.profile?.username || '',
                avatar: follow.following.profile?.avatar || null,
                bio: follow.following.profile?.bio || '',
                isFollowing: currentUser.following.some(f => f.following.id === follow.following.id),
                followingId: follow.following.id,  // Añadimos el campo missing
                status: follow.following.status || 'inactive',
            })),
            followers: currentUser.followers.map(follow => ({
                id: follow.follower.id,
                username: follow.follower.profile?.username || '',
                avatar: follow.follower.profile?.avatar || null,
                bio: follow.follower.profile?.bio || '',
                isFollowing: currentUser.followers.some(f => f.follower.id === follow.follower.id),
                followingId: follow.follower.id,  // Añadimos el campo missing
                status: follow.follower.status || 'inactive',
            })),
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Error in getCurrentUser:", error)
        return null
    }
}