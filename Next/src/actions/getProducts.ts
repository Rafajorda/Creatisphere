// pages/api/products.ts
import { prisma } from '@/lib/prisma';
import { ProductResponse } from '@/types/Product';

export default async function getProducts(): Promise<ProductResponse> {
  const data = await prisma.product.findMany({
    include: {
      categories: true,
      types: true,
      series: true,
      collections: true,
      ImagesProduct: true,
    }
  });

  return {
    products: data.map((product) => ({
      ...product,
      collections: product.collections,
      categories: product.categories,
      types: product.types,
      series: product.series,
      ImagesProduct: product.ImagesProduct,
    })),
  }
}