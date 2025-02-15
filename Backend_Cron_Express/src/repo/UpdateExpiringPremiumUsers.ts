import { PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

export async function UpdateExpiringPremiumUsers(userId: number) {
   
  
    return prisma.premium.update({
      where: {
        userId: userId,
        },
        data: {
           notify3day: true,
        },
    });
  }