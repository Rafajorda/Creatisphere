import getCurrentUser from "@/actions/getCurrentUser";
import { getProduct } from "@/actions/getProduct";
import { ApiResponse } from "@/app/api/exceptions";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

interface ParamsInterface {
   slug: string;
}

export async function PUT(req: NextRequest, context: { params: { slug: string } }) {
    const { params } = context;
    if (!params) {
        return ApiResponse.badRequest('Missing parameters');
    }
    const { slug } = params;
    console.log("slug",slug);
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            redirect('/Login');
        }

    const product = await prisma.product.findUnique({
        where: {
            slug: slug,
        },
    });
    if (!product) {
        return ApiResponse.notFound('Product not found');
    }

    try {
        const updatedProduct = await prisma.product.update({
            where: {
                id: product.id,
            },
            data: {
                status: product.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
            },
        });
        return ApiResponse.ok(updatedProduct);
    } catch (e) {
        console.log(e);
        return ApiResponse.badRequest('Error updating product');
    }
}