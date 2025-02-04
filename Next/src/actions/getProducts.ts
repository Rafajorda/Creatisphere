import { prisma } from '@/lib/prisma';
import { ProductResponse } from '@/types/Product';
import { ARTICLE_PAGE_LIMIT } from '@/utils/constants';
// import { excludeTimestampsFromArray, excludeTimestamps } from '@/utils/mapper';
import redis from '@/lib/redis';

interface GetProductsParams {
  status?: string;
  categorySlugs?: string[];
  // typeSlugs?: string[];
  seriesSlugs?: string[];
  collectionSlugs?: string[];
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

  // Construir una clave única para Redis basado en los parámetros
  const cacheKey = `products:${JSON.stringify(params)}`;

  // 1. Intentar obtener los datos desde Redis
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    // console.log('Usando datos en caché para productos');
    return JSON.parse(cachedData);
  }

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
  // if (params.typeSlugs) {
  //   query.types = {
  //     some: {
  //       slug: {
  //         in: params.typeSlugs,
  //       },
  //     },
  //   }
  // }
  if (params.seriesSlugs) {
    query.series = {
      slug: {
        in: params.seriesSlugs,
      },
    }
  }
  if (params.collectionSlugs) {
    query.collections = {
      slug: {
        in: params.collectionSlugs,
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
      series: true,
      collections: true,
      ImagesProduct: true,
      productPrices: true,
    }
  });

  console.log(data);
  console.log("data");
  // const productMapped = excludeTimestampsFromArray(data);

  const response: ProductResponse = {
    products: data.map((product) => {
      return {
        ...product,
        categories: product.categories,
        productPrices: product.productPrices,
        series: product.series,
        collections: product.collections,
        ImagesProduct: product.ImagesProduct,
        artist: product.artist
      };
    }),
  };

  // 3. Guardar los datos en Redis (con un TTL de 1 hora, por ejemplo)
  await redis.set(cacheKey, JSON.stringify(response), 'EX', 3600);

  return response;
}