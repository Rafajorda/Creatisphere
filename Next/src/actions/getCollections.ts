import { prisma } from '@/lib/prisma';
import { CollectionResponse } from '@/types/Collection';
import redis from '@/lib/redis';

export default async function getCollections(): Promise<CollectionResponse> {

  const cacheKey = 'collections:data';

  // 1. Verificar si los datos están en la caché
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    // console.log('Datos recuperados de Redis:', JSON.parse(cachedData));
    // console.log('Usando datos en caché para Collections');
    return JSON.parse(cachedData);
  }

  // 2. Si no están en caché, obtener de la base de datos
  // console.log('Obteniendo datos de la base de datos para Collections');
  const data = await prisma.collection.findMany({
    include: {
      products: true,
    },
  });

  const response: CollectionResponse = {
    collections: data.map((collection) => ({
      ...collection,
      products: collection.products,
    })),
  };

  // 3. Guardar los datos en Redis (TTL de 1 hora)    
  // console.log('Guardando datos en Redis:', response);
  await redis.set(cacheKey, JSON.stringify(response), 'EX', 3600);      

  return response;

}