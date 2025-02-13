import { prisma } from '@/lib/prisma';
import { TypeResponse } from '@/types/Type';

export default async function getTypes(): Promise<TypeResponse> {
  const data = await prisma.type.findMany({
    include: {  
        productPrices:true
      }
  });

  return {
    types: data.map((type) => ({
      ...type,
      products: type.productPrices.map((productPrice) => ({
        id: productPrice.id,
        price: productPrice.price,
        name: '',
        slug: '',
        status: productPrice.status,
        createdAt: productPrice.createdAt,
        updatedAt: productPrice.updatedAt,
        stock: null,
        userId: 0,
        cartId: null,
        seriesId: 0,
        collectionId: 0,
        favoritesCount: 0,
      })),
    })),
  }
}