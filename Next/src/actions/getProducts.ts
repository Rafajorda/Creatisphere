import { prisma } from '@/lib/prisma';
import { ProductResponse } from '@/types/Product';
import { ARTICLE_PAGE_LIMIT } from '@/utils/constants';
// import { excludeTimestampsFromArray, excludeTimestamps } from '@/utils/mapper';
import redis from '@/lib/redis';
import getCurrentUser from './getCurrentUser';

interface GetProductsParams {
  status?: string;
  categorySlugs?: string[];
  // typeSlugs?: string[];
  searchQuery?: string;
  pageSize?: number;
  page?: number;
  limit?: number;
  offset?: number;
}
export default async function getProducts(params: GetProductsParams = {}): Promise<ProductResponse> {
  const page = params.page || 1;
  const limit = ARTICLE_PAGE_LIMIT;
  const offset = (page - 1) * ARTICLE_PAGE_LIMIT;

  const currentUser = await getCurrentUser()
  const userId = currentUser?.id

  const query: any = {}
  query.status = 'ACTIVE';

  if (params.categorySlugs) {
    query.categories = {
      some: {
        slug: {
          in: params.categorySlugs,
        },
      },
    }
  }
  if (params.searchQuery) {
    query.name = {
      contains: params.searchQuery,
      mode: 'insensitive',
    }
  }

  // 2. Si no está en caché, obtener los datos de la base de datos
  // console.log('Obteniendo datos de la base de datos para productos');
  const data = await prisma.product.findMany({
    where: query,
    // skip: offset,
    // take: limit,
    include: {
      artist: true,
      categories: true,
      ImagesProduct: true,
      productPrices: true,
      favoritedBy: {
        where: {
          userId: userId
        }
      },
    
    }
  });

  const response: ProductResponse = {
    products: data.map((product) => {
      const favorited = product.favoritedBy.some((fav) => fav.userId === userId);

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
        favorited,
        favoritesCount: product.favoritedBy.length,
      }
    }),
  };

  // 3. Guardar los datos en Redis (con un TTL de 1 hora, por ejemplo)
  // await redis.set(cacheKey, JSON.stringify(response), 'EX', 3600);
  // await redis.set(cacheKey, JSON.stringify(response), 'EX', 3600);

  return response;
}