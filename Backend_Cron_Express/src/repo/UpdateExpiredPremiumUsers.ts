import { PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

export async function UpdateExpiredPremiumUsers(userId: number) {
   
  
    return prisma.premium.update({
      where: {
        userId: userId,
        },
        data: {
            notifyexpired: true,
        },
    });
  }