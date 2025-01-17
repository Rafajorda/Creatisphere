import { prisma } from '@/lib/prisma';
import { ProductResponse } from '@/types/Product';
// import { excludeTimestampsFromArray, excludeTimestamps } from '@/utils/mapper';

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

  // const productMapped = excludeTimestampsFromArray(data);

  return {
    products: data.map((product) => {
      return {
        ...product,
        categories: product.categories,
        types: product.types,
        series: product.series,
        collections: product.collections,
        ImagesProduct: product.ImagesProduct,
      };
    }),
  };
}