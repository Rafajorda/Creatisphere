import { prisma } from '@/lib/prisma';
import { CategoryResponse } from '@/types/Category';
import redis from '@/lib/redis';

export default async function getCategories(): Promise<CategoryResponse> {

  const cacheKey = 'categories:data';

  // 1. Verificar si los datos están en la caché
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    // console.log('Datos recuperados de Redis:', JSON.parse(cachedData));
    return JSON.parse(cachedData);
  }

  // 2. Si no están en caché, obtener de la base de datos
  // console.log('Obteniendo datos de la base de datos para Categories');
  const data = await prisma.category.findMany({
    include: {  
      products: true,
    }
  });

  const response: CategoryResponse = {
    categories: data.map((category) => ({
      ...category,
      products: category.products
    })),
  };

  // 3. Guardar los datos en Redis (TTL de 1 hora)
  // console.log('Guardando datos en Redis:', response);
  await redis.set(cacheKey, JSON.stringify(response), 'EX', 3600);

  return response;
}