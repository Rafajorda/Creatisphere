import { prisma } from '@/lib/prisma';
import { ProductResponse } from '@/types/Product';
import { ARTICLE_PAGE_LIMIT } from '@/utils/constants';
// import { excludeTimestampsFromArray, excludeTimestamps } from '@/utils/mapper';
import redis from '@/lib/redis';
import getCurrentUser from './getCurrentUser';

interface GetProductsParams {
  status?: string;
  categorySlugs?: string[];
  triangles?: number;
  fileSize?: number;
  searchQuery?: string;
  pageSize?: number;
  page?: number;
  limit?: number;
  offset?: number;
}
export default async function getProducts(params: GetProductsParams = {}, includeStatus: boolean = true): Promise<ProductResponse> {
  console.log('Obteniendo productos');
  console.log('params', params);
  const page = params.page || 1;
  const limit = ARTICLE_PAGE_LIMIT;
  const offset = (page - 1) * ARTICLE_PAGE_LIMIT;

  const currentUser = await getCurrentUser()
  const userId = currentUser?.id

  const query: any = {}
  const triangles = Number(params.triangles)
  const fileSize = Number(params.fileSize)
  
  if (includeStatus) {
    query.status = 'ACTIVE';
  }

  if (params.categorySlugs) {
    query.categories = {
      some: {
        slug: {
          in: params.categorySlugs,
        },
      },
    }
  }  
  if (params.triangles) {
    query.triangles = {
      lt: triangles
    };
  }
  if (params.fileSize) {
    query.fileSize = {
      lt: fileSize
    };
  }
  if (params.searchQuery) {
    query.OR = [
      {
        name: {
          contains: params.searchQuery,
          mode: 'insensitive',
        },
      },
      {
        description: {
          contains: params.searchQuery,
          mode: 'insensitive',
        },
      },
      {
        categories: {
          some: {
            name: {
              contains: params.searchQuery,
              mode: 'insensitive',
            },
          },
        },
      },
    ];
  }

  // 2. Si no está en caché, obtener los datos de la base de datos
  // console.log('Obteniendo datos de la base de datos para productos');
  const data = await prisma.product.findMany({
    where: {
      ...query,
      productPrices: {
        none: {
          typeId: 3,
        },
      },
    },
    include: {
      artist: true,
      categories: true,
      ImagesProduct: true,
      productPrices: true,
      favoritedBy: {
        where: {
          userId: userId,
        },
      },
    },
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
