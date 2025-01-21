import { prisma } from '@/lib/prisma';
import { ProductResponse } from '@/types/Product';
import { ARTICLE_PAGE_LIMIT } from '@/utils/constants';
// import { excludeTimestampsFromArray, excludeTimestamps } from '@/utils/mapper';

interface GetProductsParams {
  status?: string;
  categorySlugs?: string[];
  typeSlugs?: string[];
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
  if (params.typeSlugs) {
    query.types = {
      some: {
        slug: {
          in: params.typeSlugs,
        },
      },
    }
  }
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

  const data = await prisma.product.findMany({
    where: query,
    // skip: offset,
    // take: limit,
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