import { PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

export async function getExpiredPremiumUsers() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0); 
  
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    return prisma.premium.findMany({
      where: {
        endDate: {
          gte: yesterday, 
          lt: today, 
        },
        status: 'INACTIVE',
        notifyexpired: false, 
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