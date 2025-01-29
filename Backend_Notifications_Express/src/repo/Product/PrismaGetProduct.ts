import { PrismaClient, Product} from '@prisma/client';
const prisma = new PrismaClient();

export default async function prismaGetProdcut(productId:number): Promise<Product | null> {
const product = await prisma.product.findUnique({

        where: {
            id: productId
        }
    });
return product;
}