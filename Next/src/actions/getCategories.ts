import { prisma } from '@/lib/prisma';
import { CategoryResponse } from '@/types/Category';

export default async function getCategories(): Promise<CategoryResponse> {
  const data = await prisma.category.findMany({
    include: {  
      products: true,
    }
  });

  return {
    categories: data.map((category) => ({
      ...category,
      products: category.products
    })),
  }
}