import { prisma } from '@/lib/prisma';
import { ProductResponse } from '@/types/Product';
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
  limit?:number;
  offset?:number;
}
export default async function getProducts(params: GetProductsParams = {}): Promise<ProductResponse> {
   params = {
    // categorySlugs: [''],
    // typeSlugs: ['art-prints'],
    // seriesSlugs: ['hololive'],
     // searchQuery: 'sa',
      page: 2,
   }; 

  const {
    pageSize= 4,
    page = 1,
    limit =pageSize,
    offset=(page - 1)*4,
    categorySlugs,
    typeSlugs,
    seriesSlugs,
    collectionSlugs,
    searchQuery,  
  } = params;

  let query: any = {}

  query.status='ACTIVE';

  if(params.categorySlugs){
    query.categories = {
      some: {
        slug: {
          in: categorySlugs,
        },
      },
    }
  }
  if(params.typeSlugs){
    query.types = {
      some: {
        slug: {
          in: typeSlugs,
        },
      },
    }
  }
  if(params.seriesSlugs){
    query.series = {
      slug: {
        in: seriesSlugs,
      },
    }
  }
  if(params.collectionSlugs){
    query.collections = {
      slug: {
        in: collectionSlugs,
      },
    }
  }
  if(params.searchQuery){
    query.name = {
      contains: searchQuery,
      mode: 'insensitive',
    }
  }
  
  const data = await prisma.product.findMany({
    where:query, 
    skip: offset,
    take: limit,
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