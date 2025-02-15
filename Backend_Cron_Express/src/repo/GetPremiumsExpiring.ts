// /repositories/premiumRepository.ts
import { PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

export async function getExpiringPremiumUsers() {
  return prisma.premium.findMany({
    where: {
      endDate: {
        gte: new Date(new Date().setDate(new Date().getDate() + 3)),
        lt: new Date(new Date().setDate(new Date().getDate() + 4)),
      },
      status: 'ACTIVE',
      notify3day: false,
    },
    include: {
      user: {
        include: {
          profile: true,  
        },
      }
    },
  });
}
