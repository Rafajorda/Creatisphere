import { prisma } from '@/lib/prisma';
import { TypeResponse } from '@/types/Type';

export default async function getTypes(): Promise<TypeResponse> {
  const data = await prisma.type.findMany({
    include: {  
        products: true,
      }
  });

  return {
    types: data.map((type) => ({
      ...type,
      products: type.products
    })),
  }
}