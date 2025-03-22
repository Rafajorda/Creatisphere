import type { NextRequest } from "next/server"
import axios from "axios"
import { prisma } from "@/lib/prisma"
import { ApiResponse } from "@/app/api/exceptions"
import getCurrentUser from "@/actions/getCurrentUser"
import { revalidatePath } from "next/cache"

interface IParams {
    username: string
}

function revalidate() {
    revalidatePath(`/article/[slug]`, "page")
    revalidatePath(`/profile/[username]`, "page")
}

export const POST = async (req: NextRequest, { params }: { params: IParams }) => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return ApiResponse.unauthorized("Unauthorized")
    }

    const followUser = await prisma.profile.findUnique({
        where: {
            username: params.username,
        },
    })
    if (!followUser) {
        return ApiResponse.notFound("User not exists")
    }
console.log('followUser', followUser.username)
console.log('currentUser', currentUser.profile?.username ?? 'No profile')
    await prisma.user.update({
        where: {
            id: currentUser.id,
        },
        data: {
            following: {
                connectOrCreate: {
                    where: {
                        followerId_followingId: {
                            followerId: currentUser.id,
                            followingId: followUser.id,
                        },
                    },
                    create: {
                        followingId: followUser.id,
                    },
                },
            },
        },
    })
    revalidate()
    const notificationData = {
        following: currentUser.profile?.username ?? 'No profile',
        followed: followUser.username
    };

    await axios.post('http://localhost:4000/api/notifications/Follow', notificationData);
    return ApiResponse.ok({ ...followUser, isFollowing: true })
}

export const DELETE = async (req: NextRequest, { params }: { params: IParams }) => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return ApiResponse.unauthorized("Unauthorized")
    }

    const followUser = await prisma.profile.findUnique({
        where: {
            username: params.username,
        },
    })
    if (!followUser) {
        return ApiResponse.notFound("User not exists")
    }

    await prisma.user.update({
        where: {
            id: currentUser.id,
        },
        data: {
            following: {
                delete: {
                    followerId_followingId: {
                        followerId: currentUser.id,
                        followingId: followUser.id,
                    },
                },
            },
        },
    })

    revalidate()
    return ApiResponse.ok({ ...followUser, isFollowing: false })
}

