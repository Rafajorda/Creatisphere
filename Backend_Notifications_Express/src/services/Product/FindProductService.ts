import { AppError } from '../../utils/AppError';
import prismaGetProdcut from '../../repo/Product/PrismaGetProduct';

export default async function findProduct(
    productId: number,
){ 
    try {
        if (!productId) {
            throw new AppError("productId is required", 400);
        }

    const product= await prismaGetProdcut(productId);
    if (!product) {
        throw new AppError("User not found", 404);
    }
    return product;

    } catch (err) {
        if (err instanceof AppError) {
            throw err;
        } else {
            console.error("Unexpected error in findProduct:", err);
            throw new AppError("Internal server error", 500);
        }
    }
}
