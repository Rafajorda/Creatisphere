import { prisma } from '@/lib/prisma';
import { ProductResponse } from '@/types/Product';
import { ARTICLE_PAGE_LIMIT } from '@/utils/constants';
// import { excludeTimestampsFromArray, excludeTimestamps } from '@/utils/mapper';
import redis from '@/lib/redis';
import getCurrentUser from './getCurrentUser';

export async function getProductsProsthetics(): Promise<ProductResponse> {

  const data = await prisma.product.findMany({
    where: {
      productPrices: {
        some: {
          typeId: 3,
        },
      },
    },
    include: {
      artist: true,
      categories: true,
      ImagesProduct: true,
      productPrices: true,
      favoritedBy: true,
    },
  });

  console.log('data', data);
  const response: ProductResponse = {
    products: data.map((product) => {
      return {
        ...product,
        categories: product.categories,
        productPrices: product.productPrices,
        file: product.file,
        fileSize: product.fileSize,
        triangles: product.triangles,
        description: product.description,
        ImagesProduct: product.ImagesProduct,
        artist: product.artist,
        favorited: false,
        favoritesCount: product.favoritedBy.length,
      };
    }),
  };

  return response;
}