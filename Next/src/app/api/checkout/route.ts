import type { NextRequest } from "next/server"
import { ApiResponse } from "../exceptions"
import { prisma } from "@/lib/prisma"
import getCurrentUser from "@/actions/getCurrentUser"
import { fetchWrapper } from "@/utils/fetch"
// import { fetchWrapper } from "@/utils/fetch"

export const POST = async () => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return ApiResponse.unauthorized()
    }

    try {
        const result = await prisma.$transaction(async (prismaClient) => {
            // Create order
            const order = await prismaClient.order.create({
                data: {
                    userId: currentUser?.id,
                    slug: '',
                    total: currentUser?.cart[0].total,
                    status: "ACTIVE",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            })

            if (!order) {
                throw new Error("Order not created")
            }

            // Assign slug to order
            const updatedOrder = await prismaClient.order.update({
                where: { id: order.id },
                data: { slug: `order-${order.id}` },
            })

            if (!updatedOrder) {
                throw new Error("Slug not assigned")
            }

            // Assign order lines to order
            const orderLines = await prismaClient.orderLine.createMany({
                data: currentUser?.cart[0].cartLines.map((item) => ({
                    orderId: order.id,
                    productPriceId: item.productPriceId,
                    quantity: 1,
                    price: item.productPrice.price,
                    status: "ACTIVE",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })),
            })

            if (!orderLines) {
                throw new Error("Order lines not created")
            }

            // Delete cart
            const deletedCart = await prismaClient.cart.delete({
                where: {
                    id: currentUser.cart[0].id
                },
            })

            if (!deletedCart) {
                throw new Error("Cart not deleted")
            }

            return order
        })

        // Notify user by email(outside of transaction)
        const emailOrder = await fetchWrapper("http://localhost:4000/api/notifications/Orders", "POST", {
            orderId: result.id,
        })

        if (!emailOrder) {
            ApiResponse.badRequest("Email not sent");
        }

        return ApiResponse.ok('successful');
    } catch (e) {
        return ApiResponse.badRequest("Transaction failed")
    }
}

