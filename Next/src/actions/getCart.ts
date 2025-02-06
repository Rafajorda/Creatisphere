import { prisma } from '@/lib/prisma'
import { CartResponse} from '@/types/Cart'
import redis from '@/lib/redis';

export default async function getCart(id: number): Promise<CartResponse> {
	
    const cacheKey = 'cart:data';

    // 1. Verificar si los datos están en la caché
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      // console.log('Datos recuperados de Redis:', JSON.parse(cachedData));
      return JSON.parse(cachedData);
    }  
    const response = await prisma.cart.findFirst({
        where: {
            userId: id, 
          },
        include: { cartLines: true }
    });

	if (!response) {
		throw new Error('Cart not found');
	}
    await redis.set(cacheKey, JSON.stringify(response), 'EX', 3600);
  return response;
    // id: cart.id,
    // status: cart.status,
    // cartLines: cart.cartLines,
    // createdAt: cart.createdAt,
    // userId: cart.userId,
    // total: cart.total
  
}



