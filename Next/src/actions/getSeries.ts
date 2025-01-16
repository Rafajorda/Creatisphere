import { prisma } from '@/lib/prisma';
import { SeriesResponse } from '@/types/Series';

export default async function getSeries(): Promise<SeriesResponse> {
  const data = await prisma.series.findMany({
    include: {
      products: true,
    },
  });

  return {
    series: data.map((serie) => ({
      ...serie,
      products: serie.products,
    })),
  };
}