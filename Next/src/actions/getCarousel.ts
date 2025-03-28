import { prisma } from '@/lib/prisma';
import { CarouselResponse } from '@/types/Carousel';
import redis from '@/lib/redis';

export default async function getCarousel(): Promise<CarouselResponse> {
  const cacheKey = 'carousel:data';

  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const data = await prisma.carousel.findMany();

  const response: CarouselResponse = {
    carousels: data.map((carousel) => ({
      ...carousel,
    })),
  };

  await redis.set(cacheKey, JSON.stringify(response), 'EX', 3600);

  return response;
}