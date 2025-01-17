'use server';

import { prisma } from '@/lib/prisma';
import { ProductResponse } from '@/types/Product';
import { excludeTimestampsFromArray, excludeTimestamps } from '@/utils/mapper';

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

  const productMapped = excludeTimestampsFromArray(data);

  return {
    products: productMapped.map((product) => {
      return {
        ...product,
        categories: excludeTimestampsFromArray(product.categories),
        types: excludeTimestampsFromArray(product.types),
        series: excludeTimestamps(product.series),
        collections: excludeTimestamps(product.collections),
        ImagesProduct: excludeTimestampsFromArray(product.ImagesProduct),
      };
    }),
  };
}