import { prisma } from '@/lib/prisma';
import { SeriesResponse } from '@/types/Series';
import redis from '@/lib/redis';

export default async function getSeries(): Promise<SeriesResponse> {

  const cacheKey = 'series:data';

  // 1. Verificar si los datos están en la caché  
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    // console.log('Datos recuperados de Redis:', JSON.parse(cachedData));
    // console.log('Usando datos en caché para Series');
    return JSON.parse(cachedData);
  }

  // 2. Si no están en caché, obtener de la base de datos
  // console.log('Obteniendo datos de la base de datos para Series');
  const data = await prisma.series.findMany({
    include: {
      products: true,
    },
  });

  const response: SeriesResponse = {
    series: data.map((serie) => ({
      ...serie,
      products: serie.products,
    })),
  };

  // 3. Guardar los datos en Redis (TTL de 1 hora) 
  // console.log('Guardando datos en Redis:', response);
  await redis.set(cacheKey, JSON.stringify(response), 'EX', 3600);

  return response;

}