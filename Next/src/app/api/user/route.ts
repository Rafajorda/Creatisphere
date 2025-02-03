import { prisma } from "@/lib/prisma"
import argon2 from "argon2"
import type { NextRequest } from "next/server"
import { ApiResponse } from "@/app/api/response"

export const PUT = async (req: NextRequest) => {
    const body = await req.json()

    const userData: Record<string, string> = {}
    const profileData: Record<string, string> = {}

    // Separar los datos del usuario y del perfil
    if (body.user.email) {
        userData.email = body.user.email
    }
    if (body.user.password) {
        userData.password = await argon2.hash(body.user.password)
    }
    if (body.user.profile) {
        if (body.user.profile.username) profileData.username = body.user.profile.username
        if (body.user.profile.bio) profileData.bio = body.user.profile.bio
        if (body.user.profile.avatar) profileData.avatar = body.user.profile.avatar
    }

    try {
        // Usar una transacción para actualizar tanto el usuario como su perfil
        const updatedUser = await prisma.$transaction(async (prisma) => {
            const user = await prisma.user.update({
                where: {
                    id: body.user.id as number,
                },
                data: {
                    ...userData,
                    profile: {
                        update: profileData,
                    },
                },
                include: {
                    profile: true,
                },
            })
            return user
        })

        return ApiResponse.ok(updatedUser)
    } catch (e) {
        return ApiResponse.badRequest({ message: "User update failed", error: e })
    }
}

