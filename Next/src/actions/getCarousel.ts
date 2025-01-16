import { prisma } from '@/lib/prisma';
import { CarouselResponse } from '@/types/Carousel';

export default async function getCarousel(): Promise<CarouselResponse> {
  const data = await prisma.carousel.findMany({
   
  });

  return {
    carousels: data.map((carousel) => ({
      ...carousel
    })),
  }
}