import { prisma } from '@/lib/prisma';
import { CarouselResponse } from '@/types/Carousel';
import redis from '@/lib/redis';

export default async function getCarousel(): Promise<CarouselResponse> {

  const cacheKey = 'carousel:data';

  // 1. Verificar si los datos están en la caché
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    // console.log('Datos recuperados de Redis:', JSON.parse(cachedData));
    // console.log('Usando datos en caché para Carousel');
    return JSON.parse(cachedData);
  }

  // 2. Si no están en caché, obtener de la base de datos
  // console.log('Obteniendo datos de la base de datos para Carousel');
  const data = await prisma.carousel.findMany({
   
  });

  const response: CarouselResponse = {
    carousels: data.map((carousel) => ({
      ...carousel,
    })),
  };

  // 3. Guardar los datos en Redis (TTL de 1 hora)
  // console.log('Guardando datos en Redis:', response);
  await redis.set(cacheKey, JSON.stringify(response), 'EX', 3600);

  return response;

}