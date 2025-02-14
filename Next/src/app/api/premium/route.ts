import getCurrentUser from "@/actions/getCurrentUser"
import { ApiResponse } from "../exceptions";
import { prisma } from "@/lib/prisma";

export const PUT = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return ApiResponse.unauthorized();
    }

    if (currentUser.role === "PREMIUM") {
        return ApiResponse.badRequest("User is already premium");
    }

    const asignPremium = await prisma.user.update({
        data: {
            role: "PREMIUM"
        },
        where: {
            id: currentUser.id
        }
    })

    if (!asignPremium) {
        return ApiResponse.badRequest('Error assigning premium role');
    }

    return ApiResponse.ok('User is now premium');
}