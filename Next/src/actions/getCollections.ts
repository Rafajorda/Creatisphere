import { prisma } from '@/lib/prisma';
import { CollectionResponse } from '@/types/Collection';

export default async function getCollections(): Promise<CollectionResponse> {
  const data = await prisma.collection.findMany({
    include: {
      products: true,
    },
  });

  return {
    collections: data.map((collection) => ({
      ...collection,
      products: collection.products,
    })),
  };
}